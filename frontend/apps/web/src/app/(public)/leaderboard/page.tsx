"use client";

import React, { useState } from "react";
import { Avatar } from "@/components/common/Avatar";

export default function LeaderboardPage() {
  const [category, setCategory] = useState("Men’s Singles");

  const players = [
    { rank: "01", name: "Arjun Mehta", city: "Bengaluru", wins: "18–2", rating: 1842, titles: 4, winRate: "89%", club: "Game Theory" },
    { rank: "02", name: "Nikhil Rao", city: "Bengaluru", wins: "16–3", rating: 1809, titles: 3, winRate: "84%", club: "Smash Pro" },
    { rank: "03", name: "Rohan Shah", city: "Mysuru", wins: "14–4", rating: 1751, titles: 2, winRate: "78%", club: "Ace Badminton" },
    { rank: "04", name: "Aditya Hegde", city: "Mangaluru", wins: "12–3", rating: 1715, titles: 2, winRate: "80%", club: "Shuttle Zone" },
    { rank: "05", name: "Varun Shenoy", city: "Hubballi", wins: "11–5", rating: 1682, titles: 1, winRate: "69%", club: "North Karnataka BC" },
    { rank: "06", name: "Kiran Shah", city: "Bengaluru", wins: "10–4", rating: 1650, titles: 1, winRate: "71%", club: "HSR Sports Club" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl space-y-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-lime-600 block">
            OFFICIAL CIRCUIT STANDINGS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight mt-1">
            Circuit Rankings
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Elo ratings calculated live after every verified tournament result.
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {["Men’s Singles", "Women’s Singles", "Men’s Doubles", "Mixed Doubles"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                category === cat
                  ? "bg-ink text-white shadow-xs"
                  : "bg-surface border border-line text-ink/80 hover:border-ink/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Player of the Month Showcase Card */}
      <div className="rounded-3xl bg-[#0B101B] p-6 sm:p-10 text-white shadow-lift border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-500/20 to-lime/20 border-2 border-[#E6B84F]/60 text-3xl font-black text-white shadow-xl">
            AM
            <span className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-[#E6B84F] text-ink text-sm font-bold shadow-md">
              👑
            </span>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B84F] block">
              CIRCUIT LEADER • PLAYER OF THE MONTH
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              Arjun Mehta
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Bengaluru • Game Theory Indiranagar • Seed 1
            </p>
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center shrink-0">
          <div className="bg-white/5 rounded-2xl px-4 py-3 border border-white/5">
            <strong className="block text-xl font-black text-lime">89%</strong>
            <small className="text-[11px] text-gray-400">Win rate</small>
          </div>
          <div className="bg-white/5 rounded-2xl px-4 py-3 border border-white/5">
            <strong className="block text-xl font-black text-white">4</strong>
            <small className="text-[11px] text-gray-400">Titles</small>
          </div>
          <div className="bg-white/5 rounded-2xl px-4 py-3 border border-white/5">
            <strong className="block text-xl font-black text-emerald-400">12</strong>
            <small className="text-[11px] text-gray-400">Win streak</small>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
        {/* Table Head */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-paper/60 border-b border-line text-[11px] font-extrabold uppercase tracking-wider text-muted">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5 sm:col-span-4">Player & Club</div>
          <div className="col-span-2 text-center hidden sm:block">City</div>
          <div className="col-span-2 text-center hidden sm:block">Record</div>
          <div className="col-span-3 sm:col-span-2 text-center">Win Rate</div>
          <div className="col-span-3 sm:col-span-1 text-right">Rating</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-line">
          {players.map((p) => (
            <div
              key={p.rank}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-paper/40 transition-colors"
            >
              {/* Rank Column */}
              <div className="col-span-1 text-center font-mono font-black text-sm">
                {p.rank === "01" ? (
                  <span className="text-amber-500 font-extrabold">🥇</span>
                ) : p.rank === "02" ? (
                  <span className="text-gray-400 font-extrabold">🥈</span>
                ) : p.rank === "03" ? (
                  <span className="text-amber-700 font-extrabold">🥉</span>
                ) : (
                  <span className="text-muted">{p.rank}</span>
                )}
              </div>

              {/* Player Name & Avatar */}
              <div className="col-span-5 sm:col-span-4 flex items-center gap-3 min-w-0">
                <Avatar name={p.name} size="sm" />
                <div className="min-w-0">
                  <span className="text-sm font-bold text-ink block truncate">{p.name}</span>
                  <p className="text-xs text-muted truncate">{p.club}</p>
                </div>
              </div>

              {/* City */}
              <div className="col-span-2 text-center text-xs font-semibold text-muted hidden sm:block">
                {p.city}
              </div>

              {/* Record */}
              <div className="col-span-2 text-center text-xs font-mono font-bold text-ink hidden sm:block">
                {p.wins}
              </div>

              {/* Win Rate */}
              <div className="col-span-3 sm:col-span-2 text-center text-xs font-bold text-emerald-600">
                {p.winRate}
              </div>

              {/* Elo Rating */}
              <div className="col-span-3 sm:col-span-1 text-right font-mono font-black text-sm text-ink">
                {p.rating}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
