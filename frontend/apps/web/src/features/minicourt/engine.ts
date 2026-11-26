/* Gelavu Mini Court: pure game logic. No DOM, no React, so it is fast, deterministic and testable. */

export const W = 800;
export const H = 360;
export const FLOOR = 318;
export const NET_X = W / 2;
export const COURT_L = 40;
export const COURT_R = 760;
const LAND_Y = FLOOR - 6;
const REACH = 54;
export const SWING_DUR = 0.28;
const POINT_PAUSE = 1.2;
const BASE_G = 1000;

export type Side = "player" | "bot";
export type Difficulty = "easy" | "medium" | "hard";
export type Quality = "perfect" | "good" | "edge";
export type Shot = "serve" | "smash" | "power" | "drive" | "clear" | "drop" | "lift";
export type Phase = "serve" | "rally" | "point" | "over";
export type PointReason = "winner" | "out" | "net" | "short";

export interface Modifier {
  id: string;
  name: string;
  blurb: string;
  gravity: number;
  wind: number;
  netHeight: number;
  speed: number;
}

export interface MatchConfig {
  difficulty: Difficulty;
  target: number;
  modifier: Modifier | null;
  seed: number;
}

export interface Input {
  pointerX: number | null;
  axis: number;
  swing: boolean;
}

export type GameEvent =
  | { type: "hit"; by: Side; shot: Shot; quality: Quality; x: number; y: number }
  | { type: "net"; x: number; y: number }
  | { type: "land"; x: number }
  | { type: "point"; winner: Side; reason: PointReason }
  | { type: "power" }
  | { type: "over"; winner: Side };

export interface Athlete {
  side: Side;
  dir: 1 | -1;
  x: number;
  swing: number;
  cd: number;
  hit: boolean;
  jumpMax: number;
  run: number;
  moving: number;
}

export interface Flight {
  x0: number;
  y0: number;
  vx: number;
  vy: number;
  ax: number;
  g: number;
  t0: number;
  fault: boolean;
}

export interface Shuttle {
  x: number;
  y: number;
  angle: number;
  held: Side | null;
  f: Flight | null;
  lastHitter: Side | null;
}

export interface MatchStats {
  longestRally: number;
  smashes: number;
  perfects: number;
  powerSmashes: number;
}

const BOT = {
  easy: { speed: 220, reaction: 0.32, noise: 36, smash: 0.18, sigma: 48 },
  medium: { speed: 310, reaction: 0.18, noise: 18, smash: 0.42, sigma: 26 },
  hard: { speed: 400, reaction: 0.08, noise: 7, smash: 0.65, sigma: 12 },
} as const;

const SHOT_TIME: Record<Shot, number> = { serve: 0.95, smash: 0.44, power: 0.3, drive: 0.56, clear: 1.0, drop: 0.78, lift: 1.08 };
const SHOT_DEPTH: Record<Shot, [number, number]> = {
  serve: [190, 300],
  smash: [130, 340],
  power: [160, 330],
  drive: [150, 260],
  clear: [290, 345],
  drop: [55, 120],
  lift: [290, 345],
};

