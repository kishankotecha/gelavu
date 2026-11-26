"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  RotateCcw,
  Share2,
  Trophy,
  Volume2,
  VolumeX,
  Zap,
  Play,
  ShieldCheck,
} from "lucide-react";
import {
  RealisticTrophy,
  RealisticShuttlecock,
} from "@/components/common/RealisticSportsIcons";
import { MODIFIERS } from "@/features/minicourt/engine";
import type { Difficulty, MatchConfig } from "@/features/minicourt/engine";
import {
  dailyChallenge,
  dayKey,
  emptyStats,
  loadStats,
  recordMatch,
  saveStats,
} from "@/features/minicourt/storage";
import type { Stats } from "@/features/minicourt/storage";
import { useMiniCourt } from "@/features/minicourt/useMiniCourt";

type Plan = Omit<MatchConfig, "seed"> & { seed?: number; daily: boolean; label: string };

const LEVELS: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "easy", label: "Easy", blurb: "Warm up" },
  { id: "medium", label: "Medium", blurb: "Fair fight" },
  { id: "hard", label: "Hard", blurb: "Good luck" },
];

const TOAST: Record<string, string> = {
  good: "bg-emerald-500 text-[#0A0D14]",
  great: "bg-[#F3D15A] text-[#0A0D14]",
  bad: "bg-rose-500 text-white",
  info: "bg-white/90 text-[#0A0D14]",
};

function Chip({ icon, children, label }: { icon: ReactNode; children: ReactNode; label: string }) {
  return (
    <span
      className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold tabular-nums text-white/85"
      title={label}
      aria-label={`${label}: ${children}`}
    >
      {icon}
      {children}
    </span>
  );
}

