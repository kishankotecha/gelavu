"use client";

import React, { useState } from "react";
import {
  RotateCcw,
  Lock,
  GripVertical,
  Dices,
  Zap,
  Info,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function HostFixturesPage() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("Men's Doubles");
  const [tournamentFormat, setTournamentFormat] = useState("Knockout");
  const [isLocked, setIsLocked] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [drawResult, setDrawResult] = useState<string | null>(null);

  const seeds = [
    { rank: 1, name: "Arjun / Rohan" },
    { rank: 2, name: "Vikram / Sai" },
    { rank: 3, name: "Kiran / Dev" },
    { rank: 4, name: "Nikhil / Om" },
    { rank: 5, name: "+ 3 more teams" },
  ];

  const handleRegenerate = () => {
    showToast("Re-randomized draw positions while respecting seeds 1-4", "info");
  };

  const handleLockPublish = () => {
    setIsLocked(!isLocked);
    showToast(
      !isLocked ? "Draw locked & published to live public bracket!" : "Bracket unlocked for host edits",
      "success"
    );
  };

  const handleSpinWheel = () => {
    setIsSpinning(true);
    setDrawResult(null);
    setTimeout(() => {
      setIsSpinning(false);
      setDrawResult("Paired: Varun Shenoy + Aditya Hegde");
      showToast("Draw completed! Varun Shenoy & Aditya Hegde paired.", "success");
    }, 1500);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-7">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-gray-500 font-semibold block">Bengaluru Open 2025</span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-0.5">
            Fixtures
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRegenerate}
            disabled={isLocked}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 px-3.5 py-2 text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={handleLockPublish}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-sm cursor-pointer ${
              isLocked
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#D4FF00]" />
            <span>{isLocked ? "Published & Live" : "Lock & publish"}</span>
          </button>
        </div>
      </div>

      {/* Filter Row: Category Pills & Format Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex items-center gap-2">
          {["Men's Doubles", "Mixed Doubles", "Women's Singles"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-black text-white shadow-xs"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Formats */}
        <div className="flex items-center gap-1.5">
          {["Knockout", "Groups + KO", "Round robin"].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setTournamentFormat(fmt)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                tournamentFormat === fmt
                  ? "bg-[#D4FF00] text-black shadow-xs"
                  : "bg-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Seeding & Random Draw, Right Multi-round Bracket */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Approx 32%) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Seeding Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900">Seeding</h3>
              <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold">
                By ranking
              </span>
            </div>

            <div className="space-y-1.5">
              {seeds.map((s) => (
                <div
                  key={s.rank}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/70 border border-gray-100 hover:bg-gray-100/70 transition-colors text-xs font-semibold text-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 font-mono w-3 text-center">{s.rank}</span>
                    <span>{s.name}</span>
                  </div>
                  <GripVertical className="w-3.5 h-3.5 text-gray-400 cursor-grab" />
                </div>
              ))}
            </div>
          </div>

          {/* Random Partner Draw Card */}
          <div className="rounded-2xl bg-[#0B101B] p-5 text-white shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <Dices className="w-4 h-4 text-[#D4FF00]" />
              <h3 className="text-sm font-black">Random partner draw</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              6 solo players waiting to be paired.
            </p>

            {drawResult && (
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                {drawResult}
              </div>
            )}

            <button
              type="button"
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className="w-full rounded-xl bg-[#D4FF00] hover:bg-[#c6f500] text-black py-2.5 text-xs font-black transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-60"
            >
              {isSpinning ? "Spinning wheel..." : "Spin the wheel"}
            </button>
          </div>

          {/* Note */}
          <p className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium px-1">
            <Info className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>Byes go to top seeds automatically.</span>
          </p>
        </div>

        {/* Right Column (Bracket Tree) (Approx 68%) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs overflow-x-auto">
            <div className="grid grid-cols-3 gap-6 min-w-[620px]">
              {/* Column 1: QUARTER-FINALS */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block pb-1 border-b border-gray-100">
                  QUARTER-FINALS
                </span>

                {/* Match 1: Completed */}
                <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs space-y-2">
                  <div className="p-2 rounded-xl bg-[#ECFCCB] flex items-center justify-between text-xs font-black text-gray-900">
                    <span className="truncate mr-2">1 Arjun / Rohan</span>
                    <span className="font-mono">2</span>
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-semibold text-gray-400">
                    <span className="truncate mr-2">8 Bye</span>
                    <span className="font-mono">0</span>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-gray-500">
                    Completed • Court 1
                  </div>
                </div>

                {/* Match 2: LIVE */}
                <div className="rounded-2xl border-2 border-black bg-white p-3.5 shadow-sm space-y-2">
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-black text-gray-900">
                    <span className="truncate mr-2">4 Nikhil / Om</span>
                    <span className="font-mono">14</span>
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-semibold text-gray-700">
                    <span className="truncate mr-2">5 Sai / Raj</span>
                    <span className="font-mono">11</span>
                  </div>
                  <div className="pt-1 flex items-center gap-1.5 text-[10px] font-bold text-rose-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                    <span>Live • Court 2</span>
                  </div>
                </div>

                {/* Match 3 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs space-y-2">
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="truncate mr-2">3 Kiran / Dev</span>
                    <span className="font-mono text-gray-400">—</span>
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="truncate mr-2">6 Aman / Yash</span>
                    <span className="font-mono text-gray-400">—</span>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-gray-500">
                    3:40 PM • Court 3
                  </div>
                </div>

                {/* Match 4 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs space-y-2">
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="truncate mr-2">2 Vikram / Sai</span>
                    <span className="font-mono text-gray-400">—</span>
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-800">
                    <span className="truncate mr-2">7 Ravi / Teja</span>
                    <span className="font-mono text-gray-400">—</span>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-gray-500">
                    4:20 PM • Court 1
                  </div>
                </div>
              </div>

              {/* Column 2: SEMI-FINALS */}
              <div className="space-y-4 pt-12">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block pb-1 border-b border-gray-100">
                  SEMI-FINALS
                </span>

                {/* SF 1 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs space-y-2">
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-bold text-gray-900">
                    <span className="truncate mr-2">Arjun / Rohan</span>
                    <span className="font-mono text-gray-400">—</span>
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-semibold text-gray-400 italic">
                    <span className="truncate mr-2">Winner QF2</span>
                    <span className="font-mono">—</span>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-gray-500">
                    Sat 10:00 AM
                  </div>
                </div>

                {/* SF 2 */}
                <div className="rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs space-y-2 mt-28">
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-semibold text-gray-400 italic">
                    <span className="truncate mr-2">Winner QF3</span>
                    <span className="font-mono">—</span>
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 flex items-center justify-between text-xs font-semibold text-gray-400 italic">
                    <span className="truncate mr-2">Winner QF4</span>
                    <span className="font-mono">—</span>
                  </div>
                  <div className="pt-1 text-[10px] font-semibold text-gray-500">
                    Sat 11:00 AM
                  </div>
                </div>
              </div>

              {/* Column 3: FINAL / CHAMPIONSHIP */}
              <div className="space-y-4 pt-32">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block pb-1 border-b border-gray-100">
                  FINAL
                </span>

                {/* Championship Gold Card */}
                <div className="rounded-2xl bg-[#0F1424] text-white p-4 shadow-lg border border-amber-500/30 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-black tracking-wider uppercase text-[#F59E0B]">
                    <span>🏆 CHAMPIONSHIP</span>
                  </div>

                  <div className="p-2 rounded-xl bg-[#1A2238] flex items-center justify-between text-xs font-bold text-gray-200">
                    <span>Winner SF1</span>
                    <span className="text-gray-500">—</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#1A2238] flex items-center justify-between text-xs font-bold text-gray-200">
                    <span>Winner SF2</span>
                    <span className="text-gray-500">—</span>
                  </div>

                  <div className="pt-1 text-[10px] font-bold text-gray-400">
                    Sun 4:00 PM • Court 1
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs font-medium text-gray-600">
            <Zap className="w-4 h-4 text-[#84CC16] shrink-0" />
            <span>
              Winners auto-advance once the umpire confirms a result. No-shows get a walkover in one tap.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
