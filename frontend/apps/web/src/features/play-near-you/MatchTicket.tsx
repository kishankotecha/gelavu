"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Flame,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ShareButton } from "@/components/common/ShareButton";
import type { NearbyTournament } from "@/types/nearby";
import { PartnerPoolModal } from "./PartnerPoolModal";

function SlotDots({
  total,
  filled,
  partners,
}: {
  total: number;
  filled: number;
  partners: number;
}) {
  return (
    <div
      role="img"
      aria-label={`${filled} of ${total} spots taken, ${partners} players looking for a partner, ${
        total - filled
      } spots open`}
      className="flex flex-wrap gap-1.5"
    >
      {Array.from({ length: total }, (_, i) => {
        const kind =
          i < filled - partners ? "in" : i < filled ? "partner" : "open";
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              kind === "in"
                ? "bg-coral shadow-[0_0_6px_rgba(255,104,91,0.5)]"
                : kind === "partner"
                ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                : "border border-white/25 bg-white/5"
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

export function MatchTicket({
  tournament,
  t: propT,
  siblings,
  onSelect,
}: Props) {
  const t = (tournament || propT)!;
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [weekday, dayNum, month] = t.dateLabel.replace(",", "").split(" ");
  const open = t.slotsTotal - t.slotsFilled;

  return (
    <>
      <article
        aria-labelledby={`ticket-${t.id}`}
        className="relative h-full flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[#0F1722] text-white shadow-2xl transition-all duration-200 hover:border-white/25"
      >
        <div className="grid h-full md:grid-cols-[1fr_auto]">
          {/* Main Ticket Content */}
          <div className="flex flex-col justify-between space-y-3.5 p-5 sm:p-6">
            <div>
              {/* Category, Distance & SEO Trust Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/15 border border-coral/30 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-coral">
                  <Flame className="w-3 h-3 text-coral" />
                  {t.series} · {t.distanceLabel}
                </span>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-coral" />
                  100% Escrow Protected
                </span>
              </div>

              {/* Tournament Title */}
              <h3
                id={`ticket-${t.id}`}
                className="mt-2.5 font-sans text-xl sm:text-2xl font-black uppercase tracking-tight text-white leading-tight"
              >
                {t.title}
              </h3>

              {/* Venue & Time with Map and Clock Icons */}
              <ul className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-1.5 font-semibold text-white">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-coral" aria-hidden="true" />
                  <span>
                    {t.venue}, {t.area}
                  </span>
                </li>
                <li className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{t.timeLabel}</span>
                </li>
              </ul>
            </div>

            {/* High-Intent SaaS Format Pills */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-bold text-slate-300">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5">
                {t.format}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5">
                Everyone plays at least {t.guaranteedMatches} matches
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5">
                {t.courts}
              </span>
            </div>

            {/* Who's In & Live SlotDots Meter */}
            <div className="space-y-2 rounded-2xl bg-black/40 p-3 border border-white/10">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-coral" />
                  <span>Who&apos;s in</span>
                </h4>
                <p className="text-[11px] text-slate-400">
                  {t.slotsFilled} of {t.slotsTotal} ·{" "}
                  <strong className="text-coral font-bold">
                    {open} {open === 1 ? "spot" : "spots"} open
                  </strong>
                </p>
              </div>

              <SlotDots
                total={t.slotsTotal}
                filled={t.slotsFilled}
                partners={t.partnersWanted}
              />

              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-coral" />
                  Registered
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Looking for partner
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full border border-white/30" />
                  Open
                </span>
              </p>
            </div>

            {/* Verified Host Note */}
            <div className="flex items-start gap-2.5 rounded-xl bg-white/5 border border-white/10 p-2.5 text-xs">
              {t.verified && (
                <BadgeCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral"
                  aria-label="Verified host"
                />
              )}
              <p className="text-slate-300 leading-snug">
                <strong className="text-white">{t.organizer}:</strong>{" "}
                {t.organizerNote}
              </p>
            </div>

            {/* Partner Matching Request Banner */}
            {t.partnersWanted > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-xs">
                <span className="flex items-center gap-1.5 font-bold text-coral">
                  <Users className="h-3.5 w-3.5 text-coral" />
                  {t.partnersWanted}{" "}
                  {t.partnersWanted === 1 ? "player is" : "players are"} looking for a partner
                </span>
                <button
                  type="button"
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="font-black text-navy bg-coral hover:bg-coral/90 px-2.5 py-0.5 rounded text-[11px] transition-colors cursor-pointer"
                >
                  Pair up
                </button>
              </div>
            )}

            {/* Action Buttons: 1-Tap Entry, Details & Share */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <Link
                href={`/tournaments/${t.slug}/register`}
                className="bg-coral hover:bg-coral/90 text-navy h-10 px-5 text-xs sm:text-sm font-black rounded-full transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enter · {t.entryLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/tournaments/${t.slug}`}
                className="inline-flex h-10 items-center rounded-full border border-white/15 bg-white/5 px-4 text-xs font-bold text-white transition hover:bg-white/10 cursor-pointer"
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
              <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-2.5 text-xs">
                <span className="text-slate-400">Also in {t.area}:</span>
                {siblings.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelect(s.id)}
                    className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-slate-300 transition hover:border-coral hover:text-white hover:bg-white/10 cursor-pointer"
                  >
                    {s.series} · {s.day}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Iconic Perforated Date Stub */}
          <div className="relative h-full flex flex-row items-center justify-center gap-3 border-t-2 border-dashed border-white/15 bg-[#0A101A] px-4 py-4 md:w-28 sm:md:w-32 md:flex-col md:justify-center md:gap-0.5 md:border-l-2 md:border-t-0 md:py-0 select-none">
            {/* Cutout notches centered exactly on the perforation seam */}
            <span
              aria-hidden="true"
              className="absolute -top-3 hidden h-6 w-6 rounded-full border border-white/10 bg-[#0A101A] md:block md:-left-3"
            />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 hidden h-6 w-6 rounded-full border border-white/10 bg-[#0A101A] md:block md:-left-3"
            />
            <p className="text-[11px] font-black uppercase tracking-widest text-coral">
              {weekday}
            </p>
            <p className="font-sans text-4xl sm:text-5xl font-black tracking-tighter text-white leading-none my-0.5">
              {dayNum}
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              {month}
            </p>
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
