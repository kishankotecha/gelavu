"use client";

import { PlayoSkillLevel } from "@/types/playo";
import type { PlayoPeerRatingEvent } from "@/lib/playoRating";
import type { PlayoPlayerReview } from "@/features/scoring/PlayoPostMatchRatingModal";

const STORAGE_KEY = "gelavu_playo_peer_ratings";

export type StoredPlayoRatings = Record<string, PlayoPeerRatingEvent[]>;

function readStore(): StoredPlayoRatings {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredPlayoRatings) : {};
  } catch {
    return {};
  }
}

function writeStore(data: StoredPlayoRatings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("gelavu-playo-ratings-updated"));
}

/** Demo seed: badminton peer graph + pool with 8 games (recent games unrated). */
export function getDemoPeerRatingsForUser(_userId: string): PlayoPeerRatingEvent[] {
  return [
    {
      activityId: "pool-legacy",
      activityAt: "2025-09-15T18:00:00.000Z",
      raterId: "peer-alice",
      tier: "Amateur",
      sportId: "pool",
    },
    {
      activityId: "bdm-1",
      activityAt: "2025-11-20T10:00:00.000Z",
      raterId: "peer-rohan",
      tier: "Intermediate",
      sportId: "badminton",
    },
    {
      activityId: "bdm-2",
      activityAt: "2025-11-22T10:00:00.000Z",
      raterId: "peer-aditi",
      tier: "Amateur",
      sportId: "badminton",
    },
    {
      activityId: "bdm-3",
      activityAt: "2025-11-24T10:00:00.000Z",
      raterId: "peer-rahul",
      tier: "Advanced",
      sportId: "badminton",
    },
    {
      activityId: "bdm-4",
      activityAt: "2025-11-25T10:00:00.000Z",
      raterId: "peer-rohan",
      tier: "Professional",
      sportId: "badminton",
    },
    {
      activityId: "bdm-5",
      activityAt: "2025-11-26T10:00:00.000Z",
      raterId: "peer-maya",
      tier: "Intermediate",
      sportId: "badminton",
    },
  ];
}

export function getDemoPoolActivityTimeline() {
  return Array.from({ length: 8 }, (_, i) => ({
    activityId: `pool-g${i + 1}`,
    activityAt: new Date(Date.UTC(2025, 10, 20 + i, 17, 0)).toISOString(),
  }));
}

export function getDemoBadmintonActivityTimeline() {
  return [
    { activityId: "bdm-5", activityAt: "2025-11-26T10:00:00.000Z" },
    { activityId: "bdm-4", activityAt: "2025-11-25T10:00:00.000Z" },
    { activityId: "bdm-3", activityAt: "2025-11-24T10:00:00.000Z" },
    { activityId: "bdm-2", activityAt: "2025-11-22T10:00:00.000Z" },
    { activityId: "bdm-1", activityAt: "2025-11-20T10:00:00.000Z" },
  ];
}

export function getPeerRatingsForUser(userId: string): PlayoPeerRatingEvent[] {
  const store = readStore();
  const saved = store[userId] ?? [];
  if (saved.length > 0) return saved;
  return getDemoPeerRatingsForUser(userId);
}

export function getPeerRatingsBySport(
  userId: string,
  sportId: string
): PlayoPeerRatingEvent[] {
  return getPeerRatingsForUser(userId).filter((e) => e.sportId === sportId);
}

export function appendMatchPeerReviews(params: {
  targetUserId: string;
  sportId?: string;
  matchId: string;
  matchAt: string;
  reviews: Array<{ raterId: string; tier: PlayoSkillLevel }>;
}) {
  const store = readStore();
  const existing = store[params.targetUserId] ?? [];
  const sportId = params.sportId ?? "badminton";
  const additions: PlayoPeerRatingEvent[] = params.reviews.map((r) => ({
    activityId: params.matchId,
    activityAt: params.matchAt,
    raterId: r.raterId,
    tier: r.tier,
    sportId,
  }));
  store[params.targetUserId] = [...existing, ...additions];
  writeStore(store);
}

export function reviewsFromPostMatchModal(
  matchId: string,
  matchAt: string,
  sportId: string,
  reviews: PlayoPlayerReview[],
  raterId: string
): PlayoPeerRatingEvent[] {
  return reviews.map((review) => ({
    activityId: matchId,
    activityAt: matchAt,
    raterId: `${raterId}-${review.playerId}`,
    tier: review.skillTier,
    sportId,
  }));
}