"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Zap, Flame, ShieldCheck } from "lucide-react";
import { MiniCourt } from "@/features/minicourt/MiniCourt";

export function HomeMiniCourtSection() {
  return (
    <section className="relative w-full bg-[#070D19] py-16 sm:py-24 text-white overflow-hidden" id="minicourt">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-[#84CC16]/[0.06] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-[#6366F1]/[0.07] blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-lime">
            <Zap className="h-3.5 w-3.5" />
            <span>Interactive Court Simulator</span>
          </div>
          
          <h2 className="font-rogenz text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            Test your reflexes. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime via-[#A3E635] to-[#FACC15]">
              Beat Robo-Pro.
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto">
            Experience realistic shuttlecock aerodynamics, time your overhead swings, and unleash power smashes before stepping onto real tournament courts.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-gray-300">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Flame className="h-3.5 w-3.5 text-lime" /> Real Aerodynamics
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Zap className="h-3.5 w-3.5 text-gold" /> Power Smash Meter
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Trophy className="h-3.5 w-3.5 text-[#FACC15]" /> Daily Challenge & Badges
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Mouse, Touch or Keys
            </span>
          </div>
        </div>

        {/* The Interactive MiniCourt Arena */}
        <div className="w-full">
          <MiniCourt />
        </div>

        {/* Conversion Footnote: Ready for real courts? */}
        <div className="text-center pt-2">
          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 text-sm font-bold text-lime hover:text-white transition-colors group"
          >
            <span>Ready for real badminton courts? Browse upcoming tournaments near you</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
