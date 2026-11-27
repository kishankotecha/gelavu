"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Check,
  ThumbsUp,
  Clock,
  Sparkles,
  Award,
  AlertCircle,
  UserCheck,
  Heart,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export type PlayoSkillTier = "Beginner" | "Amateur" | "Intermediate" | "Advanced" | "Professional";

export interface PlayoPlayerReview {
  playerId: string;
  playerName: string;
  teamName: string;
  skillTier: PlayoSkillTier;
  punctuality: "ON_TIME" | "SLIGHTLY_LATE" | "NO_SHOW";
  courtDemeanor: "FAIR_FRIENDLY" | "COMPETITIVE_RESPECTFUL" | "DISPUTES_CALLS";
  selectedBadges: string[];
  playAgain: "DEFINITELY" | "YES" | "PREFER_NOT";
  notes?: string;
}

export interface MatchRatingProps {
  isOpen: boolean;
  onClose: () => void;
  matchId: string;
  matchTitle: string; // e.g. "Quarter-Finals · Court 1"
  team1Players: Array<{ id: string; name: string }>;
  team2Players: Array<{ id: string; name: string }>;
  finalScore?: string; // e.g. "21–18, 21–14"
  onSaveReviews?: (reviews: PlayoPlayerReview[]) => void;
}

const PLAYO_SKILL_TIERS: Array<{
  id: PlayoSkillTier;
  label: string;
  summary: string;
  description: string;
  brandColor: string;
  solidPill: string;
  activeCardBg: string;
  activeBorder: string;
  activeTextColor: string;
  pillColor: string;
}> = [
  {
    id: "Beginner",
    label: "Beginner",
    summary: "Learning fundamentals",
    description: "Learning racket grip, basic serving rules, sustaining short 2–3 shot rallies.",
    brandColor: "#0284C7",
    solidPill: "bg-sky-600 text-white border-sky-700",
    activeCardBg: "bg-sky-50 border-sky-600 ring-2 ring-sky-500/30",
    activeBorder: "border-sky-600",
    activeTextColor: "text-sky-800",
    pillColor: "bg-sky-600",
  },
  {
    id: "Amateur",
    label: "Amateur",
    summary: "Consistent baseline",
    description: "Can sustain medium rallies, consistent serving, developing smash power and footwork.",
    brandColor: "#0D9488",
    solidPill: "bg-teal-600 text-white border-teal-700",
    activeCardBg: "bg-teal-50 border-teal-600 ring-2 ring-teal-500/30",
    activeBorder: "border-teal-600",
    activeTextColor: "text-teal-800",
    pillColor: "bg-teal-600",
  },
  {
    id: "Intermediate",
    label: "Intermediate",
    summary: "Good control & court coverage",
    description: "Sharp clears, drop shots, smashes. Understands front-and-back doubles rotation.",
    brandColor: "#16A34A",
    solidPill: "bg-hotpink text-white border-emerald-700",
    activeCardBg: "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30",
    activeBorder: "border-emerald-600",
    activeTextColor: "text-emerald-800",
    pillColor: "bg-hotpink",
  },
  {
    id: "Advanced",
    label: "Advanced",
    summary: "High pace & tactical power",
    description: "Fast reflex drives, steep attacking smashes, tactical net play, high court stamina.",
    brandColor: "#EA580C",
    solidPill: "bg-hotpink text-white border-hotpink/30",
    activeCardBg: "bg-hotpink border-hotpink/30 ring-2 ring-orange-500/30",
    activeBorder: "border-hotpink/30",
    activeTextColor: "text-hotpink",
    pillColor: "bg-hotpink",
  },
  {
    id: "Professional",
    label: "Professional",
    summary: "Tournament circuit competitor",
    description: "State or national ranking circuit competitor. Master-level precision and deception.",
    brandColor: "#7C3AED",
    solidPill: "bg-purple-600 text-white border-purple-700",
    activeCardBg: "bg-purple-50 border-purple-600 ring-2 ring-purple-500/30",
    activeBorder: "border-purple-600",
    activeTextColor: "text-purple-800",
    pillColor: "bg-purple-600",
  },
];

