export type PlayStyle =
  | "Backcourt Smasher 💥"
  | "Front Court Net Specialist ⚡"
  | "Steady All-Rounder 🏸"
  | "Defensive Counter-Puncher 🛡️"
  | "Aggressive Drive & Rush 🚀";

export type DominantHand = "Right-Handed" | "Left-Handed";

export interface PartnerCandidate {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
  city: string;
  area: string;
  playStyle: PlayStyle;
  dominantHand: DominantHand;
  circuitRank: number;
  rating: number;
  winRate: string;
  tournamentsPlayed: number;
  titlesWon: number;
  preferredCategory: "Men's Doubles" | "Mixed Doubles" | "Open Doubles";
  bio: string;
  lookingForNote: string;
  doublesComplement: string;
  tournamentSlug: string;
  tournamentTitle: string;
  verified: boolean;
}
