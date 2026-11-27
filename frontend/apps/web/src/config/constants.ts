import { UserRole, TournamentStatus, SportType } from "@/types";

export const USER_ROLES: Record<UserRole, string> = {
  PLAYER: "Player",
  HOST: "Tournament Host",
  UMPIRE: "Official Umpire",
  ADMIN: "Platform Admin",
};

export const SPORTS: { label: string; value: SportType; icon: string }[] = [
  { label: "Badminton", value: "BADMINTON", icon: "🏸" },
  { label: "Pickleball", value: "PICKLEBALL", icon: "🏓" },
  { label: "Table Tennis", value: "TABLE_TENNIS", icon: "🏓" },
  { label: "Tennis", value: "TENNIS", icon: "🎾" },
  { label: "Padel", value: "PADEL", icon: "🎾" },
];

export const TOURNAMENT_STATUSES: Record<TournamentStatus, { label: string; color: string }> = {
  DRAFT: { label: "Draft", color: "bg-gray-500/10 text-white/70 border-gray-600" },
  UPCOMING: { label: "Upcoming", color: "bg-blue-500/10 text-blue-400 border-blue-600" },
  REGISTRATION_OPEN: { label: "Open for Entries", color: "bg-hotpink/10 text-hotpink border-emerald-600" },
  REGISTRATION_CLOSED: { label: "Entries Closed", color: "bg-hotpink/100/10 text-hotpink border-hotpink/30" },
  LIVE: { label: "Live Now", color: "bg-red-500/10 text-red-400 border-red-600 animate-pulse" },
  COMPLETED: { label: "Finished", color: "bg-purple-500/10 text-purple-400 border-purple-600" },
  CANCELLED: { label: "Cancelled", color: "bg-hotpink/10 text-hotpink border-rose-600" },
};