function StatItem({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-2.5 text-center">
      <dd className="text-base sm:text-lg font-black tabular-nums text-white">{value}</dd>
      <dt className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</dt>
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

  // Challenge setup states (integrated inside the UI, no popup!)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>("medium");
  const [isDailySelected, setIsDailySelected] = useState<boolean>(false);

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
      {
        won: ui.winner === "player",
        score: ui.score,
        difficulty: plan.difficulty,
        daily: plan.daily,
        stats: ui.stats,
      },
      today,
    );
    saveStats(next);
    setStats(next);
    setRecap({ fresh, newBest: newBestRally });
  }, [ui.mode, ui.winner, ui.score, ui.stats, plan, stats, today]);

  const daily = today ? dailyChallenge(today, MODIFIERS) : null;
  const dailyDone = stats.daily.last === today;
  const playing = ui.mode === "playing";
  const isOver = ui.mode === "over";

  const begin = (p: Plan) => {
    setPlan(p);
    setRecap(null);
    setShared(false);
    start({ difficulty: p.difficulty, target: p.target, modifier: p.modifier, seed: p.seed });
  };

  const playLevel = (d: Difficulty) =>
    begin({
      difficulty: d,
      target: 7,
      modifier: null,
      daily: false,
      label: LEVELS.find((l) => l.id === d)?.label ?? d,
    });

  const playDaily = () => {
    if (!daily) return;
    begin({
      difficulty: "medium",
      target: 7,
      modifier: daily.modifier,
      seed: daily.seed,
      daily: true,
      label: `Daily · ${daily.modifier.name}`,
    });
  };

  const handleStartMatch = () => {
    if (isDailySelected && daily) {
      playDaily();
    } else {
      playLevel(selectedDifficulty);
    }
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

  return (
    <div className="w-full">
      {/* 2-Column Responsive Layout: Left = Info & Challenge Console, Right = Court Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Info, Challenge Setup Console & Stats          */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Eyebrow & Headline */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#91B979]/30 bg-[#91B979]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#91B979]">
              <Zap className="h-3.5 w-3.5 text-[#91B979]" />
              <span>Interactive Court Simulator</span>
            </div>

            <h2 className="font-rogenz text-3xl sm:text-4xl xl:text-5xl font-bold text-white tracking-wide leading-[1.1]">
              Test your reflexes. <br />
              <span className="text-[#DE9D35]">Beat Robo-Pro.</span>
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Experience realistic court aerodynamics, time your overhead swings, and unleash power smashes before stepping onto real courts.
            </p>
          </div>

          {/* Integrated Match & Challenge Setup Console (NO POPUP!) */}
          <div className="rounded-2xl border border-[#313747]/80 bg-[#121622] p-4 sm:p-5 shadow-2xl space-y-4">
            
            {/* Daily Challenge Card (Directly embedded in UI) */}
            {daily && (
              <div
                onClick={() => {
                  if (playing) return;
                  setIsDailySelected((prev) => !prev);
                }}
                className={`relative rounded-xl border p-3 transition-all cursor-pointer ${
                  isDailySelected
                    ? "border-[#91B979] bg-[#91B979]/15 shadow-[0_0_15px_rgba(145,185,121,0.2)]"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg text-sm font-black ${
                        isDailySelected
                          ? "bg-[#91B979] text-[#0A0D14]"
                          : "bg-white/10 text-[#91B979]"
                      }`}
                    >
                      <Zap className="h-4 w-4" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white">
                          Daily Challenge: {daily.modifier.name}
                        </span>
                        {dailyDone && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#91B979]">
                            <Check className="h-3 w-3" /> Done
                          </span>
                        )}
                      </div>
                      <span className="block text-[11px] text-gray-400">
                        {daily.modifier.blurb}. Same for everyone today.
                      </span>
                    </div>
                  </div>

                  <span
                    className={`flex items-center gap-1 text-xs font-black px-2 py-0.5 rounded-full ${
                      isDailySelected
                        ? "bg-[#91B979] text-[#0A0D14]"
                        : "bg-white/10 text-[#91B979]"
                    }`}
                  >
                    <Flame className="h-3.5 w-3.5" />
                    {stats.daily.streak}
                  </span>
                </div>
              </div>
            )}

            {/* Playstore Style Rival Athlete Telemetry Card */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#991B1B] to-[#EF4444] border border-[#EF4444]/60 flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                  <span className="text-sm font-black text-white">VR</span>
                  <span className="absolute bottom-0 inset-x-0 h-1 bg-[#FACC15]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-white">Vikram Rao</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      Circuit Pro
                    </span>
                  </div>
                  <span className="block text-[11px] text-gray-400">
                    {selectedDifficulty === "hard"
                      ? "Pro Tour Rival · 0.08s reflex · 400 km/h jump smash"
                      : selectedDifficulty === "medium"
                      ? "Club Champion · 0.18s reflex · Tactical angles"
                      : "Recruit Athlete · 0.32s reflex · Balanced play"}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#F3D15A] bg-white/5 px-2 py-1 rounded-md border border-white/5">
                {selectedDifficulty === "hard" ? "ELO 1950" : selectedDifficulty === "medium" ? "ELO 1600" : "ELO 1250"}
              </span>
            </div>

            {/* Difficulty Selector Tabs (Easy / Medium / Hard) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Select Difficulty:</span>
                <span className="text-[#DE9D35] capitalize">
                  {isDailySelected ? `Daily (${daily?.modifier.name})` : selectedDifficulty}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {LEVELS.map((l) => {
                  const isSelected = !isDailySelected && selectedDifficulty === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      disabled={playing}
                      onClick={() => {
                        setSelectedDifficulty(l.id);
                        setIsDailySelected(false);
                      }}
                      className={`py-2 px-2.5 rounded-xl text-center transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#DE9D35] text-[#0A0D14] shadow-md font-black"
                          : "bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <span className="block text-xs font-black">{l.label}</span>
                      <span
                        className={`block text-[10px] font-medium ${
                          isSelected ? "text-[#0A0D14]/80" : "text-gray-400"
                        }`}
                      >
                        {l.blurb}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Button */}
            {!playing && !isOver && (
              <button
                type="button"
                onClick={handleStartMatch}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] hover:brightness-105 active:scale-[0.98] py-3 px-4 font-black text-[#0A0D14] shadow-xl text-sm transition cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {isDailySelected
                    ? `Play Daily Challenge (${daily?.modifier.name})`
                    : `Start Match vs Vikram Rao (First to 7)`}
                </span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            )}

            {/* Playing Status in Console */}
            {playing && (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black text-emerald-400">
                    Match Live · Rally: {ui.rally} hits
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toMenu}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-300 transition"
                >
                  Quit to Menu
                </button>
              </div>
            )}

            {/* Game Over Outcome in Console */}
            {isOver && (
              <div className="space-y-3 p-3.5 rounded-2xl bg-black/70 border border-white/20 shadow-xl">
                <div className="flex items-center gap-3">
                  {ui.winner === "player" ? (
                    <RealisticTrophy size={40} />
                  ) : (
                    <RealisticShuttlecock size={36} />
                  )}
                  <div className="flex-1">
                    <span className="text-xs font-black uppercase text-[#F3D15A] block">
                      {ui.winner === "player" ? "🏆 Victory Over Vikram Rao!" : "Vikram Rao Wins This Match"}
                    </span>
                    <span className="font-mono font-black text-base text-white">
                      Final Score: {ui.score.player} – {ui.score.bot}
                    </span>
                  </div>
                </div>

                {recap?.newBest && (
                  <p className="text-[11px] font-bold text-[#F3D15A] text-center">
                    🎉 New Personal Best Rally!
                  </p>
                )}

                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                  <div className="p-1.5 bg-white/5 rounded-lg">
                    <span className="text-gray-400 block">Rally</span>
                    <strong className="text-white font-mono text-xs">{ui.stats?.longestRally ?? 0}</strong>
                  </div>
                  <div className="p-1.5 bg-white/5 rounded-lg">
                    <span className="text-gray-400 block">Smashes</span>
                    <strong className="text-white font-mono text-xs">{ui.stats?.smashes ?? 0}</strong>
                  </div>
                  <div className="p-1.5 bg-white/5 rounded-lg">
                    <span className="text-gray-400 block">Perfects</span>
                    <strong className="text-white font-mono text-xs">{ui.stats?.perfects ?? 0}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => plan && begin(plan)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#DE9D35] hover:brightness-105 font-black text-xs text-[#0A0D14] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{ui.winner === "player" ? "Play Again" : "Rematch"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={share}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 font-bold text-xs text-white transition cursor-pointer"
                  >
                    {shared ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{shared ? "Copied" : "Share"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Compact Stats Bar */}
          <dl className="grid grid-cols-3 gap-2">
            <StatItem value={stats.bestRally} label="Best Rally" />
            <StatItem value={stats.wins} label="Career Wins" />
            <StatItem value={stats.winStreak} label="Win Streak" />
          </dl>

          {/* Controls Cheat Sheet */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#91B979]" /> Move: Mouse / Touch / Arrows
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#DE9D35]" /> Swing: Click, Tap or Space
            </span>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: The Interactive Mini Court Arena               */}
        {/* ============================================================ */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-3xl border border-[#313747]/80 bg-[#121622] text-white shadow-2xl relative">
            
            {/* Court Top HUD */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-white/10 px-4 py-3 sm:px-5 bg-[#0E131E]">
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#91B979] animate-pulse" aria-hidden="true" />
                <h3 className="truncate text-xs font-black tracking-tight text-white uppercase">
                  Gelavu Mini Court
                </h3>
                {playing && plan && (
                  <span className="hidden truncate text-[11px] font-bold text-gray-400 sm:inline">
                    · {plan.label} · First to {plan.target}
                  </span>
                )}
              </div>

              {/* Play Store Style Match Bar with Player vs Rival */}
              <div className="flex items-center gap-2.5">
                {/* Left Player Score Box */}
                <div className="flex items-center gap-1.5">
                  <div className="h-6 w-6 rounded-full bg-[#91B979] text-[#0A0D14] text-[10px] font-black flex items-center justify-center border border-[#0A0D14]">
                    YOU
                  </div>
                  <span className="hidden sm:inline text-xs font-black text-white">You</span>
                  <span className="font-mono text-sm font-black px-2 py-0.5 rounded-lg bg-emerald-500/20 text-[#C8F135] border border-emerald-500/40">
                    {ui.score.player}
                  </span>
                </div>

                {/* VS Center Badge */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black">
                  <span className="text-[#F3D15A]">VS</span>
                  {playing && (ui.score.player === 6 || ui.score.bot === 6) && (
                    <span className="text-[9px] px-1.5 rounded bg-amber-500/25 text-amber-300 font-bold animate-pulse">
                      MATCH PT
                    </span>
                  )}
                </div>

                {/* Right Rival Score Box */}
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-sm font-black px-2 py-0.5 rounded-lg bg-rose-500/20 text-[#FF6B5E] border border-rose-500/40">
                    {ui.score.bot}
                  </span>
                  <span className="hidden sm:inline text-xs font-black text-white">Vikram</span>
                  <div className="h-6 w-6 rounded-full bg-[#EF4444] text-white text-[10px] font-black flex items-center justify-center border border-[#0A0D14]">
                    PRO
                  </div>
                </div>
              </div>

              {/* Controls Chips: Rally, Sound, Reset */}
              <div className="flex items-center gap-1.5">
                <Chip icon={<Flame className="h-3.5 w-3.5 text-[#91B979]" aria-hidden="true" />} label="Current rally">
                  {ui.rally}
                </Chip>
                <Chip icon={<Trophy className="h-3.5 w-3.5 text-[#F3D15A]" aria-hidden="true" />} label="Best rally">
                  {stats.bestRally}
                </Chip>
                
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-pressed={soundOn}
                  aria-label={soundOn ? "Mute sound" : "Turn sound on"}
                  className="grid h-7 w-7 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  {soundOn ? <Volume2 className="h-3.5 w-3.5 text-[#91B979]" /> : <VolumeX className="h-3.5 w-3.5" />}
                </button>

                {playing && (
                  <button
                    type="button"
                    onClick={toMenu}
                    aria-label="Quit to menu"
                    className="grid h-7 w-7 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* The Badminton Court Canvas (NO POPUP OVERLAY!) */}
            <div className="relative bg-[#0A0D14]">
              <div
                ref={hostRef}
                tabIndex={0}
                role="application"
                aria-label="Badminton game. Move with mouse, touch or arrow keys. Swing with click, tap or Space."
                {...handlers}
                onPointerDown={(e) => {
                  handlers.onPointerDown(e);
                  if (ui.mode === "menu") {
                    handleStartMatch();
                  }
                }}
                className="relative aspect-[20/9] w-full cursor-crosshair touch-pan-y select-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#91B979]"
              >
                <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden="true" />

                {/* In-Game Toast Banner */}
                {ui.banner && (
                  <div key={ui.banner.id} className="pointer-events-none absolute inset-x-0 top-3 flex justify-center z-20">
                    <span className={`animate-fade-up rounded-full px-4 py-1 text-xs font-black uppercase tracking-wider shadow-xl ${TOAST[ui.banner.tone]}`}>
                      {ui.banner.text}
                    </span>
                  </div>
                )}

                {/* Non-blocking Serve / Tap-to-play Floating Prompts */}
                {ui.mode === "menu" && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 border border-[#DE9D35]/50 px-4 py-1.5 text-xs font-black text-[#F3D15A] shadow-2xl backdrop-blur animate-bounce">
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Click court or press Start Match to play
                    </span>
                  </div>
                )}

                {playing && ui.phase === "serve" && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center z-10">
                    <span className="rounded-full bg-black/80 border border-white/20 px-4 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur">
                      {ui.server === "player" ? "Tap or press Space to serve" : "Vikram Rao is serving"}
                    </span>
                  </div>
                )}

                {isOver && (
                  <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center z-20">
                    <span className={`rounded-full px-5 py-1.5 text-xs font-black uppercase tracking-wider shadow-2xl ${
                      ui.winner === "player"
                        ? "bg-[#F3D15A] text-[#0A0D14]"
                        : "bg-rose-500 text-white"
                    }`}>
                      {ui.winner === "player" ? `🏆 You won 7 – ${ui.score.bot}!` : `Vikram Rao won ${ui.score.bot} – ${ui.score.player}`}
                    </span>
                  </div>
                )}

                {/* Play Store Mobile Arcade Smash / Swing Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (ui.mode === "menu") {
                      handleStartMatch();
                    } else if (canvasRef.current) {
                      const rect = canvasRef.current.getBoundingClientRect();
                      handlers.onPointerDown({
                        clientX: rect.left + rect.width * 0.35,
                        preventDefault: () => {},
                        stopPropagation: () => {},
                      } as unknown as React.PointerEvent<HTMLDivElement>);
                    }
                  }}
                  className={`absolute right-3.5 bottom-3.5 z-20 h-12 w-12 sm:h-14 sm:w-14 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.7)] border-2 transition-all cursor-pointer active:scale-90 ${
                    ui.meter >= 100
                      ? "bg-gradient-to-tr from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] text-[#0A0D14] border-white shadow-[0_0_25px_#F3D15A] animate-pulse"
                      : "bg-[#0A0D14]/85 hover:bg-[#121622] text-white border-white/30 hover:border-[#91B979]"
                  }`}
                  aria-label="Smash / Swing Shuttlecock"
                >
                  <Flame className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${ui.meter >= 100 ? "fill-current" : "text-[#F3D15A]"}`} />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter leading-none mt-0.5">
                    {ui.meter >= 100 ? "BURST" : "SMASH"}
                  </span>
                </button>
              </div>
            </div>

            {/* Power Smash Meter Bar (Bottom of Court) */}
            <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2.5 sm:px-5 bg-[#0E131E]">
              <span
                className={`flex items-center gap-1.5 text-xs font-extrabold ${
                  ui.meter >= 100 ? "text-[#F3D15A] animate-pulse" : "text-white/60"
                }`}
              >
                <Zap className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                {ui.meter >= 100 ? "⚡ POWER SMASH READY!" : "Power Smash Meter"}
              </span>

              <div
                className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10 p-0.5 shadow-inner"
                role="progressbar"
                aria-label="Power meter"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={ui.meter}
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-150 ${
                    ui.meter >= 100
                      ? "bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] shadow-[0_0_12px_#F3D15A] animate-pulse"
                      : "bg-gradient-to-r from-emerald-500 to-[#C8F135]"
                  }`}
                  style={{ width: `${ui.meter}%` }}
                />
              </div>

              <span className="hidden text-[11px] font-medium text-gray-400 sm:inline">
                {ui.meter >= 100 ? "Click overhead to unleash 400 km/h shot!" : "Time perfect hits to charge"}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
