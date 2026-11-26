"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Flame, Crown, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { RealisticTrophy, RealisticGoldMedal } from "@/components/common/RealisticSportsIcons";

export function RankingsShowcase() {
  const [category, setCategory] = useState("Men's Singles");

  const toggleCategory = () => {
    setCategory((c) => (c === "Men's Singles" ? "Men's Doubles" : "Men's Singles"));
  };

  const leaderboard = [
    {
      rank: "01",
      name: "Arjun Mehta",
      city: "Bengaluru",
      wins: "18–2",
      winRate: "89%",
      titles: 4,
      avatarUrl: "/images/athletes/arjun-mehta.jpg",
      badge: "Gold",
    },
    {
      rank: "02",
      name: "Nikhil Rao",
      city: "Bengaluru",
      wins: "16–3",
      winRate: "84%",
      titles: 3,
      avatarUrl: "/images/athletes/nikhil-rao.jpg",
      badge: "Silver",
    },
    {
      rank: "03",
      name: "Rohan Shah",
      city: "Mysuru",
      wins: "14–4",
      winRate: "78%",
      titles: 2,
      avatarUrl: "/images/athletes/rohan-shah.jpg",
      badge: "Bronze",
    },
  ];

  return (
    <section
      className="w-full bg-[#F8F7F2] py-16 sm:py-24 text-[#0B1220] relative overflow-hidden border-t border-slate-200"
      id="rankings"
    >
      {/* Radiant Sunroom Palette Ambient Glows */}
      <div className="pointer-events-none absolute -left-28 top-1/4 h-[500px] w-[500px] rounded-full bg-[#DE9D35]/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-28 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#F3D15A]/15 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/2 -top-20 -translate-x-1/2 h-[350px] w-[600px] rounded-full bg-[#91B979]/10 blur-[140px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ============================================================ */}
          {/* Left Column: Player of the Month Spotlight Card               */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-[#DE9D35]/30 p-6 sm:p-8 shadow-[0_20px_50px_rgba(222,157,53,0.12)] flex flex-col justify-between relative overflow-hidden group">
            
            {/* Top Eyebrow with Crown Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3D15A]/25 border border-[#DE9D35]/40 text-[#855305] text-[11px] font-black uppercase tracking-widest shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#DE9D35]" />
                PLAYER OF THE MONTH
              </span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#DE9D35] to-[#F3D15A] text-[#0B1220] text-[11px] font-black shadow-xs">
                Circuit Rank #1
              </span>
            </div>

            {/* Realistic Athlete Spotlight Portrait */}
            <div className="relative z-10 my-8 sm:my-10 flex items-center justify-center">
              <div className="relative">
                {/* Athletic Championship Glowing Halo */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] opacity-80 blur-md group-hover:opacity-100 transition-opacity" />

                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-cover bg-center border-4 border-[#F3D15A] shadow-2xl overflow-hidden ring-4 ring-white"
                  style={{ backgroundImage: "url(/images/athletes/arjun-mehta.jpg)" }}
                  role="img"
                  aria-label="Arjun Mehta - Player of the Month"
                >
                  {/* Subtle athletic stadium lighting gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>

                {/* Gold Trophy Crown Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#DE9D35] to-[#F3D15A] text-[#0B1220] p-1.5 rounded-full shadow-xl border-2 border-white flex items-center justify-center">
                  <RealisticTrophy size={28} />
                </div>
              </div>
            </div>

            {/* Player Details & Key Stats */}
            <div className="relative z-10 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <small className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    BENGALURU · MEN&apos;S SINGLES
                  </small>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-700" /> Verified
                  </span>
                </div>
                <h3 className="font-rogenz text-3xl sm:text-4xl font-bold text-[#0B1220] tracking-wide mt-1">
                  Arjun Mehta
                </h3>
              </div>

              {/* 3 Metrics: Win Rate, Titles, Streak in Radiant Sunroom Colors */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-200 text-center">
                <div className="bg-emerald-50 rounded-2xl p-2.5 border border-emerald-200">
                  <strong className="block text-lg font-black text-emerald-900">89%</strong>
                  <small className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">win rate</small>
                </div>
                <div className="bg-amber-50 rounded-2xl p-2.5 border border-amber-200">
                  <strong className="block text-lg font-black text-amber-900">4</strong>
                  <small className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">titles won</small>
                </div>
                <div className="bg-orange-50 rounded-2xl p-2.5 border border-orange-200">
                  <strong className="block text-lg font-black text-orange-900">12</strong>
                  <small className="text-[10px] text-orange-700 font-bold uppercase tracking-wider flex items-center justify-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 text-[#D96F55] inline" /> streak
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: Circuit Rankings Leaderboard Preview           */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#DE9D35] block">
                  EARN YOUR RANK
                </span>
                <h2 className="font-rogenz text-3xl sm:text-4xl font-bold text-[#0B1220] tracking-wide mt-1">
                  Every match builds your story.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Verified match scores turn into city rankings, form charts and championship milestones. Compete often, rise up your district and give rivals something to chase.
                </p>
              </div>

              {/* Luminous City Leaderboard Container */}
              <div className="rounded-2xl border border-slate-200 bg-[#FAF9F5] p-4 sm:p-5 mt-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0B1220]">City Circuit Leaderboard</span>
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#855305] bg-[#F3D15A]/30 hover:bg-[#F3D15A]/50 border border-[#DE9D35]/40 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <span>{category}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-[#855305]" />
                  </button>
                </div>

                {/* Rows with Realistic Photos & Sunroom Podium Styling */}
                <div className="space-y-2.5">
                  {leaderboard.map((p) => {
                    const isGold = p.rank === "01";
                    const isSilver = p.rank === "02";
                    
                    const rowBg = isGold
                      ? "bg-gradient-to-r from-amber-50 via-white to-amber-50/50 border border-amber-300 shadow-xs"
                      : isSilver
                      ? "bg-gradient-to-r from-slate-50 via-white to-slate-50/60 border border-slate-200"
                      : "bg-gradient-to-r from-orange-50/60 via-white to-orange-50/20 border border-orange-200";

                    const badgeColor = isGold
                      ? "text-amber-800"
                      : isSilver
                      ? "text-slate-700"
                      : "text-orange-800";

                    return (
                      <div
                        key={p.rank}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all hover:shadow-sm ${rowBg}`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className={`w-6 text-center font-mono font-black text-xs ${badgeColor}`}>
                            {p.rank}
                          </span>

                          {/* Realistic Athlete Avatar */}
                          <div className="relative">
                            <Avatar
                              name={p.name}
                              url={p.avatarUrl}
                              size="md"
                              className={isGold ? "border-[#F3D15A]" : isSilver ? "border-slate-300" : "border-[#DE9D35]"}
                            />
                            {isGold && (
                              <span className="absolute -top-2 -right-2" title="Circuit Champion">
                                <RealisticGoldMedal size={20} />
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <strong className="block text-sm font-bold text-[#0B1220] truncate">
                              {p.name}
                            </strong>
                            <small className="text-xs text-slate-500 block">
                              {p.city} · {p.wins} W/L
                            </small>
                          </div>
                        </div>

                        {/* Real Tournament Performance Metrics */}
                        <div className="text-right shrink-0">
                          <span className={`font-mono text-base font-black block ${badgeColor}`}>
                            {p.winRate}
                          </span>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                            {p.titles} {p.titles === 1 ? "title" : "titles"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Link to Full Leaderboard */}
            <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Updated after every official tournament</span>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 text-xs font-black text-[#855305] hover:text-[#DE9D35] transition-colors"
              >
                <span>View full city rankings</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
