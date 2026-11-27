"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, BarChart3, Gamepad2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlayoSkillBadge } from "@/components/common/PlayoSkillBadge";
import {
  computePlayoSportProfile,
  type PlayoSportProfileInput,
} from "@/lib/playoRating";
import { PlayoSkillLevel, PLAYO_SKILL_TIERS } from "@/types/playo";

export interface PlayoSportTab {
  id: string;
  label: string;
  gamesPlayed: number;
  selfTier: PlayoSkillLevel;
  peerRank?: number;
  events: PlayoSportProfileInput["events"];
  activityTimeline?: PlayoSportProfileInput["activityTimeline"];
}

interface PlayoMySportsCardProps {
  sports: PlayoSportTab[];
  onEditSelfRating?: (sportId: string) => void;
  className?: string;
}

const TIER_ABBR: Record<PlayoSkillLevel, string> = {
  Beginner: "B",
  Amateur: "A",
  Intermediate: "I",
  Advanced: "D",
  Professional: "P",
};

function tierColor(level: PlayoSkillLevel): string {
  return PLAYO_SKILL_TIERS.find((t) => t.id === level)?.indicatorColor ?? "#94a3b8";
}

export function PlayoMySportsCard({
  sports,
  onEditSelfRating,
  className,
}: PlayoMySportsCardProps) {
  const [activeSportId, setActiveSportId] = useState(sports[0]?.id ?? "badminton");

  const activeSport = useMemo(
    () => sports.find((s) => s.id === activeSportId) ?? sports[0],
    [sports, activeSportId]
  );

  const profile = useMemo(() => {
    if (!activeSport) return null;
    return computePlayoSportProfile({
      sportId: activeSport.id,
      sportLabel: activeSport.label,
      gamesPlayed: activeSport.gamesPlayed,
      selfTier: activeSport.selfTier,
      peerRank: activeSport.peerRank,
      events: activeSport.events,
      activityTimeline: activeSport.activityTimeline,
    });
  }, [activeSport]);

  if (!activeSport || !profile) return null;

  const lastFiveDisplay = [...profile.lastFiveGameRatings];
  while (lastFiveDisplay.length < 5) {
    lastFiveDisplay.push({
      activityId: `pad-${lastFiveDisplay.length}`,
      activityAt: new Date().toISOString(),
    });
  }

  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/10 bg-navy p-6 sm:p-8 shadow-2xl space-y-6",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-hotpink" />
            <h3 className="text-lg font-black text-white tracking-tight">Sports &amp; skill standing</h3>
          </div>
          <p className="text-xs text-white/70 mt-1 max-w-lg">
            Per-sport calibrated tier from peer feedback (90/10 recent vs lifetime weighting).
          </p>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-hotpink bg-hotpink/10 border border-[#FF685B]/25 px-2.5 py-1 rounded-full">
          By sport
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {sports.map((sport) => {
          const active = sport.id === activeSportId;
          return (
            <button
              key={sport.id}
              type="button"
              onClick={() => setActiveSportId(sport.id)}
              className={cn(
                "shrink-0 rounded-2xl px-4 py-2.5 text-left border transition-all min-w-[108px]",
                active
                  ? "bg-[#1A2234] border-[#FF685B]/50 text-white shadow-md ring-1 ring-[#FF685B]/20"
                  : "bg-[#161D2E] border-white/10 text-white/70 hover:border-white/20 hover:text-white/90"
              )}
            >
              <span className="block text-xs font-black">{sport.label}</span>
              <span className="block text-[10px] font-mono mt-0.5 opacity-80">
                {sport.gamesPlayed} games
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#161D2E] p-5 sm:p-6 space-y-5">
          <PlayoSkillBadge
            level={profile.overallTier}
            rating={profile.overallRating}
            progress={profile.progressWithinTier}
            showOverallLabel
            layout="meter"
            size="lg"
            theme="dark"
          />

          <button
            type="button"
            onClick={() => onEditSelfRating?.(activeSport.id)}
            className="flex w-full sm:w-auto items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy px-4 py-3 text-left hover:border-[#FF685B]/40 transition-colors group"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 block">
                Self-assessed
              </span>
              <span className="text-sm font-black text-white mt-0.5">{profile.selfTier}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-hotpink group-hover:underline">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </span>
          </button>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-2xl border border-white/10 bg-navy p-5 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-hotpink" />
                  Circuit peer rank
                </span>
                <p className="text-3xl font-mono font-black text-white mt-2">
                  #{profile.peerRank}
                </p>
                <p className="text-[11px] text-white/60 mt-1">{activeSport.label}</p>
              </div>
              <Link
                href="#rankings"
                className="text-[11px] font-bold text-hotpink hover:underline shrink-0"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161D2E] p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/60 mb-3">
              <Gamepad2 className="w-3.5 h-3.5 text-hotpink" />
              Match volume
            </div>
            <p className="text-2xl font-mono font-black text-hotpink">{profile.gamesPlayed}</p>
            <p className="text-[11px] text-white/60 mt-1">Recorded games in this sport</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#161D2E] p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-3">
              Recent peer feedback (last 5)
            </p>
            <div className="flex gap-2">
              {lastFiveDisplay.slice(0, 5).map((slot, idx) => {
                const rated = Boolean(slot.tier);
                const color = slot.tier ? tierColor(slot.tier) : undefined;
                return (
                  <div
                    key={slot.activityId ?? idx}
                    title={slot.tier ? `${slot.tier} feedback` : "No rating yet"}
                    className={cn(
                      "flex h-10 w-10 flex-col items-center justify-center rounded-xl border text-xs font-black transition-colors",
                      rated
                        ? "border-white/15 bg-white/5"
                        : "border-dashed border-white/10 bg-transparent text-gray-600"
                    )}
                    style={
                      rated
                        ? {
                            borderColor: `${color}66`,
                            boxShadow: `0 0 0 1px ${color}22 inset`,
                          }
                        : undefined
                    }
                  >
                    {rated ? (
                      <>
                        <span style={{ color }}>{TIER_ABBR[slot.tier!]}</span>
                        <span className="text-[8px] font-semibold text-white/60 mt-0.5">rated</span>
                      </>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}