const PLAYO_BADGES = [
  { id: "smash", label: "Smash Specialist", icon: Flame, color: "text-hotpink bg-hotpink/10 border-hotpink/40" },
  { id: "defense", label: "Iron Defense", icon: ShieldCheck, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "net", label: "Net Controller", icon: Sparkles, color: "text-blue-700 bg-blue-50 border-blue-200" },
  { id: "sportsman", label: "True Sportsman", icon: Heart, color: "text-rose-700 bg-rose-50 border-rose-200" },
  { id: "partner", label: "Great Partner", icon: ThumbsUp, color: "text-teal-700 bg-teal-50 border-teal-200" },
  { id: "lines", label: "Honest Line Calls", icon: Award, color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
];

export function PlayoPostMatchRatingModal({
  isOpen,
  onClose,
  matchId,
  matchTitle,
  team1Players,
  team2Players,
  finalScore = "21–18, 21–14",
  onSaveReviews,
}: MatchRatingProps) {
  const { showToast } = useToast();

  const allPlayers = [
    ...team1Players.map((p) => ({ ...p, team: "Team 1" })),
    ...team2Players.map((p) => ({ ...p, team: "Team 2" })),
  ];

  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const activePlayer = allPlayers[activePlayerIndex] || allPlayers[0];

  // Map of player reviews by playerId
  const [reviews, setReviews] = useState<Record<string, PlayoPlayerReview>>(() => {
    const initial: Record<string, PlayoPlayerReview> = {};
    allPlayers.forEach((p) => {
      initial[p.id] = {
        playerId: p.id,
        playerName: p.name,
        teamName: p.team,
        skillTier: "Intermediate",
        punctuality: "ON_TIME",
        courtDemeanor: "FAIR_FRIENDLY",
        selectedBadges: ["True Sportsman"],
        playAgain: "DEFINITELY",
        notes: "",
      };
    });
    return initial;
  });

  const currentReview = activePlayer ? reviews[activePlayer.id] || {
    playerId: activePlayer.id,
    playerName: activePlayer.name,
    teamName: activePlayer.team,
    skillTier: "Intermediate" as PlayoSkillTier,
    punctuality: "ON_TIME" as const,
    courtDemeanor: "FAIR_FRIENDLY" as const,
    selectedBadges: [],
    playAgain: "DEFINITELY" as const,
  } : null;

  if (!isOpen || !activePlayer || !currentReview) return null;

  const updateCurrentReview = (updates: Partial<PlayoPlayerReview>) => {
    setReviews((prev) => ({
      ...prev,
      [activePlayer.id]: {
        ...prev[activePlayer.id]!,
        ...updates,
      },
    }));
  };

  const handleToggleBadge = (badgeLabel: string) => {
    const current = currentReview.selectedBadges;
    const exists = current.includes(badgeLabel);
    const updated = exists ? current.filter((b) => b !== badgeLabel) : [...current, badgeLabel];
    updateCurrentReview({ selectedBadges: updated });
  };

  const handleFinalSubmit = () => {
    const reviewList = Object.values(reviews);
    if (onSaveReviews) {
      onSaveReviews(reviewList);
    }
    showToast(
      `Submitted Playo peer reviews for ${reviewList.length} players! Ratings calibrated.`,
      "success"
    );
    onClose();
  };

  return (
    <div data-match-id={matchId} className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 text-[#1E293B]">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-3xl border border-[#D5D9CE] bg-white shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EEF0E8] bg-[#FAFBF7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8EFEA] text-[#14212D] flex items-center justify-center border border-[#CAD7CE]">
              <Award className="w-5 h-5 text-[#14212D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-wider text-[#14212D]">
                  Playo Peer Rating Flow
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8EFEA] text-[#14212D] border border-[#CAD7CE]">
                  Post-Match Review
                </span>
              </div>
              <h2 className="text-lg font-black text-[#1E293B] tracking-tight">
                Rate Playpals &amp; Match Skill: {matchTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-white px-2.5 py-1 rounded-xl border border-[#E2E6DD] text-[#64748B]">
              Final: {finalScore}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#64748B] hover:text-[#1E293B] p-2 rounded-xl hover:bg-[#F0F2EB] text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Player Tabs */}
        <div className="px-6 py-2.5 bg-[#F5F6F0] border-b border-[#E2E6DD] flex items-center gap-2 overflow-x-auto shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mr-1 shrink-0">
            Select Player:
          </span>
          {allPlayers.map((p, idx) => {
            const isSelected = activePlayerIndex === idx;
            const pReview = reviews[p.id];
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePlayerIndex(idx)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-navy text-white shadow-xs"
                    : "bg-white text-[#475569] hover:text-[#1E293B] border border-[#E2E6DD]"
                }`}
              >
                <span>{p.name}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-md font-black uppercase text-white shadow-2xs ${
                    pReview?.skillTier === "Professional"
                      ? "bg-purple-600"
                      : pReview?.skillTier === "Advanced"
                      ? "bg-hotpink"
                      : pReview?.skillTier === "Intermediate"
                      ? "bg-hotpink"
                      : pReview?.skillTier === "Amateur"
                      ? "bg-teal-600"
                      : "bg-sky-600"
                  }`}
                >
                  {pReview?.skillTier || "Level"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
          {/* Active Player Card Header */}
          <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-[#FAFBF7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-navy text-white flex items-center justify-center font-black text-lg">
                {activePlayer.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-[#1E293B]">{activePlayer.name}</h3>
                  <span className="text-[10px] font-bold text-[#64748B]">({activePlayer.team})</span>
                </div>
                <p className="text-xs text-[#64748B]">
                  Ratings are anonymous peer feedback — calibrated based on real on-court performance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#64748B]">Playo Skill Standing:</span>
              <span
                className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-xs ${
                  currentReview.skillTier === "Professional"
                    ? "bg-purple-600 border border-purple-700"
                    : currentReview.skillTier === "Advanced"
                    ? "bg-hotpink border border-hotpink/30"
                    : currentReview.skillTier === "Intermediate"
                    ? "bg-hotpink border border-emerald-700"
                    : currentReview.skillTier === "Amateur"
                    ? "bg-teal-600 border border-teal-700"
                    : "bg-sky-600 border border-sky-700"
                }`}
              >
                {currentReview.skillTier}
              </span>
            </div>
          </div>

          {/* Playo User Rating Graph Breakdown */}
          <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-[#FAFBF7] space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#1E293B] flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-hotpink" />
                Playo User Rating Graph (Peer Feedback Distribution)
              </span>
              <span className="text-[10px] text-[#64748B] font-semibold">Live Playpal Aggregation</span>
            </div>

            {/* Segmented Color Bar like Playo App */}
            <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
              <div style={{ width: "5%" }} className="bg-sky-500 h-full transition-all" title="Beginner: 5%" />
              <div style={{ width: "15%" }} className="bg-teal-500 h-full transition-all" title="Amateur: 15%" />
              <div style={{ width: "60%" }} className="bg-hotpink h-full transition-all" title="Intermediate: 60%" />
              <div style={{ width: "20%" }} className="bg-hotpink h-full transition-all" title="Advanced: 20%" />
              <div style={{ width: "0%" }} className="bg-purple-600 h-full transition-all" title="Professional: 0%" />
            </div>

            {/* Legend with Playo Colors */}
            <div className="flex flex-wrap items-center justify-between text-[10px] font-bold text-[#64748B] pt-0.5 gap-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Beginner (5%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Amateur (15%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-hotpink" /> Intermediate (60%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-hotpink" /> Advanced (20%)</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> Pro (0%)</span>
            </div>
          </div>

          {/* STEP 1: Skill Level Assessment (Playo 5-Tier Standard) */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#14212D] flex items-center gap-1.5">
                <Award className="w-4 h-4" /> 1. How would you rate their play level today?
              </label>
              <p className="text-xs text-[#64748B]">
                Playo uses skill tiers rather than arbitrary numbers so players get fairly balanced matches.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
              {PLAYO_SKILL_TIERS.map((tier) => {
                const isSelected = currentReview.skillTier === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => updateCurrentReview({ skillTier: tier.id })}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? `${tier.activeCardBg} shadow-xs`
                        : "border-[#E2E6DD] bg-[#FAFBF7] hover:bg-white hover:border-[#CAD7CE]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md text-white shadow-2xs ${tier.pillColor}`}
                        >
                          {tier.label}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#14212D]" />}
                      </div>
                      <p className={`text-[11px] font-bold mb-1.5 leading-tight ${isSelected ? tier.activeTextColor : "text-[#1E293B]"}`}>
                        {tier.summary}
                      </p>
                    </div>
                    <p className="text-[10px] text-[#64748B] leading-snug">{tier.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Punctuality & Reliability */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#14212D] flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> 2. Punctuality &amp; Match Readiness
              </label>
              <p className="text-xs text-[#64748B]">
                Playo tracks reliability score to reward punctual players and prevent court booking delays.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "ON_TIME",
                  label: "On Time & Ready",
                  desc: "Arrived at court on schedule with gear",
                  icon: UserCheck,
                  color: "text-emerald-700 bg-emerald-50 border-emerald-200",
                },
                {
                  id: "SLIGHTLY_LATE",
                  label: "5–10 Mins Late",
                  desc: "Arrived late but notified host/partner",
                  icon: Clock,
                  color: "text-hotpink bg-hotpink/10 border-hotpink/40",
                },
                {
                  id: "NO_SHOW",
                  label: "No Show",
                  desc: "Did not arrive or forfeited match",
                  icon: AlertCircle,
                  color: "text-rose-700 bg-rose-50 border-rose-200",
                },
              ].map((punc) => {
                const isSelected = currentReview.punctuality === punc.id;
                const Icon = punc.icon;
                return (
                  <button
                    key={punc.id}
                    type="button"
                    onClick={() =>
                      updateCurrentReview({
                        punctuality: punc.id as PlayoPlayerReview["punctuality"],
                      })
                    }
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? "border-[#14212D] bg-[#E8EFEA] ring-2 ring-[#14212D]/20"
                        : "border-[#E2E6DD] bg-[#FAFBF7] hover:bg-white"
                    }`}
                  >
                    <div className={`p-2 rounded-xl border ${punc.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-[#1E293B]">{punc.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#14212D]" />}
                      </div>
                      <p className="text-[10px] text-[#64748B] mt-0.5">{punc.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: Playpal Compliment Badges */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-[#14212D] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 3. Compliment Badges (Tap to Award)
              </label>
              <p className="text-xs text-[#64748B]">
                Badges display prominently on the player&apos;s public profile and tournament card.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PLAYO_BADGES.map((badge) => {
                const Icon = badge.icon;
                const isAwarded = currentReview.selectedBadges.includes(badge.label);
                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => handleToggleBadge(badge.label)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      isAwarded
                        ? "border-[#14212D] bg-[#E8EFEA] ring-1 ring-[#14212D]"
                        : "border-[#E2E6DD] bg-[#FAFBF7] hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl border ${badge.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#1E293B]">{badge.label}</span>
                    </div>
                    {isAwarded ? (
                      <span className="text-[10px] font-black text-[#14212D] bg-white px-2 py-0.5 rounded-full border border-[#CAD7CE]">
                        ✓ Awarded
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#94A3B8]">+ Add</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Court Demeanor & Play Again */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EEF0E8]">
            {/* Court Demeanor */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#475569] block">
                Court Demeanor &amp; Sportsmanship
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: "FAIR_FRIENDLY", label: "Fair & Friendly 🤝" },
                  { id: "COMPETITIVE_RESPECTFUL", label: "Competitive & Respectful 🏸" },
                  { id: "DISPUTES_CALLS", label: "Disputed Calls ⚠️" },
                ].map((demeanor) => (
                  <button
                    key={demeanor.id}
                    type="button"
                    onClick={() =>
                      updateCurrentReview({
                        courtDemeanor: demeanor.id as PlayoPlayerReview["courtDemeanor"],
                      })
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentReview.courtDemeanor === demeanor.id
                        ? "bg-navy text-white shadow-xs"
                        : "bg-[#F5F6F0] text-[#64748B] hover:text-[#1E293B] border border-[#E2E6DD]"
                    }`}
                  >
                    {demeanor.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Play Again? */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-[#475569] block">
                Would you play with {activePlayer.name} again?
              </label>
              <div className="flex items-center gap-2">
                {[
                  { id: "DEFINITELY", label: "Definitely 💚" },
                  { id: "YES", label: "Yes 👍" },
                  { id: "PREFER_NOT", label: "Prefer Not" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() =>
                      updateCurrentReview({
                        playAgain: opt.id as PlayoPlayerReview["playAgain"],
                      })
                    }
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentReview.playAgain === opt.id
                        ? "bg-navy text-white shadow-xs"
                        : "bg-[#F5F6F0] text-[#64748B] hover:text-[#1E293B] border border-[#E2E6DD]"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="px-6 py-4 border-t border-[#EEF0E8] bg-[#FAFBF7] flex items-center justify-between shrink-0">
          <div className="text-xs text-[#64748B]">
            Reviewing player <strong>{activePlayerIndex + 1} of {allPlayers.length}</strong> ({activePlayer.name})
          </div>

          <div className="flex items-center gap-2.5">
            {activePlayerIndex < allPlayers.length - 1 ? (
              <button
                type="button"
                onClick={() => setActivePlayerIndex((prev) => prev + 1)}
                className="px-4 py-2 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] text-[#1E293B] text-xs font-bold transition-colors cursor-pointer"
              >
                Next Player →
              </button>
            ) : null}

            <button
              type="button"
              onClick={handleFinalSubmit}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy hover:bg-[#16392B] text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Submit Playo Peer Reviews</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
