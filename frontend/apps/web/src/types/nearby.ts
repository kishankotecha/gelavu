export type Weekday = "Sat" | "Sun";

export interface NearbyTournament {
  id: string;
  slug: string;
  title: string;
  series: string;
  area: string;
  venue: string;
  distanceLabel: string;
  day: Weekday;
  dateLabel: string;
  startHour: number;
  endHour: number;
  timeLabel: string;
  entryLabel: string;
  slotsTotal: number;
  slotsFilled: number;
  partnersWanted: number;
  format: string;
  guaranteedMatches: number;
  organizer: string;
  organizerNote: string;
  courts: string;
  verified: boolean;
}

export interface WeekendInfo {
  satLabel: string;
  sunLabel: string;
  rangeLabel: string;
}
