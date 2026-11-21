"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { useExperienceMode } from "@/hooks/useExperienceMode";

interface HeroRallyProps {
  city?: string;
  onJoin?: () => void;
}

export function HeroRally({ city = "Bengaluru", onJoin }: HeroRallyProps) {
  const { mode, setMode } = useExperienceMode();
  const isHost = mode === "host";

  return (
    <section className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] overflow-hidden bg-[#070A12] text-white flex flex-col justify-between" id="top">
      {/* 1. Full-bleed realistic athlete photography & stadium lighting */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-full lg:w-[62%] select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="w-full h-full bg-cover bg-no-repeat opacity-90 sm:opacity-100"
          style={{
            backgroundImage: "url('/images/hero-athlete-realistic.png')",
            backgroundPosition: "right 10% center",
          }}
        />
        {/* Seamless left & bottom gradient blend into #070A12 */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-56 bg-gradient-to-r from-[#070A12] via-[#070A12]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#070A12] to-transparent" />
      </div>

      {/* 2. Ambient Arena Glows */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-purple-900/20 blur-[130px] z-0" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-80 w-80 rounded-full bg-lime/10 blur-[120px] z-0" />

      {/* 3. Hero Content (Headline, Actions, Social Proof) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-16 sm:pb-16 lg:pt-20 lg:pb-20">
        <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-8">
          {/* Eyebrow & Mode Switcher for mobile / inline */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-lime animate-pulse" />
              {city} is playing
            </span>

            {/* Mobile Mode Switcher Sliding Pill */}
            <div className="inline-flex md:hidden relative items-center rounded-full bg-white/10 p-1 border border-white/15 text-xs font-bold">
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 w-[52px] rounded-full bg-white shadow-xs transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                style={{
                  transform: isHost ? "translateX(52px)" : "translateX(0px)",
                }}
              />
              <button
                type="button"
                onClick={() => setMode("play")}
                className={`relative z-10 w-[52px] py-1 rounded-full text-center transition-colors duration-200 cursor-pointer ${
                  !isHost ? "text-[#0B101B] font-black" : "text-gray-300 hover:text-white"
                }`}
              >
                Play
              </button>
              <button
                type="button"
                onClick={() => setMode("host")}
                className={`relative z-10 w-[52px] py-1 rounded-full text-center transition-colors duration-200 cursor-pointer ${
                  isHost ? "text-[#0B101B] font-black" : "text-gray-300 hover:text-white"
                }`}
              >
                Host
              </button>
            </div>
          </div>

          {/* Dynamic Headline (Matches Image 1) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] text-balance">
            {isHost ? (
              <>
                Run tournaments.<br />
                <span className="text-lime">Build your legacy.</span>
              </>
            ) : (
              <>
                Your next match<br />
                starts <span className="text-lime">here.</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
            {isHost
              ? "Registrations, payments, fixtures and live scores—all in one calm, powerful command centre built for serious organizers."
              : "Discover the best tournaments near you. Enter in seconds, track every match and make your name count."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {isHost ? (
              <Link
                href="/host/tournaments/new"
                className="inline-flex items-center gap-2 rounded-full bg-lime hover:brightness-95 active:scale-[0.98] text-[#0B101B] px-7 py-3.5 text-sm font-black transition-all shadow-lg cursor-pointer"
              >
                <span>Create a tournament</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/tournaments"
                className="inline-flex items-center gap-2 rounded-full bg-lime hover:brightness-95 active:scale-[0.98] text-[#0B101B] px-7 py-3.5 text-sm font-black transition-all shadow-lg cursor-pointer"
              >
                <span>Explore tournaments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <a
              href="#hosts"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition-all cursor-pointer"
            >
              <span>See how hosting works</span>
              <Play className="w-3.5 h-3.5 fill-current text-lime" />
            </a>
          </div>

          {/* Social Proof */}
          <div
            onClick={onJoin}
            role="button"
            tabIndex={0}
            className="flex items-center gap-3.5 pt-4 border-t border-white/10 cursor-pointer group"
          >
            <div className="flex -space-x-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 ring-2 ring-[#070A12] text-[10px] font-bold text-white">
                AM
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 ring-2 ring-[#070A12] text-[10px] font-bold text-white">
                SK
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 ring-2 ring-[#070A12] text-[10px] font-bold text-white">
                RV
              </span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 ring-2 ring-[#070A12] text-[10px] font-bold text-white">
                +2k
              </span>
            </div>
            <div className="text-xs">
              <strong className="block text-white font-bold group-hover:text-lime transition-colors">
                2,400+ players
              </strong>
              <span className="text-gray-400">already competing on Gelavu</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Floating Live Match Card (Matches Image 1) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 lg:pb-0 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-sm ml-auto lg:absolute lg:bottom-8 lg:right-8 xl:right-16">
          <Link
            href="/umpire/matches/m-1"
            className="block rounded-2xl bg-[#0E1526]/90 backdrop-blur-md border border-white/15 p-4 sm:p-5 shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:border-lime/50 group"
            title="Click to view live umpire match scoring"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="inline-flex items-center gap-1.5 font-black uppercase tracking-wider text-live">
                <span className="h-2 w-2 rounded-full bg-live animate-ping" />
                LIVE · COURT 3
              </span>
              <span className="text-gray-400 font-medium">Men&apos;s Singles · SF</span>
            </div>

            {/* Player 1 */}
            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs font-bold text-gray-300">
                  AM
                </span>
                <div>
                  <strong className="block text-sm font-bold text-white group-hover:text-lime transition-colors">
                    Arjun Mehta
                  </strong>
                  <small className="text-xs text-gray-400">Game Theory</small>
                </div>
              </div>
              <span className="text-2xl font-black text-white font-mono">18</span>
            </div>

            {/* Player 2 */}
            <div className="flex items-center justify-between py-2.5 bg-white/5 rounded-xl px-2.5 border border-white/10 my-1">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-xs font-bold text-white">
                  NR
                </span>
                <div>
                  <strong className="block text-sm font-bold text-white">
                    Nikhil Rao
                  </strong>
                  <small className="text-xs text-gray-400">Smash Pro</small>
                </div>
              </div>
              <span className="text-2xl font-black text-white font-mono">21</span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2.5 text-[11px] font-medium text-gray-400">
              <span>Game 2 of 3</span>
              <span className="text-gray-400 font-mono">14:32 elapsed</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 5. Integrated Platform Statistics Trust Strip (Matches Image 1) */}
      <div className="relative z-10 w-full border-t border-white/10 bg-[#050811] py-6 sm:py-8 mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
            POWERING COMMUNITY COMPETITION
          </span>
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-white block">42</span>
              <span className="text-xs text-gray-400">tournaments this month</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-white block">8,760</span>
              <span className="text-xs text-gray-400">matches scored</span>
            </div>
            <div>
              <span className="font-mono text-2xl sm:text-3xl font-black text-white block">₹24L+</span>
              <span className="text-xs text-gray-400">paid securely to hosts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
