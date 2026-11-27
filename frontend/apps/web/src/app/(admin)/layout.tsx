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
    <div className="flex min-h-screen bg-navy text-white font-sans antialiased">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-navy p-5 shrink-0 hidden md:flex flex-col justify-between min-h-screen">
        <div className="space-y-8">
          {/* Logo with ADMIN Badge */}
          <GelavuLogo variant="dark" badge="ADMIN" href="/admin" />

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60 px-3 block mb-2">
              Super admin
            </span>
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-rose-500/12 text-rose-200 border border-hotpink/30"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-hotpink" : "text-white/60"}`} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Public App */}
        <div className="pt-4 border-t border-white/10/80">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Gelavu</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 overflow-x-auto min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-navy">
          <GelavuLogo variant="dark" badge="ADMIN" href="/admin" size="sm" />
          <Link href="/" className="text-xs text-white/70 hover:text-white">
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
