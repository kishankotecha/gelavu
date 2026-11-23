"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
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

export function PlayNearYou({ tournaments: initialTournaments, weekend: initialWeekend }: Props = {}) {
  const { city } = useCity();
  const [cityOpen, setCityOpen] = useState(false);

  // Self-contained frontend mock data
  const defaultData = useMemo(() => getNearbyTournaments(city), [city]);
  const tournaments = initialTournaments ?? defaultData.items;
  const weekend = initialWeekend ?? defaultData.weekend;

  const [selectedId, setSelectedId] = useState(tournaments[0]?.id ?? "");

  const selected = tournaments.find((t) => t.id === selectedId) ?? tournaments[0];
  const siblings = useMemo(
    () => (selected ? tournaments.filter((t) => t.area === selected.area && t.id !== selected.id) : []),
    [tournaments, selected],
  );
  const openSpots = tournaments.reduce((n, t) => n + (t.slotsTotal - t.slotsFilled), 0);
  const areas = new Set(tournaments.map((t) => t.area)).size;

  return (
    <section id="tournaments" aria-labelledby="pny-title" className="relative border-t border-white/10 bg-[#080E1B] text-white py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 sm:px-6">
        <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400 motion-safe:animate-pulse" aria-hidden="true" />
              This weekend · {weekend.rangeLabel} · {city}
            </p>
            <h2 id="pny-title" className="font-sans text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
              The court is calling.
            </h2>
            <p className="text-base leading-relaxed text-slate-300">
              Pick a neighbourhood, see who is playing this weekend, and plan your Saturday and Sunday around it.
            </p>
            {tournaments.length > 0 && (
              <p className="text-sm font-semibold text-slate-400">
                {tournaments.length} tournaments · {areas} neighbourhoods · {openSpots} open spots
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCityOpen(true)}
            className="inline-flex h-11 items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 text-sm font-bold text-white transition hover:bg-white/10 hover:border-cyan-400/40 md:self-end cursor-pointer"
          >
            <MapPin className="h-4 w-4 text-cyan-400" aria-hidden="true" />
            {city}
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </button>
        </header>

        {selected ? (
          <>
            <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_1.1fr]">
              <div className="h-full min-h-[460px]">
                <NeighbourhoodMap tournaments={tournaments} selectedId={selected.id} onSelect={setSelectedId} />
              </div>
              <div aria-live="polite" className="h-full">
                <MatchTicket key={selected.id} t={selected} siblings={siblings} onSelect={setSelectedId} />
              </div>
            </div>
            <WeekendTimeline tournaments={tournaments} selectedId={selected.id} onSelect={setSelectedId} weekend={weekend} />
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/15 bg-[#0E1524] px-6 py-14 text-center">
            <p className="text-lg font-black text-white">No tournaments this weekend in {city} yet.</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-slate-400">New ones are added every week. You can browse what is coming up, or host the first one.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <Link href="/tournaments" className="rounded-full bg-[#FF5722] px-5 py-2.5 text-sm font-black text-white hover:bg-[#F4511E]">Browse upcoming</Link>
              <Link href="/host/verify" className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white">Host a tournament</Link>
            </div>
          </div>
        )}

        <div className="text-center">
          <Link href="/tournaments" className="inline-flex h-12 items-center rounded-full border border-white/15 bg-[#121929] px-7 text-sm font-bold text-white transition hover:bg-[#FF5722] hover:text-white hover:border-[#FF5722] cursor-pointer">
            Browse all upcoming tournaments in {city}
          </Link>
        </div>
      </div>

      <CitySelectorModal isOpen={cityOpen} onClose={() => setCityOpen(false)} />
    </section>
  );
}
