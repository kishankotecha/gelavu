import React from "react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

const toneEyebrow: Record<Tone, string> = {
  light: "text-slate-500",
  dark: "text-white/60",
};

const toneTitle: Record<Tone, string> = {
  light: "text-[#14212D]",
  dark: "text-white",
};

const toneLead: Record<Tone, string> = {
  light: "text-slate-600",
  dark: "text-white/70",
};

const toneSection: Record<Tone, string> = {
  light: "text-[#14212D]",
  dark: "text-white",
};

export function DashboardEyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "block text-[11px] font-semibold uppercase tracking-[0.12em]",
        toneEyebrow[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DashboardTitle({
  children,
  tone = "light",
  className,
  as: Tag = "h1",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={cn(
        "font-rogenz text-2xl sm:text-3xl font-bold tracking-wide leading-[1.12]",
        toneTitle[tone],
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function DashboardLead({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p className={cn("text-sm leading-relaxed mt-1.5 max-w-2xl", toneLead[tone], className)}>
      {children}
    </p>
  );
}

export function DashboardSectionTitle({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-rogenz text-lg sm:text-xl font-bold tracking-wide leading-tight",
        toneSection[tone],
        className
      )}
    >
      {children}
    </h2>
  );
}

export function DashboardStatValue({
  children,
  className,
  inverted,
}: {
  children: React.ReactNode;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-rogenz text-2xl sm:text-3xl font-bold tracking-wide tabular-nums leading-none",
        inverted ? "text-white" : "text-[#14212D]",
        className
      )}
    >
      {children}
    </span>
  );
}

/** Consistent page shell padding for host main views */
export function HostPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "p-5 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-6 sm:space-y-8 text-[#1E293B] antialiased",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminPageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-6xl mx-auto space-y-6 sm:space-y-8 antialiased", className)}>
      {children}
    </div>
  );
}