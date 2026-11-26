import {
  PLAYO_SKILL_TIERS,
  PlayoSkillLevel,
  SkillTierConfig,
  getTierFromRating,
} from "@/types/playo";

/** Numeric anchor per tier (matches internal calibration bands in PLAYO_SKILL_TIERS). */
export function tierToNumericValue(tier: PlayoSkillLevel): number {
  const match = PLAYO_SKILL_TIERS.find((t) => t.id === tier);
  return match?.defaultRating ?? 4.0;
}

export interface PlayoPeerRatingEvent {
  activityId: string;
  activityAt: string;
  raterId: string;
  tier: PlayoSkillLevel;
  sportId: string;
}

export interface PlayoSportProfileInput {
  sportId: string;
  sportLabel: string;
  gamesPlayed: number;
  selfTier: PlayoSkillLevel;
  peerRank?: number;
  events: PlayoPeerRatingEvent[];
  /** Every game played (rated or not); drives “Last 5 Game Ratings”. */
  activityTimeline?: Array<{ activityId: string; activityAt: string }>;
}

export interface PlayoLastGameRating {
  activityId: string;
  activityAt: string;
  /** Undefined when peers did not rate this activity (Playo shows ×). */
  tier?: PlayoSkillLevel;
}

export interface PlayoComputedSportProfile {
  sportId: string;
  sportLabel: string;
  gamesPlayed: number;
  peerRank: number;
  selfTier: PlayoSkillLevel;
  overallTier: PlayoSkillLevel;
  overallRating: number;
  progressWithinTier: number;
  distribution: Record<PlayoSkillLevel, number>;
  distributionTotal: number;
  lastFiveGameRatings: PlayoLastGameRating[];
}

const TIER_ORDER: PlayoSkillLevel[] = [
  "Beginner",
  "Amateur",
  "Intermediate",
  "Advanced",
  "Professional",
];

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/** Only each Playpal's latest rating counts (Playo FAQ). */
export function dedupeLatestRatingPerRater(
  events: PlayoPeerRatingEvent[]
): PlayoPeerRatingEvent[] {
  const byRater = new Map<string, PlayoPeerRatingEvent>();
  const sorted = [...events].sort(
    (a, b) => new Date(b.activityAt).getTime() - new Date(a.activityAt).getTime()
  );
  for (const event of sorted) {
    if (!byRater.has(event.raterId)) {
      byRater.set(event.raterId, event);
    }
  }
  return [...byRater.values()];
}

function uniqueActivitiesNewestFirst(
  events: PlayoPeerRatingEvent[]
): { activityId: string; activityAt: string }[] {
  const map = new Map<string, string>();
  for (const e of events) {
    if (!map.has(e.activityId)) {
      map.set(e.activityId, e.activityAt);
    }
  }
  return [...map.entries()]
    .map(([activityId, activityAt]) => ({ activityId, activityAt }))
    .sort(
      (a, b) =>
        new Date(b.activityAt).getTime() - new Date(a.activityAt).getTime()
    );
}

/**
 * Playo overall rating:
 * - 90%: self-rating + peer ratings tied to your last 25 activities
 * - 10%: older peer ratings (after per-peer dedupe)
 * @see https://blog.playo.co/playo-user-rating-graph/
 */
export function computePlayoOverallRating(
  selfTier: PlayoSkillLevel,
  events: PlayoPeerRatingEvent[],
  recentActivityWindow = 25
): { overallRating: number; overallTier: SkillTierConfig } {
  const deduped = dedupeLatestRatingPerRater(events);
  const activities = uniqueActivitiesNewestFirst(events);
  const recentIds = new Set(
    activities.slice(0, recentActivityWindow).map((a) => a.activityId)
  );

  const selfValue = tierToNumericValue(selfTier);
  const recentPeerValues = deduped
    .filter((e) => recentIds.has(e.activityId))
    .map((e) => tierToNumericValue(e.tier));
  const olderPeerValues = deduped
    .filter((e) => !recentIds.has(e.activityId))
    .map((e) => tierToNumericValue(e.tier));

  const recentAvg = average([selfValue, ...recentPeerValues]);
  const olderAvg =
    olderPeerValues.length > 0 ? average(olderPeerValues) : recentAvg;

  const overallRating =
    olderPeerValues.length > 0
      ? recentAvg * 0.9 + olderAvg * 0.1
      : recentAvg;

  return {
    overallRating,
    overallTier: getTierFromRating(overallRating),
  };
}

