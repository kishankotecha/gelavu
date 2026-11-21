"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, CalendarDays, LogOut, User, Bell } from "lucide-react";
import { useEscape } from "@/hooks/useOverlay";

const ITEMS = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Notifications", href: "#notifications", icon: Bell },
  { label: "Bookmarks", href: "/my-games", icon: CalendarDays },
];

export function UserMenu({ name, onLogout }: { name: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEscape(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div ref={ref} className="relative">
      {/* Trigger: Circular Avatar with Chevron v from Reference Image */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex items-center gap-1.5 p-0.5 rounded-full hover:opacity-90 transition active:scale-95 cursor-pointer"
      >
        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#18253D] text-[11px] font-black text-white overflow-hidden ring-1 ring-white/20">
          <span className="select-none">{initials || "AM"}</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Popover Dropdown matching Reference Screenshot */}
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-52 animate-fade-up overflow-hidden rounded-xl border border-white/15 bg-[#0E1526] p-1.5 shadow-2xl text-white">
          <div className="px-3 py-2 border-b border-white/10 mb-1">
            <p className="truncate text-xs font-bold text-white">{name}</p>
            <p className="text-[10px] text-gray-400">Player account</p>
          </div>

          <div className="space-y-0.5">
            {ITEMS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-gray-200 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4 text-gray-400" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="my-1 h-px bg-white/10" />
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-medium text-gray-300 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
