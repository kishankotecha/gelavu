import React from "react";
import { Medal, Shuffle, Trophy } from "lucide-react";

const STYLE = {
  MS: "bg-sky-100 text-sky-800 ring-sky-200",
  WS: "bg-rose-100 text-rose-800 ring-rose-200",
  MD: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  WD: "bg-violet-100 text-violet-800 ring-violet-200",
  XD: "bg-hotpink/15 text-navy ring-hotpink/40",
  RD: "bg-indigo-100 text-indigo-800 ring-indigo-200",
  "40+": "bg-slate-100 text-slate-800 ring-slate-200",
} as const;

export type DivisionCode = keyof typeof STYLE;

export function DivisionBadge({ code, size = 40 }: { code: DivisionCode; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`grid shrink-0 place-items-center rounded-xl text-[12px] font-extrabold tracking-wide ring-1 ${STYLE[code]}`}
    >
      {code === "RD" ? <Shuffle className="h-4 w-4" /> : code}
    </span>
  );
}

const ring = "grid h-7 w-7 place-items-center rounded-full shrink-0";
export const ChampionIcon = () => (
  <span aria-hidden="true" className={`${ring} bg-hotpink/15 text-hotpink`}>
    <Trophy className="h-4 w-4" />
  </span>
);
export const RunnerUpIcon = () => (
  <span aria-hidden="true" className={`${ring} bg-slate-200 text-slate-600`}>
    <Medal className="h-4 w-4" />
  </span>
);
export const SemiFinalIcon = () => (
  <span aria-hidden="true" className={`${ring} bg-hotpink text-hotpink`}>
    <Medal className="h-4 w-4" />
  </span>
);
