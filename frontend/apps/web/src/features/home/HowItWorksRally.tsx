"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Zap, Trophy, ArrowRight } from "lucide-react";

interface HowItWorksRallyProps {
  onJoin?: () => void;
}

export function HowItWorksRally({ onJoin }: HowItWorksRallyProps) {
  const steps = [
    {
      num: "01",
      icon: MapPin,
      badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
      title: "Find your event",
      text: "Filter by city, level, date and category. Real slots, clear fees, verified hosts.",
    },
    {
      num: "02",
      icon: Zap,
      badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/25",
      title: "Enter in seconds",
      text: "Pick a category, add your partner and pay securely with UPI, card or wallet.",
    },
    {
      num: "03",
      icon: Trophy,
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/25",
      title: "Play. Score live. Rise.",
      text: "Get match calls, follow live court scores and turn every result into your ranking.",
    },
  ];

  return (
    <section
      className="w-full bg-gradient-to-b from-[#070D19] via-[#0B0F22] to-[#05070D] py-16 sm:py-24 text-white relative overflow-hidden"
      id="how"
    >
      {/* Prismatic Stadium Lighting (Cyan, Orange, Indigo) */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-[#4338CA]/[0.08] blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-[500px] w-[500px] rounded-full bg-orange-500/[0.06] blur-[150px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ============================================================ */}
        {/* Top 3 Steps with Frosted Glass & Spectrum Badges              */}
        {/* ============================================================ */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#818CF8] block">
              NO MORE SIDELINES
            </span>
            <h2 className="font-rogenz text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mt-1">
              Three steps. Game on.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="relative rounded-3xl border border-white/10 bg-[#0E1326]/80 p-7 sm:p-8 shadow-2xl hover:border-white/20 transition-all flex flex-col justify-between backdrop-blur-md group"
                >
                  <div>
                    {/* Top Row: Colored Tinted Icon Box + Giant Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`grid h-12 w-12 place-items-center rounded-2xl border ${s.badgeColor} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </span>
                      <span className="font-mono text-3xl font-black text-white/20 select-none group-hover:text-white/30 transition-colors">
                        {s.num}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="text-xl font-black text-white tracking-tight">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* High-Energy Stadium Finale CTA Banner (Flame & Gold)         */}
        {/* ============================================================ */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0C1224] via-[#111933] to-[#0B101F] p-8 sm:p-14 text-white shadow-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-8 backdrop-blur-md">
          {/* Glowing Purple Orb Background Graphic */}
          <div className="pointer-events-none absolute right-10 -bottom-14 h-96 w-96 rounded-full bg-gradient-to-br from-[#4338CA] via-[#312E81] to-[#1E1B4B] opacity-80 blur-xl" />

          {/* Left Text Block */}
          <div className="relative z-10 space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block">
              READY WHEN YOU ARE
            </span>
            <h2 className="font-rogenz text-3xl sm:text-5xl lg:text-6xl font-bold tracking-wide text-white leading-tight">
              Don’t just play.<br />
              <span className="bg-gradient-to-r from-[#FF5500] via-[#FF7A00] to-[#FFAA00] bg-clip-text text-transparent">
                Make it count.
              </span>
            </h2>
          </div>

          {/* Right Action Button */}
          <div className="relative z-10 shrink-0">
            {onJoin ? (
              <button
                onClick={onJoin}
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF7700] hover:from-[#FF6611] hover:to-[#FF8811] active:scale-[0.98] text-white px-8 py-4 text-sm font-black transition-all shadow-[0_4px_25px_rgba(255,85,0,0.4)] cursor-pointer"
              >
                <span>Create your Gelavu profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF7700] hover:from-[#FF6611] hover:to-[#FF8811] active:scale-[0.98] text-white px-8 py-4 text-sm font-black transition-all shadow-[0_4px_25px_rgba(255,85,0,0.4)] cursor-pointer"
              >
                <span>Create your Gelavu profile</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
