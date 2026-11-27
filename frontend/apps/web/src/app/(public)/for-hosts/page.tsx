import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ShieldCheck,
  Zap,
  QrCode,
  Trophy,
  Users,
  Smartphone,
  Wallet,
  Calendar,
  Sparkles,
} from "lucide-react";
import {
  FEATURED,
  HOST_FAQ,
  HOST_STEPS,
  LISTING_TIERS,
  WHO_DOES_WHAT,
} from "@/config/host-process";

export const metadata: Metadata = {
  title: "Badminton Tournament Management Software & Bracket Platform | Gelavu",
  description:
    "The all-in-one tournament management SaaS for sports clubs, academies and organizers. Automated seeded brackets, 100% escrow UPI payments, live mobile QR umpire scoring, and automated WhatsApp broadcasts. Keep 100% of entry fees.",
  keywords: [
    "badminton tournament management software",
    "sports tournament software",
    "tournament bracket generator",
    "host badminton tournament",
    "live scoring app for umpires",
    "badminton tournament software Bengaluru",
    "badminton tournament organiser app India",
  ],
  openGraph: {
    title: "Badminton Tournament Management Software & SaaS | Gelavu",
    description:
      "Automated seeded brackets, 100% escrow UPI payments, live mobile QR umpire scoring, and automated WhatsApp broadcasts. Keep 100% of entry fees.",
    url: "https://gelavu.com/for-hosts",
    siteName: "Gelavu",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://gelavu.com/for-hosts",
  },
};

const Section = ({
  id,
  badge,
  title,
  sub,
  children,
}: {
  id?: string;
  badge?: string;
  title: string;
  sub?: string;
  children: ReactNode;
}) => (
  <section id={id} aria-labelledby={`${id ?? title}-h`} className="space-y-6">
    <div>
      {badge && (
        <span className="text-xs font-black uppercase tracking-widest text-coral block mb-1">
          {badge}
        </span>
      )}
      <h2
        id={`${id ?? title}-h`}
        className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl"
      >
        {title}
      </h2>
      {sub && <p className="mt-1.5 max-w-2xl text-base text-slate-600 font-normal">{sub}</p>}
    </div>
    {children}
  </section>
);

