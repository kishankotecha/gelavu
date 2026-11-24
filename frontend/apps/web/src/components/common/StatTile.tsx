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
        "rounded-xl border border-gray-800 bg-gray-900/60 p-4 transition-all hover:border-gray-700/80",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-400">{label}</p>
        {Icon && (
          <div className="rounded-lg bg-gray-800/80 p-2 text-emerald-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-white">{value}</span>
        {trend && <span className="text-xs font-semibold text-emerald-400">{trend}</span>}
      </div>
      {subtext && <p className="mt-1 text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}
