"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Zap,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Flame,
  CreditCard,
  Crown,
  QrCode,
  ShieldCheck,
  Medal,
  RotateCcw,
  Sliders,
  ChevronRight,
  Target,
  Check,
} from "lucide-react";

interface HowItWorksRallyProps {
  onJoin?: () => void;
}

// 1. Radar Districts Data
const RADAR_DISTRICTS = [
  {
    id: "indiranagar",
    name: "Indiranagar",
    venue: "Game Theory Indiranagar",
    tournament: "Indiranagar City Open",
    distance: "2.1 km",
    prize: "₹25,000",
    slotsLeft: 4,
    fee: "₹699",
    category: "Men's Singles & Doubles",
    date: "This Saturday",
  },
  {
    id: "koramangala",
    name: "Koramangala",
    venue: "SmashZone Koramangala",
    tournament: "South Bengaluru Masters",
    distance: "4.3 km",
    prize: "₹18,000",
    slotsLeft: 6,
    fee: "₹799",
    category: "Mixed Doubles Special",
    date: "This Sunday",
  },
  {
    id: "whitefield",
    name: "Whitefield",
    venue: "Play360 Sports Complex",
    tournament: "Cyber Smash Grand Prix",
    distance: "7.8 km",
    prize: "₹35,000",
    slotsLeft: 2,
    fee: "₹899",
    category: "Open Singles Championship",
    date: "Next Weekend",
  },
  {
    id: "hsr",
    name: "HSR Layout",
    venue: "Feather Club Sector 2",
    tournament: "HSR Weekend Rallies",
    distance: "3.5 km",
    prize: "₹15,000",
    slotsLeft: 8,
    fee: "₹599",
    category: "Intermediate Singles",
    date: "This Friday Eve",
  },
];

