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
      className="w-full bg-[#F4EDE0] py-16 sm:py-24 text-[#14212D] relative overflow-hidden border-t border-navy/10"
      id="rankings"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ============================================================ */}
          {/* Left Column: Player of the Month Spotlight Card               */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-white border-2 border-navy/10 p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            
            {/* Top Eyebrow with Crown Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream border border-coral/40 text-coral text-[11px] font-black uppercase tracking-widest shadow-xs">
                <Crown className="w-3.5 h-3.5 text-coral" />
                PLAYER OF THE MONTH
              </span>
              <span className="px-3.5 py-1 rounded-full bg-coral text-white text-[11px] font-black shadow-xs">
                Circuit Rank #1
              </span>
            </div>

            {/* Realistic Athlete Spotlight Portrait */}
            <div className="relative z-10 my-8 sm:my-10 flex items-center justify-center">
              <div className="relative">
                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-cover bg-center border-4 border-coral shadow-2xl overflow-hidden ring-4 ring-cream"
                  style={{ backgroundImage: "url(/images/athletes/arjun-mehta.jpg)" }}
                  role="img"
                  aria-label="Arjun Mehta - Player of the Month"
                />

                {/* Gold Trophy Crown Badge */}
                <div className="absolute -bottom-2 -right-2 bg-coral text-navy p-1.5 rounded-full shadow-xl border-2 border-white flex items-center justify-center">
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
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-navy bg-cream px-2 py-0.5 rounded-full border border-navy/15">
                    <ShieldCheck className="w-3 h-3 text-coral" /> Verified
                  </span>
                </div>
                <h3 className="font-rogenz text-3xl sm:text-4xl font-bold text-navy tracking-wide mt-1">
                  Arjun Mehta
                </h3>
              </div>

              {/* 3 Metrics: Win Rate, Titles, Streak in Solid Palette */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-slate-200 text-center">
                <div className="bg-cream rounded-2xl p-2.5 border border-navy/10">
                  <strong className="block text-lg font-black text-navy">89%</strong>
                  <small className="text-[10px] text-navy/70 font-bold uppercase tracking-wider">win rate</small>
                </div>
                <div className="bg-cream rounded-2xl p-2.5 border border-navy/10">
                  <strong className="block text-lg font-black text-navy">4</strong>
                  <small className="text-[10px] text-navy/70 font-bold uppercase tracking-wider">titles won</small>
                </div>
                <div className="bg-cream rounded-2xl p-2.5 border border-navy/10">
                  <strong className="block text-lg font-black text-coral">12</strong>
                  <small className="text-[10px] text-navy/70 font-bold uppercase tracking-wider flex items-center justify-center gap-0.5">
                    <Flame className="w-3 h-3 text-coral inline" /> streak
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: Circuit Rankings Leaderboard Preview           */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 rounded-3xl bg-white border-2 border-navy/10 p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-coral block">
                  EARN YOUR RANK
                </span>
                <h2 className="font-rogenz text-3xl sm:text-4xl font-bold text-navy tracking-wide mt-1">
                  Every match builds your story.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Verified match scores turn into city rankings, form charts and championship milestones. Compete often, rise up your district and give rivals something to chase.
                </p>
              </div>

              {/* City Leaderboard Container */}
              <div className="rounded-2xl border border-navy/10 bg-cream p-4 sm:p-5 mt-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-navy/10">
                  <span className="text-xs font-black uppercase tracking-wider text-navy">City Circuit Leaderboard</span>
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className="inline-flex items-center gap-1.5 text-xs font-black text-navy bg-white hover:bg-white/80 border border-navy/15 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                  >
                    <span>{category}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-coral" />
                  </button>
                </div>

                {/* Rows */}
                <div className="space-y-2.5">
                  {leaderboard.map((p) => {
                    const isGold = p.rank === "01";
                    const isSilver = p.rank === "02";
                    
                    const rowBg = isGold
                      ? "bg-white border-2 border-coral shadow-sm"
                      : isSilver
                      ? "bg-white border border-slate-200"
                      : "bg-white border border-slate-200";

                    const badgeColor = isGold
                      ? "text-coral"
                      : isSilver
                      ? "text-slate-700"
                      : "text-navy";

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
                              className={isGold ? "border-coral" : isSilver ? "border-slate-300" : "border-slate-200"}
                            />
                            {isGold && (
                              <span className="absolute -top-2 -right-2" title="Circuit Champion">
                                <RealisticGoldMedal size={20} />
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <strong className="block text-sm font-bold text-navy truncate">
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
            <div className="pt-6 mt-4 border-t border-navy/10 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Updated after every official tournament</span>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 text-xs font-black text-coral hover:underline transition-colors"
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
