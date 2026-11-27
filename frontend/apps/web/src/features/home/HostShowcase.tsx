"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  LayoutGrid,
  Sparkles,
  Check,
  Bell,
  CheckCircle2,
  Trophy,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export function HostShowcase() {
  const [activeTab, setActiveTab] = useState<"overview" | "tournaments" | "players" | "payments">("overview");

  return (
    <section
      className="w-full bg-navy py-14 sm:py-20 text-white relative overflow-hidden border-t border-navy/40"
      id="hosts"
    >
      {/* Subtle Ambient Lighting */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-[400px] w-[400px] rounded-full bg-coral/5 blur-[140px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-[350px] w-[350px] rounded-full bg-coral/5 blur-[130px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Clean, compact copy & marketing value proposition */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/15 border border-coral/30 text-coral text-xs font-black uppercase tracking-wider">
                <span>FOR HOSTS & VENUES · TOURNAMENT MANAGEMENT SAAS</span>
              </div>
              <h2 className="font-rogenz text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide leading-[1.08] mt-2.5">
                Run your tournament.<br />
                <span className="text-coral">
                  Zero spreadsheets. 100% on-time payouts.
                </span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Replace Google Forms, manual UPI screenshot chases, and WhatsApp chaos. Gelavu gives organizers, venues and academies one calm platform to publish draws in 60s, stream live QR mobile scoring, and disburse payouts directly to your bank account.
            </p>

            {/* Competitor Replacement Badge */}
            <div className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-white/80">
              <span className="text-coral font-black">REPLACES:</span>
              <span>Google Forms · Excel Brackets · WhatsApp Spam · Manual UPI</span>
            </div>

            {/* Compact 3-Tab Selector Cards (Sleek, Clean, Not Lengthy) */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white/10 border border-coral/60 shadow-[0_0_20px_rgba(255,104,91,0.2)]"
                    : "hover:bg-white/5 border border-white/5"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                    activeTab === "overview"
                      ? "bg-coral text-white border-coral shadow-sm font-black"
                      : "bg-white/5 border-white/10 text-coral"
                  }`}
                >
                  <CircleDollarSign className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-sm font-bold text-white">Instant UPI Escrow &amp; Registrations</strong>
                  <p className="text-xs text-white/70 truncate">
                    10-second checkout, automated waitlists, direct bank settlement
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("tournaments")}
                className={`w-full text-left flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === "tournaments"
                    ? "bg-white/10 border border-coral/60 shadow-[0_0_20px_rgba(255,104,91,0.2)]"
                    : "hover:bg-white/5 border border-white/5"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                    activeTab === "tournaments"
                      ? "bg-coral text-white border-coral shadow-sm font-black"
                      : "bg-white/5 border-white/10 text-coral"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-sm font-bold text-white">1-Click Seeded Brackets &amp; Schedules</strong>
                  <p className="text-xs text-white/70 truncate">
                    Knockout, round-robin &amp; intelligent court schedule matrix
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("players")}
                className={`w-full text-left flex items-center gap-3 p-2.5 sm:p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeTab === "players"
                    ? "bg-white/10 border border-coral/60 shadow-[0_0_20px_rgba(255,104,91,0.2)]"
                    : "hover:bg-white/5 border border-white/5"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors ${
                    activeTab === "players"
                      ? "bg-coral text-white border-coral shadow-sm font-black"
                      : "bg-white/5 border-white/10 text-coral"
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <strong className="block text-sm font-bold text-white">QR Umpire Console &amp; WhatsApp Alerts</strong>
                  <p className="text-xs text-white/70 truncate">
                    Zero app download, live court scores &amp; automated match calls
                  </p>
                </div>
              </button>
            </div>

            {/* Action Row & Guarantees */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <Link
                href="/host/tournaments/new"
                className="btn-cta gap-2 px-6 py-3 text-xs sm:text-sm font-black active:scale-[0.98] cursor-pointer inline-flex items-center justify-center shadow-md"
              >
                <span>Launch tournament free</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/75 font-medium">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-coral stroke-[3]" />
                  <span>Keep 100% of entry fees</span>
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-coral stroke-[3]" />
                  <span>Direct bank credit</span>
                </span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Realistic Interactive Host Dashboard Preview  */}
          {/* High-Contrast, Zero White-on-White Contrast Bugs             */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl bg-[#0F1722] border border-white/15 p-4 sm:p-5 shadow-2xl transition-all duration-300">
              
              {/* Dashboard Topbar with Tabs */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <GelavuLogo variant="dark" size="sm" />
                </div>
                
                {/* Smooth Tab Controls */}
                <div className="flex items-center gap-1 sm:gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === "overview"
                        ? "bg-coral text-navy shadow-xs"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("tournaments")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === "tournaments"
                        ? "bg-coral text-navy shadow-xs"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    Tournaments
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("players")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === "players"
                        ? "bg-coral text-navy shadow-xs"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    Players
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("payments")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all duration-200 cursor-pointer ${
                      activeTab === "payments"
                        ? "bg-coral text-navy shadow-xs"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    Payments
                  </button>
                </div>
              </div>

              {/* Main White Mockup Screen with Sharp Dark-Text Contrast */}
              <div className="mt-3.5 rounded-2xl bg-white p-4 sm:p-5 shadow-sm space-y-3.5 text-navy">
                
                {/* Screen Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-slate-500 font-bold block">
                      BENGALURU OPEN 2026
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-navy block mt-0.5">
                      {activeTab === "overview" && "Good morning, Ananya."}
                      {activeTab === "tournaments" && "Court Command & Live Scores"}
                      {activeTab === "players" && "Verified Player Pool"}
                      {activeTab === "payments" && "Treasury & Fast Payouts"}
                    </strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync
                    </span>
                    <span className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      <Bell className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Tab Stages */}
                <div className="grid grid-cols-1 grid-rows-1">

                  {/* TAB 1: OVERVIEW */}
                  <div
                    className={`col-start-1 row-start-1 space-y-3 transition-all duration-300 ${
                      activeTab === "overview"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* Metric Tiles with Crisp Dark Text */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Confirmed</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">186</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">+24 this week</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Revenue</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">₹1.42L</strong>
                        <small className="text-[10px] text-amber-600 font-bold">92% paid</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Slots Left</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">34</strong>
                        <small className="text-[10px] text-slate-500 font-medium">Across 6 divs</small>
                      </div>
                    </div>

                    {/* Registration Pace & Live Activity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      {/* Bar Chart */}
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <div className="flex items-center justify-between text-[11px] font-bold text-navy">
                          <span>Registration pace</span>
                          <small className="text-slate-500 font-normal">Last 14 days</small>
                        </div>
                        <div className="flex items-end gap-1.5 h-14 mt-2 pt-1">
                          {[25, 40, 55, 35, 70, 85, 60, 75, 95, 100].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t-sm transition-all duration-300 ${
                                i === 8
                                  ? "bg-navy"
                                  : i === 9
                                  ? "bg-coral"
                                  : "bg-slate-200"
                              }`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Live Activity Feed with Crisp Contrast */}
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-navy block">Live activity</span>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="h-6 w-6 rounded-full bg-navy text-[10px] font-bold flex items-center justify-center text-white shrink-0">
                            AM
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-navy font-bold text-[11px]">Arjun registered</p>
                            <small className="text-slate-500 text-[10px] block">Men&apos;s Singles · 2m ago</small>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="h-6 w-6 rounded-full bg-coral text-[10px] font-black flex items-center justify-center text-white shrink-0">
                            SK
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-navy font-bold text-[11px]">Payment received</p>
                            <small className="text-slate-500 text-[10px] block">₹799 · 8m ago</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TAB 2: TOURNAMENTS */}
                  <div
                    className={`col-start-1 row-start-1 space-y-3 transition-all duration-300 ${
                      activeTab === "tournaments"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Matches</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">42 / 64</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">65% done</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Avg Match</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">26 min</strong>
                        <small className="text-[10px] text-slate-500 font-medium">3 active</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Next Court</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">Court 2</strong>
                        <small className="text-[10px] text-coral font-bold">Mixed QF</small>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-navy">
                          <span>Live court scores</span>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Live
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                          <span className="font-bold text-navy truncate">Court 1: Srikanth vs Sindhu</span>
                          <span className="px-1.5 py-0.5 rounded bg-coral/15 text-coral font-black text-[10px] ml-1">19-18</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                          <span className="font-bold text-navy truncate">Court 2: R. Sen vs L. Sen</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] ml-1">Set 2</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-navy block">Smart Draw Engine</span>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          Single elimination knockout generated in 10s, calibrated with verified Elo ratings.
                        </p>
                        <div className="pt-1 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                            Zero Disputes
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-coral/15 text-coral text-[10px] font-bold border border-coral/30">
                            Auto Brackets
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TAB 3: PLAYERS */}
                  <div
                    className={`col-start-1 row-start-1 space-y-3 transition-all duration-300 ${
                      activeTab === "players"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Athletes</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">186</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">100% verified</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Skill Tiers</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">5 Tiers</strong>
                        <small className="text-[10px] text-slate-500 font-medium">Balanced</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Check-in</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">96%</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">Paperless QR</small>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-navy block">Skill Distribution</span>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex justify-between font-medium text-slate-600">
                            <span>Intermediate</span>
                            <span className="font-bold text-coral">54%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-coral rounded-full" style={{ width: "54%" }} />
                          </div>
                          <div className="flex justify-between font-medium text-slate-600">
                            <span>Advanced &amp; Pro</span>
                            <span className="font-bold text-navy">28%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-navy rounded-full" style={{ width: "28%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-navy block">Instant Winner Cards</span>
                        <div className="p-2 bg-white rounded-lg border border-slate-200 flex items-center gap-2.5">
                          <span className="h-7 w-7 rounded-full bg-coral/15 text-coral flex items-center justify-center shrink-0">
                            <Trophy className="w-3.5 h-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-navy truncate">Podium Celebration Card</p>
                            <small className="text-[9px] text-slate-500 block">WhatsApp &amp; Instagram ready</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TAB 4: PAYMENTS */}
                  <div
                    className={`col-start-1 row-start-1 space-y-3 transition-all duration-300 ${
                      activeTab === "payments"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Total Entry</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">₹1,42,800</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">100% held</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Host Payout</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">₹1,38,516</strong>
                        <small className="text-[10px] text-slate-500 font-medium">Direct to bank</small>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Disputes</span>
                        <strong className="text-base sm:text-lg font-black text-navy mt-0.5 block">0</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">Auto-reconciled</small>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-navy block">Payment Methods</span>
                        <div className="space-y-1 text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">UPI Instant</span>
                            <span className="font-bold text-navy">88%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Cards &amp; NetBanking</span>
                            <span className="font-bold text-navy">12%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 space-y-1.5">
                        <span className="text-[11px] font-bold text-navy block">Bank Settlement</span>
                        <div className="flex items-center gap-1.5 text-xs pt-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[11px] text-slate-700 font-medium">Automatic direct bank NEFT transfer</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating Payment Popover (High Contrast, Crisp) */}
            <div className="hidden sm:flex absolute -bottom-3 right-4 bg-white text-navy px-3.5 py-2.5 rounded-2xl border-2 border-navy/10 shadow-xl items-center gap-2.5 z-20">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-coral text-white shrink-0 font-black shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </span>
              <div>
                <strong className="block text-xs font-black text-navy leading-tight">Payment received</strong>
                <small className="text-[10px] text-slate-500 font-medium">₹1,198 · Mixed Doubles</small>
              </div>
              <span className="text-[10px] font-black text-coral ml-1">just now</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
