import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import type { FeaturedData } from "@/types/tournament";

export function HeroFeatured({ t }: { t: FeaturedData }) {
  return (
    <section aria-labelledby="featured-title" className="relative">
      <div className="relative isolate overflow-hidden rounded-3xl bg-[#0D1520] p-6 sm:p-10 shadow-lift border border-white/5 text-white">
        {/* Subtle Badminton Racquet & Shuttlecock Watermark Illustration on the right */}
        <div
          className="pointer-events-none absolute -right-6 sm:right-6 top-1/2 -translate-y-1/2 select-none opacity-20 hidden md:block"
          aria-hidden="true"
        >
          <svg width="250" height="250" viewBox="0 0 120 120" fill="none" className="text-lime">
            {/* Racquet Head */}
            <ellipse cx="68" cy="44" rx="30" ry="36" stroke="currentColor" strokeWidth="4.5" />
            {/* Strings */}
            <path
              d="M48 24v40 M58 12v64 M68 9v70 M78 12v64 M88 24v40 M42 32h52 M39 44h58 M42 56h52"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            {/* Shaft & Handle */}
            <path d="M54 78 L26 106" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" />
            <path d="M26 106 L18 114" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.9" />
            {/* Shuttlecock */}
            <g transform="translate(86, 76) scale(0.4)">
              <circle cx="16" cy="16" r="14" fill="currentColor" />
              <path d="M16 28 L4 64 H28 Z" fill="currentColor" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Top Featured Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-[#182B1B] border border-lime/40 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-lime">
            FEATURED • {t.slotsLeft} SLOTS LEFT
          </span>
        </div>

        {/* Tournament Title */}
        <div className="mt-4 max-w-2xl">
          <h1
            id="featured-title"
            className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            {t.title}
          </h1>

          {/* Subline: Date • Venue • Prize Pool */}
          <div className="mt-3.5 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-xs sm:text-sm font-medium text-gray-300">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-gray-400" aria-hidden="true" />
              {t.dateLabel}
            </span>
            <span className="text-gray-500">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-gray-400" aria-hidden="true" />
              {t.venueLabel}
            </span>
            {t.prizeLabel && (
              <>
                <span className="text-gray-500">•</span>
                <span>Prize pool {t.prizeLabel}</span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href={`/tournaments/${t.slug}/register`}
              className="rounded-full bg-lime px-6 py-3 text-sm font-extrabold text-ink shadow-sm transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[.98]"
            >
              Register • from {t.fromPrice}
            </Link>
            <Link
              href={`/tournaments/${t.slug}`}
              className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
