"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, Users, ShieldCheck, ArrowRight, UserCheck, Sparkles, Trophy, Hand } from "lucide-react";
import type { NearbyTournament } from "@/types/nearby";
import { getPartnersForTournament } from "@/data/partners";

interface PartnerPoolModalProps {
  tournament: NearbyTournament | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PartnerPoolModal({ tournament, isOpen, onClose }: PartnerPoolModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !tournament) return null;

  const candidates = getPartnersForTournament(tournament.slug);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-line bg-surface shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-ink"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line p-5 sm:p-6 bg-paper">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-strong">
              <Users className="h-4 w-4" />
              <span>BYOP Partner Pool (Seeking a Pair)</span>
            </div>
            <h2 className="mt-1 font-rogenz text-2xl sm:text-3xl font-normal text-ink">
              {tournament.title}
            </h2>
            <p className="mt-1 text-xs text-muted">
              {tournament.dateLabel} · {tournament.venue} · {candidates.length} solo players open to pair up for BYOP
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="rounded-full p-2.5 -mr-1 text-muted hover:bg-black/5 hover:text-ink transition cursor-pointer flex items-center justify-center shrink-0"
            aria-label="Close dialog"
            title="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <p className="text-xs text-muted leading-relaxed">
            In <strong>BYOP (Bring Your Own Partner)</strong>, if you don&apos;t have a partner available, browse other solo players seeking a pair. Review their playing styles, handedness, and ratings to enter together.
          </p>

          <div className="space-y-3.5">
            {candidates.map((cand) => (
              <div
                key={cand.id}
                className="group relative rounded-2xl border border-line bg-surface p-4 sm:p-5 transition hover:border-ink/40 hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Player Info */}
                  <div className="flex items-start gap-3.5 flex-1 min-w-0">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ink text-white font-bold text-sm shadow-xs">
                      {cand.initials}
                      {cand.verified && (
                        <span
                          title="Verified Player"
                          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white"
                        >
                          <ShieldCheck className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-ink truncate">{cand.name}</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-paper px-2 py-0.5 text-[11px] font-semibold text-muted border border-line">
                          {cand.area}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                          <Trophy className="h-3 w-3" /> #{cand.circuitRank} Circuit
                        </span>
                      </div>

                      {/* Playstyle & Handedness Badges */}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-accent-soft/70 px-2.5 py-1 font-semibold text-accent-strong">
                          {cand.playStyle}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1 font-semibold text-ink/80 border border-line">
                          <Hand className="h-3 w-3 text-muted" /> {cand.dominantHand}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-lg bg-paper px-2 py-1 font-mono text-[11px] text-muted border border-line">
                          Rating: <strong className="text-ink">{cand.rating}</strong> ({cand.winRate} win rate)
                        </span>
                      </div>

                      {/* Looking For Quote */}
                      <p className="mt-2.5 text-xs text-muted/90 italic border-l-2 border-line pl-2.5 leading-relaxed">
                        &ldquo;{cand.lookingForNote}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-line">
                    <Link
                      href={`/players/${cand.id}`}
                      className="text-xs font-semibold text-muted hover:text-ink transition underline underline-offset-4 cursor-pointer"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={`/tournaments/${tournament.slug}/register?pairWith=${cand.id}&partnerName=${encodeURIComponent(
                        cand.name
                      )}&playStyle=${encodeURIComponent(cand.playStyle)}`}
                      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-xs font-bold text-white transition hover:bg-ink-2 shadow-xs cursor-pointer"
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      Pair Up & Enter
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Host Random Draw Alternative Banner */}
          <div className="rounded-2xl border border-dashed border-line bg-paper p-4 text-center sm:text-left sm:flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-ink">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Prefer the Host to assign a random partner?</span>
              </div>
              <p className="text-[11px] text-muted">
                Register solo for <strong>Host Random Draw Doubles 🎯</strong> — the tournament host will spin the official Picker Wheel to draw balanced teams!
              </p>
            </div>
            <Link
              href={`/tournaments/${tournament.slug}/register?category=BLIND_DRAW_DOUBLES`}
              className="mt-2.5 sm:mt-0 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-bold text-ink hover:bg-paper transition cursor-pointer"
            >
              <span>Host Random Draw</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-line px-6 py-4 bg-paper text-xs text-muted">
          <span>Both players share entry or split at checkout</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-ink hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
