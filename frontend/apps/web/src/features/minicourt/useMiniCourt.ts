"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent, RefObject } from "react";
import { MiniCourt, W, autopilot } from "./engine";
import type { GameEvent, Input, MatchConfig, MatchStats, Phase, Side } from "./engine";
import { Sfx } from "./audio";
import { COLORS, Fx, drawScene, resizeCanvas } from "./render";

const STEP = 1 / 60;

export interface Banner {
  id: number;
  text: string;
  tone: "good" | "great" | "bad" | "info";
}

export interface Ui {
  mode: "menu" | "playing" | "over";
  phase: Phase;
  server: Side;
  score: { player: number; bot: number };
  rally: number;
  meter: number;
  banner: Banner | null;
  winner: Side | null;
  stats: MatchStats | null;
}

const INITIAL: Ui = {
  mode: "menu",
  phase: "serve",
  server: "player",
  score: { player: 0, bot: 0 },
  rally: 0,
  meter: 0,
  banner: null,
  winner: null,
  stats: null,
};

const DEMO: MatchConfig = { difficulty: "medium", target: 999, modifier: null, seed: 7 };

export function useMiniCourt(canvasRef: RefObject<HTMLCanvasElement | null>, hostRef: RefObject<HTMLDivElement | null>) {
  const game = useRef<MiniCourt | null>(null);
  const demo = useRef<MiniCourt | null>(null);
  const fx = useRef<Fx>(new Fx());
  const sfx = useRef<Sfx>(new Sfx());
  const input = useRef<Input>({ pointerX: null, axis: 0, swing: false });
  const keys = useRef<Set<string>>(new Set());
  const visible = useRef(true);
  const bannerId = useRef(0);
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ui, setUi] = useState<Ui>(INITIAL);

  const snapshot = useCallback((g: MiniCourt, mode: Ui["mode"], banner: Banner | null): Ui => ({
    mode,
    phase: g.phase,
    server: g.server,
    score: { ...g.score },
    rally: g.rally,
    meter: Math.round(g.meter),
    banner,
    winner: g.winner,
    stats: { ...g.stats },
  }), []);

  const showBanner = useCallback((text: string, tone: Banner["tone"]) => {
    bannerId.current += 1;
    const b: Banner = { id: bannerId.current, text, tone };
    if (bannerTimer.current) clearTimeout(bannerTimer.current);
    bannerTimer.current = setTimeout(() => setUi((u) => (u.banner?.id === b.id ? { ...u, banner: null } : u)), 1500);
    return b;
  }, []);

  /* ---------- main loop ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    fx.current.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    demo.current = new MiniCourt(DEMO);
    let scale = resizeCanvas(canvas);
    const ro = new ResizeObserver(() => {
      scale = resizeCanvas(canvas);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
    });
    io.observe(host);

    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let lastPhase: Phase = "serve";

    const handle = (g: MiniCourt, events: GameEvent[], playing: boolean) => {
      let dirty = false;
      let banner: Banner | null = null;
      const f = fx.current;
      const s = sfx.current;
      for (const e of events) {
        if (e.type === "hit") {
          const mine = e.by === "player";
          const big = e.shot === "smash" || e.shot === "power";
          f.burst(e.x, e.y, big ? COLORS.gold : mine ? COLORS.lime : COLORS.coral, big ? 20 : 9, big ? 230 : 140);
          if (big) f.kick(e.shot === "power" ? 9 : 5);
          if (playing) {
            if (mine && e.shot !== "serve") {
              if (e.shot === "power") f.text("POWER SMASH", e.x, e.y - 24, COLORS.gold);
              else if (e.shot === "smash") f.text("SMASH", e.x, e.y - 24, COLORS.gold);
              else if (e.quality === "perfect") f.text("PERFECT", e.x, e.y - 24, "#7DE3FF");
              else if (e.quality === "edge") f.text("late", e.x, e.y - 24, "rgba(255,255,255,0.6)");
            }
            s.play(e.shot === "power" ? "power" : big ? "smash" : mine && e.quality === "perfect" ? "perfect" : "hit");
            if ([10, 20, 30].includes(g.rally)) banner = showBanner(`${g.rally}-hit rally`, "great");
            dirty = true;
          }
        } else if (e.type === "net") {
          f.burst(e.x, e.y, "#FFFFFF", 8, 90);
          if (playing) s.play("net");
        } else if (e.type === "land") {
          f.burst(e.x, 312, "rgba(255,255,255,0.7)", 6, 70);
        } else if (e.type === "power" && playing) {
          s.play("ready");
          banner = showBanner("Power smash ready", "great");
          dirty = true;
        } else if (e.type === "point" && playing) {
          const mine = e.winner === "player";
          s.play(mine ? "point" : "lose");
          const why = e.reason === "out" ? "Out" : e.reason === "net" ? "Into the net" : e.reason === "short" ? "Too short" : "Winner";
          banner = showBanner(mine ? `Point you · ${why}` : `Point Robo-Pro · ${why}`, mine ? "good" : "bad");
          dirty = true;
        } else if (e.type === "over" && playing) {
          s.play(e.winner === "player" ? "win" : "lose");
          dirty = true;
        }
      }
      if (playing && (dirty || g.phase !== lastPhase)) {
        lastPhase = g.phase;
        const mode: Ui["mode"] = g.phase === "over" ? "over" : "playing";
        setUi((u) => snapshot(g, mode, banner ?? u.banner));
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible.current || document.hidden) return;

      const playing = game.current !== null;
      let g = game.current ?? demo.current;
      if (!g) return;
      if (!playing && g.phase === "over") g = demo.current = new MiniCourt({ ...DEMO, seed: (Math.random() * 1e9) >>> 0 });

      acc += dt;
      while (acc >= STEP) {
        const events = g.update(STEP, playing ? input.current : autopilot(g));
        if (playing) input.current.swing = false;
        handle(g, events, playing);
        acc -= STEP;
      }

      const f = fx.current;
      f.update(dt);
      if (g.shuttle.f) {
        f.trail.push({ x: g.shuttle.x, y: g.shuttle.y });
        if (f.trail.length > 12) f.trail.shift();
      } else f.trail.length = 0;
      drawScene(ctx, g, f, now / 1000, scale);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      if (bannerTimer.current) clearTimeout(bannerTimer.current);
    };
  }, [canvasRef, hostRef, showBanner, snapshot]);

  /* ---------- controls ---------- */
  const start = useCallback(
    (cfg: Omit<MatchConfig, "seed"> & { seed?: number }) => {
      sfx.current.unlock();
      const g = new MiniCourt({ ...cfg, seed: cfg.seed ?? (Math.random() * 1e9) >>> 0 });
      game.current = g;
      input.current = { pointerX: null, axis: 0, swing: false };
      keys.current.clear();
      fx.current.clear();
      setUi(snapshot(g, "playing", null));
      hostRef.current?.focus({ preventScroll: true });
    },
    [hostRef, snapshot],
  );

  const toMenu = useCallback(() => {
    game.current = null;
    fx.current.clear();
    setUi(INITIAL);
  }, []);

  const setSound = useCallback((on: boolean) => {
    sfx.current.enabled = on;
    if (on) {
      sfx.current.unlock();
      sfx.current.play("ready");
    }
  }, []);

  const worldX = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * W;
  };

  const syncAxis = () => {
    const k = keys.current;
    input.current.axis = (k.has("ArrowRight") || k.has("d") ? 1 : 0) - (k.has("ArrowLeft") || k.has("a") ? 1 : 0);
  };

  const handlers = {
    onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!game.current) return;
      input.current.pointerX = worldX(e);
    },
    onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => {
      if (!game.current) return;
      if (e.pointerType === "mouse") input.current.pointerX = worldX(e);
      input.current.swing = true;
    },
    onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => {
      if (!game.current) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (["ArrowLeft", "ArrowRight", "a", "d"].includes(k)) {
        e.preventDefault();
        keys.current.add(k);
        input.current.pointerX = null;
        syncAxis();
      } else if ([" ", "Enter", "ArrowUp", "w"].includes(k)) {
        e.preventDefault();
        if (!e.repeat) input.current.swing = true;
      }
    },
    onKeyUp: (e: KeyboardEvent<HTMLDivElement>) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      keys.current.delete(k);
      syncAxis();
    },
    onBlur: () => {
      keys.current.clear();
      input.current.axis = 0;
    },
  };

  return { ui, start, toMenu, setSound, handlers };
}
