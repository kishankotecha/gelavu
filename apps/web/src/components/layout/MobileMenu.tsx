"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search, X, User, CalendarDays, LayoutDashboard, LogOut, Apple, Play } from "lucide-react";
import type { NavItem } from "@/config/navigation";
import { useBodyScrollLock, useEscape } from "@/hooks/useOverlay";

interface Props {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  city: string;
  user: { name: string } | null;
  isActive: (href: string) => boolean;
  onCity: () => void;
  onJoin: (mode?: "join" | "login") => void;
  onLogout: () => void;
}

export function MobileMenu({ open, onClose, items, user, isActive, onJoin, onLogout }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEscape(open, onClose);
  useBodyScrollLock(open);

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;
    onClose();
    router.push(`/tournaments?q=${encodeURIComponent(value)}`);
  };

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#070F1E] text-white px-6 sm:px-8 py-6 overflow-y-auto animate-fade-in font-sans"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. Top Bar: Search Input + Clean X Close Button (Matches Reference) */}
      <div className="flex items-center gap-3">
        <form onSubmit={submit} role="search" className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search tournaments"
            placeholder="Search"
            className="h-11 w-full rounded-full border border-white/15 bg-white/5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-400 focus:border-white/30 transition-colors"
          />
        </form>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-gray-300 hover:text-white transition active:scale-95 cursor-pointer"
        >
          <X className="h-6 w-6 stroke-[2]" />
        </button>
      </div>

      {/* 2. Main Navigation Links (Clean Right-Aligned Typography from Reference Screenshot) */}
      <div className="my-auto py-8 space-y-7 text-right">
        {/* Primary Links */}
        <nav aria-label="Mobile Navigation" className="space-y-5">
          {items.map(({ label, href }) => (
            <div key={label}>
              <Link
                href={href}
                onClick={onClose}
                aria-current={isActive(href) ? "page" : undefined}
                className={`inline-block text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-200 ${
                  isActive(href)
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FACC15] via-[#FB923C] to-[#EF4444]"
                    : "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FACC15] hover:via-[#FB923C] hover:to-[#EF4444]"
                }`}
              >
                {label}
              </Link>
            </div>
          ))}
        </nav>

        {/* User Account Sub-links (When Logged in, Matching Reference Screen 2) */}
        {user && (
          <div className="pt-6 border-t border-white/10 space-y-3.5 text-right">
            <div>
              <Link
                href="/profile"
                onClick={onClose}
                className="inline-flex items-center gap-2.5 text-base font-bold text-gray-200 hover:text-white transition-colors"
              >
                <span>Profile</span>
                <User className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
            <div>
              <Link
                href="/my-games"
                onClick={onClose}
                className="inline-flex items-center gap-2.5 text-base font-bold text-gray-200 hover:text-white transition-colors"
              >
                <span>Bookmarks</span>
                <CalendarDays className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
            <div>
              <Link
                href="/host"
                onClick={onClose}
                className="inline-flex items-center gap-2.5 text-base font-bold text-gray-200 hover:text-white transition-colors"
              >
                <span>Dashboard</span>
                <LayoutDashboard className="h-4 w-4 text-gray-400" />
              </Link>
            </div>
            <div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLogout();
                }}
                className="inline-flex items-center gap-2.5 text-base font-bold text-gray-300 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <span>Log out</span>
                <LogOut className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Actions & App Download Card (Matches Reference Screen 1 & 2) */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        {!user ? (
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onJoin("join");
              }}
              className="h-12 w-full rounded-md bg-[#84CC16] hover:bg-[#96C93D] text-[#070F1E] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onJoin("login");
              }}
              className="block w-full text-center text-xs font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FACC15] hover:via-[#FB923C] hover:to-[#EF4444] py-1 transition-all cursor-pointer"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#18253D] text-white font-bold text-xs ring-1 ring-white/20">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-white truncate max-w-[140px]">{user.name}</span>
            </div>
            <span className="text-[10px] text-gray-400 font-medium">Logged In</span>
          </div>
        )}

        {/* "Download our mobile app" Card from Reference Screenshot */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 text-center space-y-2">
          <span className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider">
            Download our mobile app
          </span>
          <div className="flex items-center justify-center gap-6 pt-1 text-gray-300">
            <a
              href="#ios"
              onClick={(e) => {
                e.preventDefault();
                alert("Gelavu iOS app is coming soon to the App Store!");
              }}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
              title="Download on Apple App Store"
            >
              <Apple className="h-5 w-5 fill-current" />
              <span className="text-xs font-semibold">iOS</span>
            </a>
            <span className="h-4 w-px bg-white/20" aria-hidden="true" />
            <a
              href="#android"
              onClick={(e) => {
                e.preventDefault();
                alert("Gelavu Android APK is launching shortly on Google Play!");
              }}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
              title="Download on Google Play Store"
            >
              <Play className="h-4 w-4 fill-current text-emerald-400" />
              <span className="text-xs font-semibold">Android</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
