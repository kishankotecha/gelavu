export type UserRole = "PLAYER" | "HOST" | "UMPIRE" | "ADMIN";

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: UserRole;
  avatarUrl?: string;
  rating?: number;
  city?: string;
  isKycVerified?: boolean;
}

export type SportType = "BADMINTON" | "PICKLEBALL" | "TABLE_TENNIS" | "TENNIS" | "PADEL";

export type TournamentCategory = 
  | "MEN_SINGLES"
  | "WOMEN_SINGLES"
  | "MEN_DOUBLES"
  | "WOMEN_DOUBLES"
  | "MIXED_DOUBLES"
  | "BLIND_DRAW_DOUBLES"
  | "OPEN_SINGLES";

export type TournamentStatus = 
  | "DRAFT"
  | "UPCOMING"
  | "REGISTRATION_OPEN"
  | "REGISTRATION_CLOSED"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED";

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  sport: SportType;
  bannerUrl: string;
  startDate: string;
  endDate: string;
  venueName: string;
  city: string;
  address: string;
  entryFee: number;
  prizePool: number;
  maxEntries: number;
  registeredCount: number;
  status: TournamentStatus;
  hostId: string;
  hostName: string;
  description: string;
  categories: TournamentCategory[];
  rulesSummary: string;
  partnerDrawEnabled?: boolean;
}

export type MatchStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "FORFEIT";

export interface MatchScore {
  setNumber: number;
  team1Score: number;
  team2Score: number;
}

export interface Match {
  id: string;
  tournamentId: string;
  category: TournamentCategory;
  roundName: string; // e.g. "Finals", "Semi-Finals", "Quarter-Finals", "Round of 16"
  courtNumber: number | string;
  scheduledTime: string;
  status: MatchStatus;
  team1Name: string;
  team2Name: string;
  team1PlayerIds: string[];
  team2PlayerIds: string[];
  scores: MatchScore[];
  currentServer?: "team1" | "team2";
  winnerTeam?: 1 | 2;
  umpireId?: string;
}

export interface Registration {
  id: string;
  tournamentId: string;
  tournamentSlug: string;
  tournamentTitle: string;
  playerId: string;
  playerName: string;
  category: TournamentCategory;
  partnerId?: string;
  partnerName?: string;
  paymentStatus: "PENDING" | "PAID" | "REFUNDED" | "FAILED";
  amount: number;
  paymentId?: string;
  createdAt: string;
  drawAssigned?: boolean;
}
