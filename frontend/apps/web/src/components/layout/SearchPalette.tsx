"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, IndianRupee, MapPin, Radio, Search, Users } from "lucide-react";
import { useBodyScrollLock, useEscape } from "@/hooks/useOverlay";

const QUICK = [
  { label: "Doubles tournaments", href: "/tournaments?category=doubles", icon: Users },
  { label: "This weekend", href: "/tournaments?when=weekend", icon: CalendarDays },
  { label: "Under ₹500", href: "/tournaments?maxFee=500", icon: IndianRupee },
  { label: "Live now", href: "/tournaments?status=live", icon: Radio },
];

const AREAS = ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield"];

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEscape(open, onClose);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const handle = requestAnimationFrame(() => {
      setQuery("");
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(handle);
  }, [open]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = query.trim();
    if (value) go(`/tournaments?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search tournaments">
      <button type="button" aria-label="Close search" onClick={onClose} className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md" />

      <div className="relative w-full max-w-xl animate-fade-up overflow-hidden rounded-3xl border border-white/15 bg-[#0E1526] text-white shadow-2xl">
        <form onSubmit={submit} role="search" className="flex items-center gap-3 border-b border-white/10 px-5">
          <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tournaments, clubs or areas"
            placeholder="Search tournaments, clubs or areas"
            className="h-14 flex-1 bg-transparent text-base text-white outline-none placeholder:text-gray-400"
          />
          <kbd className="rounded-md border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-mono text-gray-400">Esc</kbd>
        </form>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          <p className="px-2 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Quick filters</p>
          <ul className="space-y-1">
            {QUICK.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => go(href)}
                  className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-gray-200 transition hover:bg-white/10 hover:text-white focus-visible:bg-white/10 focus-visible:outline-none cursor-pointer"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/5 text-gray-400 group-hover:bg-[#F3D15A] group-hover:text-[#0B101B] transition-colors">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">{label}</span>
                  <ArrowUpRight className="h-4 w-4 text-gray-400 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>

          <p className="px-2 pb-2 pt-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Popular areas</p>
          <div className="flex flex-wrap gap-2 px-2 pb-2">
            {AREAS.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => go(`/tournaments?q=${encodeURIComponent(area)}`)}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-300 transition hover:border-[#DE9D35]/40 hover:bg-white/10 hover:text-white cursor-pointer"
              >
                <MapPin className="h-3 w-3 text-[#F3D15A]" aria-hidden="true" />
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
