"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Radio, UserPlus } from "lucide-react";

interface HeroRallyProps {
  city?: string;
  onJoin?: () => void;
}

export function HeroRally({ city = "Bengaluru", onJoin }: HeroRallyProps) {
  // Live countdown timer for "Next draw in ..."
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 14, seconds: 9 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 14, seconds: 9 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (num: number) => num.toString().padStart(2, "0");
  const timeString = `${formatDigits(countdown.hours)}:${formatDigits(countdown.minutes)}:${formatDigits(countdown.seconds)}`;

  return (
    <section className="relative w-full bg-[#0A0D14] p-2.5 sm:p-5 lg:p-6" id="top">
      {/* Outer Stadium Pure White Hero Card (Borderless High-Contrast Monochrome) */}
      <div className="relative w-full max-w-[1580px] mx-auto rounded-[24px] sm:rounded-[36px] overflow-hidden bg-white text-[#0B101B] shadow-2xl flex flex-col justify-between border-0">
        
        {/* ============================================================ */}
        {/* 1. ATHLETIC COURT BLUEPRINT SVG BACKGROUND                   */}
        {/* Crisp subtle court markings, center circle & service lines   */}
        {/* ============================================================ */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.07] text-black stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            {/* Outer Court Boundary */}
            <rect x="2.5%" y="3.5%" width="95%" height="93%" rx="24" strokeWidth="1.5" />
            
            {/* Court Center Line Horizontal */}
            <line x1="2.5%" y1="50%" x2="97.5%" y2="50%" strokeWidth="1.5" />
            
            {/* Court Center Line Vertical */}
            <line x1="50%" y1="3.5%" x2="50%" y2="96.5%" strokeWidth="1.5" />

            {/* Service Court Guideline Columns */}
            <line x1="28%" y1="3.5%" x2="28%" y2="96.5%" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />
            <line x1="72%" y1="3.5%" x2="72%" y2="96.5%" strokeWidth="1" strokeDasharray="6 6" opacity="0.6" />

            {/* Center Court Circle */}
            <circle cx="50%" cy="50%" r="160" strokeWidth="1.5" />
            <circle cx="50%" cy="50%" r="4" fill="currentColor" />
          </svg>
        </div>

        {/* ============================================================ */}
        {/* 2. MAIN HERO CONTENT GRID                                    */}
        {/* ============================================================ */}
        <div className="relative z-10 w-full px-5 sm:px-10 lg:px-14 xl:px-16 pt-7 sm:pt-10 lg:pt-14 pb-10 sm:pb-14 lg:pb-16">
          
          {/* Top Status Bar: Live Courts Badge & Draw Countdown */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pb-6 sm:pb-8">
            {/* Dark Live Courts Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0B101B] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-black tracking-wider shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D96F55] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D96F55]" />
              </span>
              <span>14 COURTS LIVE IN {city.toUpperCase()}</span>
            </div>

            {/* Frosted Next Draw Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-black/10 backdrop-blur-xs border border-black/15 text-[#0B101B] px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold font-mono tracking-tight">
              <span className="font-sans font-medium text-black/75">Next draw in</span>
              <span className="font-black text-[#0B101B]">{timeString}</span>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
            
            {/* -------------------------------------------------------- */}
            {/* LEFT COLUMN: HERO HEADLINE, SUBTEXT & CTAs              */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              
              {/* Bold Athletic Display Typography "WIN THE ROOM." */}
              <h1 className="font-rogenz text-7xl sm:text-8xl md:text-9xl lg:text-[116px] xl:text-[136px] uppercase tracking-[-0.02em] leading-[0.85] text-[#0B101B] select-none font-normal">
                <span className="block">WIN</span>
                <span className="block">THE</span>
                <span className="block pt-1 sm:pt-2">
                  <span className="inline-block bg-[#0B101B] text-[#F3D15A] px-4 sm:px-6 md:px-7 py-0.5 sm:py-1 rounded-2xl sm:rounded-3xl transform -rotate-1 shadow-2xl">
                    ROOM.
                  </span>
                </span>
              </h1>

              {/* Subheadline with Underline Accent */}
              <p className="text-base sm:text-lg md:text-xl text-black/90 font-medium leading-relaxed max-w-lg">
                Every weekend, someone&apos;s name goes on the wall.{" "}
                <button
                  type="button"
                  onClick={onJoin}
                  className="underline underline-offset-4 decoration-2 decoration-black/60 font-black hover:text-black hover:decoration-black transition-colors cursor-pointer"
                >
                  Make it yours.
                </button>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                {/* Primary Button: Claim a slot */}
                <button
                  type="button"
                  onClick={onJoin}
                  className="inline-flex items-center gap-3 rounded-full bg-[#0B101B] hover:bg-black text-white px-6 sm:px-7 py-3.5 text-sm sm:text-base font-black transition-all shadow-xl active:scale-[0.98] cursor-pointer group"
                >
                  <span>Claim a slot</span>
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-[#0B101B] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs">
                    <ArrowUpRight className="h-4 w-4 stroke-[2.8]" />
                  </span>
                </button>

                {/* Secondary Button: Watch live */}
                <Link
                  href="/tournaments"
                  className="inline-flex items-center gap-2.5 rounded-full border-2 border-black/80 hover:bg-black/10 active:scale-[0.98] text-[#0B101B] px-5 sm:px-6 py-3.5 text-sm sm:text-base font-black transition-all cursor-pointer"
                >
                  <Radio className="h-4 w-4 stroke-[2.5]" />
                  <span>Watch live</span>
                </Link>
              </div>

            </div>

            {/* -------------------------------------------------------- */}
            {/* RIGHT COLUMN: INTERACTIVE LIVE CARDS & BOOKING WIDGET    */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:ml-auto space-y-3.5 sm:space-y-4">
              
              {/* Card 1: Top Dark Live Score Card (Court 3 · Semi-Final) */}
              <Link
                href="/tournaments"
                className="block rounded-3xl bg-[#0B101B] p-5 sm:p-6 text-white shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:shadow-black/40 border border-white/5 cursor-pointer group"
                title="View match details"
              >
                {/* Top Row: Match identifier & Game 2 tag */}
                <div className="flex items-center justify-between pb-3 text-xs">
                  <div className="flex items-center gap-2 font-black uppercase tracking-wider text-white">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D96F55] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D96F55]" />
                    </span>
                    <span>COURT 3 · SEMI-FINAL</span>
                  </div>
                  <span className="text-xs font-bold text-white/45 tracking-wider">G2</span>
                </div>

                {/* Center Row: Player Names & Giant Live Score */}
                <div className="flex items-center justify-between py-2 sm:py-3">
                  <span className="text-base sm:text-lg font-black text-white group-hover:text-[#F3D15A] transition-colors truncate max-w-[120px]">
                    Arjun M.
                  </span>
                  <div className="flex items-center gap-2 font-mono font-black text-4xl sm:text-5xl tracking-tight">
                    <span className="text-white">12</span>
                    <span className="text-[#F3D15A]">:</span>
                    <span className="text-[#F3D15A]">14</span>
                  </div>
                  <span className="text-base sm:text-lg font-black text-white text-right truncate max-w-[120px]">
                    Nikhil R.
                  </span>
                </div>

                {/* Progress Bar with Marigold Active Indicator */}
                <div className="w-full bg-white/15 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#F3D15A] h-full w-[65%] rounded-full transition-all duration-500" />
                </div>

                {/* Footer Subtext */}
                <div className="pt-2.5 text-xs text-white/60 font-medium">
                  Match point · Nikhil serving
                </div>
              </Link>

              {/* Card 2 & 3: Two White Mini Live Score Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Court 1 */}
                <Link
                  href="/tournaments"
                  className="bg-white rounded-2xl p-4 shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer block border border-gray-100"
                >
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#D96F55]">
                    LIVE · COURT 1
                  </div>
                  <div className="font-mono text-3xl sm:text-4xl font-black text-[#0B101B] my-1 tracking-tight">
                    21 : 17
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Doubles · QF
                  </div>
                </Link>

                {/* Court 5 */}
                <Link
                  href="/tournaments"
                  className="bg-white rounded-2xl p-4 shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer block border border-gray-100"
                >
                  <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#D96F55]">
                    LIVE · COURT 5
                  </div>
                  <div className="font-mono text-3xl sm:text-4xl font-black text-[#0B101B] my-1 tracking-tight">
                    09 : 11
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">
                    Mixed · R2
                  </div>
                </Link>
              </div>

              {/* Card 4: "Your name goes here" Dashed Booking Spot */}
              <div
                onClick={onJoin}
                role="button"
                tabIndex={0}
                className="border-2 border-dashed border-black/25 rounded-2xl p-3.5 sm:p-4 bg-black/[0.03] hover:bg-black/[0.07] transition-all flex items-center gap-3.5 cursor-pointer group shadow-2xs"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0B101B] text-[#F3D15A] shadow-xs group-hover:scale-105 transition-transform duration-200">
                  <UserPlus className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-sm sm:text-base font-black text-[#0B101B] truncate">
                    Your name goes here
                  </strong>
                  <span className="text-xs font-semibold text-black/75 truncate block">
                    Bracket spot open · 6 slots left · ₹799
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM LIVE TOURNAMENT STATS & WINNERS MARQUEE STRIP      */}
        {/* Infinite gliding ticker in dark ink separated by gold stars  */}
        {/* ============================================================ */}
        <div className="relative z-20 w-full bg-[#0B101B] text-white py-3.5 sm:py-4 px-4 overflow-hidden select-none border-t border-black/10">
          <div className="flex w-max animate-marquee gap-8 sm:gap-12 whitespace-nowrap font-sans font-black text-xs sm:text-sm tracking-widest uppercase">
            {/* Ticker Set 1 */}
            <div className="flex items-center gap-8 sm:gap-12">
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>42 TOURNAMENTS THIS MONTH</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>₹24L+ PAID TO HOSTS</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>8,760 MATCHES SCORED</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>MEERA IYER WON WOMEN&apos;S SINGLES</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>KIRAN &amp; ROHAN WON MEN&apos;S DOUBLES</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>14 COURTS LIVE IN {city.toUpperCase()}</span>
              </span>
            </div>

            {/* Ticker Set 2 (Duplicated for Seamless Infinite Loop) */}
            <div className="flex items-center gap-8 sm:gap-12" aria-hidden="true">
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>42 TOURNAMENTS THIS MONTH</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>₹24L+ PAID TO HOSTS</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>8,760 MATCHES SCORED</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>MEERA IYER WON WOMEN&apos;S SINGLES</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>KIRAN &amp; ROHAN WON MEN&apos;S DOUBLES</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[#F3D15A]">★</span>
                <span>14 COURTS LIVE IN {city.toUpperCase()}</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
