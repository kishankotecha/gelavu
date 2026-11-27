import React from "react";
import { cn } from "@/lib/utils";

export function StatTile({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ElementType;
  trend?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-navy/80 p-4 transition-all hover:border-white/10/80",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60">{label}</p>
        {Icon && (
          <div className="rounded-lg bg-navy/80 p-2 text-hotpink">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-rogenz text-2xl sm:text-3xl font-bold tracking-wide text-white tabular-nums">{value}</span>
        {trend && <span className="text-xs font-semibold text-hotpink">{trend}</span>}
      </div>
      {subtext && <p className="mt-1 text-xs text-white/60">{subtext}</p>}
    </div>
  );
}
