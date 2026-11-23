import type { NearbyTournament, WeekendInfo, Weekday } from "@/types/nearby";
import { formatHour } from "@/utils/format";

export interface RawNearby {
  id: string;
  slug: string;
  title: string;
  series: string;
  area: string;
  venue: string;
  distanceKm: number;
  day: Weekday;
  startHour: number;
  endHour: number;
  entryFee: number;
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

export const RAW_NEARBY: RawNearby[] = [
  {
    id: "n-koramangala-singles", slug: "koramangala-morning-singles", title: "Koramangala Morning Singles", series: "Morning Singles",
    area: "Koramangala", venue: "Koramangala Indoor Arena", distanceKm: 3.1, day: "Sat", startHour: 7, endHour: 12,
    entryFee: 350, slotsTotal: 32, slotsFilled: 18, partnersWanted: 0, format: "Knockout", guaranteedMatches: 2,
    organizer: "Koramangala Badminton Association", organizerNote: "Early start so you are home before lunch. Non-marking shoes only.",
    courts: "6 synthetic courts", verified: true,
  },
  {
    id: "n-bengaluru-open", slug: "bengaluru-open-badminton-2026", title: "Bengaluru Open Badminton", series: "City Circuit",
    area: "Indiranagar", venue: "Game Theory Arena", distanceKm: 2.4, day: "Sat", startHour: 8, endHour: 18,
    entryFee: 799, slotsTotal: 32, slotsFilled: 28, partnersWanted: 4, format: "Groups + knockout", guaranteedMatches: 3,
    organizer: "Indiranagar Shuttlers Club", organizerNote: "Warm-up courts open at 7:30 AM. Water and fruit courtside. Non-marking shoes mandatory.",
    courts: "8 teak and synthetic courts", verified: true,
  },
  {
    id: "n-smash-district", slug: "smash-district-night-league", title: "Smash District Night League", series: "Night League",
    area: "HSR Layout", venue: "Fitso Arena, Sector 2", distanceKm: 4.8, day: "Sat", startHour: 18, endHour: 23.5,
    entryFee: 599, slotsTotal: 24, slotsFilled: 22, partnersWanted: 2, format: "Double elimination", guaranteedMatches: 3,
    organizer: "HSR Badminton Community", organizerNote: "An evening session for people with a day job. Dinner coupons are included.",
    courts: "6 air-conditioned wooden courts", verified: true,
  },
  {
    id: "n-whitefield", slug: "whitefield-smash-championship", title: "Whitefield Smash Championship", series: "Tech Corridor Cup",
    area: "Whitefield", venue: "Suraksha Badminton Arena", distanceKm: 11.2, day: "Sun", startHour: 8.5, endHour: 17.5,
    entryFee: 699, slotsTotal: 48, slotsFilled: 38, partnersWanted: 3, format: "Groups + knockout", guaranteedMatches: 3,
    organizer: "Whitefield Badminton League", organizerNote: "Parking on the premises. There is also a corporate division.",
    courts: "8 teak courts with cushioned base", verified: true,
  },
  {
    id: "n-sunday-shuttlers", slug: "sunday-shuttlers-cup", title: "Sunday Shuttlers Cup", series: "Community Open",
    area: "Sarjapur", venue: "PLaY Arena, Sarjapur Road", distanceKm: 7.1, day: "Sun", startHour: 9, endHour: 16,
    entryFee: 449, slotsTotal: 32, slotsFilled: 20, partnersWanted: 6, format: "Compass draw", guaranteedMatches: 3,
    organizer: "Sarjapur Sports Collective", organizerNote: "A compass draw means everyone plays at least three matches. Kids' play area next to the courts.",
    courts: "10 synthetic courts", verified: true,
  },
  {
    id: "n-indiranagar-mixed", slug: "indiranagar-sunday-mixed", title: "Indiranagar Sunday Mixed", series: "Sunday Mixed",
    area: "Indiranagar", venue: "Shuttle Hub", distanceKm: 2.8, day: "Sun", startHour: 17, endHour: 21,
    entryFee: 500, slotsTotal: 24, slotsFilled: 12, partnersWanted: 5, format: "Round robin", guaranteedMatches: 4,
    organizer: "Shuttle Hub Academy", organizerNote: "Come alone or with a friend. We pair solo players by level before the first match.",
    courts: "4 wooden courts", verified: true,
  },
];

const TZ = "Asia/Kolkata";
const ANCHOR_DATE = new Date("2026-08-22T00:00:00.000Z");

function upcomingWeekend(now: Date = ANCHOR_DATE) {
  const [y, m, d] = now.toLocaleDateString("en-CA", { timeZone: TZ }).split("-").map(Number);
  const base = new Date(Date.UTC(y, m - 1, d));
  const toSat = (6 - base.getUTCDay() + 7) % 7;
  const sat = new Date(base);
  sat.setUTCDate(base.getUTCDate() + toSat);
  const sun = new Date(sat);
  sun.setUTCDate(sat.getUTCDate() + 1);
  return { sat, sun };
}

const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => d.toLocaleDateString("en-IN", { ...o, timeZone: "UTC" });

export function getNearbyTournaments(_city: string = "Bengaluru"): { items: NearbyTournament[]; weekend: WeekendInfo } {
  void _city;
  const { sat, sun } = upcomingWeekend();
  const date = { Sat: sat, Sun: sun };

  const items = RAW_NEARBY.map<NearbyTournament>((r) => ({
    id: r.id,
    slug: r.slug,
    title: r.title,
    series: r.series,
    area: r.area,
    venue: r.venue,
    distanceLabel: `${r.distanceKm.toFixed(1)} km away`,
    day: r.day,
    dateLabel: fmt(date[r.day], { weekday: "short", day: "numeric", month: "short" }),
    startHour: r.startHour,
    endHour: r.endHour,
    timeLabel: `${formatHour(r.startHour)} – ${formatHour(r.endHour)}`,
    entryLabel: `₹${r.entryFee.toLocaleString("en-IN")}`,
    slotsTotal: r.slotsTotal,
    slotsFilled: r.slotsFilled,
    partnersWanted: r.partnersWanted,
    format: r.format,
    guaranteedMatches: r.guaranteedMatches,
    organizer: r.organizer,
    organizerNote: r.organizerNote,
    courts: r.courts,
    verified: r.verified,
  }));

  items.sort((a, b) => (a.day === b.day ? a.startHour - b.startHour : a.day === "Sat" ? -1 : 1));

  return {
    items,
    weekend: {
      satLabel: fmt(sat, { day: "numeric", month: "short" }),
      sunLabel: fmt(sun, { day: "numeric", month: "short" }),
      rangeLabel: `${fmt(sat, { day: "numeric" })}–${fmt(sun, { day: "numeric", month: "short" })}`,
    },
  };
}