/** Fill % inside the current tier band (pill progress toward next tier). */
export function getProgressWithinTier(rating: number): number {
  const tier = getTierFromRating(rating);
  const range = tier.maxRating - tier.minRating;
  if (range <= 0) return 100;
  const raw = ((rating - tier.minRating) / range) * 100;
  return Math.min(100, Math.max(8, Math.round(raw)));
}

export function buildPeerDistribution(
  events: PlayoPeerRatingEvent[]
): Record<PlayoSkillLevel, number> {
  const base: Record<PlayoSkillLevel, number> = {
    Beginner: 0,
    Amateur: 0,
    Intermediate: 0,
    Advanced: 0,
    Professional: 0,
  };
  for (const e of dedupeLatestRatingPerRater(events)) {
    base[e.tier] += 1;
  }
  return base;
}

/**
 * Last 5 activities: tier if rated; undefined if unmatched (× in Playo UI).
 * Unrated activities carry forward only for overall math, not for this strip.
 */
export function getLastFiveGameRatings(
  events: PlayoPeerRatingEvent[],
  activityTimeline?: Array<{ activityId: string; activityAt: string }>
): PlayoLastGameRating[] {
  const activities = (
    activityTimeline?.length
      ? [...activityTimeline].sort(
          (a, b) =>
            new Date(b.activityAt).getTime() - new Date(a.activityAt).getTime()
        )
      : uniqueActivitiesNewestFirst(events)
  ).slice(0, 5);

  return activities.map((a) => {
    const activityRatings = events.filter((e) => e.activityId === a.activityId);
    if (activityRatings.length === 0) {
      return { activityId: a.activityId, activityAt: a.activityAt };
    }
    const values = activityRatings.map((e) => tierToNumericValue(e.tier));
    const avg = average(values);
    const tier = getTierFromRating(avg).id;
    return {
      activityId: a.activityId,
      activityAt: a.activityAt,
      tier,
    };
  });
}

export function computePlayoSportProfile(
  input: PlayoSportProfileInput
): PlayoComputedSportProfile {
  const { overallRating, overallTier } = computePlayoOverallRating(
    input.selfTier,
    input.events
  );
  const distribution = buildPeerDistribution(input.events);
  const distributionTotal = TIER_ORDER.reduce(
    (sum, tier) => sum + distribution[tier],
    0
  );

  return {
    sportId: input.sportId,
    sportLabel: input.sportLabel,
    gamesPlayed: input.gamesPlayed,
    peerRank: input.peerRank ?? 999,
    selfTier: input.selfTier,
    overallTier: overallTier.id,
    overallRating,
    progressWithinTier: getProgressWithinTier(overallRating),
    distribution,
    distributionTotal,
    lastFiveGameRatings: getLastFiveGameRatings(
      input.events,
      input.activityTimeline
    ),
  };
}

export function distributionToPercentages(
  distribution: Record<PlayoSkillLevel, number>
): Array<{ tier: PlayoSkillLevel; count: number; percent: number }> {
  const total = TIER_ORDER.reduce((s, t) => s + distribution[t], 0);
  return TIER_ORDER.map((tier) => {
    const count = distribution[tier];
    const percent = total > 0 ? Math.round((count / total) * 100) : 0;
    return { tier, count, percent };
  });
}