import { TournamentEntry } from "@/features/host/PlayerEntriesManager";
import { FixtureMatch } from "@/features/host/FixtureIssueModal";
import { MOCK_TOURNAMENTS } from "@/data/mock-data";
import { Tournament, SportType } from "@/types";

// Default Seeded Entrants Per Tournament
const DEFAULT_ENTRIES_BY_TOURNAMENT: Record<string, TournamentEntry[]> = {
  "tour-1": [
    {
      id: "e-1",
      name: "Rohan Kumar",
      phone: "+91 98765 44444",
      category: "Men's Doubles",
      partnerName: "Deepak Nayak",
      skillLevel: "Intermediate",
      badges: ["Circuit Seed #1"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-2",
      name: "Aman Varma",
      phone: "+91 98765 55555",
      category: "Men's Doubles",
      partnerName: "Yash Kulkarni",
      skillLevel: "Amateur",
      badges: ["Circuit Seed #2"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-3",
      name: "Praveen Rao",
      phone: "+91 98765 66666",
      category: "Men's Doubles",
      partnerName: "Harish S",
      skillLevel: "Beginner",
      badges: ["Slot Reserved"],
      status: "PENDING_PAYMENT",
      fee: "₹1,200",
      method: "Razorpay",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-4",
      name: "Ravi Teja",
      phone: "+91 98765 77777",
      category: "Men's Doubles",
      partnerName: "Sai Kumar",
      skillLevel: "Professional",
      badges: ["Direct Host Pass"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    },
    {
      id: "e-5",
      name: "Aditya Joshi",
      phone: "+91 98765 88880",
      category: "Men's Singles",
      skillLevel: "Advanced",
      badges: ["Top 8 Ranking"],
      status: "CONFIRMED",
      fee: "₹699",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-6",
      name: "Gaurav Sen",
      phone: "+91 98765 88881",
      category: "Men's Singles",
      skillLevel: "Amateur",
      badges: ["Standby Entrant"],
      status: "WAITLIST",
      fee: "—",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-7",
      name: "Arjun Mehta",
      phone: "+91 98765 43210",
      category: "Men's Doubles",
      partnerName: "Nikhil Rao",
      skillLevel: "Advanced",
      badges: ["Circuit Seed #3"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-8",
      name: "Tarun Joshi",
      phone: "+91 98765 11111",
      category: "Men's Doubles",
      partnerName: "Manas Joshi",
      skillLevel: "Advanced",
      badges: ["Circuit Seed #4"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-9",
      name: "Kiran Gowda",
      phone: "+91 98765 22222",
      category: "Men's Doubles",
      partnerName: "Dev Anand",
      skillLevel: "Intermediate",
      badges: ["Circuit Seed #5"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-10",
      name: "Vikram Shenoy",
      phone: "+91 98765 33333",
      category: "Men's Doubles",
      partnerName: "Sai Teja",
      skillLevel: "Intermediate",
      badges: ["Circuit Seed #6"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-11",
      name: "Manish Rao",
      phone: "+91 98765 88882",
      category: "Men's Singles",
      skillLevel: "Intermediate",
      badges: ["Singles Seed #3"],
      status: "CONFIRMED",
      fee: "₹699",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-12",
      name: "Siddharth Iyer",
      phone: "+91 98765 88883",
      category: "Men's Singles",
      skillLevel: "Intermediate",
      badges: ["Singles Seed #4"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    // Mixed Doubles Teams (8 pairs)
    {
      id: "e-13",
      name: "Sneha Rao",
      partnerName: "Pranav Nair",
      phone: "+91 98765 77001",
      category: "Mixed Doubles",
      skillLevel: "Advanced",
      badges: ["Mixed Seed #1"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-14",
      name: "Pooja Hegde",
      partnerName: "Aditya Varma",
      phone: "+91 98765 77002",
      category: "Mixed Doubles",
      skillLevel: "Advanced",
      badges: ["Mixed Seed #2"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-15",
      name: "Kavya Gowda",
      partnerName: "Nitin Shenoy",
      phone: "+91 98765 77003",
      category: "Mixed Doubles",
      skillLevel: "Intermediate",
      badges: ["Mixed Seed #3"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-16",
      name: "Ritu Sen",
      partnerName: "Kunal Shah",
      phone: "+91 98765 77004",
      category: "Mixed Doubles",
      skillLevel: "Intermediate",
      badges: ["Mixed Seed #4"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-17",
      name: "Divya M",
      partnerName: "Karthik Raj",
      phone: "+91 98765 77005",
      category: "Mixed Doubles",
      skillLevel: "Intermediate",
      badges: ["Mixed Seed #5"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-18",
      name: "Ananya Sharma",
      partnerName: "Rahul Dev",
      phone: "+91 98765 77006",
      category: "Mixed Doubles",
      skillLevel: "Amateur",
      badges: ["Mixed Seed #6"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-19",
      name: "Swati K",
      partnerName: "Mahesh Gowda",
      phone: "+91 98765 77007",
      category: "Mixed Doubles",
      skillLevel: "Amateur",
      badges: ["Mixed Seed #7"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    },
    {
      id: "e-20",
      name: "Tanvi Patil",
      partnerName: "Rohit Nair",
      phone: "+91 98765 77008",
      category: "Mixed Doubles",
      skillLevel: "Amateur",
      badges: ["Mixed Seed #8"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    // Random Wheel Doubles Solo Entrants (12 Solo Entrants for live wheel pairing)
    {
      id: "e-21",
      name: "Akash Hegde",
      phone: "+91 98765 99001",
      category: "Random Wheel Doubles",
      skillLevel: "Advanced",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-22",
      name: "Sanjay Bhat",
      phone: "+91 98765 99002",
      category: "Random Wheel Doubles",
      skillLevel: "Advanced",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-23",
      name: "Manoj Swamy",
      phone: "+91 98765 99003",
      category: "Random Wheel Doubles",
      skillLevel: "Intermediate",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-24",
      name: "Abhishek Roy",
      phone: "+91 98765 99004",
      category: "Random Wheel Doubles",
      skillLevel: "Intermediate",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-25",
      name: "Shruti Narayan",
      phone: "+91 98765 99005",
      category: "Random Wheel Doubles",
      skillLevel: "Intermediate",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-26",
      name: "Arvind Swamy",
      phone: "+91 98765 99006",
      category: "Random Wheel Doubles",
      skillLevel: "Intermediate",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-27",
      name: "Deepa Mohan",
      phone: "+91 98765 99007",
      category: "Random Wheel Doubles",
      skillLevel: "Amateur",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹1,200",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    },
    {
      id: "e-28",
      name: "Nikhil Prasad",
      phone: "+91 98765 99008",
      category: "Random Wheel Doubles",
      skillLevel: "Amateur",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-29",
      name: "Sneha Kulkarni",
      phone: "+91 98765 99009",
      category: "Random Wheel Doubles",
      skillLevel: "Intermediate",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-30",
      name: "Abhinav Roy",
      phone: "+91 98765 99010",
      category: "Random Wheel Doubles",
      skillLevel: "Advanced",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-31",
      name: "Megha Bhat",
      phone: "+91 98765 99011",
      category: "Random Wheel Doubles",
      skillLevel: "Intermediate",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    },
    {
      id: "e-32",
      name: "Harsh Vardhan",
      phone: "+91 98765 99012",
      category: "Random Wheel Doubles",
      skillLevel: "Amateur",
      badges: ["Wheel Solo"],
      status: "CONFIRMED",
      fee: "₹600",
      method: "Cash (Manual)",
      sourceBadge: "HOST_MANUAL",
    },
  ],
  "tour-2": [
    {
      id: "e-201",
      name: "Meera Iyer",
      phone: "+91 98765 88888",
      category: "Open Singles",
      skillLevel: "Advanced",
      badges: ["Mysuru Champ 2025"],
      status: "CONFIRMED",
      fee: "₹800",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-202",
      name: "Ananya Sen",
      phone: "+91 98765 99999",
      category: "Open Singles",
      skillLevel: "Intermediate",
      badges: ["Chamundi Runner-Up"],
      status: "CONFIRMED",
      fee: "₹800",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-203",
      name: "Rahul Dravid",
      phone: "+91 98765 12345",
      category: "Open Singles",
      skillLevel: "Professional",
      badges: ["The Wall"],
      status: "CONFIRMED",
      fee: "₹800",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
    {
      id: "e-204",
      name: "Anil Kumble",
      phone: "+91 98765 54321",
      category: "Open Singles",
      skillLevel: "Advanced",
      badges: ["Jumbo"],
      status: "CONFIRMED",
      fee: "₹800",
      method: "Online UPI",
      sourceBadge: "PUBLIC",
    },
  ],
};

/**
 * Create and persist a brand-new tournament
 */
export function createNewTournament(tournament: {
  title: string;
  sport?: string;
  tier?: string;
  hostName?: string;
  city?: string;
  venueName?: string;
  address?: string;
  startDate?: string;
  endDate?: string;
  entryFee?: number | string;
  prizePool?: number | string;
  maxEntries?: number | string;
  courtsCount?: number | string;
  courtType?: string;
  categories?: string[];
  rulesSummary?: string;
  drawMode?: "standard" | "wheel";
  partnerDrawEnabled?: boolean;
  scoringFormat?: string;
  equipment?: string;
  placeId?: string | null;
  area?: string;
  lat?: number;
  lng?: number;
  locationSource?: "google" | "manual";
}): Tournament {
  const timestamp = Date.now();
  const id = `tour-${timestamp.toString(36)}`;
  const slug = tournament.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const newTour: Tournament = {
    id,
    slug,
    title: tournament.title,
    sport: ((tournament.sport?.toUpperCase() as SportType) || "BADMINTON"),
    bannerUrl: "/images/placeholder-poster.svg",
    startDate: tournament.startDate || new Date().toISOString().slice(0, 10),
    endDate: tournament.endDate || tournament.startDate || new Date().toISOString().slice(0, 10),
    venueName: tournament.venueName || "Bengaluru Sports Hub",
    city: tournament.city || "Bengaluru",
    address: tournament.address || "Bengaluru, Karnataka",
    entryFee: Number(tournament.entryFee) || 1200,
    prizePool: Number(tournament.prizePool) || 30000,
    maxEntries: Number(tournament.maxEntries) || 32,
    registeredCount: 0,
    status: "REGISTRATION_OPEN",
    hostId: "host-1",
    hostName: tournament.hostName || "Verified Tournament Host",
    description: `Official ${tournament.sport || "Badminton"} tournament organized by ${
      tournament.hostName || "Gelavu Host"
    }. Features digital live scoring and verifiable anti-rigging draws.`,
    categories:
      tournament.categories && tournament.categories.length > 0
        ? (tournament.categories as unknown as Tournament["categories"])
        : ["MEN_DOUBLES", "MIXED_DOUBLES"],
    rulesSummary:
      tournament.rulesSummary ||
      `${tournament.scoringFormat || "Best of 3 sets to 21 points"}. ${
        tournament.equipment || "Standard feather shuttles provided"
      }.`,
    partnerDrawEnabled: tournament.partnerDrawEnabled ?? true,
    placeId: tournament.placeId ?? null,
    area: tournament.area,
    lat: tournament.lat,
    lng: tournament.lng,
    locationSource: tournament.locationSource,
  };

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("gelavu_custom_tournaments");
      const list: Tournament[] = stored ? JSON.parse(stored) : [];
      list.unshift(newTour);
      localStorage.setItem("gelavu_custom_tournaments", JSON.stringify(list));
      window.dispatchEvent(new CustomEvent("gelavu_tournaments_updated", { detail: { tournament: newTour } }));
    } catch (e) {
      console.error("Error saving custom tournament:", e);
    }
  }

  return newTour;
}

/**
 * Get Tournament metadata by ID
 */
export function getTournament(id: string): Tournament {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("gelavu_custom_tournaments");
      if (stored) {
        const list: Tournament[] = JSON.parse(stored);
        const match = list.find((t) => t.id === id);
        if (match) return match;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    MOCK_TOURNAMENTS.find((t) => t.id === id) || {
      id,
      title: `Tournament #${id}`,
      slug: `tournament-${id}`,
      sport: "BADMINTON",
      city: "Bengaluru",
      venueName: "City Badminton Arena",
      address: "Bengaluru, Karnataka",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      entryFee: 1200,
      prizePool: 30000,
      status: "REGISTRATION_OPEN",
      maxEntries: 64,
      registeredCount: 8,
      hostId: "host-1",
      hostName: "Apex Badminton Academy",
      bannerUrl: "/images/placeholder-poster.svg",
      description: "Official Gelavu Tournament with live court scoring and rankings.",
      categories: ["MEN_DOUBLES", "MIXED_DOUBLES"],
      rulesSummary: "Best of 3 sets to 21 points. BWF standard feather shuttles provided.",
      partnerDrawEnabled: true,
    }
  );
}

/**
 * Get all available tournaments for Host
 */
export function getAllHostTournaments(): Tournament[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("gelavu_custom_tournaments");
      if (stored) {
        const list: Tournament[] = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          const existingIds = new Set(list.map((t) => t.id));
          const mockFiltered = MOCK_TOURNAMENTS.filter((t) => !existingIds.has(t.id));
          return [...list, ...mockFiltered];
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  return MOCK_TOURNAMENTS;
}

/**
 * Retrieve entries for a specific tournament (scoped by tournamentId)
 */
export function getTournamentEntries(tournamentId: string): TournamentEntry[] {
  if (typeof window === "undefined") {
    return DEFAULT_ENTRIES_BY_TOURNAMENT[tournamentId] || [];
  }

  try {
    const key = `gelavu_tournament_entries_v4_${tournamentId}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error loading tournament entries from storage:", err);
  }

  const defaults = DEFAULT_ENTRIES_BY_TOURNAMENT[tournamentId] || DEFAULT_ENTRIES_BY_TOURNAMENT["tour-1"] || [];
  return defaults;
}

/**
 * Save entries for a specific tournament
 */
export function saveTournamentEntries(tournamentId: string, entries: TournamentEntry[]) {
  if (typeof window === "undefined") return;

  try {
    const key = `gelavu_tournament_entries_v4_${tournamentId}`;
    localStorage.setItem(key, JSON.stringify(entries));
    window.dispatchEvent(new CustomEvent("gelavu_entries_updated", { detail: { tournamentId, count: entries.length } }));
  } catch (err) {
    console.error("Error saving tournament entries to storage:", err);
  }
}

/**
 * Retrieve fixture matches for a specific tournament & category
 */
export function getTournamentFixtures(tournamentId: string, category?: string): FixtureMatch[] | null {
  if (typeof window === "undefined") return null;

  try {
    const catSuffix = category ? `_${category.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}` : "";
    const key = `gelavu_tournament_fixtures_${tournamentId}${catSuffix}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading fixtures from storage:", err);
  }
  return null;
}

/**
 * Save fixture matches for a specific tournament & category
 */
export function saveTournamentFixtures(tournamentId: string, matches: FixtureMatch[], category?: string) {
  if (typeof window === "undefined") return;

  try {
    const catSuffix = category ? `_${category.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase()}` : "";
    const key = `gelavu_tournament_fixtures_${tournamentId}${catSuffix}`;
    localStorage.setItem(key, JSON.stringify(matches));
    if (!category || category === "Men's Doubles (BYOP)") {
      localStorage.setItem(`gelavu_tournament_fixtures_${tournamentId}`, JSON.stringify(matches));
    }
    window.dispatchEvent(new CustomEvent("gelavu_fixtures_updated", { detail: { tournamentId, category, count: matches.length } }));
  } catch (err) {
    console.error("Error saving fixtures to storage:", err);
  }
}

/**
 * Dynamic Bracket Generator: converts real tournament entries into an 8-team
 * single-elimination knockout bracket with auto-linked advancing nodes.
 */
export function generateBracketFromEntries(
  tournamentId: string,
  entries: TournamentEntry[],
  category = "Men's Doubles (BYOP)"
): FixtureMatch[] {
  const isSingles = category.toLowerCase().includes("singles");
  const isDoubles = category.toLowerCase().includes("doubles");
  const isWheel = category.toLowerCase().includes("wheel");

  // Filter confirmed entries
  const confirmed = entries.filter((e) => e.status === "CONFIRMED");

  // Filter entries specifically belonging to this category
  const categoryMatching = confirmed.filter(
    (e) => e.category.toLowerCase() === category.toLowerCase()
  );

  let teams: Array<{ name: string; seed: number; entry: TournamentEntry | null }> = [];

  if (isWheel) {
    // For wheel doubles, if we have solo entries, pair them up in pairs of 2
    const soloEntrants = categoryMatching.length > 0 ? categoryMatching : confirmed;
    const paired: Array<{ name: string; seed: number; entry: TournamentEntry | null }> = [];
    for (let i = 0; i < soloEntrants.length - 1; i += 2) {
      const p1 = soloEntrants[i].name;
      const p2 = soloEntrants[i + 1].name;
      paired.push({
        name: `${p1} & ${p2}`,
        seed: Math.floor(i / 2) + 1,
        entry: soloEntrants[i],
      });
      if (paired.length >= 8) break;
    }
    teams = paired;
  } else {
    const activePool = categoryMatching.length > 0 ? categoryMatching : [];
    teams = activePool.map((entry, idx) => {
      let name: string;
      if (isSingles) {
        name = entry.name;
      } else if (isDoubles) {
        name = entry.partnerName ? `${entry.name} / ${entry.partnerName}` : `${entry.name} & Partner`;
      } else {
        name = entry.partnerName ? `${entry.name} / ${entry.partnerName}` : entry.name;
      }

      return {
        name,
        seed: idx + 1,
        entry,
      };
    });
  }

  // If fewer than 8 teams, add qualified entrant slots to make an 8-bracket
  while (teams.length < 8) {
    const seed = teams.length + 1;
    teams.push({
      name: isWheel
        ? `Wheel Pair #${seed} (Ready to Draw)`
        : `Qualified ${isSingles ? "Player" : "Team"} #${seed}`,
      seed,
      entry: null as unknown as TournamentEntry,
    });
  }

  return buildKnockoutBracket(tournamentId, teams as Array<{ name: string; seed: number; entry: TournamentEntry }>, category);
}

/**
 * Generate Bracket from Custom Pairs (e.g., created by Picker Wheel)
 */
export function generateBracketFromCustomTeams(
  tournamentId: string,
  customTeams: Array<{ name: string; seed?: number }>,
  category = "Random Wheel Doubles"
): FixtureMatch[] {
  const teams = customTeams.map((t, idx) => ({
    name: t.name,
    seed: t.seed || idx + 1,
    entry: null as unknown as TournamentEntry,
  }));

  while (teams.length < 8) {
    const seed = teams.length + 1;
    teams.push({
      name: `Wheel Reserve Team #${seed}`,
      seed,
      entry: null as unknown as TournamentEntry,
    });
  }

  return buildKnockoutBracket(tournamentId, teams, category);
}

function buildKnockoutBracket(
  tournamentId: string,
  teams: Array<{ name: string; seed: number; entry: TournamentEntry }>,
  category: string
): FixtureMatch[] {
  const catPrefix = category.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

  const generatedMatches: FixtureMatch[] = [
    // Quarter-Finals
    {
      id: `qf-1-${tournamentId}-${catPrefix}`,
      round: "QUARTER-FINALS",
      team1: { name: teams[0].name, seed: teams[0].seed }, // Seed 1
      team2: { name: teams[7].name, seed: teams[7].seed }, // Seed 8
      court: "Court 1",
      time: "9:00 AM",
      status: "SCHEDULED",
    },
    {
      id: `qf-2-${tournamentId}-${catPrefix}`,
      round: "QUARTER-FINALS",
      team1: { name: teams[3].name, seed: teams[3].seed }, // Seed 4
      team2: { name: teams[4].name, seed: teams[4].seed }, // Seed 5
      court: "Court 2",
      time: "9:45 AM",
      status: "SCHEDULED",
    },
    {
      id: `qf-3-${tournamentId}-${catPrefix}`,
      round: "QUARTER-FINALS",
      team1: { name: teams[2].name, seed: teams[2].seed }, // Seed 3
      team2: { name: teams[5].name, seed: teams[5].seed }, // Seed 6
      court: "Court 3",
      time: "10:30 AM",
      status: "SCHEDULED",
    },
    {
      id: `qf-4-${tournamentId}-${catPrefix}`,
      round: "QUARTER-FINALS",
      team1: { name: teams[1].name, seed: teams[1].seed }, // Seed 2
      team2: { name: teams[6].name, seed: teams[6].seed }, // Seed 7
      court: "Court 1",
      time: "11:15 AM",
      status: "SCHEDULED",
    },
    // Semi-Finals
    {
      id: `sf-1-${tournamentId}-${catPrefix}`,
      round: "SEMI-FINALS",
      team1: { name: "Winner QF1" },
      team2: { name: "Winner QF2" },
      court: "Court 1",
      time: "2:00 PM",
      status: "SCHEDULED",
    },
    {
      id: `sf-2-${tournamentId}-${catPrefix}`,
      round: "SEMI-FINALS",
      team1: { name: "Winner QF3" },
      team2: { name: "Winner QF4" },
      court: "Court 2",
      time: "2:45 PM",
      status: "SCHEDULED",
    },
    // Championship Final
    {
      id: `final-1-${tournamentId}-${catPrefix}`,
      round: "CHAMPIONSHIP FINAL",
      team1: { name: "Winner SF1" },
      team2: { name: "Winner SF2" },
      court: "Court 1",
      time: "5:00 PM",
      status: "SCHEDULED",
    },
  ];

  saveTournamentFixtures(tournamentId, generatedMatches, category);
  return generatedMatches;
}
