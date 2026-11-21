export interface RulePreset {
  id: string;
  name: string;
  pointsPerSet: number;
  maxPoints: number;
  totalSets: number;
  winByTwo: boolean;
  description: string;
}

export const RULES_PRESETS: Record<string, RulePreset[]> = {
  BADMINTON: [
    {
      id: "badminton-standard-21",
      name: "BWF Standard (Best of 3 x 21 Points)",
      pointsPerSet: 21,
      maxPoints: 30,
      totalSets: 3,
      winByTwo: true,
      description: "Official BWF rally point scoring to 21 points, golden point cap at 30.",
    },
    {
      id: "badminton-short-15",
      name: "Fast Format (Best of 3 x 15 Points)",
      pointsPerSet: 15,
      maxPoints: 21,
      totalSets: 3,
      winByTwo: true,
      description: "Fast-paced knockout format to 15 points, max cap at 21.",
    },
    {
      id: "badminton-single-30",
      name: "Single Set to 30 Points",
      pointsPerSet: 30,
      maxPoints: 30,
      totalSets: 1,
      winByTwo: false,
      description: "Sudden death 30 points single set with switch at 15.",
    },
  ],
  PICKLEBALL: [
    {
      id: "pickleball-11",
      name: "Standard 11 Points (Side-out Scoring)",
      pointsPerSet: 11,
      maxPoints: 15,
      totalSets: 3,
      winByTwo: true,
      description: "Official USA Pickleball rule: points scored only on serve to 11, win by 2.",
    },
    {
      id: "pickleball-rally-15",
      name: "Rally Scoring to 15",
      pointsPerSet: 15,
      maxPoints: 17,
      totalSets: 1,
      winByTwo: true,
      description: "Point on every rally, faster rotation for league schedules.",
    },
  ],
};
