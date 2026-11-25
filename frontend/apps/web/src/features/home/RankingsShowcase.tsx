"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, Trophy, Flame, Crown, ShieldCheck } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";

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
      className="w-full bg-[#0A0D14] py-16 sm:py-24 text-white relative overflow-hidden border-t border-[#313747]/40"
      id="rankings"
    >
      {/* Subtle Ambient Arena Glows in Sunroom Palette */}
      <div className="pointer-events-none absolute -left-28 top-1/4 h-[500px] w-[500px] rounded-full bg-[#DE9D35]/5 blur-[160px]" />
      <div className="pointer-events-none absolute -right-28 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#F3D15A]/5 blur-[150px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ============================================================ */}
          {/* Left Column: Player of the Month Spotlight Card               */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 rounded-3xl bg-[#121622] border border-[#313747]/60 p-6 sm:p-8 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Eyebrow with Crown Icon */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#F3D15A]">
                <Crown className="w-3.5 h-3.5" />
                PLAYER OF THE MONTH
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F3D15A]/15 border border-[#F3D15A]/30 text-[#F3D15A] text-[10px] font-extrabold">
                Circuit Rank #1
              </span>
            </div>

            {/* Realistic Athlete Spotlight Portrait */}
            <div className="relative z-10 my-8 sm:my-10 flex items-center justify-center">
              <div className="relative group">
                {/* Athletic Championship Glowing Halo */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] opacity-75 blur-md group-hover:opacity-100 transition-opacity" />

                <div
                  className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-cover bg-center border-3 border-[#F3D15A] shadow-2xl overflow-hidden ring-4 ring-[#0A0D14]"
                  style={{ backgroundImage: "url(/images/athletes/arjun-mehta.jpg)" }}
                  role="img"
                  aria-label="Arjun Mehta - Player of the Month"
                >
                  {/* Subtle athletic stadium lighting gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                </div>

                {/* Gold Trophy Crown Badge */}
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#DE9D35] to-[#F3D15A] text-[#0A0D14] p-2.5 rounded-full shadow-xl border-3 border-[#121622] flex items-center justify-center">
                  <Trophy className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Player Details & Key Stats */}
            <div className="relative z-10 space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <small className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                    BENGALURU · MEN&apos;S SINGLES
                  </small>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </span>
                </div>
                <h3 className="font-rogenz text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1">
                  Arjun Mehta
                </h3>
              </div>

              {/* 3 Metrics: Win Rate, Titles, Streak */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#313747]/60 text-center">
                <div className="bg-[#1a2133] rounded-2xl p-2.5 border border-[#313747]/60">
                  <strong className="block text-lg font-black text-white">89%</strong>
                  <small className="text-[10px] text-gray-400 font-medium">win rate</small>
                </div>
                <div className="bg-[#F3D15A]/15 rounded-2xl p-2.5 border border-[#F3D15A]/30">
                  <strong className="block text-lg font-black text-[#F3D15A]">4</strong>
                  <small className="text-[10px] text-[#F3D15A]/90 font-medium">titles won</small>
                </div>
                <div className="bg-[#1a2133] rounded-2xl p-2.5 border border-[#313747]/60">
                  <strong className="block text-lg font-black text-white">12</strong>
                  <small className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 text-[#D96F55] inline" /> streak
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Right Column: Circuit Rankings Leaderboard Preview           */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 rounded-3xl bg-[#121622] border border-[#313747]/60 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#DE9D35] block">
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
              <div className="rounded-2xl border border-[#313747]/60 bg-[#0A0D14] p-4 sm:p-5 mt-4 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#313747]/60">
                  <span className="text-xs font-black uppercase tracking-wider text-white">City Circuit Leaderboard</span>
                  <button
                    type="button"
                    onClick={toggleCategory}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DE9D35] bg-[#313747]/30 hover:bg-[#313747]/60 border border-[#313747]/60 px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>{category}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Rows with Realistic Photos & Sunroom Podium Styling */}
                <div className="space-y-2.5">
                  {leaderboard.map((p) => {
                    const isGold = p.rank === "01";
                    const isSilver = p.rank === "02";
                    
                    const rowBg = isGold
                      ? "bg-[#F3D15A]/10 border border-[#F3D15A]/25"
                      : isSilver
                      ? "bg-[#DE9D35]/10 border border-[#DE9D35]/25"
                      : "bg-[#91B979]/10 border border-[#91B979]/25";

                    const badgeColor = isGold
                      ? "text-[#F3D15A]"
                      : isSilver
                      ? "text-[#DE9D35]"
                      : "text-[#91B979]";

                    return (
                      <div
                        key={p.rank}
                        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all hover:bg-white/5 ${rowBg}`}
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
                              className={isGold ? "border-[#F3D15A]" : isSilver ? "border-[#DE9D35]" : "border-[#91B979]"}
                            />
                            {isGold && (
                              <span className="absolute -top-1 -right-1 text-[10px]" title="Circuit Champion">
                                👑
                              </span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <strong className="block text-sm font-bold text-white truncate">
                              {p.name}
                            </strong>
                            <small className="text-xs text-gray-400 block">
                              {p.city} · {p.wins} W/L
                            </small>
                          </div>
                        </div>

                        {/* Real Tournament Performance Metrics (No arbitrary points) */}
                        <div className="text-right shrink-0">
                          <span className={`font-mono text-base font-black block ${badgeColor}`}>
                            {p.winRate}
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
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
            <div className="pt-6 mt-4 border-t border-[#313747]/60 flex items-center justify-between">
              <span className="text-xs text-gray-400">Updated after every official tournament</span>
              <Link
                href="/rankings"
                className="inline-flex items-center gap-2 text-xs font-black text-[#DE9D35] hover:text-[#F3D15A] transition-colors"
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
