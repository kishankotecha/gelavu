"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  LayoutGrid,
  Sparkles,
  Check,
  Bell,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export function HostShowcase() {
  return (
    <section className="w-full bg-[#070A12] py-20 sm:py-28 text-white relative overflow-hidden" id="hosts">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-lime/10 blur-[130px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-purple-900/20 blur-[120px]" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & Value Proposition (Matches Image 3) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-lime block">
                BUILT FOR ORGANIZERS
              </span>
              <h2 className="font-rogenz text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-[1.06] mt-2">
                From first<br />
                entry to final<br />
                <span className="text-lime">point.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
              Stop juggling spreadsheets, payment screenshots and WhatsApp groups. Gelavu gives you one calm, powerful place to run the whole show.
            </p>

            {/* Feature Bullets with round dark-green/lime circle icons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 border border-white/15 text-lime">
                  <CircleDollarSign className="w-5 h-5" />
                </span>
                <div>
                  <strong className="block text-base font-bold text-white">Fill every slot</strong>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                    Online entries, waitlists and automatic payment tracking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 border border-white/15 text-lime">
                  <LayoutGrid className="w-5 h-5" />
                </span>
                <div>
                  <strong className="block text-base font-bold text-white">Fixtures in one click</strong>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                    Seeded brackets, court schedules and live match calls.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 border border-white/15 text-lime">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <strong className="block text-base font-bold text-white">Make winners famous</strong>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                    Instant results, rankings and share-ready winner cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button & Subtext */}
            <div className="pt-2">
              <Link
                href="/host/tournaments/new"
                className="inline-flex items-center gap-2 rounded-full bg-lime hover:brightness-95 active:scale-[0.98] text-[#0B101B] px-7 py-3.5 text-sm font-black transition-all shadow-lg cursor-pointer"
              >
                <span>Start hosting free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-3.5">
                <Check className="w-4 h-4 text-lime" />
                <span>No card required · Pay only when players register</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Interactive Host Dashboard Preview Card (Matches Image 3) */}
          <div className="lg:col-span-6 relative">
            <Link
              href="/host"
              className="block rounded-3xl bg-[#121A2B] border border-white/15 p-4 sm:p-6 shadow-2xl transition-all duration-300 hover:scale-[1.01] hover:border-lime/40 group cursor-pointer"
              title="Click to explore Host Command Centre"
            >
              <div className="grid grid-cols-12 gap-4">
                {/* Mini Sidebar on Left */}
                <div className="col-span-3 border-r border-white/10 pr-3 hidden sm:flex flex-col justify-between py-2">
                  <div className="space-y-6">
                    <GelavuLogo variant="dark" size="sm" href="" />
                    <nav className="space-y-3 text-[11px] font-bold">
                      <span className="block text-white bg-white/10 px-2 py-1 rounded-md">Overview</span>
                      <span className="block text-gray-400 px-2 py-1">Tournaments</span>
                      <span className="block text-gray-400 px-2 py-1">Players</span>
                      <span className="block text-gray-400 px-2 py-1">Payments</span>
                    </nav>
                  </div>
                </div>

                {/* Main White Content Body */}
                <div className="col-span-12 sm:col-span-9 bg-white rounded-2xl p-4 sm:p-5 text-[#0B101B] shadow-inner space-y-4">
                  {/* Top Bar: Event Name & Host Greeting */}
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <div>
                      <small className="text-[10px] font-black uppercase tracking-widest text-[#6366F1]">
                        BENGALURU OPEN 2025
                      </small>
                      <h3 className="text-base sm:text-lg font-black text-[#0B101B] group-hover:text-emerald-600 transition-colors">
                        Good morning, Ananya.
                      </h3>
                    </div>
                    <span className="p-2 rounded-full bg-gray-100 text-gray-600">
                      <Bell className="w-4 h-4" />
                    </span>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1">
                    <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                      <span className="text-[10px] text-muted font-medium block">Confirmed entries</span>
                      <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">186</strong>
                      <small className="text-[10px] text-emerald-600 font-bold">+24 this week</small>
                    </div>

                    <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                      <span className="text-[10px] text-muted font-medium block">Revenue collected</span>
                      <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">₹1.42L</strong>
                      <small className="text-[10px] text-muted font-medium">92% paid</small>
                    </div>

                    <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                      <span className="text-[10px] text-muted font-medium block">Slots remaining</span>
                      <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">34</strong>
                      <small className="text-[10px] text-muted font-medium">Across 6 categories</small>
                    </div>
                  </div>

                  {/* Registration Pace Bars & Live Activity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Bar Chart */}
                    <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#0B101B]">
                        <span>Registration pace</span>
                        <small className="text-muted font-normal">Last 14 days</small>
                      </div>
                      <div className="flex items-end gap-1.5 h-16 mt-3 pt-2">
                        {[25, 40, 55, 35, 70, 85, 60, 75, 95, 100].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t-sm transition-all ${
                              i === 8
                                ? "bg-[#6366F1]"
                                : i === 9
                                ? "bg-lime"
                                : "bg-gray-200"
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Live Activity */}
                    <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                      <span className="text-[11px] font-bold text-[#0B101B] block">Live activity</span>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="h-6 w-6 rounded-full bg-indigo-600 text-[10px] font-bold flex items-center justify-center text-white shrink-0">
                          AM
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[#0B101B] font-bold text-[11px]">Arjun registered</p>
                          <small className="text-muted text-[10px] block">Men&apos;s Singles · 2m ago</small>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="h-6 w-6 rounded-full bg-amber-500 text-[10px] font-bold flex items-center justify-center text-white shrink-0">
                          SK
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[#0B101B] font-bold text-[11px]">Payment received</p>
                          <small className="text-muted text-[10px] block">₹799 · 8m ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* Floating Payment Popover (Matches Image 3) */}
            <div className="absolute -bottom-5 right-2 sm:right-6 bg-white text-[#0B101B] px-4 py-3 rounded-2xl border border-line shadow-2xl flex items-center gap-3 animate-fade-up z-20">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-[#0B101B] shrink-0 font-black">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>
              <div>
                <strong className="block text-xs font-black text-[#0B101B]">Payment received</strong>
                <small className="text-[11px] text-muted">₹1,198 · Mixed Doubles</small>
              </div>
              <span className="text-[10px] font-black text-muted/80 ml-2">now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
