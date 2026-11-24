"use client";

import React, { useState, useMemo } from "react";
import { Search, MapPin, ChevronDown, ArrowRight } from "lucide-react";
import { TournamentCard } from "@/components/common/TournamentCard";
import { CitySelectorModal } from "@/components/common/CitySelectorModal";
import { useCity } from "@/hooks/useCity";
import type { TournamentCardData, Category } from "@/types/tournament";

const FILTERS = ["All", "Singles", "Doubles", "Mixed", "This weekend", "Under ₹500"] as const;

interface TournamentsCatalogProps {
  initialTournaments: TournamentCardData[];
}

export function TournamentsCatalog({ initialTournaments }: TournamentsCatalogProps) {
  const { city } = useCity();
  const [showCityModal, setShowCityModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [scope, setScope] = useState<"city" | "all">("city");

  const filtered = useMemo(() => {
    return initialTournaments.filter((t) => {
      // City scope
      if (scope === "city" && (t.city || "Bengaluru").toLowerCase() !== city.toLowerCase()) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          t.title.toLowerCase().includes(q) ||
          t.venueLabel.toLowerCase().includes(q) ||
          t.series.toLowerCase().includes(q);
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
    <div className="space-y-8 font-sans">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-lime-600 block">
            EXPLORE THE CIRCUIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight mt-1">
            Tournaments
          </h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Discover verified events, claim open slots, and compete for trophies & prize pools.
          </p>
        </div>

        {/* Location Switcher Pill */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setShowCityModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:border-ink/40 transition-all cursor-pointer shadow-2xs"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{scope === "city" ? city : "All India"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted" />
          </button>

          <button
            type="button"
            onClick={() => setScope(scope === "city" ? "all" : "city")}
            className="rounded-full bg-paper px-3 py-2 text-xs font-bold text-muted hover:text-ink transition-colors"
          >
            {scope === "city" ? "Show All India" : `Show ${city} only`}
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => {
            const on = activeFilter === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                  on
                    ? "border-ink bg-ink text-white shadow-xs"
                    : "border-line bg-surface text-ink/80 hover:border-ink/30"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search club, area, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-full bg-surface border border-line text-xs font-semibold text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink focus:ring-2 focus:ring-ink/10 transition-all"
          />
        </div>
      </div>

      {/* Results Header Counter */}
      <div className="flex items-center justify-between text-xs font-bold text-muted">
        <span>
          Showing {filtered.length} {filtered.length === 1 ? "tournament" : "tournaments"}{" "}
          {scope === "city" ? `in ${city}` : "across India"}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-emerald-600 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border border-line bg-surface p-8 shadow-card">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-paper flex items-center justify-center text-muted mb-3 text-2xl">
            🏸
          </div>
          <h3 className="text-lg font-black text-ink">No tournaments matching your filter</h3>
          <p className="text-xs text-muted max-w-sm mx-auto mt-1 mb-5">
            Try switching to All India, or reset your search term to see upcoming events in other cities.
          </p>
          <button
            onClick={() => {
              setActiveFilter("All");
              setSearchQuery("");
              setScope("all");
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink text-white px-5 py-2.5 text-xs font-bold hover:bg-ink-2 transition-all cursor-pointer"
          >
            <span>View All Tournaments</span>
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

      <CitySelectorModal
        isOpen={showCityModal}
        onClose={() => setShowCityModal(false)}
      />
    </div>
  );
}
