import Link from "next/link";
import { BadgeCheck, Calendar, MapPin, Sparkles, Trophy, ArrowRight } from "lucide-react";
import { BookmarkButton } from "@/components/common/BookmarkButton";
import type { TournamentCardData } from "@/types/tournament";

export function TournamentCard({ t }: { t: TournamentCardData }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-md hover:shadow-xl hover:border-coral/40 transition-all duration-200">
      {/* Poster Graphic Top Half (Solid Deep Navy with Court Geometry) */}
      <div className="relative flex h-48 flex-col justify-between bg-navy p-5 text-white overflow-hidden">
        {/* Subtle decorative badminton court geometry lines */}
        <div className="pointer-events-none absolute inset-0 opacity-15" aria-hidden="true">
          <svg viewBox="0 0 200 120" className="h-full w-full" fill="none" stroke="#FFFFFF" strokeWidth="1.2">
            <rect x="10" y="10" width="180" height="100" rx="4" />
            <path d="M100 10v100M10 60h180M32 10v100M168 10v100" />
          </svg>
        </div>

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-start justify-between gap-2">
          <span className="rounded-full bg-cream text-navy px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-xs">
            {t.tagLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {t.live ? (
              <span className="flex items-center gap-1.5 rounded-full bg-coral text-navy px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-xs animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-navy" />
                LIVE
              </span>
            ) : (
              <BookmarkButton id={t.id} title={t.title} />
            )}
          </div>
        </div>

        {/* Bottom Series Title & Date on Poster */}
        <div className="relative z-10 mt-auto space-y-1">
          <p className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
            {t.series}
          </p>
          <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
            <Calendar className="w-3.5 h-3.5 text-coral shrink-0" />
            <span>{t.dateLabel}</span>
          </div>
        </div>
      </div>

      {/* Card Details Bottom Half */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div className="space-y-2">
          <div>
            <h3 className="line-clamp-1 text-base sm:text-lg font-bold text-navy group-hover:text-coral transition-colors">
              <Link href={`/tournaments/${t.slug}`} className="outline-none after:absolute after:inset-0">
                {t.title}
              </Link>
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-coral shrink-0" />
              <span className="truncate">{t.venueLabel}</span>
            </p>
          </div>

          {/* Slots Progress Bar & Status */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-slate-500">
                {t.fillPercent}% filled
              </span>
              {t.slotsLabel && (
                <span className="text-[11px] font-bold text-coral">
                  {t.slotsLabel}
                </span>
              )}
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-coral rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(8, t.fillPercent))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Price and Action Row */}
        <div className="border-t border-navy/10 pt-3 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Entry Fee</span>
            <p className="flex items-baseline gap-1">
              <span className="text-xl font-black text-navy">{t.priceLabel}</span>
              <span className="text-xs text-slate-500 font-medium">/ {t.priceUnit}</span>
            </p>
          </div>

          {t.live ? (
            <Link
              href={`/live/${t.id}`}
              className="relative z-10 rounded-full border border-coral text-coral hover:bg-coral hover:text-navy px-4 py-2 text-xs font-black transition-colors"
            >
              Watch live
            </Link>
          ) : (
            <span className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-navy text-white group-hover:bg-coral group-hover:text-navy px-4 py-2 text-xs font-black transition-all shadow-xs">
              <span>Enter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          )}
        </div>

        {/* Verified Host & Format Footer */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 pt-1 border-t border-slate-100">
          <span className="flex items-center gap-1 text-navy font-bold">
            {t.hostVerified && <BadgeCheck className="h-3.5 w-3.5 text-coral shrink-0" />}
            <span className="truncate">{t.hostName}</span>
          </span>
          <span className="text-slate-400">{t.format}</span>
        </div>
      </div>
    </article>
  );
}
