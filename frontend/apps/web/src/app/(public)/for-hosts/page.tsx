import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import {
  FEATURED,
  HOST_FAQ,
  HOST_STEPS,
  LISTING_TIERS,
  WHO_DOES_WHAT,
} from "@/config/host-process";

export const metadata: Metadata = {
  title: "Host a badminton tournament | Gelavu",
  description:
    "Run your tournament with Gelavu: online registrations and payments, fixtures, live scoring and winner posters. You keep 100% of entry fees.",
};

const Section = ({
  id,
  title,
  sub,
  children,
}: {
  id?: string;
  title: string;
  sub?: string;
  children: ReactNode;
}) => (
  <section id={id} aria-labelledby={`${id ?? title}-h`} className="space-y-6">
    <div>
      <h2
        id={`${id ?? title}-h`}
        className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl"
      >
        {title}
      </h2>
      {sub && <p className="mt-1.5 max-w-2xl text-base text-muted">{sub}</p>}
    </div>
    {children}
  </section>
);

export default function ForHostsPage() {
  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#0B1220] pb-20">
      <div className="mx-auto w-full max-w-5xl space-y-16 px-4 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <header className="space-y-5">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
          For organisers
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
          Run your tournament. We handle sign-ups and payments.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Players register and pay online, you get fixtures and live scoring, and you
          receive 100% of the entry fees after the event.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/host/verify"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold text-white transition hover:bg-ink-2"
          >
            Become a host <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href="#pricing"
            className="inline-flex h-12 items-center rounded-full border border-line px-6 text-sm font-semibold text-ink transition hover:bg-surface"
          >
            See pricing
          </a>
        </div>
      </header>

      {/* Steps */}
      <Section id="how" title="How it works" sub="From signing up to getting paid.">
        <ol className="grid gap-4 sm:grid-cols-2">
          {HOST_STEPS.map((s, i) => (
            <li
              key={s.title}
              className="flex gap-4 rounded-2xl border border-line bg-surface p-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-sm font-extrabold text-lime">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Money */}
      <Section
        id="money"
        title="How the money works"
        sub="Simple, and the same for every tournament."
      >
        <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {[
            ["Player", "Pays the entry fee plus a small Gelavu fee online."],
            [
              "Gelavu",
              "Receives the payment, keeps its fee, holds the entry fees until your event ends.",
            ],
            ["You", "Receive 100% of the entry fees within 5 working days after the event."],
          ].map(([who, text], i) => (
            <div key={who} className="contents">
              {i > 0 && (
                <ArrowRight
                  className="mx-auto hidden h-5 w-5 self-center text-muted md:block"
                  aria-hidden="true"
                />
              )}
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h3 className="text-base font-extrabold text-ink">{who}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section
        id="pricing"
        title="Pricing"
        sub="You pay a listing fee based on your number of slots. Players pay Gelavu's fee on top of the entry fee. Prices include GST."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h3 className="text-base font-extrabold text-ink">Standard listing</h3>
            <ul className="mt-3 divide-y divide-line text-sm">
              {LISTING_TIERS.map((t) => (
                <li key={t.label} className="flex items-center justify-between py-2.5">
                  <span className="text-ink/80">{t.label}</span>
                  <strong className="text-ink">{t.price}</strong>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-ink bg-surface p-5">
            <h3 className="flex items-baseline justify-between text-base font-extrabold text-ink">
              <span>Featured add-on</span>
              <span>+ {FEATURED.price}</span>
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              {FEATURED.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Roles */}
      <Section title="Who does what" sub="Gelavu is the platform. You run the event.">
        <div className="grid gap-4 md:grid-cols-2">
          {(
            [
              ["Gelavu does", WHO_DOES_WHAT.gelavu],
              ["You do", WHO_DOES_WHAT.host],
            ] as const
          ).map(([title, items]) => (
            <div key={title} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-base font-extrabold text-ink">{title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                {items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Umpires */}
      <Section id="umpires" title="Umpires are your team">
        <div className="rounded-2xl bg-ink p-6 text-white sm:p-8">
          <ul className="grid gap-3 text-sm leading-relaxed text-white/85 sm:grid-cols-2">
            <li>You choose and manage your own umpires and officials.</li>
            <li>Invite each umpire by email. They get a scoring link for your tournament only.</li>
            <li>Umpires can enter scores. They cannot see payments or player details.</li>
            <li>You can remove an umpire at any time.</li>
            <li>Gelavu does not recruit, train, certify or insure umpires.</li>
            <li>Every score change is recorded, so disputes are easy to settle.</li>
          </ul>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="Questions hosts ask">
        <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {HOST_FAQ.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink">
                {f.q}
                <span
                  aria-hidden="true"
                  className="text-muted transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <footer className="rounded-3xl border border-line bg-surface p-8 text-center">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Ready to host?</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">
          Get verified once, then list as many tournaments as you like.
        </p>
        <Link
          href="/host/verify"
          className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-7 text-sm font-bold text-white transition hover:bg-ink-2"
        >
          Become a host <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </footer>
      </div>
    </div>
  );
}
