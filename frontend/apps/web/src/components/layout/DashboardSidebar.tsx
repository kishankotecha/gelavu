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
    <aside className="w-64 border-r border-gray-800 bg-gray-950 p-4 shrink-0 hidden lg:block min-h-[calc(100vh-4rem)]">
      <div className="mb-6 px-3">
        <GelavuLogo variant="dark" href="/" size="sm" className="mb-4" />
        <h2 className="text-base font-bold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
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
                  ? "bg-emerald-600/15 text-emerald-400 font-semibold border border-emerald-500/20"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-4 w-4", isActive ? "text-emerald-400" : "text-gray-500")} />
                <span>{item.title}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
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
