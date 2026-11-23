"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { useCity } from "@/hooks/useCity";
import { CitySelectorModal } from "@/components/common/CitySelectorModal";
import type { TournamentCardData } from "@/types/tournament";

const FILTERS = ["All tournaments", "This weekend", "Singles", "Doubles", "Under ₹600"] as const;

interface HomeTournamentsProps {
  tournaments?: TournamentCardData[];
}

export function HomeTournaments({ tournaments }: HomeTournamentsProps) {
  const { city } = useCity();
  const [showCityModal, setShowCityModal] = useState(false);
  const [filter, setFilter] = useState<string>("All tournaments");

  // Default stylized items matching Image 2
  const defaultItems = [
    {
      id: "t-bengaluru-open",
      slug: "bengaluru-open-badminton-2025",
      badge: "FEATURED",
      date: "24–25 AUG",
      title: "Bengaluru Open 2025",
      place: "Game Theory, Indiranagar",
      categories: "MS · WS · MD · XD",
      price: "₹799",
      slots: 12,
      gradient: "from-[#220D4A] via-[#37237A] to-[#1A0B3B]",
    },
    {
      id: "t-smash-district",
      slug: "smash-district-league",
      badge: "SELLING FAST",
      date: "31 AUG",
      title: "Smash District League",
      place: "Fitso, HSR Layout",
      categories: "MD · XD · Intermediate",
      price: "₹599",
      slots: 6,
      gradient: "from-[#14301B] via-[#2A5C33] to-[#122E19]",
    },
    {
      id: "t-sunday-shuttlers",
      slug: "sunday-shuttlers-cup",
      badge: "EARLY BIRD",
      date: "07 SEP",
      title: "Sunday Shuttlers Cup",
      place: "PLaY Arena, Sarjapur",
      categories: "MS · MD · Open",
      price: "₹449",
      slots: 24,
      gradient: "from-[#0D1F38] via-[#1B3C6A] to-[#0B1A30]",
    },
  ];

  const items = tournaments && tournaments.length > 0
    ? tournaments.slice(0, 3).map((t, idx) => ({
        id: t.id,
        slug: t.slug,
        badge: idx === 0 ? "FEATURED" : idx === 1 ? "SELLING FAST" : "EARLY BIRD",
        date: idx === 0 ? "24–25 AUG" : idx === 1 ? "31 AUG" : "07 SEP",
        title: t.title,
        place: t.venueLabel,
        categories: t.categories.join(" · "),
        price: t.priceLabel,
        slots: t.slotsLabel ? parseInt(t.slotsLabel, 10) || 12 : 12,
        gradient: idx === 0
          ? "from-[#220D4A] via-[#37237A] to-[#1A0B3B]"
          : idx === 1
          ? "from-[#14301B] via-[#2A5C33] to-[#122E19]"
          : "from-[#0D1F38] via-[#1B3C6A] to-[#0B1A30]",
      }))
    : defaultItems;

  return (
    <section className="w-full bg-[#F5F6F1] py-16 sm:py-24" id="tournaments">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header & Location Picker */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#6366F1] block">
              PLAY NEAR YOU
            </span>
            <h2 className="font-rogenz text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B101B] tracking-wide mt-1">
              The court is calling.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowCityModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-bold text-[#0B101B] hover:border-black/30 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{city}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2.5">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0B101B] text-white shadow-xs"
                    : "border border-line bg-white text-[#0B101B]/80 hover:border-black/20"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* 3 Tournament Cards Grid (Matches Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((t) => (
            <article
              key={t.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card hover:shadow-lift transition-all duration-300"
            >
              {/* Poster Top Banner with Geometric Half-Moon Graphic */}
              <div className={`relative h-48 bg-gradient-to-br ${t.gradient} p-5 text-white flex flex-col justify-between overflow-hidden`}>
                {/* Geometric Half-Moon Circle SVG from Image 2 */}
                <svg
                  className="pointer-events-none absolute top-4 right-4 w-16 h-16 opacity-75 group-hover:scale-105 transition-transform duration-300"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2.5" />
                  <path d="M7 24 A17 17 0 0 0 41 24 Z" fill="white" fillOpacity="0.85" />
                </svg>

                {/* Badge Tag */}
                <div className="relative z-10">
                  <span className="inline-block rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                    {t.badge}
                  </span>
                </div>

                {/* Date Heading */}
                <div className="relative z-10">
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-tight">
                    {t.date}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 space-y-3.5 bg-white">
                <div>
                  <h3 className="line-clamp-1 text-lg font-black text-[#0B101B] group-hover:text-emerald-600 transition-colors">
                    <Link href={`/tournaments/${t.slug}`} className="outline-none after:absolute after:inset-0">
                      {t.title}
                    </Link>
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-muted shrink-0" />
                    <span>{t.place}</span>
                  </p>
                </div>

                {/* Categories & Price */}
                <div className="flex items-center justify-between pt-1 border-t border-line text-xs">
                  <span className="text-muted font-medium">{t.categories}</span>
                  <div>
                    <strong className="text-base font-black text-[#0B101B]">{t.price}</strong>
                    <small className="text-[10px] text-muted"> onwards</small>
                  </div>
                </div>

                {/* Slots & Action */}
                <div className="flex items-center justify-between pt-2 border-t border-line text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-600" />
                    {t.slots} slots left
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-[#0B101B] text-xs group-hover:text-emerald-600 transition-colors">
                    <span>View event</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Centered Browse All Tournaments CTA */}
        <div className="text-center pt-4">
          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white hover:bg-paper px-6 py-3.5 text-xs font-bold text-[#0B101B] transition-all shadow-xs cursor-pointer"
          >
            <span>Browse all 34 tournaments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <CitySelectorModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
      />
    </section>
  );
}
