import React from "react";
import { cn } from "@/lib/utils";

export function Avatar({
  name,
  url,
  size = "md",
  className,
}: {
  name: string;
  url?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  const sizeMap = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  if (url) {
    return (
      <div
        className={cn(
          "rounded-full bg-cover bg-center border border-gray-700 shrink-0",
          sizeMap[size],
          className
        )}
        style={{ backgroundImage: `url(${url})` }}
        role="img"
        aria-label={name}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 text-white font-bold flex items-center justify-center border border-emerald-400/30 select-none shadow-sm shrink-0",
        sizeMap[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
