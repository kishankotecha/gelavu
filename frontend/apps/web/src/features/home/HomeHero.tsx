import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin, Search } from "lucide-react";
import { TournamentImage } from "@/components/common/TournamentImage";
import type { HomeStats, TournamentCardData } from "@/types/tournament";

interface Props {
  city: string;
  stats: HomeStats;
  spotlight?: TournamentCardData;
}

export function HomeHero({ city, stats, spotlight }: Props) {
  return (
    <section aria-labelledby="home-title" className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div>
        <p className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink/80">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
          Badminton tournaments in {city}
        </p>

        <h1
          id="home-title"
          className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]"
        >
          Your next tournament is one tap away.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          Discover verified tournaments, register and pay in minutes, then follow your fixtures and scores live. Made for
          players and organisers.
        </p>

        <form
          action="/tournaments"
          method="get"
          role="search"
          className="mt-7 flex max-w-xl items-center gap-2 rounded-full border border-line bg-surface p-1.5 shadow-card focus-within:ring-2 focus-within:ring-ink/20"
        >
          <Search className="ml-3 h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
          <label htmlFor="hero-q" className="sr-only">
            Search tournaments
          </label>
          <input
            id="hero-q"
            name="q"
            type="search"
            placeholder="Search by tournament, club or area"
            className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-ink outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 cursor-pointer"
          >
            Search
          </button>
        </form>

        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {[
            [stats.upcoming, "tournaments coming up"],
            [stats.playersEntered, "players registered"],
            [stats.hosts, "verified hosts"],
          ].map(([value, label]) => (
            <div key={label as string}>
              <dt className="sr-only">{label}</dt>
              <dd className="text-sm text-muted">
                <span className="mr-1.5 text-xl font-extrabold text-ink">{value}</span>
                {label}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href="/host/verify"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
        >
          Organising a tournament? Become a host <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
        <div className="grid h-80 grid-cols-5 grid-rows-2 gap-3 sm:h-[26rem]">
          <TournamentImage
            src="/images/hero/hero-1.jpg"
            theme="emerald"
            sizes="(min-width: 1024px) 30vw, 60vw"
            priority
            className="col-span-3 row-span-2 h-full w-full rounded-3xl"
          />
          <TournamentImage
            src="/images/hero/hero-2.jpg"
            theme="sky"
            sizes="(min-width: 1024px) 20vw, 40vw"
            className="col-span-2 h-full w-full rounded-3xl"
          />
          <TournamentImage
            src="/images/hero/hero-3.jpg"
            theme="violet"
            sizes="(min-width: 1024px) 20vw, 40vw"
            className="col-span-2 h-full w-full rounded-3xl"
          />
        </div>

        {spotlight && (
          <Link
            href={`/tournaments/${spotlight.slug}`}
            className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-lift transition hover:-translate-y-0.5 sm:left-6 sm:right-auto sm:min-w-[300px]"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-lime">
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Next up</span>
              <span className="block truncate text-sm font-bold text-ink">{spotlight.title}</span>
              <span className="block truncate text-xs text-muted">
                {spotlight.dateLabel} · {spotlight.venueLabel}
              </span>
            </span>
            {spotlight.slotsLabel && (
              <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                {spotlight.slotsLabel}
              </span>
            )}
          </Link>
        )}
      </div>
    </section>
  );
}
