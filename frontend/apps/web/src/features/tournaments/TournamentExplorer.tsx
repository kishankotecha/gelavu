"use client";

import React, { useMemo, useState } from "react";
import { SearchX, MapPin, Globe, SlidersHorizontal } from "lucide-react";
import { TournamentCard } from "@/components/common/TournamentCard";
import type { Category, TournamentCardData } from "@/types/tournament";
import { useCity } from "@/hooks/useCity";

const FILTERS = ["All", "Singles", "Doubles", "Mixed", "This weekend", "Under ₹500"] as const;
type Filter = (typeof FILTERS)[number];

function matches(t: TournamentCardData, f: Filter) {
  if (f === "All") return true;
  if (f === "This weekend") return t.weekend;
  if (f === "Under ₹500") return t.fee < 500;
  return t.categories.includes(f as Category);
}

export function TournamentExplorer({ tournaments }: { tournaments: TournamentCardData[] }) {
  const { city } = useCity();
  const [active, setActive] = useState<Filter>("All");
  const [scope, setScope] = useState<"city" | "all">("city");

  // Category filter
  const categoryFiltered = useMemo(
    () => tournaments.filter((t) => matches(t, active)),
    [tournaments, active]
  );

  // Check if any tournaments exist for this city
  const cityCount = useMemo(() => {
    return categoryFiltered.filter(
      (t) => (t.city || "Bengaluru").toLowerCase() === city.toLowerCase()
    ).length;
  }, [categoryFiltered, city]);

  const hasCityMatches = cityCount > 0;

  // Filtered by city or all
  const visible = useMemo(() => {
    if (scope === "city" && hasCityMatches) {
      return categoryFiltered.filter(
        (t) => (t.city || "Bengaluru").toLowerCase() === city.toLowerCase()
      );
    }
    return categoryFiltered;
  }, [categoryFiltered, scope, hasCityMatches, city]);

  return (
    <div className="space-y-5">
      {/* Top Filter and Scope Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Filters */}
        <div role="group" aria-label="Filter tournaments" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = f === active;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 cursor-pointer ${
                  on ? "border-ink bg-ink text-white" : "border-line bg-surface text-ink/80 hover:border-ink/30"
                }`}
              >
                {f}
              </button>
            );
          })}
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-bold text-ink/80 hover:border-ink/30 transition cursor-pointer"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted" />
            <span>Filters</span>
          </button>
        </div>

        {/* City Scope Switcher: In [City] vs All India */}
        <div className="inline-flex items-center rounded-full bg-gray-100 p-1 border border-gray-200 self-start sm:self-auto text-xs font-bold">
          <button
            type="button"
            onClick={() => setScope("city")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
              scope === "city"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>{city} ({hasCityMatches ? cityCount : 0})</span>
          </button>
          <button
            type="button"
            onClick={() => setScope("all")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
              scope === "all"
                ? "bg-white text-gray-900 shadow-xs"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Globe className="w-3 h-3 text-gray-500" />
            <span>All India</span>
          </button>
        </div>
      </div>

      {/* Notice if viewing a city without events */}
      {!hasCityMatches && scope === "city" && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              No tournaments listed in <strong>{city}</strong> yet. Showing popular events across India.
            </span>
          </div>
          <button
            onClick={() => setScope("all")}
            className="font-bold underline underline-offset-4 hover:text-black cursor-pointer"
          >
            Explore all tournaments
          </button>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        {visible.length} tournaments shown
      </p>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <TournamentCard key={t.id} t={t} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-surface px-6 py-12 text-center">
          <SearchX className="h-8 w-8 text-muted" aria-hidden="true" />
          <p className="font-bold text-ink">No tournaments match “{active}” right now</p>
          <p className="max-w-sm text-sm text-muted">
            New tournaments are added every week. Try another filter or check back soon.
          </p>
          <button
            type="button"
            onClick={() => {
              setActive("All");
              setScope("all");
            }}
            className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white cursor-pointer"
          >
            Show all tournaments
          </button>
        </div>
      )}
    </div>
  );
}
