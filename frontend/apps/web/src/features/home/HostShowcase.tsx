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
      className="w-full bg-gradient-to-b from-[#080E1B] via-[#0B0F1E] to-[#080B16] py-20 sm:py-28 text-white relative overflow-hidden"
      id="hosts"
    >
      {/* Warm Sunset Flame & Solar Amber Ambient Lighting (Unique to Host Showcase) */}
      <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-orange-500/15 to-amber-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-900/20 via-indigo-900/15 to-transparent blur-[130px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Clean copy, Rogenz headline & value proposition */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF5500] block">
                The court is calling.
              </span>
              <h2 className="font-rogenz text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-[1.06] mt-2">
                Everything to<br />
                run your event.<br />
                <span className="bg-gradient-to-r from-[#FF5500] via-[#FF7A00] to-[#FFAA00] bg-clip-text text-transparent">
                  In one calm screen.
                </span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Stop juggling spreadsheets, payment screenshots and WhatsApp groups. Gelavu gives you one calm, powerful place to run the whole show.
            </p>

            {/* Feature Bullets with interactive focus states and distinct athletic colors */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 ${
                  activeTab === "overview"
                    ? "bg-white/10 border border-orange-500/40 shadow-[0_0_25px_rgba(255,85,0,0.15)]"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition-colors ${
                    activeTab === "overview"
                      ? "bg-gradient-to-br from-[#FF5500] to-[#FF7700] text-white border-orange-400 shadow-md"
                      : "bg-white/10 border-white/15 text-orange-400"
                  }`}
                >
                  <CircleDollarSign className="w-5 h-5" />
                </span>
                <div>
                  <strong className="block text-base font-bold text-white">Fill every slot</strong>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                    Online entries, waitlists and automatic payment tracking.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("tournaments")}
                className={`w-full text-left flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 ${
                  activeTab === "tournaments"
                    ? "bg-white/10 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.15)]"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition-colors ${
                    activeTab === "tournaments"
                      ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-md"
                      : "bg-white/10 border-white/15 text-cyan-400"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </span>
                <div>
                  <strong className="block text-base font-bold text-white">Fixtures in one click</strong>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                    Seeded brackets, court schedules and live match calls.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("players")}
                className={`w-full text-left flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 ${
                  activeTab === "players"
                    ? "bg-white/10 border border-amber-500/40 shadow-[0_0_25px_rgba(255,170,0,0.15)]"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition-colors ${
                    activeTab === "players"
                      ? "bg-gradient-to-br from-amber-400 to-amber-600 text-[#0B101B] border-amber-300 shadow-md"
                      : "bg-white/10 border-white/15 text-amber-400"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <strong className="block text-base font-bold text-white">Make winners famous</strong>
                  <p className="text-xs sm:text-sm text-gray-400 mt-0.5 leading-relaxed">
                    Instant results, rankings and share-ready winner cards.
                  </p>
                </div>
              </button>
            </div>

            {/* Action Button & Trust Guarantee */}
            <div className="pt-2">
              <Link
                href="/host/tournaments/new"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5500] to-[#FF7700] hover:from-[#FF6611] hover:to-[#FF8811] active:scale-[0.98] text-white px-8 py-3.5 text-sm font-black transition-all shadow-[0_4px_25px_rgba(255,85,0,0.35)] cursor-pointer"
              >
                <span>Start hosting free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-3.5">
                <Check className="w-4 h-4 text-orange-400" />
                <span>No card required · Pay only when players register</span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Realistic Interactive Host Dashboard Preview  */}
          {/* ============================================================ */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl bg-[#0E1528] border border-white/15 p-4 sm:p-6 shadow-2xl transition-all duration-300 hover:shadow-orange-500/5">
              
              {/* Dashboard Topbar with Tabs */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <GelavuLogo variant="dark" size="sm" />
                </div>
                
                {/* Smooth Tab Controls */}
                <div className="flex items-center gap-1 sm:gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveTab("overview")}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === "overview"
                        ? "bg-[#FF5500]/15 text-orange-400 border border-orange-500/30 shadow-xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("tournaments")}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === "tournaments"
                        ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Tournaments
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("players")}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === "players"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Players
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("payments")}
                    className={`px-2.5 sm:px-3 py-1 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === "payments"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    Payments
                  </button>
                </div>
              </div>

              {/* Main White Mockup Screen */}
              <div className="mt-4 rounded-2xl bg-white p-4 sm:p-5 shadow-inner space-y-4 text-[#0B101B]">
                
                {/* Screen Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-muted font-black block">
                      BENGALURU OPEN 2026
                    </span>
                    <strong className="text-sm sm:text-base font-bold text-[#0B101B] block mt-0.5">
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
                    <span className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-muted">
                      <Bell className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Buttery-Smooth Tab Stages */}
                <div className="grid grid-cols-1 grid-rows-1">

                  {/* TAB 1: OVERVIEW */}
                  <div
                    className={`col-start-1 row-start-1 space-y-4 transition-all duration-300 ${
                      activeTab === "overview"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* Metric Tiles */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Confirmed entries</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">186</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">+24 this week</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Revenue collected</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">₹1.42L</strong>
                        <small className="text-[10px] text-orange-600 font-bold">92% paid</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Slots remaining</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">34</strong>
                        <small className="text-[10px] text-muted font-medium">Across 6 categories</small>
                      </div>
                    </div>

                    {/* Registration Pace & Live Activity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Bar Chart with Vibrant Warm Accents */}
                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#0B101B]">
                          <span>Registration pace</span>
                          <small className="text-muted font-normal">Last 14 days</small>
                        </div>
                        <div className="flex items-end gap-1.5 h-16 mt-3 pt-2">
                          {[25, 40, 55, 35, 70, 85, 60, 75, 95, 100].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t-sm transition-all duration-500 ${
                                i === 8
                                  ? "bg-[#6366F1]"
                                  : i === 9
                                  ? "bg-gradient-to-t from-[#FF5500] to-[#FFAA00]"
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
                          <span className="h-6 w-6 rounded-full bg-[#FF5500] text-[10px] font-bold flex items-center justify-center text-white shrink-0">
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

                  {/* TAB 2: TOURNAMENTS */}
                  <div
                    className={`col-start-1 row-start-1 space-y-4 transition-all duration-300 ${
                      activeTab === "tournaments"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* Metric Tiles */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Matches played</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">42 / 64</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">65% on schedule</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Avg court time</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">26 min</strong>
                        <small className="text-[10px] text-muted font-medium">3 courts active</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Next on court</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">Court 2</strong>
                        <small className="text-[10px] text-muted font-medium">Mixed Quarter</small>
                      </div>
                    </div>

                    {/* Live Courts & Brackets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-[#0B101B]">
                          <span>Live court scores</span>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Live
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-line/60 flex items-center justify-between text-xs">
                          <span className="font-bold text-[#0B101B]">Court 1: Srikanth vs Sindhu</span>
                          <span className="px-1.5 py-0.5 rounded bg-orange-100 text-[#FF5500] font-black text-[10px]">19-18</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg border border-line/60 flex items-center justify-between text-xs">
                          <span className="font-bold text-[#0B101B]">Court 2: R. Sen vs L. Sen</span>
                          <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">Set 2</span>
                        </div>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                        <span className="text-[11px] font-bold text-[#0B101B] block">Smart Draw Engine</span>
                        <p className="text-[11px] text-gray-500 leading-snug">
                          Single elimination knockout generated in 10 seconds, calibrated with Playo skill ratings.
                        </p>
                        <div className="pt-1 flex items-center gap-2">
                          <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Zero Disputes
                          </span>
                          <span className="px-2 py-1 rounded-md bg-orange-100 text-[#FF5500] text-[10px] font-bold">
                            Instant Live Scores
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TAB 3: PLAYERS */}
                  <div
                    className={`col-start-1 row-start-1 space-y-4 transition-all duration-300 ${
                      activeTab === "players"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* Metric Tiles */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Verified athletes</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">186</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">100% verified</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Playo skill tiers</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">5 Tiers</strong>
                        <small className="text-[10px] text-muted font-medium">Balanced draws</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">QR check-in rate</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">96%</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">Paperless desk</small>
                      </div>
                    </div>

                    {/* Skill Breakdown & Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                        <span className="text-[11px] font-bold text-[#0B101B] block">Playo Skill Distribution</span>
                        <div className="space-y-1.5 text-[10px]">
                          <div className="flex justify-between font-medium text-gray-600">
                            <span>Intermediate</span>
                            <span className="font-bold text-orange-600">54%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#FF5500] to-[#FFAA00] rounded-full" style={{ width: "54%" }} />
                          </div>
                          <div className="flex justify-between font-medium text-gray-600">
                            <span>Advanced & Pro</span>
                            <span className="font-bold">28%</span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#6366F1] rounded-full" style={{ width: "28%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                        <span className="text-[11px] font-bold text-[#0B101B] block">Instant Winner Cards</span>
                        <div className="p-2 bg-white rounded-lg border border-line flex items-center gap-2.5">
                          <span className="h-7 w-7 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                            <Trophy className="w-3.5 h-3.5" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-bold text-[#0B101B] truncate">Shareable Podium Post</p>
                            <small className="text-[9px] text-muted block">WhatsApp & Instagram ready</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TAB 4: PAYMENTS */}
                  <div
                    className={`col-start-1 row-start-1 space-y-4 transition-all duration-300 ${
                      activeTab === "payments"
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    {/* Metric Tiles */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Total revenue</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">₹1,42,800</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">100% collected</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Instant payout</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">₹1,38,516</strong>
                        <small className="text-[10px] text-muted font-medium">To host bank</small>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-2.5 border border-line">
                        <span className="text-[10px] text-muted font-medium block">Payment disputes</span>
                        <strong className="text-base sm:text-xl font-black text-[#0B101B] mt-0.5 block">0</strong>
                        <small className="text-[10px] text-emerald-600 font-bold">Auto-reconciled</small>
                      </div>
                    </div>

                    {/* Settlement Feeds */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                        <span className="text-[11px] font-bold text-[#0B101B] block">Payment Gateway</span>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">UPI Instant</span>
                            <span className="font-bold text-[#0B101B]">88%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Debit / Credit Cards</span>
                            <span className="font-bold text-[#0B101B]">12%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#F9FAFB] rounded-xl p-3 border border-line space-y-2">
                        <span className="text-[11px] font-bold text-[#0B101B] block">Bank Settlement</span>
                        <div className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-[11px] text-gray-700">Next-day direct bank credit guaranteed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating Payment Popover (Sunset Flame & Gold Accent) */}
            <div className="absolute -bottom-5 right-2 sm:right-6 bg-white text-[#0B101B] px-4 py-3 rounded-2xl border border-line shadow-2xl flex items-center gap-3 animate-fade-up z-20 transition-all duration-300 hover:scale-105">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#FF5500] to-[#FFAA00] text-white shrink-0 font-black shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </span>
              <div>
                <strong className="block text-xs font-black text-[#0B101B]">Payment received</strong>
                <small className="text-[11px] text-muted">₹1,198 · Mixed Doubles</small>
              </div>
              <span className="text-[10px] font-black text-orange-600 ml-2">now</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
