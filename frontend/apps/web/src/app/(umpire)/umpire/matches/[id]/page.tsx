"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Flag, RotateCcw, Octagon } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function UmpireMatchScoringConsolePage() {
  const { showToast } = useToast();

  const [t1Score, setT1Score] = useState(14);
  const [t2Score, setT2Score] = useState(11);
  const [servingSide, setServingSide] = useState<1 | 2>(1);
  const [history, setHistory] = useState<{ t1: number; t2: number; server: 1 | 2 }[]>([]);
  const [matchEnded, setMatchEnded] = useState(false);

  const addPoint = (team: 1 | 2) => {
    if (matchEnded) return;

    setHistory((prev) => [...prev, { t1: t1Score, t2: t2Score, server: servingSide }]);
    if (team === 1) {
      setT1Score((s) => s + 1);
      setServingSide(1);
    } else {
      setT2Score((s) => s + 1);
      setServingSide(2);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) {
      showToast("No point history to undo", "info");
      return;
    }
    const last = history[history.length - 1];
    setHistory((prev) => prev.slice(0, prev.length - 1));
    setT1Score(last.t1);
    setT2Score(last.t2);
    setServingSide(last.server);
    showToast("Last point undone", "info");
  };

  const handleWalkover = () => {
    showToast("Walkover recorded. Advancing team by default.", "info");
  };

  const handleEndMatch = () => {
    setMatchEnded(true);
    showToast("Match finished! Final score saved to public bracket.", "success");
  };

  return (
    <div className="min-h-screen bg-[#0B101B] text-white flex flex-col justify-between p-4 sm:p-6 select-none max-w-md mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Link
            href="/umpire"
            className="p-2 -ml-2 rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="text-center">
            <span className="text-[11px] font-semibold text-gray-400 block">
              Court 2 • Quarter-final
            </span>
            <h1 className="text-sm font-black text-white">
              Men&apos;s Doubles • Intermediate
            </h1>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 text-[10px] font-black text-rose-400">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            LIVE
          </span>
        </div>

        {/* Green Signed in via QR Banner */}
        <div className="rounded-xl bg-[#12261A] border border-[#86EFAC]/20 py-2 px-3 text-center text-xs font-bold text-[#86EFAC] flex items-center justify-center gap-2">
          <span>⛶ Signed in via QR • Court 2 only</span>
        </div>

        {/* Rule Chips Row */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          {["21 pts", "Best of 3", "Win by 2 • cap 30", "Interval 11"].map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-[#161F30] border border-gray-800 px-2.5 py-1 text-[10px] font-bold text-gray-300 shrink-0"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Game Chips Tracker */}
        <div className="grid grid-cols-3 gap-2 text-center pt-1">
          {/* Game 1 */}
          <div className="p-2 rounded-xl bg-[#141A28] border border-gray-800/80">
            <span className="text-[10px] font-bold text-gray-500 block">Game 1</span>
            <span className="text-xs font-black text-white mt-0.5 block">21–17</span>
          </div>

          {/* Game 2 (Live - Neon Lime) */}
          <div className="p-2 rounded-xl bg-[#D4FF00] text-black shadow-sm flex flex-col justify-center items-center">
            <span className="text-[10px] font-black uppercase tracking-wider block">Game 2</span>
            <span className="text-xs font-black mt-0.5 block">Live</span>
          </div>

          {/* Game 3 */}
          <div className="p-2 rounded-xl bg-[#141A28] border border-gray-800/80">
            <span className="text-[10px] font-bold text-gray-500 block">Game 3</span>
            <span className="text-xs font-black text-gray-600 mt-0.5 block">—</span>
          </div>
        </div>
      </div>

      {/* Scoring Pads Center */}
      <div className="space-y-4 my-auto py-4">
        {/* Team 1 Card */}
        <div className="rounded-3xl bg-[#141A28] border border-gray-800/90 p-5 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Arjun / Rohan
              </h2>
              <span className="text-xs text-gray-400 font-semibold block mt-0.5">
                Seed 2 • Games won 1
              </span>
            </div>

            {servingSide === 1 && (
              <span className="rounded-full bg-[#D4FF00] px-3 py-1 text-[10px] font-black text-black flex items-center gap-1 shadow-xs">
                🏸 Serving
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-7xl sm:text-8xl font-black font-mono text-white tracking-tight">
              {t1Score}
            </span>

            <button
              type="button"
              onClick={() => addPoint(1)}
              className="w-24 h-24 rounded-2xl bg-[#D4FF00] hover:bg-[#c6f500] text-black font-black text-4xl flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              +1
            </button>
          </div>
        </div>

        {/* Team 2 Card */}
        <div className="rounded-3xl bg-[#141A28] border border-gray-800/90 p-5 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                Kiran / Dev
              </h2>
              <span className="text-xs text-gray-400 font-semibold block mt-0.5">
                Seed 7 • Games won 0
              </span>
            </div>

            {servingSide === 2 && (
              <span className="rounded-full bg-[#D4FF00] px-3 py-1 text-[10px] font-black text-black flex items-center gap-1 shadow-xs">
                🏸 Serving
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-7xl sm:text-8xl font-black font-mono text-white tracking-tight">
              {t2Score}
            </span>

            <button
              type="button"
              onClick={() => addPoint(2)}
              className="w-24 h-24 rounded-2xl bg-white hover:bg-gray-100 text-black font-black text-4xl flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              +1
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Actions Row & Footer */}
      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-3 gap-2">
          {/* Undo */}
          <button
            type="button"
            onClick={handleUndo}
            className="rounded-2xl bg-[#1E2538] hover:bg-[#28324a] text-white py-3 px-2 flex flex-col items-center justify-center gap-1 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-gray-300" />
            <span>Undo</span>
          </button>

          {/* Walkover */}
          <button
            type="button"
            onClick={handleWalkover}
            className="rounded-2xl bg-[#1E2538] hover:bg-[#28324a] text-white py-3 px-2 flex flex-col items-center justify-center gap-1 text-xs font-bold transition-colors cursor-pointer"
          >
            <Flag className="w-4 h-4 text-gray-300" />
            <span>Walkover</span>
          </button>

          {/* End Match */}
          <button
            type="button"
            onClick={handleEndMatch}
            className="rounded-2xl bg-[#E11D48] hover:bg-[#be123c] text-white py-3 px-2 flex flex-col items-center justify-center gap-1 text-xs font-black transition-colors cursor-pointer shadow-md shadow-rose-950/40"
          >
            <Octagon className="w-4 h-4 text-white" />
            <span>End match</span>
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-500 font-medium">
          ☁ Auto-saved • syncs when online
        </p>
      </div>
    </div>
  );
}
