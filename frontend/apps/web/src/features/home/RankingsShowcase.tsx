"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

export function RankingsShowcase() {
  const [category, setCategory] = useState("Men's Singles");

  const toggleCategory = () => {
    setCategory((c) => (c === "Men's Singles" ? "Men's Doubles" : "Men's Singles"));
  };

  const leaderboard = [
    { rank: "01", name: "Arjun Mehta", city: "Bengaluru", wins: "18–2", rating: 1842, avatar: "AM" },
    { rank: "02", name: "Nikhil Rao", city: "Bengaluru", wins: "16–3", rating: 1809, avatar: "NR" },
    { rank: "03", name: "Rohan Shah", city: "Mysuru", wins: "14–4", rating: 1751, avatar: "RS" },
  ];

  return (
    <section className="w-full bg-[#F5F6F1] py-16 sm:py-24" id="rankings">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Player of the Month Spotlight Card (Matches Image 4) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B101B] p-6 sm:p-8 text-white shadow-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
            {/* Top Eyebrow */}
            <div className="relative z-10">
              <span className="text-[11px] font-black uppercase tracking-widest text-lime block">
                PLAYER OF THE MONTH
              </span>
            </div>

            {/* Glowing Purple Orb Avatar with AM */}
            <div className="relative z-10 my-8 sm:my-10 flex items-center justify-center">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-b from-[#6366F1] to-[#4338CA] shadow-[0_0_60px_rgba(99,102,241,0.55)] flex items-center justify-center text-4xl sm:text-5xl font-black text-white border-2 border-indigo-400/40">
                AM
                {/* Subtle Trophy Watermark */}
                <div className="pointer-events-none absolute -bottom-3 -right-3 text-3xl select-none opacity-90 drop-shadow">
                  👑
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
                <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
                  <strong className="block text-lg font-black text-white">4</strong>
                  <small className="text-[10px] text-gray-400 font-medium">titles</small>
                </div>
                <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
                  <strong className="block text-lg font-black text-white">12</strong>
                  <small className="text-[10px] text-gray-400 font-medium">win streak</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Circuit Rankings Table Preview (Matches Image 4) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-line p-6 sm:p-8 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#6366F1] block">
                  EARN YOUR RANK
                </span>
                <h2 className="font-rogenz text-3xl sm:text-4xl font-bold text-[#0B101B] tracking-wide mt-1">
                  Every match builds your story.
                </h2>
                <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                  Verified results become rankings, form and milestones. Compete often, climb your city and give rivals something to chase.
                </p>
              </div>

              {/* White City Leaderboard Box */}
              <div className="rounded-2xl border border-line bg-paper/30 p-4 sm:p-5 mt-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <span className="text-xs font-black text-[#0B101B]">City leaderboard</span>
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    <span>{category}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Rows matching Image 4 */}
                <div className="space-y-2">
                  {leaderboard.map((p) => (
                    <div
                      key={p.rank}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="w-6 text-center font-mono font-black text-xs text-muted">
                          {p.rank}
                        </span>
                        <span className="h-8 w-8 rounded-full bg-[#0B101B] text-white font-black text-xs flex items-center justify-center shrink-0">
                          {p.avatar}
                        </span>
                        <div className="min-w-0">
                          <strong className="block text-sm font-bold text-[#0B101B] truncate">
                            {p.name}
                          </strong>
                          <small className="text-xs text-muted block">
                            {p.city} · {p.wins}
                          </small>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-mono text-base font-black text-[#0B101B] block">
                          {p.rating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Link to Full Leaderboard */}
            <div className="pt-6 mt-4 border-t border-line flex items-center justify-end">
              <Link
                href="/leaderboard"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B101B] hover:text-emerald-600 transition-colors cursor-pointer"
              >
                <span>View full circuit rankings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
