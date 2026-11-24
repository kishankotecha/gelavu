export type Category = "Singles" | "Doubles" | "Mixed";
export type TournamentFormat = "Knockout" | "Groups + knockout" | "Round robin";
export type PosterTheme = "violet" | "emerald" | "amber" | "sky" | "rose";

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  series: string;
  categories: Category[];
  format: TournamentFormat;
  venue: string;
  area: string;
  city: string;
  imageUrl?: string;
  startsAt: string;
  endsAt?: string;
  registrationClosesAt: string;
  entryFee: number;
  feeUnit: "player" | "team";
  slotsTotal: number;
  slotsFilled: number;
  prizePool?: number;
  live?: boolean;
  featured?: boolean;
  hostName: string;
  hostVerified: boolean;
  theme: PosterTheme;
}

export interface Champion {
  id: string;
  name: string;
  badge: "CHAMPION" | "PLAYER OF THE TOURNAMENT";
  detail: string;
  event: string;
}

export type SlotsTone = "ok" | "warn" | "full";

export interface TournamentCardData {
  id: string;
  slug: string;
  title: string;
  series: string;
  categories: Category[];
  tagLabel: string;
  venueLabel: string;
  city: string;
  hostName: string;
  imageUrl?: string;
  fillPercent: number;
  dateLabel: string;
  priceLabel: string;
  priceUnit: string;
  slotsLabel: string | null;
  slotsTone: SlotsTone | null;
  live: boolean;
  format: TournamentFormat;
  hostVerified: boolean;
  theme: PosterTheme;
  fee: number;
  weekend: boolean;
}

export interface FeaturedData {
  slug: string;
  title: string;
  dateLabel: string;
  venueLabel: string;
  prizeLabel: string | null;
  slotsLeft: number;
  registered: number;
  closesLabel: string;
  fromPrice: string;
  hostVerified: boolean;
  imageUrl?: string;
  theme: PosterTheme;
}

export interface HomeStats {
  upcoming: number;
  playersEntered: number;
  hosts: number;
}
