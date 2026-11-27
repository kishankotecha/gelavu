"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export function DashboardSidebar({
  items,
  title,
  subtitle,
}: {
  items: NavItem[];
  title: string;
  subtitle?: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-white/10 bg-gray-950 p-4 shrink-0 hidden lg:block min-h-[calc(100vh-4rem)]">
      <div className="mb-6 px-3">
        <GelavuLogo variant="dark" href="/" size="sm" className="mb-4" />
        <h2 className="text-base font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-white/60 mt-0.5">{subtitle}</p>}
      </div>

      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-hotpink/15 text-hotpink font-semibold border border-hotpink/30"
                  : "text-white/70 hover:bg-gray-900 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4 w-4", isActive ? "text-hotpink" : "text-white/60")} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold bg-coral/15 text-coral px-2 py-0.5 rounded-full border border-coral/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
