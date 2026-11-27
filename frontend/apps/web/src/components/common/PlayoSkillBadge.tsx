"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { PlayoSkillLevel, PLAYO_SKILL_TIERS } from "@/types/playo";
import { getProgressWithinTier } from "@/lib/playoRating";
import { Pencil } from "lucide-react";

export interface PlayoSkillBadgeProps {
  level?: PlayoSkillLevel | string;
  rating?: number;
  progress?: number;
  size?: "xs" | "sm" | "md" | "lg";
  layout?: "compact" | "meter" | "pill";
  showOverallLabel?: boolean;
  showSelfLabel?: boolean;
  selfLevel?: string;
  theme?: "light" | "dark";
  className?: string;
}

// Playo calibration theme map
const THEMES: Record<
  string,
  {
    fillColor: string;
    borderColor: string;
    textColor: string;
    bgTrack: string;
    defaultPct: number;
  }
> = {
  Beginner: {
    fillColor: "bg-slate-400",
    borderColor: "border-slate-300",
    textColor: "text-slate-800",
    bgTrack: "bg-slate-100/80",
    defaultPct: 35,
  },
  Amateur: {
    fillColor: "bg-[#00BFA5]", // Playo signature turquoise/teal
    borderColor: "border-[#00BFA5]",
    textColor: "text-slate-900",
    bgTrack: "bg-white",
    defaultPct: 45, // exact match to the circled Playo screenshot (half-fill)
  },
  Intermediate: {
    fillColor: "bg-teal-500",
    borderColor: "border-teal-500",
    textColor: "text-slate-900",
    bgTrack: "bg-white",
    defaultPct: 65,
  },
  Advanced: {
    fillColor: "bg-hotpink/100",
    borderColor: "border-hotpink/30",
    textColor: "text-slate-900",
    bgTrack: "bg-white",
    defaultPct: 80,
  },
  Professional: {
    fillColor: "bg-purple-600",
    borderColor: "border-purple-600",
    textColor: "text-slate-900",
    bgTrack: "bg-white",
    defaultPct: 95,
  },
};

export function PlayoSkillBadge({
  level = "Amateur",
  rating,
  progress,
  size: _size = "sm",
  layout: _layout = "compact",
  showOverallLabel = false,
  showSelfLabel = false,
  selfLevel,
  theme: _theme = "light",
  className,
}: PlayoSkillBadgeProps) {
  void _size;
  void _layout;
  void _theme;
  const normalizedLevel =
    PLAYO_SKILL_TIERS.find(
      (t) => t.id.toLowerCase() === (level || "").toLowerCase()
    )?.id || (level as PlayoSkillLevel) || "Amateur";

  const tierTheme = THEMES[normalizedLevel] || THEMES.Amateur;

  let fillPercent = tierTheme.defaultPct;
  if (typeof progress === "number") {
    fillPercent = Math.min(100, Math.max(0, progress));
  } else if (typeof rating === "number") {
    fillPercent = getProgressWithinTier(rating);
  }

  // Exact Playo Pill Capsule (like the red circle in the reference)
  const playoPill = (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider select-none min-w-[80px] h-[22px] shadow-2xs",
        tierTheme.borderColor,
        tierTheme.bgTrack,
        className
      )}
      title={`${normalizedLevel} rating: ${fillPercent}%`}
    >
      {/* Partial fill progress bar inside the pill */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 opacity-85 transition-all duration-300",
          tierTheme.fillColor
        )}
        style={{ width: `${fillPercent}%` }}
      />

      {/* Pill Text Label */}
      <span className="relative z-10 font-black tracking-widest text-[9px] text-slate-900 drop-shadow-[0_0.5px_0_rgba(255,255,255,0.7)]">
        {normalizedLevel}
      </span>
    </div>
  );

  if (!showOverallLabel && !showSelfLabel) {
    return playoPill;
  }

  // Full Playo Profile Section (Overall + Pill + Self)
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-6">
        <div>
          {showOverallLabel && (
            <span className="text-[11px] font-bold text-slate-500 block mb-1">
              Overall
            </span>
          )}
          {playoPill}
        </div>

        {showSelfLabel && (
          <div>
            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 mb-1">
              <span>Self</span>
              <Pencil className="w-2.5 h-2.5 text-slate-400" />
            </span>
            <span className="text-xs font-bold text-slate-800">
              {selfLevel || normalizedLevel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
