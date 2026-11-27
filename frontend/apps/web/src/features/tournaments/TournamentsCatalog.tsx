"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  Flame,
  HelpCircle,
} from "lucide-react";
import { TournamentCard } from "@/components/common/TournamentCard";
import { CitySelectorModal } from "@/components/common/CitySelectorModal";
import { useCity } from "@/hooks/useCity";
import type { TournamentCardData, Category } from "@/types/tournament";

const FILTERS = [
  "All",
  "Singles",
  "Doubles",
  "Mixed",
  "This weekend",
  "Under ₹500",
] as const;

const TOURNAMENT_FAQS = [
  {
    q: "How does Gelavu's 100% UPI Escrow Protection work?",
    a: "When you enter a tournament, your registration fee is held securely in escrow until the tournament successfully begins. If the event is cancelled or postponed, you receive an immediate, 100% automated refund to your original payment method.",
  },
  {
    q: "Can I enter a doubles tournament without a partner?",
    a: "Yes! Gelavu provides an automated Partner Pool. You can enter solo and get paired with another player of matching skill tier, or browse players currently seeking a partner for that exact event.",
  },
  {
    q: "How many matches am I guaranteed to play?",
    a: "Unlike traditional 1-and-done knockout tournaments, all Gelavu-sanctioned events guarantee every player and team at least two to three competitive matches through compass draws, plate brackets, or round-robin stages.",
  },
  {
    q: "How are match scores and city circuit Elo ratings updated?",
    a: "Every court has a designated official or umpire updating scores live on the Gelavu mobile scoring console. Upon match completion, scores are locked, verified, and your city circuit ranking is updated in real time.",
  },
];

interface TournamentsCatalogProps {
  initialTournaments: TournamentCardData[];
}

export function TournamentsCatalog({
  initialTournaments,
}: TournamentsCatalogProps) {
  const { city } = useCity();
  const [showCityModal, setShowCityModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState<"city" | "all">("city");

  const filtered = useMemo(() => {
    return initialTournaments.filter((t) => {
      // City scope
      if (
        scope === "city" &&
        (t.city || "Bengaluru").toLowerCase() !== city.toLowerCase()
      ) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          t.title.toLowerCase().includes(q) ||
          t.venueLabel.toLowerCase().includes(q) ||
          t.series.toLowerCase().includes(q) ||
          (t.city || "").toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Category filter
      if (activeFilter === "All") return true;
      if (activeFilter === "This weekend") return t.weekend;
      if (activeFilter === "Under ₹500") return t.fee < 500;
      return t.categories.includes(activeFilter as Category);
    });
  }, [initialTournaments, scope, city, searchQuery, activeFilter]);

  return (
    <div className="space-y-10 sm:space-y-12 font-sans">
      {/* ============================================================ */}
      {/* Hero Header with SEO & High-Converting Value Proposition     */}
      {/* ============================================================ */}
      <div className="rounded-3xl bg-navy text-white p-6 sm:p-10 shadow-xl border border-navy/20 relative overflow-hidden">
        {/* Subtle decorative court pattern */}
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 w-96 h-96 opacity-10"
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="2">
            <rect x="10" y="10" width="180" height="180" rx="8" />
            <line x1="100" y1="10" x2="100" y2="190" />
            <line x1="10" y1="100" x2="190" y2="100" />
          </svg>
        </div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-coral/30 text-coral text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span>SANCTIONED BADMINTON CIRCUIT · 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Badminton Tournaments in{" "}
            <span className="text-coral underline decoration-coral/40 underline-offset-4">
              {scope === "city" ? city : "India"}
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Find official weekend badminton tournaments, register by instant UPI,
            and compete on verified courts with live mobile scoring and official city
            circuit rankings.
          </p>

          {/* 4 Trust & Marketing Credentials */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <ShieldCheck className="w-4 h-4 text-coral shrink-0" />
              <span className="font-semibold text-white">100% Escrow Refund</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Trophy className="w-4 h-4 text-coral shrink-0" />
              <span className="font-semibold text-white">Min 2 Matches</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Sparkles className="w-4 h-4 text-coral shrink-0" />
              <span className="font-semibold text-white">Live QR Scoring</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
              <Flame className="w-4 h-4 text-coral shrink-0" />
              <span className="font-semibold text-white">City Circuit Elo</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Controls: Search, Location Pill, Scope Toggle, Categories   */}
      {/* ============================================================ */}
      <div className="space-y-4">
        {/* Top Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Location Selector */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCityModal(true)}
              className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-xs font-bold text-navy hover:border-coral transition-all cursor-pointer shadow-xs"
            >
              <MapPin className="w-4 h-4 text-coral" />
              <span>{scope === "city" ? city : "All India"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => setScope(scope === "city" ? "all" : "city")}
              className="rounded-full bg-slate-100 hover:bg-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              {scope === "city" ? "Show All India" : `Show ${city} only`}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[280px] sm:min-w-[320px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search club, area, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-full bg-white border border-navy/15 text-xs font-semibold text-navy placeholder:text-slate-400 focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-200">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const on = activeFilter === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    on
                      ? "border-navy bg-navy text-white shadow-xs"
                      : "border-navy/15 bg-white text-slate-700 hover:border-navy/30"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Showing {filtered.length}{" "}
            {filtered.length === 1 ? "tournament" : "tournaments"}{" "}
            {scope === "city" ? `in ${city}` : "across India"}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Tournaments Grid                                             */}
      {/* ============================================================ */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-navy/10 bg-[#FAF6F0] p-8 shadow-sm">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-white border border-navy/10 flex items-center justify-center text-navy mb-3 text-2xl shadow-xs">
            🏸
          </div>
          <h3 className="text-lg font-black text-navy">
            No tournaments matching your filter in {city}
          </h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1 mb-6">
            Try switching to &quot;Show All India&quot; or reset your search term
            to see upcoming events in other cities.
          </p>
          <button
            onClick={() => {
              setActiveFilter("All");
              setSearchQuery("");
              setScope("all");
            }}
            className="inline-flex items-center gap-2 rounded-full bg-coral text-navy px-6 py-2.5 text-xs font-black hover:bg-coral/90 transition-all shadow-md cursor-pointer"
          >
            <span>View All India Tournaments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* Player FAQ Section (High-Intent SEO Ranking Keywords)         */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-white border border-navy/15 p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-coral text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
            Player Guide & Tournament FAQs
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Everything you need to know about entering, scoring, refunds, and
            rankings on Gelavu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {TOURNAMENT_FAQS.map((faq, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-[#FAF6F0] border border-navy/10 space-y-2"
            >
              <h3 className="text-sm font-bold text-navy flex items-start gap-2">
                <span className="text-coral font-black">{i + 1}.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-5 font-normal">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* Host a Tournament SaaS Callout Banner                        */}
      {/* ============================================================ */}
      <section className="rounded-3xl bg-navy text-white p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5">
          <span className="text-coral text-xs font-black uppercase tracking-wider">
            FOR ORGANIZERS, CLUBS & ACADEMIES
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Want to host a tournament in {city}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal">
            Publish your draw in 60 seconds, accept instant UPI payments with 100%
            automated escrow payouts, and live-stream court matches.
          </p>
        </div>

        <Link
          href="/host/tournaments/new"
          className="bg-coral hover:bg-coral/90 text-navy font-black text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
        >
          <span>Host a Tournament</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <CitySelectorModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
      />
    </div>
  );
}
