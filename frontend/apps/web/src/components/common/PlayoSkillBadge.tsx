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
  /** compact = chip + micro bar (tables); meter = full tier + progress track (profile) */
  layout?: "compact" | "meter";
  showOverallLabel?: boolean;
  showSelfLabel?: boolean;
  selfLevel?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function PlayoSkillBadge({
  level = "Amateur",
  rating,
  progress,
  size = "sm",
  layout = "compact",
  showOverallLabel = false,
  showSelfLabel = false,
  selfLevel,
  theme = "dark",
  className,
}: PlayoSkillBadgeProps) {
  const normalizedLevel =
    PLAYO_SKILL_TIERS.find(
      (t) => t.id.toLowerCase() === (level || "").toLowerCase()
    )?.id || "Amateur";

  const tierConfig =
    PLAYO_SKILL_TIERS.find((t) => t.id === normalizedLevel) ??
    PLAYO_SKILL_TIERS[1];

  let fillPercent = 50;
  if (typeof progress === "number") {
    fillPercent = Math.min(100, Math.max(0, progress));
  } else if (typeof rating === "number") {
    fillPercent = getProgressWithinTier(rating);
  }

  const isDark = theme === "dark";

  const sizeStyles = {
    xs: { label: "text-[10px]", bar: "h-1", track: "min-w-[64px]" },
    sm: { label: "text-xs", bar: "h-1.5", track: "min-w-[72px]" },
    md: { label: "text-sm", bar: "h-2", track: "min-w-[140px]" },
    lg: { label: "text-base", bar: "h-2.5", track: "min-w-[180px]" },
  }[size];

  const meterBlock = (
    <div
      className={cn(sizeStyles.track, layout === "meter" && "w-full max-w-sm", className)}
      title={`${normalizedLevel} · ${fillPercent}% toward next tier`}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border"
            style={{
              backgroundColor: `${tierConfig.indicatorColor}22`,
              borderColor: `${tierConfig.indicatorColor}55`,
            }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: tierConfig.indicatorColor }}
            />
          </span>
          <span
            className={cn(
              "font-black tracking-tight truncate",
              sizeStyles.label,
              isDark ? "text-white" : "text-slate-900"
            )}
          >
            {tierConfig.label}
          </span>
        </div>
        {layout === "meter" && (
          <span
            className={cn(
              "text-xs font-mono font-black tabular-nums shrink-0",
              isDark ? "text-[#F3D15A]" : "text-amber-700"
            )}
          >
            {fillPercent}%
          </span>
        )}
      </div>
      <div
        className={cn(
          "w-full rounded-full overflow-hidden",
          sizeStyles.bar,
          isDark ? "bg-white/10 ring-1 ring-white/5" : "bg-slate-200"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", sizeStyles.bar)}
          style={{
            width: `${fillPercent}%`,
            background: `linear-gradient(90deg, ${tierConfig.indicatorColor}, ${tierConfig.indicatorColor}cc)`,
            boxShadow: isDark ? `0 0 14px ${tierConfig.indicatorColor}40` : undefined,
          }}
        />
      </div>
      {layout === "meter" && (
        <p className={cn("mt-2 text-[10px] leading-snug", isDark ? "text-gray-500" : "text-slate-500")}>
          Toward next tier within the{" "}
          <span className={cn("font-semibold", isDark ? "text-gray-400" : "text-slate-600")}>
            {tierConfig.label}
          </span>{" "}
          band
        </p>
      )}
    </div>
  );

  const compactChip = (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 font-bold tracking-wide",
          sizeStyles.label,
          isDark
            ? "bg-white/5 border border-white/10 text-white"
            : "bg-slate-50 border border-slate-200 text-slate-800"
        )}
      >
        <span
          className="h-2 w-2 rounded-full shrink-0"
          style={{ backgroundColor: tierConfig.indicatorColor }}
        />
        {tierConfig.label}
      </span>
      <div
        className={cn(
          "rounded-full overflow-hidden w-full",
          sizeStyles.bar,
          isDark ? "bg-white/10" : "bg-slate-200"
        )}
      >
        <div
          className={cn("h-full rounded-full", sizeStyles.bar)}
          style={{ width: `${fillPercent}%`, backgroundColor: tierConfig.indicatorColor }}
        />
      </div>
    </div>
  );

  const core = layout === "meter" ? meterBlock : compactChip;

  if (!showOverallLabel && !showSelfLabel) {
    return core;
  }

  return (
    <div className={cn("flex flex-col gap-2", layout === "meter" && "w-full")}>
      {showOverallLabel && (
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-wider",
            isDark ? "text-[#DE9D35]" : "text-slate-600"
          )}
        >
          Calibrated tier
        </span>
      )}
      <div className="flex flex-wrap items-start gap-4">
        {core}
        {showSelfLabel && (
          <div
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs",
              isDark
                ? "border-white/10 bg-white/5 text-gray-300"
                : "border-slate-200 bg-slate-50 text-slate-600"
            )}
          >
            <span className="font-medium opacity-70">Self-assessed</span>
            <Pencil className="w-3 h-3 opacity-50" />
            <span className={cn("font-bold", isDark ? "text-white" : "text-slate-900")}>
              {selfLevel || normalizedLevel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}