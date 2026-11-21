import type { LucideIcon } from "lucide-react";
import { CalendarDays, ClipboardList, Compass, Medal, Trophy } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description: string;
  primary?: boolean; // shown in the desktop bar
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Tournaments", href: "/tournaments", icon: CalendarDays, description: "Find and join events near you", primary: true },
  { label: "Winners", href: "/winners", icon: Trophy, description: "Champions and results", primary: true },
  { label: "Rankings", href: "/leaderboard", icon: Medal, description: "Top players by city", primary: true },
  { label: "For hosts", href: "/host/verify", icon: ClipboardList, description: "Run your own tournament", primary: true },
  { label: "How it works", href: "/#how", icon: Compass, description: "From signing up to the trophy" },
];
