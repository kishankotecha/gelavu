import type { NearbyTournament, WeekendInfo, Weekday } from "@/types/nearby";
import { formatHour } from "@/utils/format";

export interface RawNearby {
  id: string;
  slug: string;
  title: string;
  series: string;
  area: string;
  city: string;
  state: string;
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

export const RAW_NEARBY_ALL: RawNearby[] = [
  // ============================================================
  // 1. BENGALURU, KARNATAKA
  // ============================================================
  {
    id: "n-koramangala-singles", slug: "koramangala-morning-singles", title: "Koramangala Morning Singles", series: "Morning Singles",
    area: "Koramangala", city: "Bengaluru", state: "Karnataka", venue: "Koramangala Indoor Arena", distanceKm: 3.1, day: "Sat", startHour: 7, endHour: 12,
    entryFee: 350, slotsTotal: 32, slotsFilled: 18, partnersWanted: 0, format: "Knockout", guaranteedMatches: 2,
    organizer: "Koramangala Badminton Association", organizerNote: "Early start so you are home before lunch. Non-marking shoes only.",
    courts: "6 synthetic courts", verified: true,
  },
  {
    id: "n-bengaluru-open", slug: "bengaluru-open-badminton-2026", title: "Bengaluru Open Badminton", series: "City Circuit",
    area: "Indiranagar", city: "Bengaluru", state: "Karnataka", venue: "Game Theory Arena", distanceKm: 2.4, day: "Sat", startHour: 8, endHour: 18,
    entryFee: 799, slotsTotal: 32, slotsFilled: 28, partnersWanted: 4, format: "Groups + knockout", guaranteedMatches: 3,
    organizer: "Indiranagar Shuttlers Club", organizerNote: "Warm-up courts open at 7:30 AM. Water and fruit courtside. Non-marking shoes mandatory.",
    courts: "8 teak and synthetic courts", verified: true,
  },
  {
    id: "n-smash-district", slug: "smash-district-night-league", title: "Smash District Night League", series: "Night League",
    area: "HSR Layout", city: "Bengaluru", state: "Karnataka", venue: "Fitso Arena, Sector 2", distanceKm: 4.8, day: "Sat", startHour: 18, endHour: 23.5,
    entryFee: 599, slotsTotal: 24, slotsFilled: 22, partnersWanted: 2, format: "Double elimination", guaranteedMatches: 3,
    organizer: "HSR Badminton Community", organizerNote: "An evening session for people with a day job. Dinner coupons are included.",
    courts: "6 air-conditioned wooden courts", verified: true,
  },
  {
    id: "n-whitefield", slug: "whitefield-smash-championship", title: "Whitefield Smash Championship", series: "Tech Corridor Cup",
    area: "Whitefield", city: "Bengaluru", state: "Karnataka", venue: "Suraksha Badminton Arena", distanceKm: 11.2, day: "Sun", startHour: 8.5, endHour: 17.5,
    entryFee: 699, slotsTotal: 48, slotsFilled: 38, partnersWanted: 3, format: "Groups + knockout", guaranteedMatches: 3,
    organizer: "Whitefield Badminton League", organizerNote: "Parking on the premises. There is also a corporate division.",
    courts: "8 teak courts with cushioned base", verified: true,
  },
  {
    id: "n-sunday-shuttlers", slug: "sunday-shuttlers-cup", title: "Sunday Shuttlers Cup", series: "Community Open",
    area: "Sarjapur", city: "Bengaluru", state: "Karnataka", venue: "PLaY Arena, Sarjapur Road", distanceKm: 7.1, day: "Sun", startHour: 9, endHour: 16,
    entryFee: 449, slotsTotal: 32, slotsFilled: 20, partnersWanted: 6, format: "Compass draw", guaranteedMatches: 3,
    organizer: "Sarjapur Sports Collective", organizerNote: "A compass draw means everyone plays at least three matches. Kids' play area next to the courts.",
    courts: "10 synthetic courts", verified: true,
  },
  {
    id: "n-indiranagar-mixed", slug: "indiranagar-sunday-mixed", title: "Indiranagar Sunday Mixed", series: "Sunday Mixed",
    area: "Indiranagar", city: "Bengaluru", state: "Karnataka", venue: "Shuttle Hub", distanceKm: 2.8, day: "Sun", startHour: 17, endHour: 21,
    entryFee: 500, slotsTotal: 24, slotsFilled: 12, partnersWanted: 5, format: "Round robin", guaranteedMatches: 4,
    organizer: "Shuttle Hub Academy", organizerNote: "Come alone or with a friend. We pair solo players by level before the first match.",
    courts: "4 wooden courts", verified: true,
  },

  // ============================================================
  // 2. MUMBAI, MAHARASHTRA
  // ============================================================
  {
    id: "m-bandra-monsoon", slug: "mumbai-monsoon-masters-bandra", title: "Mumbai Monsoon Masters", series: "West Coast Series",
    area: "Bandra", city: "Mumbai", state: "Maharashtra", venue: "Bandra Gymkhana Badminton Arena", distanceKm: 2.5, day: "Sat", startHour: 7.5, endHour: 13,
    entryFee: 550, slotsTotal: 32, slotsFilled: 24, partnersWanted: 2, format: "Knockout + Plate", guaranteedMatches: 2,
    organizer: "Bandra Sports Club", organizerNote: "Iconic sea-breeze venue. Breakfast coupons included with entry pass.",
    courts: "6 Yonex synthetic courts", verified: true,
  },
  {
    id: "m-andheri-suburbs", slug: "western-suburbs-open-andheri", title: "Western Suburbs Open", series: "Metro Circuit",
    area: "Andheri", city: "Mumbai", state: "Maharashtra", venue: "Andheri Sports Complex", distanceKm: 4.8, day: "Sat", startHour: 9, endHour: 19,
    entryFee: 750, slotsTotal: 48, slotsFilled: 42, partnersWanted: 4, format: "Groups + Knockout", guaranteedMatches: 3,
    organizer: "Mumbai Suburban Badminton Association", organizerNote: "Live mobile scoreboard and umpire on Court 1 to 4.",
    courts: "8 Olympic wooden courts", verified: true,
  },
  {
    id: "m-dadar-weekend", slug: "dadar-weekend-clash", title: "Dadar Weekend Clash", series: "City Open",
    area: "Dadar", city: "Mumbai", state: "Maharashtra", venue: "Shivaji Park Badminton Club", distanceKm: 3.2, day: "Sun", startHour: 8, endHour: 15,
    entryFee: 499, slotsTotal: 32, slotsFilled: 19, partnersWanted: 3, format: "Compass draw", guaranteedMatches: 3,
    organizer: "Shivaji Park Shuttlers", organizerNote: "Central Mumbai location right off Dadar TT. Non-marking shoes mandatory.",
    courts: "6 synthetic courts", verified: true,
  },
  {
    id: "m-thane-district", slug: "thane-district-championship", title: "Thane District Championship", series: "District Circuit",
    area: "Thane", city: "Mumbai", state: "Maharashtra", venue: "Syed Modi Badminton Academy", distanceKm: 9.4, day: "Sun", startHour: 9, endHour: 18,
    entryFee: 650, slotsTotal: 36, slotsFilled: 29, partnersWanted: 5, format: "Double elimination", guaranteedMatches: 3,
    organizer: "Thane Shuttlers Federation", organizerNote: "Air-conditioned spectator gallery and physio station available.",
    courts: "8 synthetic courts with LED glare shields", verified: true,
  },
  {
    id: "m-vashi-supersmash", slug: "navi-mumbai-super-smash", title: "Navi Mumbai Super Smash", series: "Harbour Grand Prix",
    area: "Vashi", city: "Mumbai", state: "Maharashtra", venue: "Navi Mumbai Sports Association", distanceKm: 8.1, day: "Sun", startHour: 16, endHour: 22,
    entryFee: 599, slotsTotal: 24, slotsFilled: 16, partnersWanted: 2, format: "Round robin", guaranteedMatches: 4,
    organizer: "NMSA Badminton Wing", organizerNote: "Night session with dinner buffet for registered participants.",
    courts: "6 wooden courts with shock absorption", verified: true,
  },

  // ============================================================
  // 3. DELHI NCR, DELHI
  // ============================================================
  {
    id: "d-siri-fort-open", slug: "delhi-capital-open-siri-fort", title: "Delhi Capital Open", series: "Capital Grand Slam",
    area: "Siri Fort", city: "Delhi NCR", state: "Delhi", venue: "Siri Fort Sports Complex", distanceKm: 3.5, day: "Sat", startHour: 8, endHour: 17,
    entryFee: 799, slotsTotal: 48, slotsFilled: 40, partnersWanted: 3, format: "Groups + Knockout", guaranteedMatches: 3,
    organizer: "Delhi Badminton Association", organizerNote: "Commonwealth Games legacy courts. Strictly non-marking gum sole shoes.",
    courts: "12 championship courts", verified: true,
  },
  {
    id: "d-saket-rallies", slug: "south-delhi-weekend-rallies", title: "South Delhi Weekend Rallies", series: "Morning Singles",
    area: "Saket", city: "Delhi NCR", state: "Delhi", venue: "Saket Sports Club Arena", distanceKm: 4.2, day: "Sat", startHour: 7, endHour: 12,
    entryFee: 499, slotsTotal: 32, slotsFilled: 26, partnersWanted: 1, format: "Knockout", guaranteedMatches: 2,
    organizer: "Saket Shuttlers Group", organizerNote: "Fast-paced morning tournament. Smooth check-in with Gelavu QR pass.",
    courts: "6 wooden courts", verified: true,
  },
  {
    id: "d-dwarka-singles", slug: "dwarka-morning-singles", title: "Dwarka Morning Singles", series: "West Delhi Cup",
    area: "Dwarka", city: "Delhi NCR", state: "Delhi", venue: "DDA Sports Complex Dwarka, Sector 11", distanceKm: 7.8, day: "Sun", startHour: 8, endHour: 14,
    entryFee: 450, slotsTotal: 32, slotsFilled: 19, partnersWanted: 4, format: "Compass draw", guaranteedMatches: 3,
    organizer: "DDA Shuttlers League", organizerNote: "Free hydration and locker rooms provided courtside.",
    courts: "8 synthetic courts", verified: true,
  },
  {
    id: "d-noida-night", slug: "noida-night-shuttlers", title: "Noida Night Shuttlers", series: "Night League",
    area: "Noida", city: "Delhi NCR", state: "Delhi", venue: "Noida Indoor Stadium, Sector 21A", distanceKm: 8.5, day: "Sat", startHour: 18, endHour: 23,
    entryFee: 650, slotsTotal: 24, slotsFilled: 20, partnersWanted: 2, format: "Double elimination", guaranteedMatches: 3,
    organizer: "NCR Sports Collective", organizerNote: "Post-match recovery zone and energy drinks on house.",
    courts: "6 international wooden courts", verified: true,
  },
  {
    id: "d-gurugram-gp", slug: "cybercity-grand-prix-gurugram", title: "CyberCity Grand Prix", series: "Corporate League",
    area: "Gurugram", city: "Delhi NCR", state: "Delhi", venue: "Flow Badminton Arena, Sector 29", distanceKm: 11.0, day: "Sun", startHour: 9, endHour: 18,
    entryFee: 850, slotsTotal: 40, slotsFilled: 34, partnersWanted: 6, format: "Groups + Knockout", guaranteedMatches: 3,
    organizer: "Gurugram Shuttlers Alliance", organizerNote: "Prize pool ₹35,000 with trophies and official circuit Elo rank.",
    courts: "8 Yonex mat courts", verified: true,
  },

  // ============================================================
  // 4. HYDERABAD, TELANGANA
  // ============================================================
  {
    id: "h-gachibowli-open", slug: "hyderabad-city-open-gachibowli", title: "Hyderabad City Open", series: "Nizam Grand Prix",
    area: "Gachibowli", city: "Hyderabad", state: "Telangana", venue: "Gachibowli Indoor Stadium", distanceKm: 3.8, day: "Sat", startHour: 8, endHour: 18,
    entryFee: 699, slotsTotal: 48, slotsFilled: 44, partnersWanted: 3, format: "Groups + Knockout", guaranteedMatches: 3,
    organizer: "Telangana Badminton Association", organizerNote: "World-class stadium lighting and digital scoreboard.",
    courts: "10 synthetic courts", verified: true,
  },
  {
    id: "h-madhapur-league", slug: "hitec-city-weekend-league", title: "Hitec City Weekend League", series: "Tech Smash Cup",
    area: "Madhapur", city: "Hyderabad", state: "Telangana", venue: "Madhapur Smash Hub, Hitec City", distanceKm: 2.9, day: "Sat", startHour: 17, endHour: 22,
    entryFee: 550, slotsTotal: 28, slotsFilled: 22, partnersWanted: 4, format: "Double elimination", guaranteedMatches: 3,
    organizer: "Cyber Shuttlers Club", organizerNote: "Evening weekend session tailored for techies and enthusiasts.",
    courts: "6 wooden courts", verified: true,
  },
  {
    id: "h-kondapur-singles", slug: "kondapur-morning-singles", title: "Kondapur Morning Singles", series: "Morning Singles",
    area: "Kondapur", city: "Hyderabad", state: "Telangana", venue: "Playo Arena Kondapur", distanceKm: 5.1, day: "Sun", startHour: 7.5, endHour: 13,
    entryFee: 400, slotsTotal: 32, slotsFilled: 25, partnersWanted: 0, format: "Knockout", guaranteedMatches: 2,
    organizer: "Kondapur Sports League", organizerNote: "Warm up courts open at 7:00 AM sharp.",
    courts: "6 synthetic courts", verified: true,
  },
  {
    id: "h-kukatpally-rallies", slug: "north-cyber-rallies-kukatpally", title: "North Cyber Rallies", series: "Community Open",
    area: "Kukatpally", city: "Hyderabad", state: "Telangana", venue: "Pullela Gopichand Academy Sub-Center", distanceKm: 7.3, day: "Sun", startHour: 9, endHour: 16,
    entryFee: 499, slotsTotal: 32, slotsFilled: 20, partnersWanted: 5, format: "Compass draw", guaranteedMatches: 3,
    organizer: "Hyderabad Shuttlers Collective", organizerNote: "Coaching scouts attend the semi-finals and finals.",
    courts: "8 certified training courts", verified: true,
  },

  // ============================================================
  // 5. CHENNAI, TAMIL NADU
  // ============================================================
  {
    id: "c-nungambakkam-championship", slug: "chennai-open-championship", title: "Chennai Open Championship", series: "Coromandel Cup",
    area: "Nungambakkam", city: "Chennai", state: "Tamil Nadu", venue: "SDAT Indoor Badminton Stadium", distanceKm: 2.8, day: "Sat", startHour: 8, endHour: 17,
    entryFee: 650, slotsTotal: 40, slotsFilled: 36, partnersWanted: 2, format: "Groups + Knockout", guaranteedMatches: 3,
    organizer: "Tamil Nadu Badminton Association", organizerNote: "Centrally located arena with pro line umpires.",
    courts: "8 Yonex synthetic courts", verified: true,
  },
  {
    id: "c-adyar-marina", slug: "marina-shuttlers-league-adyar", title: "Marina Shuttlers League", series: "Coastal Series",
    area: "Adyar", city: "Chennai", state: "Tamil Nadu", venue: "Adyar Club Courts", distanceKm: 4.5, day: "Sat", startHour: 16, endHour: 21,
    entryFee: 450, slotsTotal: 24, slotsFilled: 18, partnersWanted: 3, format: "Double elimination", guaranteedMatches: 3,
    organizer: "South Chennai Badminton Club", organizerNote: "Evening cool sea breeze. Electrolytes provided courtside.",
    courts: "6 wooden courts", verified: true,
  },
  {
    id: "c-velachery-cup", slug: "it-corridor-badminton-cup", title: "IT Corridor Badminton Cup", series: "Weekend Trophy",
    area: "Velachery", city: "Chennai", state: "Tamil Nadu", venue: "Velachery Indoor Arena", distanceKm: 6.9, day: "Sun", startHour: 8.5, endHour: 16,
    entryFee: 500, slotsTotal: 32, slotsFilled: 27, partnersWanted: 4, format: "Compass draw", guaranteedMatches: 3,
    organizer: "Velachery Shuttlers", organizerNote: "Close to OMR IT expressway with ample parking.",
    courts: "6 synthetic courts", verified: true,
  },

  // ============================================================
  // 6. PUNE, MAHARASHTRA
  // ============================================================
  {
    id: "p-shivajinagar-open", slug: "pune-district-open-shivajinagar", title: "Pune District Open", series: "Sahyadri Series",
    area: "Shivajinagar", city: "Pune", state: "Maharashtra", venue: "Deccan Gymkhana Courts", distanceKm: 3.1, day: "Sat", startHour: 8, endHour: 16,
    entryFee: 550, slotsTotal: 36, slotsFilled: 30, partnersWanted: 2, format: "Groups + Knockout", guaranteedMatches: 3,
    organizer: "Pune District Badminton Association", organizerNote: "Historic sports club with heritage wooden courts.",
    courts: "6 teak wooden courts", verified: true,
  },
  {
    id: "p-baner-tech", slug: "baner-tech-league", title: "Baner Tech League", series: "Tech Corridor Cup",
    area: "Baner", city: "Pune", state: "Maharashtra", venue: "Baner Smash Arena", distanceKm: 6.2, day: "Sun", startHour: 9, endHour: 17,
    entryFee: 600, slotsTotal: 32, slotsFilled: 24, partnersWanted: 4, format: "Double elimination", guaranteedMatches: 3,
    organizer: "Baner Badminton Community", organizerNote: "Modern high-ceiling hall with cafeteria and showers.",
    courts: "6 synthetic courts", verified: true,
  },
];

export const RAW_NEARBY = RAW_NEARBY_ALL.filter((t) => t.city === "Bengaluru");

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

export function getNearbyTournaments(city: string = "Bengaluru"): { items: NearbyTournament[]; weekend: WeekendInfo } {
  const { sat, sun } = upcomingWeekend();
  const date = { Sat: sat, Sun: sun };

  // Match tournaments by city (case-insensitive substring match)
  const normCity = (city || "Bengaluru").trim().toLowerCase();
  let cityMatches = RAW_NEARBY_ALL.filter(
    (r) =>
      r.city.toLowerCase() === normCity ||
      normCity.includes(r.city.toLowerCase()) ||
      r.city.toLowerCase().includes(normCity) ||
      r.state.toLowerCase() === normCity ||
      normCity.includes(r.state.toLowerCase())
  );

  if (cityMatches.length === 0) {
    cityMatches = RAW_NEARBY_ALL.filter((r) => r.city === "Bengaluru");
  }

  const items = cityMatches.map<NearbyTournament>((r) => ({
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
