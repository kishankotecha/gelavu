import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { BookmarkButton } from "@/components/common/BookmarkButton";
import type { TournamentCardData } from "@/types/tournament";

const THEMES: Record<string, string> = {
  violet: "from-[#2E1065] via-[#4338CA] to-[#1E1B4B]",
  emerald: "from-[#064E3B] via-[#059669] to-[#047857]",
  amber: "from-[#7C2D12] via-[#EA580C] to-[#E11D48]",
  sky: "from-[#0C4A6E] via-[#0284C7] to-[#1E3A8A]",
  rose: "from-[#831843] via-[#BE185D] to-[#4C0519]",
};

export function TournamentCard({ t }: { t: TournamentCardData }) {
  const gradient = THEMES[t.theme] || THEMES.violet;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      {/* Poster Graphic Top Half */}
      <div className={`relative flex h-44 flex-col justify-between bg-gradient-to-br ${gradient} p-4 text-white overflow-hidden`}>
        {/* Subtle decorative badminton court lines */}
        <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden="true">
          <svg viewBox="0 0 200 120" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="10" y="10" width="180" height="100" rx="3" />
            <path d="M100 10v100M10 60h180M32 10v100M168 10v100" />
          </svg>
        </div>

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-start justify-between gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-ink shadow-2xs">
            {t.tagLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {t.live ? (
              <span className="flex items-center gap-1.5 rounded-full bg-live px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-2xs">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                LIVE
              </span>
            ) : (
              <BookmarkButton id={t.id} title={t.title} />
            )}
          </div>
        </div>

        {/* Bottom Series Title on Poster */}
        <div className="relative z-10 mt-auto">
          <p className="text-xl font-extrabold tracking-tight text-white drop-shadow-xs">{t.series}</p>
        </div>
      </div>

      {/* Card Details Bottom Half */}
      <div className="flex flex-1 flex-col gap-2.5 p-4 bg-white">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-ink group-hover:text-ink-2">
            <Link href={`/tournaments/${t.slug}`} className="outline-none after:absolute after:inset-0">
              {t.title}
            </Link>
          </h3>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted">{t.venueLabel}</p>
        </div>

        {/* Price and Slot/Action Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <p className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-ink">{t.priceLabel}</span>
            <span className="text-xs text-muted font-normal">{t.priceUnit}</span>
          </p>
          {t.live ? (
            <Link
              href={`/live/${t.id}`}
              className="relative z-10 rounded-full border border-live/40 bg-transparent px-3 py-1 text-[11px] font-bold text-live hover:bg-live/10 transition-colors"
            >
              Watch live
            </Link>
          ) : (
            t.slotsLabel && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  (t.slotsTone === "warn" || (t.slotsTone as string) === "ok" && (t.slotsLabel.includes("8") || t.slotsLabel.includes("6")))
                    ? "bg-[#FEF3C7] text-[#92400E]"
                    : "bg-[#DCFCE7] text-[#166534]"
                }`}
              >
                {t.slotsLabel}
              </span>
            )
          )}
        </div>

        {/* Verified Host and Format Footer */}
        <p className="mt-auto flex items-center gap-1.5 border-t border-line pt-2.5 text-xs text-muted">
          {t.hostVerified && <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden="true" />}
          <span className="truncate">
            Verified host • {t.format}
          </span>
        </p>
      </div>
    </article>
  );
}
