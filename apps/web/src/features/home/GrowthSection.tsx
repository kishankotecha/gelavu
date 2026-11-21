import Link from "next/link";
import { ArrowRight, BadgeCheck, CreditCard, MessageCircle, Radio } from "lucide-react";
import { siteConfig } from "@/config/site";

export function GrowthSection() {
  const community = siteConfig.whatsappCommunityUrl;

  return (
    <section aria-label="Host or join the community" className={`grid gap-4 ${community ? "lg:grid-cols-[1.4fr_1fr]" : ""}`}>
      <div className="rounded-3xl bg-ink p-6 text-white shadow-lift sm:p-8">
        <p className="text-[11px] font-extrabold uppercase tracking-widest text-lime">For organisers</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Run your tournament the easy way.</h2>
        <ul className="mt-5 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
          <li className="flex items-start gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
            Get verified once, so players trust you.
          </li>
          <li className="flex items-start gap-2">
            <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
            Collect entries online, with no cash to chase.
          </li>
          <li className="flex items-start gap-2">
            <Radio className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
            Fixtures, scores and winners in one place.
          </li>
        </ul>
        <Link
          href="/host/verify"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-extrabold text-ink transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          Become a host <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {community && (
        <div className="flex flex-col justify-between rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-8">
          <div>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-xl font-extrabold tracking-tight text-ink">Join the {siteConfig.city} community</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              New tournaments, partner requests and results, straight to your WhatsApp.
            </p>
          </div>
          <a
            href={community}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-2"
          >
            Join on WhatsApp
          </a>
        </div>
      )}
    </section>
  );
}
