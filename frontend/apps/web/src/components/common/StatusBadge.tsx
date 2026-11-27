import React from "react";
import { TournamentStatus } from "@/types";
import { TOURNAMENT_STATUSES } from "@/config/constants";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: TournamentStatus; className?: string }) {
  const conf = TOURNAMENT_STATUSES[status] || {
    label: status,
    color: "bg-navy text-white/80 border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        conf.color,
        className
      )}
    >
      {status === "LIVE" && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />}
      {conf.label}
    </span>
  );
}
