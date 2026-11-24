"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, Trophy, CalendarDays, CheckCircle2 } from "lucide-react";
import { useEscape } from "@/hooks/useOverlay";

interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  unread: boolean;
  type: "match" | "tournament" | "payment";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n-1",
    title: "Match Call: Court 3",
    subtitle: "Arjun Mehta vs Nikhil Rao starting in 5 mins",
    time: "2m ago",
    unread: true,
    type: "match",
  },
  {
    id: "n-2",
    title: "Fixtures Published",
    subtitle: "Bengaluru Open 2025 brackets are live",
    time: "1h ago",
    unread: true,
    type: "tournament",
  },
  {
    id: "n-3",
    title: "Entry Confirmed",
    subtitle: "Mixed Doubles slot verified with ₹1,198 UPI",
    time: "Yesterday",
    unread: false,
    type: "payment",
  },
];

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  useEscape(open, () => setOpen(false));

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div ref={ref} className="relative">
      {/* Bell Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="View notifications"
        aria-expanded={open}
        className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all active:scale-95 cursor-pointer shadow-2xs"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-[#070A12] animate-pulse" />
        )}
      </button>

      {/* Popover Card */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-3xl border border-white/15 bg-[#0E1526] p-4 shadow-2xl z-50 text-white animate-fade-up">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <strong className="text-sm font-black text-white">Notifications</strong>
              {unreadCount > 0 && (
                <span className="rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 text-[10px] font-black">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="divide-y divide-white/5 max-h-80 overflow-y-auto py-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 py-3 px-2 rounded-2xl transition-colors ${
                  n.unread ? "bg-white/5" : "hover:bg-white/5"
                }`}
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-white/10 text-white shrink-0 mt-0.5">
                  {n.type === "match" ? (
                    <Trophy className="h-4 w-4 text-amber-400" />
                  ) : n.type === "tournament" ? (
                    <CalendarDays className="h-4 w-4 text-[#6366F1]" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <strong className="text-xs font-bold text-white truncate">{n.title}</strong>
                    <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-snug mt-0.5 line-clamp-2">{n.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
