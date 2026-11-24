import type { ReactNode } from "react";
import type { PosterTheme } from "@/types/tournament";

const THEMES: Record<PosterTheme, string> = {
  violet: "from-[#4B3FD6] via-[#2D2A7E] to-[#0E1226]",
  emerald: "from-[#0EA877] via-[#0B6B5A] to-[#08241F]",
  amber: "from-[#F59E0B] via-[#E8590C] to-[#B91C4C]",
  sky: "from-[#2E9BEA] via-[#1B5FB3] to-[#0B1F45]",
  rose: "from-[#E54B8A] via-[#A2278F] to-[#2A0F3F]",
};

export function Shuttlecock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M26 21 12 57h40L38 21Z" fill="currentColor" opacity=".55" />
      <path d="M32 24v33M23 25 19 57M41 25l4 32" stroke="rgb(var(--ink))" strokeWidth="1.4" opacity=".45" />
      <circle cx="32" cy="14" r="9" fill="currentColor" />
    </svg>
  );
}

function CourtLines({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 120" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="10" y="10" width="180" height="100" rx="3" />
      <path d="M100 10v100M10 60h180M32 10v100M168 10v100M10 34h180M10 86h180" />
    </svg>
  );
}

export function PosterArt({ theme, className = "", children }: { theme: PosterTheme; className?: string; children?: ReactNode }) {
  return (
    <div className={`relative isolate flex flex-col overflow-hidden bg-gradient-to-br text-white ${THEMES[theme]} ${className}`}>
      <CourtLines className="pointer-events-none absolute -right-6 -top-4 -z-10 h-40 w-64 text-white/10" />
      <Shuttlecock className="pointer-events-none absolute -bottom-3 right-3 -z-10 h-24 w-24 rotate-[28deg] text-white/15" />
      {children}
    </div>
  );
}
