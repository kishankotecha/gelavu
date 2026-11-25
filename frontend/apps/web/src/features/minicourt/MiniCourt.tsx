"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Award, Check, Flame, RotateCcw, Share2, Trophy, Volume2, VolumeX, Zap } from "lucide-react";
import { MODIFIERS } from "@/features/minicourt/engine";
import type { Difficulty, MatchConfig } from "@/features/minicourt/engine";
import { BADGES, dailyChallenge, dayKey, emptyStats, loadStats, recordMatch, saveStats } from "@/features/minicourt/storage";
import type { Stats } from "@/features/minicourt/storage";
import { useMiniCourt } from "@/features/minicourt/useMiniCourt";

type Plan = Omit<MatchConfig, "seed"> & { seed?: number; daily: boolean; label: string };

const LEVELS: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "easy", label: "Easy", blurb: "Warm up" },
  { id: "medium", label: "Medium", blurb: "Fair fight" },
  { id: "hard", label: "Hard", blurb: "Good luck" },
];

const TOAST: Record<string, string> = {
  good: "bg-lime text-ink",
  great: "bg-gold text-ink",
  bad: "bg-white/90 text-ink",
  info: "bg-white/90 text-ink",
};

function Chip({ icon, children, label }: { icon: ReactNode; children: ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold tabular-nums text-white/85" title={label} aria-label={`${label}: ${children}`}>
      {icon}
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 px-3 py-2.5 text-center">
      <dd className="text-lg font-extrabold tabular-nums">{value}</dd>
      <dt className="text-[11px] text-white/55">{label}</dt>
    </div>
  );
}

