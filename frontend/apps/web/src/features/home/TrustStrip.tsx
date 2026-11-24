import React from "react";

export function TrustStrip() {
  const stats = [
    { label: "tournaments this month", value: "42" },
    { label: "matches scored", value: "8,760" },
    { label: "paid securely to hosts", value: "₹24L+" },
  ];

  return (
    <section aria-label="Platform Statistics" className="w-full border-y border-line bg-surface py-5 shadow-2xs">
      <div className="container mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-6 text-center sm:text-left">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-muted mx-auto sm:mx-0">
          POWERING COMMUNITY COMPETITION
        </span>
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-8 gap-y-4 w-full sm:w-auto">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <strong className="text-2xl font-black text-ink">{s.value}</strong>
              <span className="text-xs font-semibold text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
