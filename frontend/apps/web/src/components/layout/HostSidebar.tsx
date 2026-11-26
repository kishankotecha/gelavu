"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  Users,
  GitBranch,
  Calendar,
  CreditCard,
  ArrowLeftRight,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export function HostSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { title: "Dashboard", href: "/host", icon: LayoutDashboard },
    { title: "Tournaments", href: "/host/tournaments/new", icon: Trophy },
    { title: "Players", href: "/host/tournaments/tour-1/entries", icon: Users },
    { title: "Fixtures & draws", href: "/host/tournaments/tour-1/fixtures", icon: GitBranch },
    { title: "Courts & umpires", href: "/host/tournaments/tour-1/schedule", icon: Calendar },
    { title: "Payouts & escrow", href: "/host/payouts", icon: CreditCard },
  ];

  const renderNavLinks = (onItemClick?: () => void) => (
    <nav className="space-y-1">
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 block px-3 mb-3">
        Tournament ops
      </span>
      {navItems.map((item) => {
        const Icon = item.icon;
        let isActive = false;
        if (item.title === "Dashboard") {
          isActive = pathname === "/host";
        } else if (item.title === "Tournaments") {
          isActive = pathname.includes("/tournaments/new") || pathname === "/host/tournaments";
        } else if (item.title === "Players") {
          isActive = pathname.includes("/entries");
        } else if (item.title === "Fixtures & draws") {
          isActive = pathname.includes("/fixtures");
        } else if (item.title === "Courts & umpires") {
          isActive = pathname.includes("/schedule");
        } else if (item.title === "Payouts & escrow") {
          isActive = pathname.includes("/payouts");
        } else {
          isActive = pathname === item.href;
        }

        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={onItemClick}
            className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-[#F3D15A] text-[#0B101B] font-semibold shadow-sm shadow-amber-400/15"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={`w-4 h-4 ${
                  isActive ? "text-slate-950" : "text-slate-400 group-hover:text-slate-200"
                }`}
              />
              <span>{item.title}</span>
            </div>

            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
          </Link>
        );
      })}
    </nav>
  );

  const renderFooter = () => (
    <div className="space-y-3 pt-6 border-t border-slate-800/80">
      {/* Verified Host Card */}
      <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Verified host
        </span>
        <span className="text-xs font-bold text-white block">Apex Badminton Academy</span>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 pt-0.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>UPI escrow active</span>
        </div>
      </div>

      {/* Switch to Player Button */}
      <Link
        href="/"
        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all group cursor-pointer"
      >
        <span>Switch to Player</span>
        <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
      </Link>
    </div>
  );

  return (
    <>
      {/* ============================================================ */}
      {/* 1. MOBILE TOP NAVIGATION BAR (Visible on screens < md)         */}
      {/* ============================================================ */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0B101B] text-white border-b border-slate-800 sticky top-0 z-40 select-none">
        <GelavuLogo variant="dark" badge="HOST" href="/host" />

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 text-xs flex items-center gap-1 hover:text-white"
            title="Switch to Player"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MOBILE SLIDE-OVER DRAWER (Smooth Right-to-Left Animation)  */}
      {/* ============================================================ */}
      <div
        className={`md:hidden fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop with smooth fade in/out */}
        <div
          className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer Panel: Positioned on the RIGHT, sliding in/out right-to-left */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-72 sm:w-80 max-w-[85vw] bg-[#0B101B]/98 text-white p-5 sm:p-6 flex flex-col justify-between z-50 shadow-[-10px_0_40px_rgba(0,0,0,0.7)] border-l border-slate-800 backdrop-blur-xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <GelavuLogo variant="dark" badge="HOST" href="/host" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {renderNavLinks(() => setMobileOpen(false))}
          </div>

          {renderFooter()}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. DESKTOP PERMANENT SIDEBAR (Visible on md and up)           */}
      {/* ============================================================ */}
      <aside className="hidden md:flex flex-col justify-between w-60 lg:w-64 bg-[#0B101B] text-white shrink-0 min-h-screen p-5 lg:p-6 border-r border-slate-800/80 select-none">
        <div className="space-y-7">
          <div className="flex items-center justify-between px-1">
            <GelavuLogo variant="dark" badge="HOST" href="/host" />
          </div>
          {renderNavLinks()}
        </div>

        {renderFooter()}
      </aside>
    </>
  );
}