export function MiniCourt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const { ui, start, toMenu, setSound, handlers } = useMiniCourt(canvasRef, hostRef);

  const [stats, setStats] = useState<Stats>(emptyStats);
  const [today, setToday] = useState<string>("");
  const [soundOn, setSoundOn] = useState(false);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [recap, setRecap] = useState<{ fresh: string[]; newBest: boolean } | null>(null);
  const [shared, setShared] = useState(false);
  const recorded = useRef(false);

  /* sync stats on mount to eliminate SSR hydration mismatch */
  useEffect(() => {
    let active = true;
    const initialStats = loadStats();
    const initialToday = dayKey();
    queueMicrotask(() => {
      if (active) {
        setStats(initialStats);
        setToday(initialToday);
      }
    });
    const handleStorage = () => {
      setStats(loadStats());
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  /* save the result once per finished match */
  useEffect(() => {
    if (ui.mode !== "over") {
      recorded.current = false;
      return;
    }
    if (recorded.current || !plan || !ui.stats) return;
    recorded.current = true;
    const { next, fresh, newBestRally } = recordMatch(
      stats,
      { won: ui.winner === "player", score: ui.score, difficulty: plan.difficulty, daily: plan.daily, stats: ui.stats },
      today,
    );
    saveStats(next);
    setStats(next);
    setRecap({ fresh, newBest: newBestRally });
  }, [ui.mode, ui.winner, ui.score, ui.stats, plan, stats, today]);

  const daily = today ? dailyChallenge(today, MODIFIERS) : null;
  const dailyDone = stats.daily.last === today;
  const playing = ui.mode === "playing";

  const begin = (p: Plan) => {
    setPlan(p);
    setRecap(null);
    setShared(false);
    start({ difficulty: p.difficulty, target: p.target, modifier: p.modifier, seed: p.seed });
  };
  const playLevel = (d: Difficulty) => begin({ difficulty: d, target: 7, modifier: null, daily: false, label: LEVELS.find((l) => l.id === d)?.label ?? d });
  const playDaily = () => {
    if (!daily) return;
    begin({ difficulty: "medium", target: 7, modifier: daily.modifier, seed: daily.seed, daily: true, label: `Daily · ${daily.modifier.name}` });
  };
  const toggleSound = () => {
    const on = !soundOn;
    setSoundOn(on);
    setSound(on);
  };

  const share = async () => {
    if (!plan || !ui.stats) return;
    const text = `${ui.winner === "player" ? "I beat" : "I lost to"} Robo-Pro ${ui.score.player}-${ui.score.bot} (${plan.label}) on Gelavu Mini Court. Longest rally: ${ui.stats.longestRally}. Can you beat that?`;
    const url = window.location.origin;
    try {
      if (navigator.share) await navigator.share({ title: "Gelavu Mini Court", text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      /* the share sheet was closed */
    }
  };

  const panel =
    ui.mode === "menu" ? (
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-ink/95 p-4 shadow-lift backdrop-blur sm:p-6">
        <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">Beat Robo-Pro. First to 7.</h3>
        <p className="mt-1 text-sm text-white/60">Time your swing for perfect shots, fill the power meter, then smash it past him.</p>

        {daily && (
          <button
            type="button"
            onClick={playDaily}
            className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-[#91B979]/40 bg-[#91B979]/10 p-3 text-left transition hover:bg-[#91B979]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#91B979]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#91B979] text-[#0A0D14]">
              <Zap className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold">Daily challenge · {daily.modifier.name}</span>
              <span className="block truncate text-xs text-white/60">{daily.modifier.blurb}. Same for everyone today.</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-[#91B979]">
              <Flame className="h-4 w-4" aria-hidden="true" />
              {stats.daily.streak}
              {dailyDone && <Check className="h-4 w-4" aria-label="Played today" />}
            </span>
          </button>
        )}

        <div className="mt-3 grid grid-cols-3 gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => playLevel(l.id)}
              className="rounded-xl border border-white/15 px-3 py-3 text-center transition hover:border-[#DE9D35]/60 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9D35]"
            >
              <span className="block text-sm font-extrabold">{l.label}</span>
              <span className="block text-[11px] text-white/55">{l.blurb}</span>
            </button>
          ))}
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-2">
          <Stat value={stats.bestRally} label="Best rally" />
          <Stat value={stats.wins} label="Wins" />
          <Stat value={stats.winStreak} label="Win streak" />
        </dl>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Badges">
          {BADGES.map((b) => {
            const got = stats.badges.includes(b.id);
            return (
              <li
                key={b.id}
                title={got ? b.label : `Locked: ${b.hint}`}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${got ? "bg-[#F3D15A]/15 text-[#F3D15A]" : "bg-white/5 text-white/35"}`}
              >
                <Award className="h-3 w-3" aria-hidden="true" />
                {b.label}
                <span className="sr-only">{got ? "(earned)" : `(locked: ${b.hint})`}</span>
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-xs text-white/45">Move: mouse, finger drag or arrow keys. Swing: click, tap or Space. Late swings are weak, so watch the shuttle.</p>
      </div>
    ) : ui.mode === "over" ? (
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-ink/95 p-5 text-center shadow-lift backdrop-blur sm:p-6">
        <h3 className="text-2xl font-extrabold tracking-tight">{ui.winner === "player" ? "You won!" : "Robo-Pro wins this one"}</h3>
        <p className="mt-1 text-sm text-white/60">
          {ui.score.player} – {ui.score.bot} · {plan?.label}
        </p>
        <dl className="mt-4 grid grid-cols-3 gap-2">
          <Stat value={ui.stats?.longestRally ?? 0} label="Longest rally" />
          <Stat value={ui.stats?.smashes ?? 0} label="Smashes" />
          <Stat value={ui.stats?.perfects ?? 0} label="Perfect hits" />
        </dl>
        {recap?.newBest && <p className="mt-3 text-sm font-bold text-[#F3D15A]">New personal best rally</p>}
        {recap && recap.fresh.length > 0 && (
          <ul className="mt-3 flex flex-wrap justify-center gap-1.5" aria-label="New badges">
            {recap.fresh.map((id) => (
              <li key={id} className="flex items-center gap-1 rounded-full bg-[#F3D15A]/15 px-2.5 py-1 text-xs font-bold text-[#F3D15A]">
                <Award className="h-3 w-3" aria-hidden="true" />
                Unlocked: {BADGES.find((b) => b.id === id)?.label}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => plan && begin(plan)}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-[#DE9D35] px-5 text-sm font-extrabold text-[#0A0D14] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE9D35]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" /> {ui.winner === "player" ? "Play again" : "Rematch"}
          </button>
          <button type="button" onClick={share} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold transition hover:bg-white/10">
            {shared ? <Check className="h-4 w-4" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
            {shared ? "Copied" : "Share result"}
          </button>
          <button type="button" onClick={toMenu} className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white/70 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Menu
          </button>
        </div>
        <Link href="/tournaments" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#DE9D35] hover:text-[#F3D15A] underline-offset-4 hover:underline">
          Ready for real courts? Find tournaments near you <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    ) : null;

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink text-white shadow-lift">
        {/* HUD */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-lime" aria-hidden="true" />
            <h2 className="truncate text-sm font-extrabold tracking-tight">Gelavu Mini Court</h2>
            {playing && plan && <span className="hidden truncate text-xs text-white/55 sm:inline">· {plan.label} · first to {plan.target}</span>}
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-1.5 text-sm font-extrabold tabular-nums">
            <span className="text-lime">You {ui.score.player}</span>
            <span className="text-white/30" aria-hidden="true">:</span>
            <span className="text-[#FF8A7E]">{ui.score.bot} Robo-Pro</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Chip icon={<Flame className="h-3.5 w-3.5 text-lime" aria-hidden="true" />} label="Current rally">{ui.rally}</Chip>
            <Chip icon={<Trophy className="h-3.5 w-3.5 text-gold" aria-hidden="true" />} label="Best rally">{stats.bestRally}</Chip>
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Mute sound" : "Turn sound on"}
              className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              {soundOn ? <Volume2 className="h-4 w-4 text-lime" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
            </button>
            {playing && (
              <button type="button" onClick={toMenu} aria-label="Quit to menu" className="grid h-8 w-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Arena */}
        <div className="relative">
          <div
            ref={hostRef}
            tabIndex={0}
            role="application"
            aria-label="Badminton game. Move with the mouse, a finger drag or the arrow keys. Swing with a click, a tap or the space bar."
            {...handlers}
            className="relative aspect-[20/9] w-full cursor-crosshair touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime/70"
          >
            <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />

            {ui.banner && (
              <div key={ui.banner.id} className="pointer-events-none absolute inset-x-0 top-3 flex justify-center">
                <span className={`animate-fade-up rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider shadow-lift ${TOAST[ui.banner.tone]}`}>{ui.banner.text}</span>
              </div>
            )}

            {playing && ui.phase === "serve" && (
              <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
                <span className="rounded-full bg-black/55 px-4 py-1.5 text-xs font-bold backdrop-blur">
                  {ui.server === "player" ? "Tap or press Space to serve" : "Robo-Pro is serving"}
                </span>
              </div>
            )}
          </div>

          {/* Menu and result: overlay on large screens, stacked below on phones */}
          {panel && <div className="p-3 md:absolute md:inset-0 md:grid md:place-items-center md:bg-ink/70 md:p-5 md:backdrop-blur-[2px]">{panel}</div>}
        </div>

        {/* Power meter */}
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2.5 sm:px-5">
          <span className={`flex items-center gap-1.5 text-xs font-bold ${ui.meter >= 100 ? "text-gold" : "text-white/60"}`}>
            <Zap className="h-3.5 w-3.5" aria-hidden="true" /> {ui.meter >= 100 ? "Power smash ready" : "Power"}
          </span>
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-label="Power meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={ui.meter}
          >
            <div className={`h-full rounded-full transition-[width] duration-200 ${ui.meter >= 100 ? "animate-pulse bg-gold" : "bg-lime"}`} style={{ width: `${ui.meter}%` }} />
          </div>
          <span className="hidden text-[11px] text-white/45 sm:inline">Perfect hits fill it faster</span>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {playing ? `You ${ui.score.player}, Robo-Pro ${ui.score.bot}` : ""}
      </p>
    </div>
  );
}
