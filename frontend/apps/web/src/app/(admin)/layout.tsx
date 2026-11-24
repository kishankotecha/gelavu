"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Trophy,
  Users,
  CreditCard,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

const ADMIN_NAV = [
  { title: "Review Queue", href: "/admin", icon: ShieldCheck },
  { title: "Tournaments", href: "/admin/tournaments", icon: Trophy },
  { title: "Host Verification", href: "/admin/hosts", icon: Users },
  { title: "Escrow & Payouts", href: "/admin/payments", icon: CreditCard },
  { title: "Disputes & Appeals", href: "/admin/disputes", icon: AlertTriangle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0B101B] text-white font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-[#0E1524] p-5 shrink-0 hidden md:flex flex-col justify-between min-h-screen">
        <div className="space-y-8">
          {/* Logo with ADMIN Badge */}
          <GelavuLogo variant="dark" badge="ADMIN" href="/admin" />

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-500 px-3 block mb-2">
              Super Admin Console
            </span>
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-xs"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-rose-400" : "text-gray-500"}`} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Public App */}
        <div className="pt-4 border-t border-gray-800/80">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Gelavu</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 overflow-x-auto min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-gray-800 bg-[#0E1524]">
          <GelavuLogo variant="dark" badge="ADMIN" href="/admin" size="sm" />
          <Link href="/" className="text-xs text-gray-400 hover:text-white">
            Exit
          </Link>
        </header>

        <main className="p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
