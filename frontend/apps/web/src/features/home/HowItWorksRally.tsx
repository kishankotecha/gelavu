"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Flame,
  CreditCard,
  Crown,
  RotateCcw,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Target,
  Check,
} from "lucide-react";
import {
  RealisticBadmintonRadar,
  RealisticVIPPassLanyard,
  RealisticTrophy,
  RealisticGoldMedal,
  RealisticShuttlecock,
  RealisticVerifiedShield,
  RealisticBadmintonRacket,
} from "@/components/common/RealisticSportsIcons";

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
  // --- Station Focus Filter & Stage Scroll ---
  const [activeStationIndex, setActiveStationIndex] = useState(0);
  const stageScrollRef = useRef<HTMLDivElement>(null);
  const [scrollerProgress, setScrollerProgress] = useState(0);

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

  // --- RASA Bottom Scroller Logic ---
  const scrollToStation = (index: number) => {
    setActiveStationIndex(index);
    if (!stageScrollRef.current) return;
    const container = stageScrollRef.current;
    const cards = container.querySelectorAll<HTMLElement>("[data-station-card]");
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const handleStageScroll = () => {
    if (!stageScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = stageScrollRef.current;
    const max = scrollWidth - clientWidth;
    if (max > 0) {
      const pct = Math.round((scrollLeft / max) * 100);
      setScrollerProgress(pct);
      if (pct < 33) setActiveStationIndex(0);
      else if (pct < 67) setActiveStationIndex(1);
      else setActiveStationIndex(2);
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setScrollerProgress(val);
    if (!stageScrollRef.current) return;
    const { scrollWidth, clientWidth } = stageScrollRef.current;
    const max = scrollWidth - clientWidth;
    stageScrollRef.current.scrollLeft = (val / 100) * max;
    if (val < 33) setActiveStationIndex(0);
    else if (val < 67) setActiveStationIndex(1);
    else setActiveStationIndex(2);
  };

  useEffect(() => {
    const el = stageScrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleStageScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleStageScroll);
  }, []);

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
      className="w-full bg-[#FAF8F5] py-24 sm:py-32 text-[#0B1220] relative overflow-hidden border-t border-[#E8E5DD]"
      id="how"
    >
      {/* Radiant Sunroom Palette Stadium Lights & Ambient Concourse Glow */}
      <div className="pointer-events-none absolute -left-48 top-1/6 h-[700px] w-[700px] rounded-full bg-[#DE9D35]/12 blur-[180px]" />
      <div className="pointer-events-none absolute -right-48 bottom-1/4 h-[700px] w-[700px] rounded-full bg-[#10B981]/10 blur-[180px]" />
      <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[1000px] rounded-full bg-[#F3D15A]/12 blur-[200px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ============================================================ */}
        {/* Section Header with Elevated Typography & Negative Space     */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#DE9D35]/40 shadow-xs backdrop-blur-xs">
            <RealisticShuttlecock size={20} />
            <span className="text-[11px] font-black uppercase tracking-widest text-[#855305]">
              THE COMPETITIVE CIRCUIT JOURNEY
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#DE9D35]" />
          </div>

          <h2 className="font-rogenz text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1220] tracking-wide leading-tight">
            Three steps. Game on.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Experience the interactive player journey from neighbourhood court radar to podium glory. Touch and test each station below.
          </p>
        </div>

        {/* ============================================================ */}
        {/* Architectural 3-Station Stage (Panoramic Horizontal Panorama)*/}
        {/* ============================================================ */}
        <div
          ref={stageScrollRef}
          className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          
          {/* ---------------------------------------------------------- */}
          {/* STATION 01: Smart Radar Discovery                          */}
          {/* ---------------------------------------------------------- */}
          <div
            data-station-card="0"
            className={`min-w-[320px] sm:min-w-[380px] lg:min-w-0 flex-1 snap-center group relative rounded-[36px] bg-white border border-[#E2E6DD] shadow-[0_20px_50px_rgba(16,185,129,0.06)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              activeStationIndex === 0 ? "ring-2 ring-emerald-500/40 shadow-emerald-500/10" : ""
            }`}
          >
            {/* Top Amber-Emerald Gradient Ambient Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-[#DE9D35] to-emerald-400" />

            {/* Station Spotlight Header */}
            <div className="p-7 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs group-hover:scale-105 transition-transform">
                    <RealisticBadmintonRadar size={52} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                      STATION 01 · SMART RADAR
                    </span>
                    <h3 className="text-2xl font-black text-[#0B1220] tracking-tight mt-0.5">
                      Find your event
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-3xl font-black text-slate-200 group-hover:text-emerald-600/30 transition-colors">
                  01
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Filter by city, level, date and category. Real court slots, clear entry fees, and verified hosts.
              </p>

              {/* Interactive Radar Discovery HUD (Seamless, Zero Box Nesting) */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Court Zone:
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {activeDistrict.distance} near you
                  </span>
                </div>

                {/* Tactile District Selector Pills */}
                <div className="grid grid-cols-2 gap-2">
                  {RADAR_DISTRICTS.map((d) => {
                    const isSelected = d.id === activeDistrictId;
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setActiveDistrictId(d.id)}
                        className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? "bg-emerald-700 text-white shadow-sm font-black"
                            : "bg-[#F7F6F0] text-slate-700 hover:bg-slate-200/80 border border-slate-200/80"
                        }`}
                      >
                        <span className="truncate">{d.name}</span>
                        {isSelected && <Target className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Scanned Tournament Result (Tactile Showcase Badge) */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F9F8F3] to-[#F1EFEA] border border-[#DE9D35]/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0B1220] truncate">
                      {activeDistrict.tournament}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {activeDistrict.slotsLeft} Slots Left
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#DE9D35] shrink-0" />
                      {activeDistrict.venue}
                    </span>
                    <span className="font-mono font-black text-amber-900 shrink-0">
                      {activeDistrict.fee}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-xs">
                    <span className="text-slate-500 font-medium">{activeDistrict.date}</span>
                    <span className="text-emerald-700 font-black">
                      Prize: {activeDistrict.prize}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Station Anchor Pill */}
            <div className="px-7 py-4 bg-[#F8F7F2] border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <Sparkles className="w-3.5 h-3.5 text-[#DE9D35]" /> Instant neighbourhood discovery
              </span>
              <span className="text-slate-400 group-hover:text-emerald-700 transition-colors">
                Tap to explore →
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* STATION 02: Holographic VIP Pass & 1-Tap Entry             */}
          {/* ---------------------------------------------------------- */}
          <div
            data-station-card="1"
            className={`min-w-[320px] sm:min-w-[380px] lg:min-w-0 flex-1 snap-center group relative rounded-[36px] bg-white border border-[#E2E6DD] shadow-[0_20px_50px_rgba(217,111,85,0.06)] hover:shadow-[0_25px_60px_rgba(217,111,85,0.12)] hover:border-[#D96F55]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              activeStationIndex === 1 ? "ring-2 ring-[#D96F55]/40 shadow-orange-500/10" : ""
            }`}
          >
            {/* Top Coral-Gold Gradient Ambient Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-[#D96F55] via-amber-400 to-[#D96F55]" />

            {/* Station Spotlight Header */}
            <div className="p-7 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-2xl bg-orange-50 border border-orange-200 shadow-2xs group-hover:scale-105 transition-transform">
                    <RealisticVIPPassLanyard size={52} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#D96F55] block">
                      STATION 02 · 1-TAP CHECKOUT
                    </span>
                    <h3 className="text-2xl font-black text-[#0B1220] tracking-tight mt-0.5">
                      Enter in seconds
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-3xl font-black text-slate-200 group-hover:text-[#D96F55]/30 transition-colors">
                  02
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Pick a category, add your partner and pay securely with UPI, card or wallet. 100% escrow protection.
              </p>

              {/* Interactive Pass Category Toggle & Pass Body */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Format:
                  </span>
                  <span className="text-xs font-mono font-bold text-orange-900 bg-orange-100/80 px-2.5 py-0.5 rounded-full border border-orange-200">
                    #GLV-2026-PASS
                  </span>
                </div>

                {/* Tactile Category Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDoubles(false);
                      setIsPassLocked(false);
                    }}
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer ${
                      !isDoubles
                        ? "bg-[#D96F55] text-white shadow-sm font-black"
                        : "bg-[#F7F6F0] text-slate-700 hover:bg-slate-200/80 border border-slate-200/80"
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
                    className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer ${
                      isDoubles
                        ? "bg-[#D96F55] text-white shadow-sm font-black"
                        : "bg-[#F7F6F0] text-slate-700 hover:bg-slate-200/80 border border-slate-200/80"
                    }`}
                  >
                    Doubles (+ Partner)
                  </button>
                </div>

                {/* Pass Roster & Fee Split Action */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FDF9F5] to-[#F8F2EC] border border-[#D96F55]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1.5">
                        <span className="h-6 w-6 rounded-full bg-[#DE9D35] text-[#0B1220] text-[10px] font-black flex items-center justify-center border border-white">
                          AM
                        </span>
                        {isDoubles && (
                          <span className="h-6 w-6 rounded-full bg-[#D96F55] text-white text-[10px] font-black flex items-center justify-center border border-white">
                            NR
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-black text-[#0B1220]">
                        {isDoubles ? "Arjun & Nikhil Linked" : "Arjun Mehta (Solo)"}
                      </span>
                    </div>

                    <span className="text-[10px] font-black text-orange-900 bg-orange-100 px-2.5 py-0.5 rounded-full border border-orange-300">
                      {isDoubles ? "Doubles Slot" : "Singles Slot"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-orange-200/60">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-[#D96F55]" />
                      {isDoubles ? "Split ₹379 / player" : "UPI 1-Tap Entry"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsPassLocked(!isPassLocked)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                        isPassLocked
                          ? "bg-emerald-600 text-white font-black"
                          : "bg-orange-100 text-orange-900 border border-orange-300 hover:bg-orange-200"
                      }`}
                    >
                      {isPassLocked ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Pass Locked</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D96F55]" />
                          <span>Lock Pass</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Station Anchor Pill */}
            <div className="px-7 py-4 bg-[#F8F7F2] border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5 text-orange-700">
                <RealisticVerifiedShield size={16} /> 100% refund escrow protection
              </span>
              <span className="text-slate-400 group-hover:text-[#D96F55] transition-colors">
                Tap to explore →
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* STATION 03: Play. Score Live. Rise. (Championship Gold)    */}
          {/* ---------------------------------------------------------- */}
          <div
            data-station-card="2"
            className={`min-w-[320px] sm:min-w-[380px] lg:min-w-0 flex-1 snap-center group relative rounded-[36px] bg-white border border-[#E2E6DD] shadow-[0_20px_50px_rgba(222,157,53,0.06)] hover:shadow-[0_25px_60px_rgba(222,157,53,0.12)] hover:border-[#DE9D35]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              activeStationIndex === 2 ? "ring-2 ring-[#DE9D35]/40 shadow-amber-500/10" : ""
            }`}
          >
            {/* Top Gold-Amber Gradient Ambient Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-[#DE9D35] via-amber-300 to-[#F3D15A]" />

            {/* Station Spotlight Header */}
            <div className="p-7 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs group-hover:scale-105 transition-transform">
                    <RealisticTrophy size={52} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#855305] block">
                      STATION 03 · PODIUM &amp; ELO
                    </span>
                    <h3 className="text-2xl font-black text-[#0B1220] tracking-tight mt-0.5">
                      Play. Score live. Rise.
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-3xl font-black text-slate-200 group-hover:text-[#DE9D35]/30 transition-colors">
                  03
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                Get match calls, follow live court scores and turn every tournament result into official city ranking.
              </p>

              {/* Interactive Match Point Simulator */}
              <div className="pt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Court 2 Finals:
                  </span>
                  {matchPointPlayed ? (
                    <button
                      type="button"
                      onClick={handleResetMatch}
                      className="text-xs font-bold text-[#855305] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  ) : (
                    <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Match Point 20–19
                    </span>
                  )}
                </div>

                {/* Smash Action Button */}
                <button
                  type="button"
                  onClick={handleSimulateSmash}
                  disabled={matchPointPlayed}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
                    matchPointPlayed
                      ? "bg-emerald-600 text-white shadow-md scale-[1.01]"
                      : "bg-gradient-to-r from-[#DE9D35] via-[#F3D15A] to-[#DE9D35] text-[#0B1220] hover:brightness-105 active:scale-98"
                  }`}
                >
                  <Flame className="w-4 h-4 fill-current text-[#0B1220]" />
                  <span>
                    {matchPointPlayed ? "⚡ 400 KM/H SMASH LANDED! 🏆" : "Hit Jump Smash for Match Point!"}
                  </span>
                </button>

                {/* Live Stadium Scoreboard & Dynamic Elo */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FDFBF7] to-[#F8F4EC] border border-[#DE9D35]/40 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                        matchPointPlayed
                          ? "bg-emerald-100 border-emerald-300 text-emerald-950 font-black"
                          : "bg-white border-slate-200 text-slate-800 font-bold"
                      }`}
                    >
                      <span className="truncate">Mehta / Rao</span>
                      <span className="font-mono text-base font-black text-emerald-700">
                        {playerScore}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-slate-500">
                      <span className="truncate">Shah / Hegde</span>
                      <span className="font-mono text-base font-bold">19</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-xs">
                    <span className="text-[#855305] font-bold flex items-center gap-1.5">
                      <RealisticGoldMedal size={18} />
                      {matchPointPlayed ? "Gold Title Secured" : "Circuit Seed #1"}
                    </span>
                    <span className="text-emerald-700 font-mono font-black">
                      {eloGain > 0 ? `+${eloGain} Circuit Elo!` : "+0 Elo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Station Anchor Pill */}
            <div className="px-7 py-4 bg-[#F8F7F2] border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1.5 text-amber-800">
                <RealisticBadmintonRacket size={16} /> Playo dynamic skill calibration
              </span>
              <span className="text-slate-400 group-hover:text-[#DE9D35] transition-colors">
                Tap to explore →
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RASA-STYLE INTEGRATED BOTTOM STATION SCROLLER TRACK          */}
        {/* ============================================================ */}
        <div className="rounded-3xl border-2 border-[#DE9D35]/30 bg-white/95 backdrop-blur-md p-4 sm:p-5 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-amber-100 text-[#855305] shadow-xs">
                <Sliders className="w-4 h-4 text-[#DE9D35]" />
              </div>
              <div>
                <span className="text-xs font-black text-[#0B1220] block">
                  Circuit Station Scroller
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Tap station or drag sideways to navigate Stations 01–03 · Interactive Circuit Simulator
                </span>
              </div>
            </div>

            {/* Direct Jump Station Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => scrollToStation(0)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStationIndex === 0
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-xs font-black"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>01 · Smart Radar</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToStation(1)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStationIndex === 1
                    ? "bg-[#D96F55] text-white border-[#D96F55] shadow-xs font-black"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>02 · VIP Pass</span>
              </button>

              <button
                type="button"
                onClick={() => scrollToStation(2)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeStationIndex === 2
                    ? "bg-[#DE9D35] text-[#0B1220] border-[#DE9D35] shadow-xs font-black"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-yellow-400" />
                <span>03 · Live Podium</span>
              </button>
            </div>
          </div>

          {/* RASA Horizontal Range Scrubber */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => scrollToStation(Math.max(0, activeStationIndex - 1))}
              disabled={activeStationIndex === 0}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              aria-label="Previous station"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="relative flex-1 h-3 flex items-center">
              <input
                type="range"
                min="0"
                max="100"
                value={scrollerProgress}
                onChange={handleSliderChange}
                className="w-full h-2 rounded-full appearance-none bg-slate-200 accent-[#DE9D35] cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={() => scrollToStation(Math.min(2, activeStationIndex + 1))}
              disabled={activeStationIndex === 2}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              aria-label="Next station"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* The Finale Arena Portal with Interactive Season Simulator    */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden rounded-[36px] border-2 border-[#DE9D35]/60 shadow-[0_30px_90px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0D14] text-white">
          
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
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-xl font-black text-white">340+</span>
                  <span className="text-xs text-gray-400 font-medium">Verified Tournaments</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-xl font-black text-[#F3D15A]">100%</span>
                  <span className="text-xs text-gray-400 font-medium">Guaranteed Payouts</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <span className="block text-xl font-black text-emerald-400">Playo 90/10</span>
                  <span className="text-xs text-gray-400 font-medium">Skill Calibration</span>
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
