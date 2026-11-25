"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Trophy, Flame, Crown } from "lucide-react";

export function RankingsShowcase() {
  const [category, setCategory] = useState("Men's Singles");

  const toggleCategory = () => {
    setCategory((c) => (c === "Men's Singles" ? "Men's Doubles" : "Men's Singles"));
  };

  const leaderboard = [
    { rank: "01", name: "Arjun Mehta", city: "Bengaluru", wins: "18–2", rating: 1842, avatar: "AM", badge: "Gold" },
    { rank: "02", name: "Nikhil Rao", city: "Bengaluru", wins: "16–3", rating: 1809, avatar: "NR", badge: "Silver" },
    { rank: "03", name: "Rohan Shah", city: "Mysuru", wins: "14–4", rating: 1751, avatar: "RS", badge: "Bronze" },
  ];

  return (
    <section
      className="w-full bg-gradient-to-b from-[#140D1E] via-[#1E123D] to-[#0E0B22] py-16 sm:py-24 text-white relative overflow-hidden"
      id="rankings"
    >
      {/* Thematic Ambient Arena Glows (Royal Velvet Violet & Championship Gold Gala Theme) */}
      <div className="pointer-events-none absolute -left-28 top-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-[#6366F1]/20 via-[#8B5CF6]/15 to-transparent blur-[160px]" />
      <div className="pointer-events-none absolute -right-28 bottom-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tl from-amber-400/20 via-yellow-500/10 to-transparent blur-[150px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ============================================================ */}
          {/* Left Column: Player of the Month Spotlight Card               */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0E1326]/90 border border-white/10 p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            
            {/* Top Eyebrow with Crown Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-400">
                <Crown className="w-3.5 h-3.5" />
                PLAYER OF THE MONTH
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-extrabold">
                Circuit Rank #1
              </span>
            </div>

            {/* Glowing Royal Orb Avatar with AM */}
            <div className="relative z-10 my-8 sm:my-10 flex items-center justify-center">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-[#6366F1] via-[#4F46E5] to-[#312E81] shadow-[0_0_60px_rgba(99,102,241,0.5)] flex items-center justify-center text-4xl sm:text-5xl font-black text-white border-2 border-indigo-400/40">
                AM
                {/* Gold Crown Badge */}
                <div className="pointer-events-none absolute -bottom-2 -right-2 bg-gradient-to-br from-amber-400 to-amber-600 text-[#0B101B] p-2 rounded-full shadow-lg border-2 border-[#0E1326]">
                  <Trophy className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Player Details & Key Stats */}
            <div className="relative z-10 space-y-4">
              <div>
                <small className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  BENGALURU · MEN&apos;S SINGLES
                </small>
                <h3 className="font-rogenz text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1">
                  Arjun Mehta
                </h3>
              </div>

              {/* 3 Metrics: Win Rate, Titles, Streak */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center">
                <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
                  <strong className="block text-lg font-black text-white">89%</strong>
                  <small className="text-[10px] text-gray-400 font-medium">win rate</small>
                </div>
                <div className="bg-amber-500/10 rounded-2xl p-2.5 border border-amber-500/20">
                  <strong className="block text-lg font-black text-amber-400">4</strong>
                  <small className="text-[10px] text-amber-200/80 font-medium">titles won</small>
                </div>
                <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
                  <strong className="block text-lg font-black text-white">12</strong>
                  <small className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 text-amber-400 inline" /> streak
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: Circuit Rankings Leaderboard Preview           */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0E1326]/80 border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between backdrop-blur-md">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400 block">
                  EARN YOUR RANK
                </span>
                <h2 className="font-rogenz text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1">
                  Every match builds your story.
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                  Verified match scores turn into city rankings, form charts and championship milestones. Compete often, rise up your district and give rivals something to chase.
                </p>
              </div>

              {/* Dark City Leaderboard Box */}
              <div className="rounded-2xl border border-white/10 bg-[#080C1A]/90 p-4 sm:p-5 mt-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-black uppercase tracking-wider text-white">City Circuit Leaderboard</span>
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>{category}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Rows with Championship Podium Styling */}
                <div className="space-y-2">
                  {leaderboard.map((p) => {
                    const isGold = p.rank === "01";
                    const isSilver = p.rank === "02";
                    return (
                      <div
                        key={p.rank}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                          isGold
                            ? "bg-amber-500/10 border border-amber-500/20"
                            : "bg-white/5 hover:bg-white/10 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className={`w-6 text-center font-mono font-black text-xs ${
                              isGold ? "text-amber-400 font-extrabold" : isSilver ? "text-slate-300" : "text-amber-600"
                            }`}
                          >
                            {p.rank}
                          </span>
                          <span
                            className={`h-8 w-8 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                              isGold
                                ? "bg-amber-400 text-[#0B101B]"
                                : "bg-[#1E293B] text-white border border-white/15"
                            }`}
                          >
                            {p.avatar}
                          </span>
                          <div className="min-w-0">
                            <strong className="block text-sm font-bold text-white truncate">
                              {p.name}
                            </strong>
                            <small className="text-xs text-gray-400 block">
                              {p.city} · {p.wins} W/L
                            </small>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`font-mono text-base font-black block ${
                              isGold ? "text-amber-400" : "text-white"
                            }`}
                          >
                            {p.rating}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">pts</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Link to Full Leaderboard */}
            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">Updated after every official tournament</span>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 text-xs font-black text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>View full city rankings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
