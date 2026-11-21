"use client";

import React from "react";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

export function Countdown({
  targetDate,
  className,
}: {
  targetDate: string;
  className?: string;
}) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
        Tournament Active / Started
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-xs text-emerald-400", className)}>
      <span className="bg-gray-800/80 px-2 py-1 rounded border border-gray-700/60 font-semibold">{days}d</span>
      <span>:</span>
      <span className="bg-gray-800/80 px-2 py-1 rounded border border-gray-700/60 font-semibold">{hours}h</span>
      <span>:</span>
      <span className="bg-gray-800/80 px-2 py-1 rounded border border-gray-700/60 font-semibold">{minutes}m</span>
      <span>:</span>
      <span className="bg-gray-800/80 px-2 py-1 rounded border border-gray-700/60 font-semibold">{seconds}s</span>
    </div>
  );
}
