import { CreditCard, Search, Share2, Trophy } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Find", text: "Browse verified tournaments by city, date, format and fee." },
  { icon: CreditCard, title: "Register and pay", text: "Pay securely online. Your slot is confirmed the moment it goes through." },
  { icon: Trophy, title: "Play", text: "See your fixtures, court and match time live. No chasing the organiser." },
  { icon: Share2, title: "Share the win", text: "Your results and winner poster are ready to share with your friends." },
] as const;

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="space-y-6">
      <div>
        <h2 id="how-title" className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          How Gelavu works
        </h2>
        <p className="mt-0.5 text-sm text-muted">From finding a tournament to lifting the trophy.</p>
      </div>
      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-lime">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-xs font-bold text-muted">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-base font-bold text-ink">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
