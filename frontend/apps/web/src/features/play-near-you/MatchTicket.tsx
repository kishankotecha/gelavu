"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, MapPin, Users } from "lucide-react";
import { ShareButton } from "@/components/common/ShareButton";
import type { NearbyTournament } from "@/types/nearby";
import { PartnerPoolModal } from "./PartnerPoolModal";

function SlotDots({ total, filled, partners }: { total: number; filled: number; partners: number }) {
  return (
    <div
      role="img"
      aria-label={`${filled} of ${total} spots taken, ${partners} players looking for a partner, ${total - filled} spots open`}
      className="flex flex-wrap gap-1.5"
    >
      {Array.from({ length: total }, (_, i) => {
        const kind = i < filled - partners ? "in" : i < filled ? "partner" : "open";
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{ animationDelay: `${i * 12}ms` }}
            className={`h-3 w-3 rounded-full motion-safe:animate-fade-up ${
              kind === "in"
                ? "bg-[#FF5722] shadow-[0_0_8px_rgba(255,87,34,0.5)]"
                : kind === "partner"
                ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                : "border border-white/30"
            }`}
          />
        );
      })}
    </div>
  );
}

interface Props {
  tournament?: NearbyTournament;
  t?: NearbyTournament;
  siblings: NearbyTournament[];
  onSelect: (id: string) => void;
}

export function MatchTicket({ tournament, t: propT, siblings, onSelect }: Props) {
  const t = (tournament || propT)!;
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [weekday, dayNum, month] = t.dateLabel.replace(",", "").split(" ");
  const open = t.slotsTotal - t.slotsFilled;

  return (
    <>
      <article
        aria-labelledby={`ticket-${t.id}`}
        className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0E1524] text-white shadow-2xl transition-all duration-200 hover:border-white/20"
      >
        <div className="grid h-full md:grid-cols-[1fr_auto]">
          {/* Main Ticket Content */}
          <div className="flex flex-col justify-between space-y-4 p-6 sm:p-7 md:p-8">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-cyan-300">
                {t.series} · {t.distanceLabel}
              </p>
              <h3
                id={`ticket-${t.id}`}
                className="mt-2.5 font-sans text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight"
              >
                {t.title}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-[#FF5722]" aria-hidden="true" />
                  <span>{t.venue}, {t.area}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{t.timeLabel}</span>
                </li>
              </ul>
            </div>

            {/* Format and Rules Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{t.format}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Everyone plays at least {t.guaranteedMatches} matches
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{t.courts}</span>
            </div>

            {/* Who's in & SlotDots */}
            <div className="space-y-2.5 rounded-2xl bg-[#090E1A] p-4 border border-white/10">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-sm font-bold text-white">Who&apos;s in</h4>
                <p className="text-xs text-slate-400">
                  {t.slotsFilled} of {t.slotsTotal} · <strong className="text-white">{open} {open === 1 ? "spot" : "spots"} open</strong>
                </p>
              </div>
              <SlotDots total={t.slotsTotal} filled={t.slotsFilled} partners={t.partnersWanted} />
              <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5722]" />
                  Registered
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  Looking for partner
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-white/30" />
                  Open
                </span>
              </p>
            </div>

            {/* Organizer Note */}
            <div className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-sm">
              {t.verified && (
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" aria-label="Verified host" />
              )}
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-white">{t.organizer}:</strong> {t.organizerNote}
              </p>
            </div>

            {/* Looking for Partner Alert */}
            {t.partnersWanted > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
                <span className="flex items-center gap-2 font-semibold text-amber-300">
                  <Users className="h-4 w-4 text-amber-400" />
                  {t.partnersWanted} {t.partnersWanted === 1 ? "player is" : "players are"} looking for a partner
                </span>
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 hover:no-underline cursor-pointer"
                >
                  Pair up
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <Link
                href={`/tournaments/${t.slug}/register`}
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#FF5722] hover:bg-[#F4511E] px-6 text-sm font-black text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722] cursor-pointer shadow-[0_0_24px_rgba(255,87,34,0.4)]"
              >
                Enter · {t.entryLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link
                href={`/tournaments/${t.slug}`}
                className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
              >
                Details
              </Link>
              <ShareButton
                variant="pill"
                tone="light"
                title={t.title}
                text={`${t.title} · ${t.dateLabel} · ${t.venue}. Join me on Gelavu:`}
                path={`/tournaments/${t.slug}`}
              />
            </div>

            {/* Sibling Area Tournaments */}
            {siblings.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4 text-xs">
                <span className="text-slate-400">Also in {t.area}:</span>
                {siblings.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelect(s.id)}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    {s.series} · {s.day}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Perforated Date Stub */}
          <div className="relative h-full flex flex-row items-center justify-center gap-4 border-t-2 border-dashed border-white/15 bg-[#080E1B] px-6 py-5 md:w-36 md:flex-col md:justify-center md:gap-1 md:border-l-2 md:border-t-0 md:py-0 select-none">
            {/* Cutout notches centered exactly on the perforation seam */}
            <span
              aria-hidden="true"
              className="absolute -top-3 hidden h-6 w-6 rounded-full border border-white/10 bg-[#080E1B] md:block md:-left-3"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 hidden h-6 w-6 rounded-full border border-white/10 bg-[#080E1B] md:block md:-left-3"
            />
            <p className="text-xs font-black uppercase tracking-widest text-amber-400">{weekday}</p>
            <p className="font-sans text-5xl sm:text-6xl font-black tracking-tighter text-white leading-none my-1">{dayNum}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{month}</p>
          </div>
        </div>
      </article>

      {/* Partner Matching Pool Modal */}
      <PartnerPoolModal
        tournament={t}
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </>
  );
}