export const MODIFIERS: Modifier[] = [
  { id: "windy", name: "Windy day", blurb: "A crosswind pushes the shuttle around", gravity: 1, wind: 150, netHeight: 74, speed: 1 },
  { id: "rocket", name: "Rocket rally", blurb: "Everything is 25% faster", gravity: 1, wind: 0, netHeight: 74, speed: 1.25 },
  { id: "moon", name: "Moon court", blurb: "Low gravity, floaty rallies", gravity: 0.7, wind: 0, netHeight: 74, speed: 1 },
  { id: "tall", name: "Tall net", blurb: "The net is higher, so lift it over", gravity: 1, wind: 0, netHeight: 100, speed: 1 },
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export class MiniCourt {
  cfg: MatchConfig;
  now = 0;
  phase: Phase = "serve";
  server: Side = "player";
  score = { player: 0, bot: 0 };
  rally = 0;
  meter = 0;
  timer = 0;
  winner: Side | null = null;
  stats: MatchStats = { longestRally: 0, smashes: 0, perfects: 0, powerSmashes: 0 };
  player: Athlete = { side: "player", dir: 1, x: 150, swing: -1, cd: 0, hit: false, jumpMax: 0, run: 0, moving: 0 };
  bot: Athlete = { side: "bot", dir: -1, x: 650, swing: -1, cd: 0, hit: false, jumpMax: 0, run: 0, moving: 0 };
  shuttle: Shuttle = { x: 0, y: 0, angle: 0, held: "player", f: null, lastHitter: null };
  readonly g: number;
  readonly ax: number;
  readonly netTop: number;
  readonly speed: number;
  private rng: () => number;
  private aiSeen = -1;
  private aiReactAt = 0;
  private aiNoise = 0;
  private prevX = 0;

  constructor(cfg: MatchConfig) {
    this.cfg = cfg;
    this.rng = mulberry32(cfg.seed);
    const m = cfg.modifier;
    this.g = BASE_G * (m?.gravity ?? 1);
    this.ax = m?.wind ?? 0;
    this.netTop = FLOOR - (m?.netHeight ?? 74);
    this.speed = m?.speed ?? 1;
    this.beginServe("player");
  }

  /* ---------- helpers ---------- */
  private gauss() {
    const u = Math.max(this.rng(), 1e-9);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * this.rng());
  }
  private other(s: Side): Athlete {
    return s === "player" ? this.bot : this.player;
  }
  private athlete(s: Side): Athlete {
    return s === "player" ? this.player : this.bot;
  }
  racket(a: Athlete) {
    const p = a.swing >= 0 ? Math.min(a.swing / SWING_DUR, 1) : 0;
    const lift = a.swing >= 0 ? a.jumpMax * Math.sin(Math.PI * p) : 0;
    return { x: a.x + a.dir * 28, y: FLOOR - 66 - lift, lift };
  }
  private at(f: Flight, t: number) {
    return { x: f.x0 + f.vx * t + 0.5 * f.ax * t * t, y: f.y0 + f.vy * t + 0.5 * f.g * t * t };
  }
  private landTime(f: Flight) {
    const disc = f.vy * f.vy - 2 * f.g * (f.y0 - LAND_Y);
    return (-f.vy + Math.sqrt(Math.max(disc, 0))) / f.g;
  }
  /* where the shuttle will be when it drops through hitting height (used by the AI and by test bots) */
  interceptX(): number {
    const f = this.shuttle.f;
    if (!f) return this.shuttle.x;
    let t = this.landTime(f);
    const disc = f.vy * f.vy - 2 * f.g * (f.y0 - (FLOOR - 120));
    if (disc >= 0) {
      const tt = (-f.vy + Math.sqrt(disc)) / f.g;
      if (tt > 0 && tt < t) t = tt;
    }
    return this.at(f, t).x;
  }
  heightAfter(sec: number) {
    const f = this.shuttle.f;
    if (!f) return 0;
    return FLOOR - this.at(f, this.now - f.t0 + sec).y;
  }

  /* ---------- flow ---------- */
  beginServe(side: Side) {
    this.phase = "serve";
    this.server = side;
    this.timer = 0;
    this.rally = 0;
    this.shuttle.f = null;
    this.shuttle.held = side;
    this.shuttle.lastHitter = null;
    this.player.swing = -1;
    this.bot.swing = -1;
  }

  update(dt: number, input: Input): GameEvent[] {
    const ev: GameEvent[] = [];
    this.now += dt;
    this.timer += dt;
    if (this.phase === "over") return ev;

    this.movePlayer(dt, input);
    if (input.swing) this.startSwing(this.player);
    this.ai(dt);

    for (const a of [this.player, this.bot]) {
      if (a.swing >= 0) {
        a.swing += dt;
        if (a.swing >= SWING_DUR) {
          a.swing = -1;
          a.cd = 0.1;
        }
      } else a.cd = Math.max(0, a.cd - dt);
    }

    if (this.phase === "serve") {
      const s = this.athlete(this.server);
      const r = this.racket(s);
      this.shuttle.x = r.x;
      this.shuttle.y = FLOOR - 72;
      this.shuttle.angle = Math.PI / 2;
      const wait = this.server === "player" ? 7 : 0.9;
      if (this.timer > wait || (this.server === "player" && s.swing >= 0.06)) this.serve(s, ev);
    } else if (this.phase === "rally") {
      this.tryHit(this.player, ev);
      this.tryHit(this.bot, ev);
      this.flyShuttle(ev);
    } else if (this.phase === "point" && this.timer > POINT_PAUSE) {
      if (this.score.player >= this.cfg.target || this.score.bot >= this.cfg.target) {
        this.phase = "over";
        this.winner = this.score.player > this.score.bot ? "player" : "bot";
        ev.push({ type: "over", winner: this.winner });
      } else this.beginServe(this.server);
    }
    return ev;
  }

  private movePlayer(dt: number, input: Input) {
    const p = this.player;
    const before = p.x;
    if (input.axis !== 0) p.x += input.axis * 430 * dt;
    else if (input.pointerX !== null) {
      const d = clamp(input.pointerX, 50, 368) - p.x;
      p.x += clamp(d, -560 * dt, 560 * dt);
    }
    p.x = clamp(p.x, 50, 368);
    p.moving = Math.abs(p.x - before);
    p.run += p.moving * 0.06;
  }

  private startSwing(a: Athlete) {
    if (a.swing >= 0 || a.cd > 0 || this.phase === "point" || this.phase === "over") return;
    a.swing = 0;
    a.hit = false;
    const h = this.phase === "rally" ? this.heightAfter(0.12) : 0;
    a.jumpMax = h > 85 ? 75 : 0;
  }

  /* ---------- AI ---------- */
  private ai(dt: number) {
    const b = this.bot;
    const sh = this.shuttle;
    const P = BOT[this.cfg.difficulty];
    const sp = P.speed * (this.speed > 1 ? 1.12 : 1);
    let want = 620;
    const incoming = this.phase === "rally" && sh.f && sh.lastHitter === "player";
    if (incoming && sh.f) {
      if (sh.f.t0 !== this.aiSeen) {
        this.aiSeen = sh.f.t0;
        this.aiReactAt = this.now + P.reaction;
        this.aiNoise = this.gauss() * P.noise;
      }
      if (this.now >= this.aiReactAt) want = this.interceptX() + 28 + this.aiNoise;
      else want = b.x;
    }
    want = clamp(want, 432, 768);
    const d = want - b.x;
    const step = clamp(d, -sp * dt, sp * dt);
    b.x += step;
    b.moving = Math.abs(step);
    b.run += b.moving * 0.06;
    if (incoming && this.now >= this.aiReactAt && b.swing < 0 && b.cd <= 0) {
      const c = this.racket(b);
      if (Math.hypot(sh.x - c.x, sh.y - c.y) < 92 && sh.x > NET_X - 10) this.startSwing(b);
    }
  }

  /* ---------- hitting ---------- */
  private serve(a: Athlete, ev: GameEvent[]) {
    if (a.swing < 0) {
      a.swing = 0;
      a.hit = true;
    }
    this.shuttle.held = null;
    this.phase = "rally";
    this.rally = 0;
    this.strike(a, "good", ev, "serve");
  }

  private tryHit(a: Athlete, ev: GameEvent[]) {
    const sh = this.shuttle;
    if (a.swing < 0 || a.hit || !sh.f || sh.lastHitter === a.side) return;
    const p = a.swing / SWING_DUR;
    if (p < 0.15 || p > 0.95) return;
    if (a.side === "player" ? sh.x > NET_X + 30 : sh.x < NET_X - 30) return;
    const c = this.racket(a);
    const d = Math.hypot(sh.x - c.x, sh.y - c.y);
    if (d > REACH) return;
    a.hit = true;
    const q: Quality = d < 22 && Math.abs(p - 0.55) < 0.22 ? "perfect" : d < 40 ? "good" : "edge";
    this.strike(a, q, ev);
  }

  private strike(a: Athlete, q: Quality, ev: GameEvent[], forced?: Shot) {
    const sh = this.shuttle;
    const isPlayer = a.side === "player";
    const opp = this.other(a.side);
    const r = this.racket(a);
    const x0 = forced ? r.x : sh.x;
    const y0 = forced ? FLOOR - 72 : sh.y;
    const h = FLOOR - y0;

    let shot: Shot;
    if (forced) shot = forced;
    else if (isPlayer && this.meter >= 100 && h >= 55) shot = "power";
    else if (h >= 98) shot = !isPlayer && this.rng() > BOT[this.cfg.difficulty].smash ? "drive" : "smash";
    else if (h <= 70) shot = Math.abs(x0 - NET_X) < 170 ? "drop" : "lift";
    else shot = Math.abs(x0 - NET_X) > 210 ? "clear" : "drive";

    /* aim: perfect timing places the shot away from the opponent */
    const [lo, hi] = SHOT_DEPTH[shot];
    const oppDepth = Math.abs(opp.x - NET_X);
    let depth = lo + this.rng() * (hi - lo);
    if (q === "perfect" && (shot === "smash" || shot === "drive" || shot === "power")) {
      depth = Math.abs(lo - oppDepth) > Math.abs(hi - oppDepth) ? lo + 8 : hi - 8;
    }
    const sigma = isPlayer
      ? { perfect: 5, good: 14, edge: 55 }[q]
      : BOT[this.cfg.difficulty].sigma * { perfect: 0.5, good: 1, edge: 2.2 }[q];
    /* fatigue: long rallies get sloppier on both sides, so every rally ends eventually */
    depth += this.gauss() * (sigma + Math.max(0, this.rally - 16) * 3.5);
    const tx = NET_X + a.dir * depth;

    let T = SHOT_TIME[shot] / this.speed;
    if (q === "edge") T *= 1.15;
    let plan = this.plan(x0, y0, tx, T, SHOT_TIME[shot] * 1.7);
    if (!plan && shot !== "serve") {
      /* too close to the net for that shot: fall back to a soft net drop instead of a cheap fault */
      plan = this.plan(x0, y0, NET_X + a.dir * (70 + this.rng() * 40), 0.7 / this.speed, 1.6);
      if (plan) shot = "drop";
    }

    let f: Flight;
    if (plan) {
      f = { x0, y0, vx: plan.vx, vy: plan.vy, ax: this.ax, g: this.g, t0: this.now, fault: false };
    } else {
      const fx = NET_X - a.dir * 12;
      const t = 0.45;
      f = {
        x0, y0, ax: this.ax, g: this.g, t0: this.now, fault: true,
        vx: (fx - x0 - 0.5 * this.ax * t * t) / t,
        vy: (LAND_Y - y0 - 0.5 * this.g * t * t) / t,
      };
    }
    sh.f = f;
    sh.lastHitter = a.side;
    sh.held = null;
    sh.x = x0;
    sh.y = y0;
    this.prevX = x0;
    this.rally += 1;
    this.stats.longestRally = Math.max(this.stats.longestRally, this.rally);

    if (isPlayer && !forced) {
      if (q === "perfect") this.stats.perfects += 1;
      if (shot === "smash" || shot === "power") this.stats.smashes += 1;
      if (shot === "power") {
        this.stats.powerSmashes += 1;
        this.meter = 0;
      } else {
        const before = this.meter;
        this.meter = Math.min(100, this.meter + { perfect: 34, good: 22, edge: 8 }[q]);
        if (before < 100 && this.meter >= 100) ev.push({ type: "power" });
      }
    }
    ev.push({ type: "hit", by: a.side, shot, quality: q, x: x0, y: y0 });
  }

  /* ballistic plan to a landing point, raising the arc until it clears the net */
  private plan(x0: number, y0: number, tx: number, T: number, maxT: number) {
    for (let t = T; t <= maxT; t += 0.04) {
      const vx = (tx - x0 - 0.5 * this.ax * t * t) / t;
      const vy = (LAND_Y - y0 - 0.5 * this.g * t * t) / t;
      const dx = NET_X - x0;
      if (dx * (tx - NET_X) <= 0) return { vx, vy };
      const s = dx / vx;
      if (s > 0 && s < t) {
        const yy = y0 + vy * s + 0.5 * this.g * s * s;
        if (yy < this.netTop - 14) return { vx, vy };
      } else return { vx, vy };
    }
    return null;
  }

  private flyShuttle(ev: GameEvent[]) {
    const sh = this.shuttle;
    const f = sh.f;
    if (!f) return;
    const t = this.now - f.t0;
    const nx = f.x0 + f.vx * t + 0.5 * f.ax * t * t;
    const ny = f.y0 + f.vy * t + 0.5 * f.g * t * t;
    sh.angle = Math.atan2(f.vy + f.g * t, f.vx + f.ax * t);

    if (!f.fault && (this.prevX - NET_X) * (nx - NET_X) < 0 && ny > this.netTop && ny < FLOOR) {
      const back = this.prevX < NET_X ? -1 : 1;
      sh.f = { x0: nx, y0: ny, vx: back * 40, vy: 0, ax: 0, g: this.g, t0: this.now, fault: true };
      sh.x = nx;
      sh.y = ny;
      this.prevX = nx;
      ev.push({ type: "net", x: nx, y: ny });
      return;
    }
    this.prevX = nx;
    sh.x = nx;
    sh.y = Math.min(ny, LAND_Y);

    if (ny >= LAND_Y) {
      const lx = nx;
      const hitter = sh.lastHitter as Side;
      sh.f = null;
      ev.push({ type: "land", x: lx });
      const hitterIsPlayer = hitter === "player";
      const landedPlayerSide = lx < NET_X;
      let winner: Side;
      let reason: PointReason;
      if (lx < COURT_L || lx > COURT_R) {
        winner = hitterIsPlayer ? "bot" : "player";
        reason = "out";
      } else if (landedPlayerSide === hitterIsPlayer) {
        winner = hitterIsPlayer ? "bot" : "player";
        reason = f.fault ? "net" : "short";
      } else {
        winner = hitter;
        reason = "winner";
      }
      this.score[winner] += 1;
      this.phase = "point";
      this.timer = 0;
      this.server = winner;
      if (winner === "bot") this.meter = Math.max(0, this.meter - 25);
      ev.push({ type: "point", winner, reason });
    }
  }
}

/* Simple autopilot: drives the left player. Used by the attract-mode demo behind the menu. */
export function autopilot(m: MiniCourt, skill = 0.6): Input {
  const input: Input = { pointerX: null, axis: 0, swing: false };
  const sh = m.shuttle;
  if (m.phase === "serve" && m.server === "player" && m.timer > 0.8) input.swing = true;
  if (m.phase === "rally" && sh.f && sh.lastHitter === "bot") {
    const wobble = Math.sin(sh.f.t0 * 12.9898) * (40 / skill);
    input.pointerX = m.interceptX() - 28 + wobble;
    const c = m.racket(m.player);
    if (Math.hypot(sh.x - c.x, sh.y - c.y) < 88) input.swing = true;
  } else if (m.phase !== "rally") input.pointerX = 190;
  return input;
}
