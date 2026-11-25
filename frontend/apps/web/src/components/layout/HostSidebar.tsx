"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Users,
  GitBranch,
  Calendar,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export function HostSidebar() {
  const pathname = usePathname();

  const navItems = [
    { title: "Dashboard", href: "/host", icon: LayoutDashboard },
    { title: "Tournaments", href: "/host/tournaments/new", icon: Trophy },
    { title: "Players", href: "/host/tournaments/tour-1/entries", icon: Users },
    { title: "Fixtures", href: "/host/tournaments/tour-1/fixtures", icon: GitBranch },
    { title: "Courts & umpires", href: "/host/tournaments/tour-1/schedule", icon: Calendar },
    { title: "Payouts", href: "/host/payouts", icon: CreditCard },
  ];

  return (
    <aside className="w-60 lg:w-64 bg-white text-[#0B101B] flex flex-col justify-between shrink-0 min-h-screen p-5 border-r border-gray-200 select-none">
      <div className="space-y-8">
        {/* Official Gelavu Logo with HOST Badge */}
        <div className="px-1">
          <GelavuLogo variant="light" badge="HOST" href="/host" />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/host" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#313747] text-white shadow-sm font-bold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#0B101B]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#DE9D35]" : "text-gray-500"}`} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Switch Mode Box */}
      <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-200 p-3.5">
        <span className="text-[10px] uppercase font-bold text-gray-500 block">Mode</span>
        <Link
          href="/"
          className="flex items-center justify-between text-xs font-bold text-[#0B101B] hover:text-[#DE9D35] transition-colors mt-1"
        >
          <span>Switch to Play</span>
          <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
        </Link>
      </div>
    </aside>
  );
}
