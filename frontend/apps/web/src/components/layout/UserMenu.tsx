"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, CalendarDays, LogOut, User, Bell } from "lucide-react";
import { useEscape } from "@/hooks/useOverlay";
import { Avatar } from "@/components/common/Avatar";

const ITEMS = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Notifications", href: "#notifications", icon: Bell },
  { label: "Bookmarks", href: "/my-games", icon: CalendarDays },
];

export function UserMenu({
  name,
  avatarUrl,
  onLogout,
}: {
  name: string;
  avatarUrl?: string;
  onLogout: () => void;
}) {
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
        <Avatar name={name} url={avatarUrl} size="sm" className="ring-1 ring-white/20" />
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown matching Reference Screenshot */}
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-52 animate-fade-up overflow-hidden rounded-xl border border-white/15 bg-[#14212D] p-1.5 shadow-2xl text-white"
        >
          <div className="px-3 py-2 border-b border-white/10 mb-1">
            <p className="truncate text-xs font-bold text-white">{name}</p>
            <p className="text-[10px] text-white/70">Player account</p>
          </div>

          <div className="space-y-0.5">
            {ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <Icon className="h-4 w-4 text-white/70" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="border-t border-white/10 my-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                role="menuitem"
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-hotpink hover:bg-hotpink/10 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