export function HowItWorksRally({ onJoin }: HowItWorksRallyProps) {
  // --- Step 1 State: Interactive Radar ---
  const [activeDistrictId, setActiveDistrictId] = useState("indiranagar");
  const activeDistrict = useMemo(
    () => RADAR_DISTRICTS.find((d) => d.id === activeDistrictId) || RADAR_DISTRICTS[0],
    [activeDistrictId]
  );

  // --- Step 2 State: Interactive VIP Pass & Partner Split ---
  const [isDoubles, setIsDoubles] = useState(true);
  const [isPassLocked, setIsPassLocked] = useState(false);

  // --- Step 3 State: Interactive Match Point & Elo Simulator ---
  const [matchPointPlayed, setMatchPointPlayed] = useState(false);
  const [playerScore, setPlayerScore] = useState(20);
  const [eloGain, setEloGain] = useState(0);

  const handleSimulateSmash = () => {
    if (matchPointPlayed) return;
    setPlayerScore(21);
    setMatchPointPlayed(true);
    setEloGain(85);
  };

  const handleResetMatch = () => {
    setPlayerScore(20);
    setMatchPointPlayed(false);
    setEloGain(0);
  };

  // --- Finale Banner State: Interactive Season Calculator ---
  const [tournamentsPerMonth, setTournamentsPerMonth] = useState(2);
  const calculatedStats = useMemo(() => {
    const matches = tournamentsPerMonth * 4;
    const prizePotential = tournamentsPerMonth * 4500;
    const rankPercent = Math.max(1, 20 - tournamentsPerMonth * 4);
    return { matches, prizePotential, rankPercent };
  }, [tournamentsPerMonth]);

  return (
    <section
      className="w-full bg-[#0A0D14] py-20 sm:py-28 text-white relative overflow-hidden border-t border-[#313747]/40"
      id="how"
    >
      {/* Stadium Volumetric Floodlight Beams */}
      <div className="pointer-events-none absolute -left-48 top-1/6 h-[650px] w-[650px] rounded-full bg-[#DE9D35]/12 blur-[170px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[650px] w-[650px] rounded-full bg-[#91B979]/12 blur-[170px]" />
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[450px] w-[900px] rounded-full bg-[#F3D15A]/8 blur-[190px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ============================================================ */}
        {/* Section Header with Animated Shuttlecock Flight Indicator    */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#DE9D35]/15 via-[#F3D15A]/20 to-[#DE9D35]/15 border border-[#DE9D35]/40 shadow-[0_0_25px_rgba(222,157,53,0.2)]">
            <Sparkles className="w-4 h-4 text-[#F3D15A] animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#F3D15A]">
              THE COMPETITIVE CIRCUIT JOURNEY
            </span>
            <Sparkles className="w-4 h-4 text-[#DE9D35] animate-pulse" />
          </div>

          <h2 className="font-rogenz text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight">
            Three steps. Game on.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Experience the interactive player journey from neighbourhood court radar to podium glory. Touch and test each station below.
          </p>

          {/* Connected Neon Court Cord between Steps */}
          <div className="hidden md:flex items-center justify-center gap-3 pt-2 text-xs font-mono font-bold text-gray-400">
            <span className="flex items-center gap-1.5 text-[#F3D15A]">
              <span className="h-2 w-2 rounded-full bg-[#F3D15A] animate-ping" />
              01 · SCAN RADAR
            </span>
            <span className="h-[2px] w-16 bg-gradient-to-r from-[#F3D15A] to-[#D96F55]" />
            <span className="flex items-center gap-1.5 text-[#FB923C]">
              <span className="h-2 w-2 rounded-full bg-[#FB923C]" />
              02 · LOCK TICKET
            </span>
            <span className="h-[2px] w-16 bg-gradient-to-r from-[#D96F55] to-[#91B979]" />
            <span className="flex items-center gap-1.5 text-[#91B979]">
              <span className="h-2 w-2 rounded-full bg-[#91B979]" />
              03 · WIN &amp; RISE
            </span>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3 Interactive Cards (Out of the Box Playable Stations)       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
          
          {/* ---------------------------------------------------------- */}
          {/* STATION 01: Live Interactive Radar Scanner                 */}
          {/* ---------------------------------------------------------- */}
          <div className="group relative rounded-[28px] border border-[#313747]/80 bg-[#121622] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#DE9D35]/70 hover:shadow-[0_25px_60px_-10px_rgba(222,157,53,0.25)] flex flex-col justify-between overflow-hidden">
            
            {/* Top Glowing Ambient Highlight */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#DE9D35] to-transparent opacity-80" />

            {/* Visual Simulator: Interactive Court Radar */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#182032] to-[#121622] border-b border-[#313747]/60 space-y-4">
              
              {/* Header with Radar Ping & High-Tech Animated Sonar HUD */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full border border-emerald-500/50 bg-emerald-950/60 flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    <div className="absolute inset-1 rounded-full border border-emerald-500/25" />
                    <div className="absolute inset-2 rounded-full border border-emerald-500/25" />
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_280deg,rgba(16,185,129,0.6)_360deg)] animate-spin" style={{ animationDuration: "2.5s" }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 z-10 animate-ping" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-emerald-500/30 text-[10px] font-black text-emerald-400 shadow-inner">
                    RADAR · BENGALURU
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#F3D15A] bg-[#DE9D35]/15 px-2 py-0.5 rounded-md border border-[#DE9D35]/30">
                  {activeDistrict.distance}
                </span>
              </div>

              {/* District Selector Filter Pills (Interactive!) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Select Neighbourhood:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {RADAR_DISTRICTS.map((d) => {
                    const isSelected = d.id === activeDistrictId;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setActiveDistrictId(d.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-[#DE9D35] text-[#0A0D14] shadow-md font-black"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                        }`}
                      >
                        <span className="truncate">{d.name}</span>
                        {isSelected && <Target className="w-3 h-3 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Scanned Tournament Result Card */}
              <div className="p-3.5 rounded-2xl bg-[#0A0D14]/90 border border-[#DE9D35]/40 shadow-xl space-y-2 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-white truncate">
                    {activeDistrict.tournament}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0">
                    {activeDistrict.slotsLeft} Slots Left
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-300">
                  <span className="truncate flex items-center gap-1 text-gray-400">
                    <MapPin className="w-3 h-3 text-[#DE9D35] shrink-0" />
                    {activeDistrict.venue}
                  </span>
                  <span className="font-mono font-black text-[#F3D15A] shrink-0">
                    {activeDistrict.fee}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                  <span className="text-gray-400 font-medium">{activeDistrict.date}</span>
                  <span className="text-emerald-400 font-black">
                    Prize: {activeDistrict.prize}
                  </span>
                </div>
              </div>
            </div>

            {/* Step Description & Station Details */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border bg-[#DE9D35]/15 text-[#DE9D35] border-[#DE9D35]/30 shadow-md group-hover:bg-[#DE9D35] group-hover:text-[#0A0D14] transition-all duration-300">
                  <MapPin className="w-6 h-6 stroke-[2.3]" />
                </span>
                <span className="font-mono text-3xl font-black text-[#262c3e] group-hover:text-[#DE9D35]/50 transition-colors">
                  01
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#DE9D35] block mb-1">
                  STATION 01 · SMART RADAR
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Find your event
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                  Filter by city, level, date and category. Real slots, clear fees, verified hosts.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-gray-400">
                <span className="flex items-center gap-1 text-[#F3D15A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#DE9D35]" /> Instant neighbourhood discovery
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#DE9D35] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* STATION 02: Interactive VIP Pass & Partner Split           */}
          {/* ---------------------------------------------------------- */}
          <div className="group relative rounded-[28px] border border-[#313747]/80 bg-[#121622] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#D96F55]/70 hover:shadow-[0_25px_60px_-10px_rgba(217,111,85,0.25)] flex flex-col justify-between overflow-hidden">
            
            {/* Top Glowing Ambient Highlight */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D96F55] to-transparent opacity-80" />

            {/* Visual Simulator: Holographic Gold VIP Tournament Pass */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#20151C] to-[#121622] border-b border-[#313747]/60 space-y-4">
              
              {/* Pass Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-[#D96F55]/40 text-[10px] font-black text-[#FB923C] shadow-inner">
                  <QrCode className="w-3 h-3" />
                  HOLOGRAPHIC VIP PASS
                </span>
                <span className="text-[10px] font-mono font-bold text-gray-400">
                  #GLV-2026-PASS
                </span>
              </div>

              {/* Mode Toggle: Singles vs Doubles (Interactive!) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                  Category Format:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDoubles(false);
                      setIsPassLocked(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                      !isDoubles
                        ? "bg-[#D96F55] text-white shadow-md font-black"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    Singles (Solo)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDoubles(true);
                      setIsPassLocked(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold text-center transition-all cursor-pointer ${
                      isDoubles
                        ? "bg-[#D96F55] text-white shadow-md font-black"
                        : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                    }`}
                  >
                    Doubles (+ Partner)
                  </button>
                </div>
              </div>

              {/* Holographic Digital Pass Body */}
              <div className="p-3.5 rounded-2xl bg-[#0A0D14]/90 border border-[#D96F55]/40 shadow-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isDoubles ? (
                      <div className="flex -space-x-2">
                        <span className="h-6 w-6 rounded-full bg-[#DE9D35] text-[#0A0D14] text-[10px] font-black flex items-center justify-center border-2 border-[#0A0D14]">
                          AM
                        </span>
                        <span className="h-6 w-6 rounded-full bg-[#D96F55] text-white text-[10px] font-black flex items-center justify-center border-2 border-[#0A0D14]">
                          NR
                        </span>
                      </div>
                    ) : (
                      <span className="h-6 w-6 rounded-full bg-[#DE9D35] text-[#0A0D14] text-[10px] font-black flex items-center justify-center border-2 border-[#0A0D14]">
                        AM
                      </span>
                    )}
                    <span className="text-xs font-black text-white">
                      {isDoubles ? "Arjun & Nikhil Linked" : "Arjun Mehta (Solo)"}
                    </span>
                  </div>

                  <span className="text-[10px] font-black text-[#FB923C] bg-[#D96F55]/15 px-2 py-0.5 rounded-full border border-[#D96F55]/30">
                    {isDoubles ? "Doubles Slot" : "Singles Slot"}
                  </span>
                </div>

                {/* Pricing & Split Breakdown with Interactive Pass Lock */}
                <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-[10px]">
                  <span className="text-gray-300 font-medium flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-[#D96F55]" />
                    {isDoubles ? "Split ₹379 / player" : "UPI 1-Tap Entry"}
                  </span>
                  <span className="font-mono font-bold text-[#F3D15A]">
                    {isDoubles ? "₹758 Total" : "₹699 Total"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsPassLocked(!isPassLocked)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer flex items-center gap-1 shadow-sm ${
                      isPassLocked
                        ? "bg-emerald-500 text-[#0A0D14] font-black"
                        : "bg-[#D96F55]/20 text-[#FB923C] border border-[#D96F55]/40 hover:bg-[#D96F55]/30"
                    }`}
                  >
                    {isPassLocked ? (
                      <>
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Pass Confirmed</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Tap to Lock Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Step Description & Station Details */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border bg-[#D96F55]/15 text-[#D96F55] border-[#D96F55]/30 shadow-md group-hover:bg-[#D96F55] group-hover:text-white transition-all duration-300">
                  <Zap className="w-6 h-6 stroke-[2.3]" />
                </span>
                <span className="font-mono text-3xl font-black text-[#262c3e] group-hover:text-[#D96F55]/50 transition-colors">
                  02
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#D96F55] block mb-1">
                  STATION 02 · 1-TAP CHECKOUT
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Enter in seconds
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                  Pick a category, add your partner and pay securely with UPI, card or wallet.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-gray-400">
                <span className="flex items-center gap-1 text-[#FB923C]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D96F55]" /> 100% refund escrow protection
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#D96F55] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* STATION 03: Play. Score Live. Rise. (Interactive Smash)    */}
          {/* ---------------------------------------------------------- */}
          <div className="group relative rounded-[28px] border border-[#313747]/80 bg-[#121622] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-[#91B979]/70 hover:shadow-[0_25px_60px_-10px_rgba(145,185,121,0.25)] flex flex-col justify-between overflow-hidden">
            
            {/* Top Glowing Ambient Highlight */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#91B979] to-transparent opacity-80" />

            {/* Visual Simulator: Live Court Match Console */}
            <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#14221B] to-[#121622] border-b border-[#313747]/60 space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-rose-500/30 text-[10px] font-black text-rose-400 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  COURT 2 FINALS · LIVE
                </span>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-[#D96F55]" />
                  {matchPointPlayed ? "MATCH POINT WON!" : "Match Point 20–19"}
                </span>
              </div>

              {/* Interactive Smash Action Trigger */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <span>Interactive Match Point:</span>
                  {matchPointPlayed && (
                    <button
                      type="button"
                      onClick={handleResetMatch}
                      className="inline-flex items-center gap-1 text-[#F3D15A] hover:underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleSimulateSmash}
                  disabled={matchPointPlayed}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    matchPointPlayed
                      ? "bg-emerald-500 text-[#0A0D14] shadow-lg scale-[1.02]"
                      : "bg-gradient-to-r from-[#91B979] to-emerald-400 text-[#0A0D14] hover:brightness-105 active:scale-95 shadow-md"
                  }`}
                >
                  <Flame className="w-4 h-4 fill-current" />
                  <span>{matchPointPlayed ? "⚡ 400 KM/H SMASH LANDED! 🏆" : "Hit Jump Smash for Match Point!"}</span>
                </button>
              </div>

              {/* Live Digital Scoreboard */}
              <div className="p-3.5 rounded-2xl bg-[#0A0D14]/90 border border-[#91B979]/40 shadow-xl space-y-2">
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div
                    className={`p-2 rounded-xl border transition-all flex items-center justify-between ${
                      matchPointPlayed
                        ? "bg-emerald-500/20 border-emerald-400 text-white shadow-inner"
                        : "bg-white/5 border-white/5 text-gray-200"
                    }`}
                  >
                    <span className="font-bold truncate">Mehta / Rao</span>
                    <span className="font-mono font-black text-emerald-400 text-sm">
                      {playerScore}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-gray-400">
                    <span className="truncate">Shah / Hegde</span>
                    <span className="font-mono font-bold text-sm">19</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px]">
                  <span className="text-[#F3D15A] font-bold flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {matchPointPlayed ? "Gold Title Secured" : "Circuit Seed #1"}
                  </span>
                  <span className="text-emerald-400 font-mono font-black">
                    {eloGain > 0 ? `+${eloGain} Circuit Elo!` : "+0 Elo"}
                  </span>
                </div>
              </div>
            </div>

            {/* Step Description & Station Details */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border bg-[#91B979]/15 text-[#91B979] border-[#91B979]/30 shadow-md group-hover:bg-[#91B979] group-hover:text-[#0A0D14] transition-all duration-300">
                  <Trophy className="w-6 h-6 stroke-[2.3]" />
                </span>
                <span className="font-mono text-3xl font-black text-[#262c3e] group-hover:text-[#91B979]/50 transition-colors">
                  03
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#91B979] block mb-1">
                  STATION 03 · PODIUM &amp; ELO
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">
                  Play. Score live. Rise.
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mt-1.5">
                  Get match calls, follow live court scores and turn every result into your ranking.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-bold text-gray-400">
                <span className="flex items-center gap-1 text-[#91B979]">
                  <Medal className="w-3.5 h-3.5 text-[#91B979]" /> Playo dynamic skill calibration
                </span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#91B979] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* The Finale Arena Portal with Interactive Season Simulator    */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden rounded-[36px] border-2 border-[#DE9D35]/40 shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-gradient-to-br from-[#161C2C] via-[#121622] to-[#0A0D14]">
          
          {/* Live Tournament Arena Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{ backgroundImage: "url(/images/tournament-arena-live.jpg)" }}
          />

          {/* Golden Specular Highlights & Volumetric Flames */}
          <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#F3D15A] to-transparent" />
          <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#DE9D35]/20 blur-[130px]" />
          <div className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-[#91B979]/20 blur-[130px]" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Athletic Typography & Trust Credentials */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3D15A]/15 border border-[#F3D15A]/35 text-[#F3D15A] text-[10px] font-black uppercase tracking-widest shadow-sm">
                <Crown className="w-3.5 h-3.5 text-[#F3D15A]" />
                <span>OFFICIALLY SANCTIONED CIRCUIT</span>
              </div>

              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#DE9D35] block mb-1">
                  READY WHEN YOU ARE
                </span>
                <h2 className="font-rogenz text-4xl sm:text-6xl lg:text-7xl font-bold tracking-wide text-white leading-[1.05]">
                  Don’t just play.<br />
                  <span className="bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] bg-clip-text text-transparent drop-shadow-md">
                    Make it count.
                  </span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                Every score is verified by court officials. Every win earns city circuit standing, unlocks tournament prize pools, and builds your official athlete portfolio.
              </p>

              {/* 3 Verified Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-lg font-black text-white">340+</span>
                  <span className="text-[11px] text-gray-400 font-medium">Verified Tournaments</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-lg font-black text-[#F3D15A]">100%</span>
                  <span className="text-[11px] text-gray-400 font-medium">Guaranteed Payouts</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-lg font-black text-emerald-400">Playo 90/10</span>
                  <span className="text-[11px] text-gray-400 font-medium">Skill Calibration</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Season Calculator & Magnetic CTA */}
            <div className="lg:col-span-6 flex flex-col items-stretch space-y-5">
              
              {/* Interactive Player Season Calculator Console */}
              <div className="p-6 rounded-3xl bg-[#0A0D14]/90 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-[#F3D15A]" />
                    Simulate Your Circuit Season
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Interactive
                  </span>
                </div>

                {/* Slider Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-gray-300">Tournaments Entered / Month:</span>
                    <span className="font-mono text-base font-black text-[#F3D15A]">
                      {tournamentsPerMonth} {tournamentsPerMonth === 1 ? "Event" : "Events"}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={tournamentsPerMonth}
                    onChange={(e) => setTournamentsPerMonth(parseInt(e.target.value, 10))}
                    className="w-full h-2 rounded-lg bg-[#313747] accent-[#F3D15A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                    <span>1 Event</span>
                    <span>3 Events</span>
                    <span>5 Events (Pro Circuit)</span>
                  </div>
                </div>

                {/* Dynamic Calculated Season Projection */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">
                      Matches
                    </span>
                    <strong className="text-base font-black text-white font-mono">
                      ~{calculatedStats.matches}
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                    <span className="text-[10px] text-amber-300 uppercase font-bold block">
                      Prize Pool
                    </span>
                    <strong className="text-base font-black text-[#F3D15A] font-mono">
                      ₹{calculatedStats.prizePotential.toLocaleString()}
                    </strong>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                    <span className="text-[10px] text-emerald-300 uppercase font-bold block">
                      City Rank
                    </span>
                    <strong className="text-base font-black text-emerald-400 font-mono">
                      Top {calculatedStats.rankPercent}%
                    </strong>
                  </div>
                </div>
              </div>

              {/* Glowing High-Voltage Primary CTA */}
              <div className="relative group w-full">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
                
                {onJoin ? (
                  <button
                    onClick={onJoin}
                    type="button"
                    className="relative w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] hover:brightness-105 active:scale-[0.98] text-[#0A0D14] px-9 py-4 text-base font-black transition-all shadow-2xl cursor-pointer"
                  >
                    <span>Create your Gelavu profile</span>
                    <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-2 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="relative w-full inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] hover:brightness-105 active:scale-[0.98] text-[#0A0D14] px-9 py-4 text-base font-black transition-all shadow-2xl cursor-pointer"
                  >
                    <span>Create your Gelavu profile</span>
                    <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-2 transition-transform duration-200" />
                  </Link>
                )}
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Verified Athlete ID
                </span>
                <span className="h-3 w-[1px] bg-white/20" />
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 60-Second Setup
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
