"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Crown,
  ShieldCheck,
  Search,
  MapPin,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface PlayerRank {
  rank: string;
  name: string;
  city: string;
  club: string;
  category: string;
  rating: number;
  tier: "Grand Master" | "Master" | "Circuit Pro" | "Challenger";
  record: string;
  winRate: string;
  titles: number;
  streak: number;
  trend: string;
  avatarUrl?: string;
}

const CIRCUIT_PLAYERS: PlayerRank[] = [
  // Men's Singles - Bengaluru
  {
    rank: "01",
    name: "Arjun Mehta",
    city: "Bengaluru",
    club: "Game Theory Indiranagar",
    category: "Men's Singles",
    rating: 1842,
    tier: "Grand Master",
    record: "18-2",
    winRate: "89%",
    titles: 4,
    streak: 12,
    trend: "+24",
    avatarUrl: "/images/athletes/arjun-mehta.jpg",
  },
  {
    rank: "02",
    name: "Nikhil Rao",
    city: "Bengaluru",
    club: "SmashZone Koramangala",
    category: "Men's Singles",
    rating: 1809,
    tier: "Grand Master",
    record: "16-3",
    winRate: "84%",
    titles: 3,
    streak: 7,
    trend: "+16",
    avatarUrl: "/images/athletes/nikhil-rao.jpg",
  },
  {
    rank: "03",
    name: "Rohan Shah",
    city: "Mysuru",
    club: "Ace Badminton Mysuru",
    category: "Men's Singles",
    rating: 1751,
    tier: "Master",
    record: "14-4",
    winRate: "78%",
    titles: 2,
    streak: 4,
    trend: "+8",
    avatarUrl: "/images/athletes/rohan-shah.jpg",
  },
  {
    rank: "04",
    name: "Aditya Hegde",
    city: "Bengaluru",
    club: "Feather Club Sector 2, HSR",
    category: "Men's Singles",
    rating: 1715,
    tier: "Master",
    record: "12-3",
    winRate: "80%",
    titles: 2,
    streak: 5,
    trend: "+12",
  },
  {
    rank: "05",
    name: "Varun Shenoy",
    city: "Mangaluru",
    club: "Coast Shuttlers Academy",
    category: "Men's Singles",
    rating: 1682,
    tier: "Master",
    record: "11-5",
    winRate: "69%",
    titles: 1,
    streak: 3,
    trend: "-4",
  },
  {
    rank: "06",
    name: "Kiran Shah",
    city: "Bengaluru",
    club: "Suraksha Arena Whitefield",
    category: "Men's Singles",
    rating: 1650,
    tier: "Circuit Pro",
    record: "10-4",
    winRate: "71%",
    titles: 1,
    streak: 2,
    trend: "+6",
  },

  // Mumbai Players
  {
    rank: "07",
    name: "Siddharth Deshmukh",
    city: "Mumbai",
    club: "Bandra Gymkhana",
    category: "Men's Singles",
    rating: 1815,
    tier: "Grand Master",
    record: "17-2",
    winRate: "89%",
    titles: 3,
    streak: 9,
    trend: "+28",
  },
  {
    rank: "08",
    name: "Pranav Kulkarni",
    city: "Mumbai",
    club: "Andheri Sports Complex",
    category: "Men's Singles",
    rating: 1740,
    tier: "Master",
    record: "13-4",
    winRate: "76%",
    titles: 2,
    streak: 4,
    trend: "+14",
  },

  // Delhi NCR Players
  {
    rank: "09",
    name: "Kabir Malhotra",
    city: "Delhi NCR",
    club: "Siri Fort Sports Complex",
    category: "Men's Singles",
    rating: 1828,
    tier: "Grand Master",
    record: "19-3",
    winRate: "86%",
    titles: 4,
    streak: 8,
    trend: "+22",
  },
  {
    rank: "10",
    name: "Aman Verma",
    city: "Delhi NCR",
    club: "Saket Sports Club",
    category: "Men's Singles",
    rating: 1695,
    tier: "Master",
    record: "12-5",
    winRate: "70%",
    titles: 1,
    streak: 3,
    trend: "+10",
  },

  // Hyderabad Players
  {
    rank: "11",
    name: "Vikram Varma",
    city: "Hyderabad",
    club: "Gachibowli Stadium",
    category: "Men's Singles",
    rating: 1835,
    tier: "Grand Master",
    record: "18-3",
    winRate: "85%",
    titles: 3,
    streak: 11,
    trend: "+30",
  },

  // Women's Singles
  {
    rank: "01",
    name: "Meera Iyer",
    city: "Bengaluru",
    club: "PLaY Arena Sarjapur",
    category: "Women's Singles",
    rating: 1860,
    tier: "Grand Master",
    record: "21-1",
    winRate: "95%",
    titles: 5,
    streak: 15,
    trend: "+35",
  },
  {
    rank: "02",
    name: "Ananya Joshi",
    city: "Mumbai",
    club: "Shivaji Park Badminton Club",
    category: "Women's Singles",
    rating: 1785,
    tier: "Master",
    record: "15-3",
    winRate: "83%",
    titles: 3,
    streak: 6,
    trend: "+18",
  },
  {
    rank: "03",
    name: "Tanvi Sharma",
    city: "Delhi NCR",
    club: "Noida Indoor Stadium",
    category: "Women's Singles",
    rating: 1720,
    tier: "Master",
    record: "13-4",
    winRate: "76%",
    titles: 2,
    streak: 4,
    trend: "+12",
  },

  // Men's Doubles
  {
    rank: "01",
    name: "Arjun Mehta & Nikhil Rao",
    city: "Bengaluru",
    club: "Game Theory / SmashZone",
    category: "Men's Doubles",
    rating: 1890,
    tier: "Grand Master",
    record: "24-2",
    winRate: "92%",
    titles: 6,
    streak: 14,
    trend: "+40",
    avatarUrl: "/images/athletes/arjun-mehta.jpg",
  },
  {
    rank: "02",
    name: "Rohan Shah & Aditya Hegde",
    city: "Bengaluru",
    club: "Ace Badminton / HSR",
    category: "Men's Doubles",
    rating: 1795,
    tier: "Master",
    record: "18-5",
    winRate: "78%",
    titles: 3,
    streak: 5,
    trend: "+15",
  },
  {
    rank: "03",
    name: "Siddharth Deshmukh & Pranav Kulkarni",
    city: "Mumbai",
    club: "Bandra Gymkhana / Andheri",
    category: "Men's Doubles",
    rating: 1770,
    tier: "Master",
    record: "16-4",
    winRate: "80%",
    titles: 2,
    streak: 6,
    trend: "+18",
  },

  // Mixed Doubles
  {
    rank: "01",
    name: "Kiran & Meera Iyer",
    city: "Bengaluru",
    club: "PLaY Arena Sarjapur",
    category: "Mixed Doubles",
    rating: 1845,
    tier: "Grand Master",
    record: "19-2",
    winRate: "90%",
    titles: 4,
    streak: 10,
    trend: "+26",
  },
  {
    rank: "02",
    name: "Kabir Malhotra & Tanvi Sharma",
    city: "Delhi NCR",
    club: "Siri Fort / Noida",
    category: "Mixed Doubles",
    rating: 1765,
    tier: "Master",
    record: "14-3",
    winRate: "82%",
    titles: 2,
    streak: 5,
    trend: "+15",
  },
];

