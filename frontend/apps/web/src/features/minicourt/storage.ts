import type { Difficulty, MatchStats, Modifier } from "./engine";

const KEY = "gelavu:minicourt:v2";

export interface BadgeDef {
  id: string;
  label: string;
  hint: string;
}

export const BADGES: BadgeDef[] = [
  { id: "first-win", label: "First win", hint: "Win a match" },
  { id: "rally-10", label: "Rally 10", hint: "Reach a 10-hit rally" },
  { id: "rally-25", label: "Rally 25", hint: "Reach a 25-hit rally" },
  { id: "smasher", label: "Smash king", hint: "Land 5 smashes in one match" },
  { id: "perfect-8", label: "Perfect timing", hint: "Hit 8 perfect shots in one match" },
  { id: "shutout", label: "Shutout", hint: "Win without conceding a point" },
  { id: "hard-win", label: "Hard mode", hint: "Beat Hard" },
  { id: "daily-3", label: "3-day streak", hint: "Play the daily challenge 3 days in a row" },
];

export interface Stats {
  played: number;
  wins: number;
  winStreak: number;
  bestStreak: number;
  bestRally: number;
  badges: string[];
  daily: { last: string | null; streak: number; wonOn: string | null };
}

export const emptyStats: Stats = {
  played: 0,
  wins: 0,
  winStreak: 0,
  bestStreak: 0,
  bestRally: 0,
  badges: [],
  daily: { last: null, streak: 0, wonOn: null },
};

export function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyStats;
    const p = JSON.parse(raw) as Partial<Stats>;
    return { ...emptyStats, ...p, badges: Array.isArray(p.badges) ? p.badges : [], daily: { ...emptyStats.daily, ...p.daily } };
  } catch {
    return emptyStats;
  }
}

export function saveStats(s: Stats) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable: progress simply is not saved */
  }
}

const pad = (n: number) => String(n).padStart(2, "0");
export const dayKey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const yesterdayOf = (key: string) => {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d - 1));
};

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/* Same challenge for everyone on a given day, so people can compare results */
export function dailyChallenge(key: string, modifiers: Modifier[]) {
  const h = hash(key);
  const base = modifiers[h % modifiers.length];
  const modifier = base.wind ? { ...base, wind: (h & 1 ? 1 : -1) * base.wind } : base;
  return { modifier, seed: h };
}

export interface MatchResult {
  won: boolean;
  score: { player: number; bot: number };
  difficulty: Difficulty;
  daily: boolean;
  stats: MatchStats;
}

export function recordMatch(prev: Stats, r: MatchResult, today: string) {
  const next: Stats = { ...prev, daily: { ...prev.daily }, badges: [...prev.badges] };
  next.played += 1;
  if (r.won) {
    next.wins += 1;
    next.winStreak += 1;
    next.bestStreak = Math.max(next.bestStreak, next.winStreak);
  } else next.winStreak = 0;
  next.bestRally = Math.max(next.bestRally, r.stats.longestRally);

  if (r.daily) {
    if (next.daily.last !== today) {
      next.daily.streak = next.daily.last === yesterdayOf(today) ? next.daily.streak + 1 : 1;
      next.daily.last = today;
    }
    if (r.won) next.daily.wonOn = today;
  }

  const fresh: string[] = [];
  const earn = (id: string, ok: boolean) => {
    if (ok && !next.badges.includes(id)) {
      next.badges.push(id);
      fresh.push(id);
    }
  };
  earn("first-win", r.won);
  earn("rally-10", r.stats.longestRally >= 10);
  earn("rally-25", r.stats.longestRally >= 25);
  earn("smasher", r.stats.smashes >= 5);
  earn("perfect-8", r.stats.perfects >= 8);
  earn("shutout", r.won && r.score.bot === 0);
  earn("hard-win", r.won && r.difficulty === "hard");
  earn("daily-3", next.daily.streak >= 3);
  return { next, fresh, newBestRally: r.stats.longestRally > prev.bestRally && r.stats.longestRally >= 5 };
}
