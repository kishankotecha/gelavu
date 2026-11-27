"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { ChevronDown, MapPin, ShieldCheck, Trophy, Sparkles } from "lucide-react";
import { CitySelectorModal } from "@/components/common/CitySelectorModal";
import { useCity } from "@/hooks/useCity";
import type { NearbyTournament, WeekendInfo } from "@/types/nearby";
import { getNearbyTournaments } from "@/data/nearby";
import { MatchTicket } from "./MatchTicket";
import { NeighbourhoodMap } from "./NeighbourhoodMap";
import { WeekendTimeline } from "./WeekendTimeline";

interface Props {
  tournaments?: NearbyTournament[];
  weekend?: WeekendInfo;
}

export function PlayNearYou({
  tournaments: initialTournaments,
  weekend: initialWeekend,
}: Props = {}) {
  const { city } = useCity();
  const [cityOpen, setCityOpen] = useState(false);

  // Self-contained frontend mock data
  const defaultData = useMemo(() => getNearbyTournaments(city), [city]);
  const tournaments = initialTournaments ?? defaultData.items;
  const weekend = initialWeekend ?? defaultData.weekend;

  const [selectedId, setSelectedId] = useState(tournaments[0]?.id ?? "");

  // Reset selected tournament whenever city or tournaments change
  useEffect(() => {
    if (tournaments.length > 0) {
      setSelectedId(tournaments[0].id);
    }
  }, [tournaments]);

  const selected = tournaments.find((t) => t.id === selectedId) ?? tournaments[0];
  const siblings = useMemo(
    () =>
      selected
        ? tournaments.filter((t) => t.area === selected.area && t.id !== selected.id)
        : [],
    [tournaments, selected]
  );
  const openSpots = tournaments.reduce(
    (n, t) => n + (t.slotsTotal - t.slotsFilled),
    0
  );
  const areas = new Set(tournaments.map((t) => t.area)).size;

  return (
    <section
      id="tournaments"
      aria-labelledby="pny-title"
      className="relative bg-navy text-white py-12 sm:py-16 border-t border-white/10"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-6 sm:space-y-8 px-4 sm:px-6">
        {/* ============================================================ */}
        {/* Compact, Clean Header with High-Converting SEO & Trust Tags   */}
        {/* ============================================================ */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-coral">
              <span
                className="h-2 w-2 rounded-full bg-coral animate-pulse"
                aria-hidden="true"
              />
              <span>This weekend · {weekend.rangeLabel} · {city}</span>
            </div>

            <h2
              id="pny-title"
              className="font-rogenz text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-white leading-tight"
            >
              The court is calling.
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-normal">
              Pick a neighbourhood, see who is playing this weekend, and plan your
              Saturday and Sunday around it.
            </p>

            {tournaments.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs font-semibold text-slate-400">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white font-bold">
                  {tournaments.length} tournaments
                </span>
                <span>·</span>
                <span>{areas} neighbourhoods</span>
                <span>·</span>
                <span className="text-coral font-bold">{openSpots} open spots</span>
              </div>
            )}
          </div>

          {/* Right: City Switcher & SEO Value Proposition Badges */}
          <div className="flex flex-col items-start md:items-end gap-2.5">
            <button
              type="button"
              onClick={() => setCityOpen(true)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/15 px-3.5 text-xs font-bold text-white transition-all cursor-pointer shadow-sm"
            >
              <MapPin className="h-3.5 w-3.5 text-coral" aria-hidden="true" />
              <span>{city}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
              <span className="text-coral">✓ 100% Escrow Protected</span>
              <span>·</span>
              <span>Live Mobile Scoring</span>
              <span>·</span>
              <span>Official City Circuit Elo</span>
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* Core Symmetrical 2-Column Grid (Map + Match Ticket)          */}
        {/* ============================================================ */}
        {selected ? (
          <>
            <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_1.1fr]">
              {/* Left Column: Interactive Map */}
              <div className="h-full min-h-[420px] max-h-[480px]">
                <NeighbourhoodMap
                  tournaments={tournaments}
                  selectedId={selected.id}
                  onSelect={setSelectedId}
                  city={city}
                />
              </div>

              {/* Right Column: Iconic Perforated Match Ticket */}
              <div aria-live="polite" className="h-full min-h-[420px] max-h-[480px]">
                <MatchTicket
                  key={selected.id}
                  t={selected}
                  siblings={siblings}
                  onSelect={setSelectedId}
                />
              </div>
            </div>

            {/* Weekend Match Schedule Matrix */}
            <WeekendTimeline
              tournaments={tournaments}
              selectedId={selected.id}
              onSelect={setSelectedId}
              weekend={weekend}
            />
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 px-6 py-12 text-center">
            <p className="text-base font-black text-white">
              No tournaments this weekend in {city} yet.
            </p>
            <p className="mx-auto mt-1 max-w-md text-xs text-slate-400">
              New events are added every week. Browse upcoming events or host the first one.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2.5">
              <Link href="/tournaments" className="bg-coral text-navy font-bold rounded-full px-4 py-2 text-xs">
                Browse upcoming
              </Link>
              <Link
                href="/host/verify"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white"
              >
                Host a tournament
              </Link>
            </div>
          </div>
        )}

        {/* Footnote Link */}
        <div className="text-center pt-1">
          <Link
            href="/tournaments"
            className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/5 px-6 text-xs font-bold text-white transition-all duration-200 hover:bg-coral hover:text-navy hover:border-coral shadow-md cursor-pointer"
          >
            Browse all upcoming tournaments in {city} →
          </Link>
        </div>
      </div>

      <CitySelectorModal isOpen={cityOpen} onClose={() => setCityOpen(false)} />
    </section>
  );
}