const CITIES = ["All India", "Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Mysuru"];
const CATEGORIES = ["Men's Singles", "Women's Singles", "Men's Doubles", "Mixed Doubles"];

export function RankingsDirectory() {
  const [selectedCity, setSelectedCity] = useState("All India");
  const [selectedCategory, setSelectedCategory] = useState("Men's Singles");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = useMemo(() => {
    return CIRCUIT_PLAYERS.filter((p) => {
      // Category match
      if (p.category !== selectedCategory) return false;

      // City match
      if (selectedCity !== "All India" && p.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.club.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
        );
      }

      return true;
    }).sort((a, b) => b.rating - a.rating);
  }, [selectedCategory, selectedCity, searchQuery]);

  const spotlightPlayer = filteredPlayers[0] || CIRCUIT_PLAYERS[0];

  return (
    <div className="space-y-10 sm:space-y-14 font-sans">
      
      {/* ============================================================ */}
      {/* HERO SECTION: High-Converting SEO Circuit Authority Banner   */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-navy text-white p-6 sm:p-10 shadow-2xl border border-navy/20 relative overflow-hidden">
        {/* Subtle decorative badminton court geometry */}
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-96 h-96 opacity-10" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="2">
            <rect x="10" y="10" width="180" height="180" rx="8" />
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="10" y1="100" x2="190" y2="100" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-coral/30 text-coral text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span>OFFICIAL BADMINTON CIRCUIT STANDINGS · 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              City Circuit Badminton Rankings
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              BWF-calibrated Elo ratings calculated live after every officially sanctioned tournament.
              Compete in local district opens, rise through the ranking tiers, and build your permanent athlete profile.
            </p>

            {/* 4 Trust & Ranking Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <ShieldCheck className="w-4 h-4 text-coral shrink-0" />
                <span className="font-semibold text-white">BWF-Aligned Elo</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Trophy className="w-4 h-4 text-coral shrink-0" />
                <span className="font-semibold text-white">Verified Matches</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Sparkles className="w-4 h-4 text-coral shrink-0" />
                <span className="font-semibold text-white">Live Points Sync</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                <Flame className="w-4 h-4 text-coral shrink-0" />
                <span className="font-semibold text-white">District Seeds</span>
              </div>
            </div>
          </div>

          {/* Circuit Status Quick Box */}
          <div className="shrink-0 w-full lg:w-72 bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">Circuit Status</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full border border-coral/20">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-ping" />
                Live Season
              </span>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rated Athletes</span>
                <span className="font-bold text-white text-sm">1,420+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Officiated Matches</span>
                <span className="font-bold text-white text-sm">14,820</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Active Metro Circuits</span>
                <span className="font-bold text-white text-sm">5 Cities</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-slate-400">Weekly Calibration</span>
                <span className="font-black text-coral">Sun 11:59 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SPOTLIGHT: Player of the Month Showcase Card                 */}
      {/* ============================================================ */}
      {spotlightPlayer && (
        <div className="rounded-3xl bg-white border-2 border-navy/10 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative shrink-0">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-cover bg-center border-4 border-coral shadow-lg bg-navy"
                style={{
                  backgroundImage: spotlightPlayer.avatarUrl
                    ? `url(${spotlightPlayer.avatarUrl})`
                    : "url(/images/athletes/arjun-mehta.jpg)",
                }}
              />
              <div className="absolute -bottom-2 -right-2 bg-navy text-coral p-1.5 rounded-xl border border-white shadow-md">
                <Crown className="w-4 h-4 text-coral" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-coral/15 border border-coral/30 text-coral text-[10px] font-black uppercase tracking-wider">
                  CIRCUIT LEADER · SEED #1
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {spotlightPlayer.city} · {spotlightPlayer.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy tracking-tight">
                {spotlightPlayer.name}
              </h2>
              <p className="text-xs font-semibold text-slate-600">
                {spotlightPlayer.club} · {spotlightPlayer.tier} Tier
              </p>
            </div>
          </div>

          {/* 3 Metric Badges in Solid Brand Palette */}
          <div className="grid grid-cols-3 gap-2.5 w-full md:w-auto text-center shrink-0">
            <div className="bg-[#FAF6F0] rounded-2xl px-4 py-3 border border-navy/10">
              <strong className="block text-xl font-black text-navy">
                {spotlightPlayer.winRate}
              </strong>
              <small className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">
                Win Rate
              </small>
            </div>
            <div className="bg-[#FAF6F0] rounded-2xl px-4 py-3 border border-navy/10">
              <strong className="block text-xl font-black text-navy">
                {spotlightPlayer.titles}
              </strong>
              <small className="text-[10px] text-slate-600 uppercase font-bold tracking-wider">
                Titles Won
              </small>
            </div>
            <div className="bg-[#FAF6F0] rounded-2xl px-4 py-3 border border-navy/10">
              <strong className="block text-xl font-black text-coral">
                {spotlightPlayer.streak}
              </strong>
              <small className="text-[10px] text-slate-600 uppercase font-bold tracking-wider flex items-center justify-center gap-0.5">
                <Flame className="w-3 h-3 text-coral inline" /> Streak
              </small>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FILTER & SEARCH COMMAND CONSOLE                              */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {/* Row 1: City Chips & Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">
              Filter by City:
            </span>
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCity(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCity === c
                    ? "bg-navy text-white shadow-xs font-black"
                    : "bg-white border border-navy/15 text-slate-700 hover:border-navy/30"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search player, club, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-full bg-white border border-navy/15 text-xs font-semibold text-navy placeholder:text-slate-400 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Row 2: Category Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => {
              const on = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    on
                      ? "bg-coral text-navy shadow-xs font-black border border-coral"
                      : "bg-white border border-navy/15 text-slate-700 hover:border-navy/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Showing {filteredPlayers.length} ranked athletes in {selectedCity}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CIRCUIT LEADERBOARD TABLE                                    */}
      {/* ============================================================ */}
      <div className="overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAF6F0] border-b border-navy/10 text-[11px] uppercase font-black text-navy tracking-wider">
              <tr>
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Player & Club</th>
                <th className="py-3.5 px-4 hidden sm:table-cell">City / District</th>
                <th className="py-3.5 px-4 text-center">Record (W-L)</th>
                <th className="py-3.5 px-4 text-center hidden md:table-cell">Win Rate</th>
                <th className="py-3.5 px-4 text-right">Circuit Elo</th>
                <th className="py-3.5 px-4 text-right hidden sm:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10 text-navy bg-white">
              {filteredPlayers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    No ranked athletes matching your search criteria. Try selecting &quot;All India&quot;.
                  </td>
                </tr>
              ) : (
                filteredPlayers.map((player, idx) => {
                  const isGold = idx === 0;
                  const isSilver = idx === 1;
                  const isBronze = idx === 2;

                  return (
                    <tr
                      key={player.name + idx}
                      className="hover:bg-[#FAF6F0]/60 transition-colors group cursor-pointer"
                    >
                      {/* Rank Number */}
                      <td className="py-3.5 px-4 text-center font-black">
                        <span
                          className={`inline-grid h-7 w-7 place-items-center rounded-full text-xs font-black ${
                            isGold
                              ? "bg-coral text-navy shadow-sm"
                              : isSilver
                              ? "bg-slate-200 text-navy"
                              : isBronze
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "text-slate-500 font-mono"
                          }`}
                        >
                          {player.rank}
                        </span>
                      </td>

                      {/* Player Name & Club */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full bg-navy/10 border border-navy/15 bg-cover bg-center shrink-0"
                            style={{
                              backgroundImage: player.avatarUrl
                                ? `url(${player.avatarUrl})`
                                : undefined,
                            }}
                          >
                            {!player.avatarUrl && (
                              <div className="w-full h-full flex items-center justify-center font-bold text-xs text-navy">
                                {player.name.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-navy group-hover:text-coral transition-colors block">
                              {player.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                              {player.club}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* City */}
                      <td className="py-3.5 px-4 hidden sm:table-cell text-xs font-semibold text-slate-600">
                        {player.city}
                      </td>

                      {/* Record */}
                      <td className="py-3.5 px-4 text-center text-xs font-mono font-bold text-navy">
                        {player.record}
                      </td>

                      {/* Win Rate */}
                      <td className="py-3.5 px-4 text-center hidden md:table-cell text-xs font-black text-navy">
                        {player.winRate}
                      </td>

                      {/* Elo Rating */}
                      <td className="py-3.5 px-4 text-right">
                        <strong className="text-base font-black text-navy font-mono">
                          {player.rating}
                        </strong>
                        <span className="block text-[10px] uppercase font-bold text-slate-400">
                          {player.tier}
                        </span>
                      </td>

                      {/* Trend */}
                      <td className="py-3.5 px-4 text-right hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center gap-0.5 text-xs font-bold font-mono ${
                            player.trend.startsWith("+")
                              ? "text-emerald-700 font-black"
                              : "text-rose-600 font-black"
                          }`}
                        >
                          {player.trend.startsWith("+") ? "↑" : "↓"} {player.trend}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HOW CIRCUIT ELO WORKS & RATING TIERS GUIDE                   */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-white border border-navy/15 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <span className="text-coral text-xs font-black uppercase tracking-wider block">
            CALIBRATION & TIER METHODOLOGY
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
            How Gelavu Circuit Elo Ratings Work
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl">
            Every match played in a sanctioned tournament awards rating points based on match margins,
            opponent strength, and tournament tier multipliers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-navy/10 space-y-1.5">
            <span className="text-xs font-black text-coral uppercase tracking-wider">
              1800+ ELO
            </span>
            <h3 className="text-base font-black text-navy">Grand Master</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              State & national circuit champions, top 2% of registered tournament athletes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-navy/10 space-y-1.5">
            <span className="text-xs font-black text-navy uppercase tracking-wider">
              1650 – 1799 ELO
            </span>
            <h3 className="text-base font-black text-navy">Master</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Regular tournament semi-finalists and district club tier-1 competitive players.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-navy/10 space-y-1.5">
            <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
              1500 – 1649 ELO
            </span>
            <h3 className="text-base font-black text-navy">Circuit Pro</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Intermediate-plus contenders with verified match wins across city open brackets.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-navy/10 space-y-1.5">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              1300 – 1499 ELO
            </span>
            <h3 className="text-base font-black text-navy">Challenger</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Amateur & weekend shuttlers entering verified competitive circuits for the first time.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CLAIM PROFILE & ENTER TOURNAMENT CTA                         */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-navy text-white p-6 sm:p-10 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-coral text-xs font-black uppercase tracking-wider">
            <Award className="w-4 h-4 text-coral" />
            <span>CLAIM YOUR ATHLETE ID</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Played in a Gelavu tournament? Get your verified badge.
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
            Track your head-to-head match history, download high-res achievement cards, and get seeded in your city&apos;s next open tournament.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/tournaments"
            className="bg-coral hover:bg-coral/90 text-navy font-black text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Enter a Tournament</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-full transition-colors cursor-pointer"
          >
            Claim Athlete Profile
          </Link>
        </div>
      </section>

    </div>
  );
}
