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
      title: "Find your event",
      text: "Filter by city, level, date and category. Real slots, clear fees, verified hosts.",
    },
    {
      num: "02",
      icon: Zap,
      title: "Enter in seconds",
      text: "Pick a category, add your partner and pay securely with UPI, card or wallet.",
    },
    {
      num: "03",
      icon: Trophy,
      title: "Play. Win. Rise.",
      text: "Get match calls, follow live brackets and turn every result into your ranking.",
    },
  ];

  return (
    <section className="w-full bg-[#F5F6F1] py-16 sm:py-24" id="how">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top 3 Steps (Matches Image 5) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#6366F1] block">
              NO MORE SIDELINES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B101B] tracking-tight mt-1">
              Three steps. Game on.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="relative rounded-3xl border border-line bg-white p-7 sm:p-8 shadow-card hover:shadow-lift transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Purple Tinted Icon Box + Giant Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#EEF2FF] text-[#6366F1] shadow-2xs">
                        <Icon className="w-6 h-6 stroke-[2.2]" />
                      </span>
                      <span className="font-mono text-3xl font-black text-gray-300 select-none">
                        {s.num}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <h3 className="text-xl font-black text-[#0B101B] tracking-tight">{s.title}</h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed mt-2.5">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Energy Dark CTA Banner (Matches Image 5) */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0B101B] p-8 sm:p-14 text-white shadow-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Glowing Purple Orb Background Graphic from Image 5 */}
          <div className="pointer-events-none absolute right-10 -bottom-14 h-96 w-96 rounded-full bg-gradient-to-br from-[#4338CA] via-[#312E81] to-[#1E1B4B] opacity-80 blur-xl" />

          {/* Left Text Block */}
          <div className="relative z-10 space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-lime block">
              READY WHEN YOU ARE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Don’t just play.<br />
              <span className="text-white">Make it count.</span>
            </h2>
          </div>

          {/* Right Action Button */}
          <div className="relative z-10 shrink-0">
            {onJoin ? (
              <button
                onClick={onJoin}
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-lime hover:brightness-95 active:scale-[0.98] text-[#0B101B] px-8 py-4 text-sm font-black transition-all shadow-xl cursor-pointer"
              >
                <span>Create your Gelavu profile</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-lime hover:brightness-95 active:scale-[0.98] text-[#0B101B] px-8 py-4 text-sm font-black transition-all shadow-xl cursor-pointer"
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
