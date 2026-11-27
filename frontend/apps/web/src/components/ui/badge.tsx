import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-hotpink/10 text-hotpink border-hotpink/30",
    secondary: "bg-navy text-white/80 border-white/10",
    outline: "border-white/10 text-white/80",
    success: "bg-green-500/15 text-green-400 border-green-500/30",
    warning: "bg-hotpink/100/15 text-hotpink border-hotpink/30",
    danger: "bg-rose-500/15 text-hotpink border-hotpink/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