export default function ForHostsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Gelavu Tournament Manager",
        applicationCategory: "SportsApplication, BusinessApplication",
        operatingSystem: "Web, Mobile Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
          description: "Free to launch. Keep 100% of tournament entry fees.",
        },
        featureList: [
          "Automated seeded bracket generator",
          "10-second UPI and card player registration",
          "Mobile QR court umpire live point scoring",
          "Automated WhatsApp match queue broadcasts",
          "Automated player Elo updates and city leaderboard sync",
          "100% bank payout of player entry fees within 5 business days",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: HOST_FAQ.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-[#F4EDE0] text-navy pb-24 selection:bg-coral selection:text-white">
        <div className="mx-auto w-full max-w-5xl space-y-20 px-4 py-12 sm:px-6 sm:py-20">
          
          {/* Hero Section */}
          <header className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy text-coral text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span>Badminton Tournament Management SaaS</span>
            </div>
            
            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl">
              Run your tournament. Zero spreadsheets. <span className="underline decoration-coral decoration-wavy decoration-2 underline-offset-8">100% on-time payouts.</span>
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-slate-700 font-medium">
              Players register and pay securely via UPI, you get automated seeded brackets and live QR umpire scoring, and you receive 100% of entry fees via direct bank transfer.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/host/tournaments/new"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-coral px-8 text-sm font-black text-navy transition hover:brightness-105 shadow-md hover:shadow-lg hover:-translate-y-0.5 transform transition-all"
              >
                Launch tournament free <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#comparison"
                className="inline-flex h-13 items-center rounded-full border-2 border-navy/15 bg-white px-7 text-sm font-bold text-navy transition hover:bg-cream hover:border-navy"
              >
                Compare vs spreadsheets
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-navy/10">
              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-navy/10">
                <span className="block text-2xl font-black text-navy">100%</span>
                <span className="text-xs font-bold text-slate-600">Entry fee payout to host</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-navy/10">
                <span className="block text-2xl font-black text-coral">10-sec</span>
                <span className="text-xs font-bold text-slate-600">Instant UPI player checkout</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-navy/10">
                <span className="block text-2xl font-black text-navy">0 apps</span>
                <span className="text-xs font-bold text-slate-600">Mobile QR scoring for umpires</span>
              </div>
              <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-navy/10">
                <span className="block text-2xl font-black text-navy">1-click</span>
                <span className="text-xs font-bold text-slate-600">Seeded bracket generator</span>
              </div>
            </div>
          </header>

          {/* Core Feature Pillars */}
          <Section
            badge="Tournament Operating System"
            title="Everything an academy or organizer needs on match day"
            sub="Replace paper sheets, WhatsApp group chaos, and Excel draw disputes with purpose-built software."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs hover:border-navy/30 transition-all">
                <div className="h-11 w-11 rounded-xl bg-navy text-coral flex items-center justify-center font-black mb-4">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">Automated Seeded Brackets</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Generate knockout and league fixtures automatically. Seeds are placed based on verified Circuit Elo ratings to eliminate bracket bias.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs hover:border-navy/30 transition-all">
                <div className="h-11 w-11 rounded-xl bg-navy text-coral flex items-center justify-center font-black mb-4">
                  <QrCode className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">Mobile QR Umpire Scoring</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Umpires scan a QR code on their phone to score points in real-time. No apps to download, no expensive tablets required at court-side.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs hover:border-navy/30 transition-all">
                <div className="h-11 w-11 rounded-xl bg-navy text-coral flex items-center justify-center font-black mb-4">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">100% Escrow Protection</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Say goodbye to fake UPI screenshot receipts. All player fees are collected via automated payment gateway and paid straight to your bank account.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs hover:border-navy/30 transition-all">
                <div className="h-11 w-11 rounded-xl bg-navy text-coral flex items-center justify-center font-black mb-4">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">Instant WhatsApp Match Calls</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Automated WhatsApp messages notify players 10 minutes before their match and announce court allocations, ending venue shouting.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs hover:border-navy/30 transition-all">
                <div className="h-11 w-11 rounded-xl bg-navy text-coral flex items-center justify-center font-black mb-4">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">Official Circuit Elo Sync</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Your tournament counts toward official city rankings. Serious athletes prioritize your events to earn verified city seed points.
                </p>
              </div>

              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs hover:border-navy/30 transition-all">
                <div className="h-11 w-11 rounded-xl bg-navy text-coral flex items-center justify-center font-black mb-4">
                  <Wallet className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-navy">Instant Winner Posters</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  At final whistle, Gelavu auto-generates high-resolution social media winner graphics for your club&apos;s Instagram and player stories.
                </p>
              </div>
            </div>
          </Section>

          {/* Competitive Comparison Matrix */}
          <section id="comparison" className="space-y-6 pt-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-coral block">
                Competitive Comparison
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-navy sm:text-3xl mt-1">
                Why clubs &amp; tournament directors switch to Gelavu
              </h2>
              <p className="mt-1.5 max-w-2xl text-base text-slate-600 font-normal">
                See how Gelavu eliminates the operational headache of organizing amateur badminton events.
              </p>
            </div>

            <div className="overflow-x-auto rounded-3xl border-2 border-navy/10 bg-white shadow-md">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#EFECE3] border-b border-navy/10 text-xs uppercase font-black text-navy">
                  <tr>
                    <th className="p-4 sm:p-5">Feature</th>
                    <th className="p-4 sm:p-5 text-slate-600">Google Forms + WhatsApp</th>
                    <th className="p-4 sm:p-5 text-slate-600">Legacy Desktop Software</th>
                    <th className="p-4 sm:p-5 bg-navy text-white font-black border-l border-navy">
                      Gelavu Tournament SaaS
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/10 text-navy bg-white">
                  <tr className="hover:bg-cream/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold">Player Registration &amp; UPI Payments</td>
                    <td className="p-4 sm:p-5 text-slate-600">Manual screenshot chasing, fake UPI proofs, chaotic reconciliation</td>
                    <td className="p-4 sm:p-5 text-slate-600">No Indian payment gateways, cash on the day</td>
                    <td className="p-4 sm:p-5 bg-coral/10 font-black text-navy border-l border-coral/30">
                      ⚡ 10-sec UPI &amp; card checkout, automated waitlists &amp; escrow security
                    </td>
                  </tr>
                  <tr className="hover:bg-cream/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold">Brackets &amp; Fixture Draws</td>
                    <td className="p-4 sm:p-5 text-slate-600">Manual paper/Excel draws with seed disputes and scheduling chaos</td>
                    <td className="p-4 sm:p-5 text-slate-600">Complex 90s desktop UI, slow bye calculations</td>
                    <td className="p-4 sm:p-5 bg-coral/10 font-black text-navy border-l border-coral/30">
                      🎯 1-click automated seeded brackets with court-by-court scheduling matrix
                    </td>
                  </tr>
                  <tr className="hover:bg-cream/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold">Court Umpire Scoring</td>
                    <td className="p-4 sm:p-5 text-slate-600">Paper scorecards, shouting names across courts</td>
                    <td className="p-4 sm:p-5 text-slate-600">Requires dedicated laptops at each court table</td>
                    <td className="p-4 sm:p-5 bg-coral/10 font-black text-navy border-l border-coral/30">
                      📱 Mobile QR scan—no app install needed. Live point-by-point telemetry
                    </td>
                  </tr>
                  <tr className="hover:bg-cream/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold">Match Calls &amp; Player Updates</td>
                    <td className="p-4 sm:p-5 text-slate-600">Chaotic WhatsApp spam, players missing their slots</td>
                    <td className="p-4 sm:p-5 text-slate-600">Only printed noticeboard charts</td>
                    <td className="p-4 sm:p-5 bg-coral/10 font-black text-navy border-l border-coral/30">
                      💬 Automated WhatsApp notifications when courts free up
                    </td>
                  </tr>
                  <tr className="hover:bg-cream/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold">Winner Posters &amp; Social Fame</td>
                    <td className="p-4 sm:p-5 text-slate-600">Hours spent editing templates on Canva after a 12-hour day</td>
                    <td className="p-4 sm:p-5 text-slate-600">Basic plain-text results export</td>
                    <td className="p-4 sm:p-5 bg-coral/10 font-black text-navy border-l border-coral/30">
                      🏆 1-click high-res branded winner cards ready for Instagram &amp; WhatsApp
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Steps */}
          <Section badge="Fast Onboarding" id="how" title="How it works" sub="From signing up to getting paid in four simple steps.">
            <ol className="grid gap-4 sm:grid-cols-2">
              {HOST_STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-4 rounded-2xl border-2 border-navy/10 bg-white p-5 shadow-xs"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-navy text-sm font-extrabold text-coral">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-navy">{s.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* Money Flow */}
          <Section
            badge="Transparent Financials"
            id="money"
            title="How the money works"
            sub="Simple, transparent, and the same for every tournament."
          >
            <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {[
                ["Player", "Pays the entry fee plus a small Gelavu fee online via UPI or Card."],
                [
                  "Gelavu Escrow",
                  "Receives the payment, keeps its platform fee, and securely holds the entry fees until your event completes.",
                ],
                ["You (The Host)", "Receive 100% of the tournament entry fees directly in your bank account within 5 working days."],
              ].map(([who, text], i) => (
                <div key={who} className="contents">
                  {i > 0 && (
                    <ArrowRight
                      className="mx-auto hidden h-5 w-5 self-center text-slate-400 md:block"
                      aria-hidden="true"
                    />
                  )}
                  <div className="rounded-2xl border-2 border-navy/10 bg-white p-5 shadow-xs">
                    <h3 className="text-base font-extrabold text-navy">{who}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Pricing */}
          <Section
            badge="Predictable Pricing"
            id="pricing"
            title="Transparent listing fees"
            sub="You pay a listing fee based on your number of slots. Players pay Gelavu's small fee on top of the entry fee. Prices include GST."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs">
                <h3 className="text-lg font-extrabold text-navy">Standard listing</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Complete bracket engine, umpire QR scoring, and direct payouts.</p>
                <ul className="divide-y divide-navy/10 text-sm">
                  {LISTING_TIERS.map((t) => (
                    <li key={t.label} className="flex items-center justify-between py-2.5">
                      <span className="text-slate-700 font-medium">{t.label}</span>
                      <strong className="text-navy font-bold">{t.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-coral bg-white p-6 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-coral text-navy text-[10px] font-black uppercase px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
                <h3 className="flex items-baseline justify-between text-lg font-extrabold text-navy">
                  <span>Featured listing add-on</span>
                  <span className="text-coral font-black text-xl">+ {FEATURED.price}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Maximum exposure across the city circuit homepage and WhatsApp alerts.</p>
                <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
                  {FEATURED.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-coral"
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
          <Section badge="Clear Boundaries" title="Who does what" sub="Gelavu provides the technology platform. You manage the physical event.">
            <div className="grid gap-4 md:grid-cols-2">
              {(
                [
                  ["Gelavu does", WHO_DOES_WHAT.gelavu],
                  ["You do", WHO_DOES_WHAT.host],
                ] as const
              ).map(([title, items]) => (
                <div key={title} className="rounded-2xl border-2 border-navy/10 bg-white p-6 shadow-xs">
                  <h3 className="text-base font-extrabold text-navy">{title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-700">
                    {items.map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-coral"
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
          <Section badge="Court-side Staff" id="umpires" title="Umpires are your team">
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-8 shadow-md">
              <ul className="grid gap-4 text-sm leading-relaxed text-white/90 sm:grid-cols-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-coral font-bold">•</span>
                  <span>You choose and manage your own umpires and court officials.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-coral font-bold">•</span>
                  <span>Invite each umpire by email or link. They receive a dedicated mobile scoring link for your event.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-coral font-bold">•</span>
                  <span>Umpires enter points via phone QR. They cannot see financial or player private contact data.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-coral font-bold">•</span>
                  <span>You can reassign or revoke an umpire badge in 1 click at any time.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-coral font-bold">•</span>
                  <span>Gelavu does not recruit or certify umpires—you maintain full quality control.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-coral font-bold">•</span>
                  <span>Every point change is timestamped and logged, making line call disputes simple to resolve.</span>
                </li>
              </ul>
            </div>
          </Section>

          {/* FAQ */}
          <Section badge="Questions & Answers" id="faq" title="Frequently asked host questions">
            <div className="divide-y divide-navy/10 overflow-hidden rounded-2xl border-2 border-navy/10 bg-white shadow-xs">
              {HOST_FAQ.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-navy">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="text-slate-400 font-bold transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
          </Section>

          {/* CTA Footer */}
          <footer className="rounded-3xl border-2 border-navy bg-navy text-white p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-coral">
                Start in 3 minutes
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ready to host your next badminton tournament?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
                Get verified once, launch your tournament with automated brackets, and receive 100% of player entry fees directly in your bank account.
              </p>
              <div className="pt-2">
                <Link
                  href="/host/tournaments/new"
                  className="inline-flex h-13 items-center gap-2 rounded-full bg-coral px-8 text-sm font-black text-navy transition hover:brightness-105 shadow-md hover:shadow-xl hover:-translate-y-0.5 transform"
                >
                  Launch tournament free <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
