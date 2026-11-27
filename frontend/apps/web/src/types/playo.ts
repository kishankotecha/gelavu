export type PlayoSkillLevel =
  | "Beginner"
  | "Amateur"
  | "Intermediate"
  | "Advanced"
  | "Professional";

export interface SkillTierConfig {
  id: PlayoSkillLevel;
  label: string;
  minRating: number;
  maxRating: number;
  defaultRating: number;
  rangeLabel: string;
  summary: string;
  description: string;
  badgeBg: string;
  badgeText: string;
  indicatorColor: string;
  activeRing: string;
}

export const PLAYO_SKILL_TIERS: SkillTierConfig[] = [
  {
    id: "Beginner",
    label: "Beginner",
    minRating: 1.0,
    maxRating: 2.4,
    defaultRating: 1.8,
    rangeLabel: "1.0 – 2.4",
    summary: "Learning fundamentals",
    description: "Grip technique, basic serving rules, sustaining short 2–3 shot rallies.",
    badgeBg: "bg-sky-600",
    badgeText: "text-white",
    indicatorColor: "#0284C7",
    activeRing: "border-sky-600 ring-2 ring-sky-500/30",
  },
  {
    id: "Amateur",
    label: "Amateur",
    minRating: 2.5,
    maxRating: 3.4,
    defaultRating: 3.0,
    rangeLabel: "2.5 – 3.4",
    summary: "Developing consistency",
    description: "Consistent serving, medium rallies, developing overhead clear power & court coverage.",
    badgeBg: "bg-teal-600",
    badgeText: "text-white",
    indicatorColor: "#0D9488",
    activeRing: "border-teal-600 ring-2 ring-teal-500/30",
  },
  {
    id: "Intermediate",
    label: "Intermediate",
    minRating: 3.5,
    maxRating: 4.4,
    defaultRating: 4.0,
    rangeLabel: "3.5 – 4.4",
    summary: "Club match ready",
    description: "Sharp clears, drops, attacking smashes. Understands doubles front-and-back rotation.",
    badgeBg: "bg-hotpink",
    badgeText: "text-white",
    indicatorColor: "#16A34A",
    activeRing: "border-emerald-600 ring-2 ring-emerald-500/30",
  },
  {
    id: "Advanced",
    label: "Advanced",
    minRating: 4.5,
    maxRating: 5.4,
    defaultRating: 5.0,
    rangeLabel: "4.5 – 5.4",
    summary: "High pace & tactical power",
    description: "Fast reflex drives, steep smash attacks, deceptive net drops, high tournament stamina.",
    badgeBg: "bg-hotpink",
    badgeText: "text-white",
    indicatorColor: "#D97706",
    activeRing: "border-hotpink/30 ring-2 ring-hotpink/40",
  },
  {
    id: "Professional",
    label: "Professional",
    minRating: 5.5,
    maxRating: 7.0,
    defaultRating: 6.2,
    rangeLabel: "5.5 – 7.0",
    summary: "Tournament circuit competitor",
    description: "State or national circuit competitor. Master-level precision, deception & elite strategic play.",
    badgeBg: "bg-purple-600",
    badgeText: "text-white",
    indicatorColor: "#7C3AED",
    activeRing: "border-purple-600 ring-2 ring-purple-500/30",
  },
];

export function getTierFromRating(rating: number): SkillTierConfig {
  if (rating < 2.5) return PLAYO_SKILL_TIERS[0];
  if (rating < 3.5) return PLAYO_SKILL_TIERS[1];
  if (rating < 4.5) return PLAYO_SKILL_TIERS[2];
  if (rating < 5.5) return PLAYO_SKILL_TIERS[3];
  return PLAYO_SKILL_TIERS[4];
}

export interface PlaypalBadge {
  id: string;
  label: string;
  count: number;
  iconName: string;
}

export interface PlayoProfileStats {
  skillLevel: PlayoSkillLevel;
  rating: number; // e.g. 4.2
  peerRatingsCount: number; // e.g. 25
  recentMatchesEvaluated: number; // e.g. 25
  peerDistribution: Record<PlayoSkillLevel, number>;
  earnedBadges: PlaypalBadge[];
}
