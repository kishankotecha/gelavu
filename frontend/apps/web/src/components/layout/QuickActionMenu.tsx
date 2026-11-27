"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Plus, Trophy, CalendarDays, ShieldCheck, ArrowRight } from "lucide-react";
import { useEscape } from "@/hooks/useOverlay";

export function QuickActionMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEscape(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      {/* Red Circle Action Button (+) from Reference Screenshot */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Create or host tournament"
        aria-expanded={open}
        className="grid h-8 w-8 place-items-center rounded-full bg-coral hover:bg-coral/90 text-navy font-black transition-all active:scale-95 shadow-md cursor-pointer"
        title="Quick Actions"
      >
        <Plus className={`h-4 w-4 stroke-[3] transition-transform duration-200 ${open ? "rotate-45" : ""}`} />
      </button>

      {/* Popover Dropdown matching Reference Screenshot */}
      {open && (
        <>
          {/* Mobile backdrop to easily close on tap */}
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs sm:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Popover Card - Fixed centered on mobile, absolute below button on desktop */}
          <div className="fixed sm:absolute inset-x-4 sm:inset-x-auto sm:right-0 top-16 sm:top-full sm:mt-2 sm:w-80 rounded-2xl border border-white/15 bg-[#14212D]/95 backdrop-blur-xl p-3 shadow-2xl z-50 text-white animate-fade-up">
            <div className="space-y-1">
              {/* Action 1: Host a Tournament */}
              <Link
                href="/host/tournaments/new"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-hotpink text-white font-bold group-hover:scale-105 transition-transform">
                  <Trophy className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs sm:text-sm font-bold text-white group-hover:text-hotpink transition-colors">
                    Host a Tournament
                  </strong>
                  <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                    Publish fixtures, collect UPI fees, and score matches live.
                  </p>
                </div>
              </Link>

              {/* Action 2: Find & Enter Events */}
              <Link
                href="/tournaments"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy border border-white/20 text-white font-bold group-hover:scale-105 transition-transform">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <strong className="block text-xs sm:text-sm font-bold text-white group-hover:text-hotpink transition-colors">
                    Enter an Event
                  </strong>
                  <p className="text-[11px] text-white/70 mt-0.5 leading-snug">
                    Browse verified badminton tournaments near you.
                  </p>
                </div>
              </Link>
            </div>

            <div className="my-2 h-px bg-white/10" />

            {/* Footer Action */}
            <Link
              href="/host/verify"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 text-xs font-semibold text-white/80 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-hotpink" />
                <span>Become a Verified Host</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-white/70" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
