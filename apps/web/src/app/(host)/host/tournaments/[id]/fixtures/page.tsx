"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Lock,
  Dices,
  ArrowLeft,
  AlertTriangle,
  Edit3,
  Shuffle,
  Award,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { PickerWheelDraw } from "@/features/host/PickerWheelDraw";
import { FixtureIssueModal, type FixtureMatch } from "@/features/host/FixtureIssueModal";
import { PlayoPostMatchRatingModal } from "@/features/scoring";

export default function HostFixturesPage() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("Men's Doubles (BYOP)");
  const [drawStrategy, setDrawStrategy] = useState<"wheel" | "standard">("wheel");
  const [isLocked, setIsLocked] = useState(false);
  const [selectedMatchForIssue, setSelectedMatchForIssue] = useState<FixtureMatch | null>(null);
  const [selectedMatchForRating, setSelectedMatchForRating] = useState<FixtureMatch | null>(null);

  // Solo players queue for Random Doubles Wheel with Playo skill tiers
  const soloPlayers = [
    { name: "Rohan Kumar", skillLevel: "Intermediate", style: "Backcourt Smasher" },
    { name: "Deepak Nayak", skillLevel: "Intermediate", style: "Defensive Retriever" },
    { name: "Suresh Hegde", skillLevel: "Advanced", style: "Front Court Net Specialist" },
    { name: "Nitin Kamath", skillLevel: "Advanced", style: "Steady All-Rounder" },
    { name: "Manoj Gowda", skillLevel: "Amateur", style: "Aggressive Drive" },
    { name: "Preetham Rao", skillLevel: "Amateur", style: "Net Controller" },
  ];

  // Tournament Bracket Matches State
  const [matches, setMatches] = useState<FixtureMatch[]>([
    {
      id: "qf-1",
      round: "QUARTER-FINALS",
      team1: { name: "Arjun Mehta / Nikhil Rao", score: 2, seed: 1 },
      team2: { name: "Ravi Teja / Sai Kumar", score: 0, seed: 8 },
      court: "Court 1",
      time: "9:00 AM",
      status: "COMPLETED",
    },
    {
      id: "qf-2",
      round: "QUARTER-FINALS",
      team1: { name: "Vikram Shenoy / Sai Teja", score: 14, seed: 4 },
      team2: { name: "Rohan Kumar / Deepak Nayak", score: 11, seed: 5 },
      court: "Court 2",
      time: "9:45 AM",
      status: "LIVE",
    },
    {
      id: "qf-3",
      round: "QUARTER-FINALS",
      team1: { name: "Kiran Gowda / Dev Anand", seed: 3 },
      team2: { name: "Aman Varma / Yash Kulkarni", seed: 6 },
      court: "Court 3",
      time: "10:30 AM",
      status: "SCHEDULED",
    },
    {
      id: "qf-4",
      round: "QUARTER-FINALS",
      team1: { name: "Tarun Joshi / Manas Joshi", seed: 2 },
      team2: { name: "Praveen Rao / Harish S", seed: 7 },
      court: "Court 1",
      time: "11:15 AM",
      status: "SCHEDULED",
    },
    {
      id: "sf-1",
      round: "SEMI-FINALS",
      team1: { name: "Arjun / Nikhil" },
      team2: { name: "Winner QF2" },
      court: "Court 1",
      time: "2:00 PM",
      status: "SCHEDULED",
    },
    {
      id: "sf-2",
      round: "SEMI-FINALS",
      team1: { name: "Winner QF3" },
      team2: { name: "Winner QF4" },
      court: "Court 2",
      time: "2:45 PM",
      status: "SCHEDULED",
    },
    {
      id: "final-1",
      round: "CHAMPIONSHIP FINAL",
      team1: { name: "Winner SF1" },
      team2: { name: "Winner SF2" },
      court: "Court 1",
      time: "5:00 PM",
      status: "SCHEDULED",
    },
  ]);

  const teams = [
    { id: "t1", name: "Arjun & Nikhil", seed: 1 },
    { id: "t2", name: "Tarun & Manas", seed: 2 },
    { id: "t3", name: "Kiran & Dev", seed: 3 },
    { id: "t4", name: "Vikram & Sai", seed: 4 },
    { id: "t5", name: "Rohan & Deepak", seed: 5 },
    { id: "t6", name: "Aman & Yash", seed: 6 },
    { id: "t7", name: "Praveen & Harish", seed: 7 },
    { id: "t8", name: "Ravi & Sai", seed: 8 },
  ];

  const handleRegenerate = () => {
    showToast("Draw re-seeded with provably fair cryptographic hash.", "info");
  };

  const handleLockPublish = () => {
    setIsLocked(!isLocked);
    showToast(
      !isLocked ? "Draw locked & published to live public bracket!" : "Bracket unlocked for host issue resolution",
      "success"
    );
  };

  // Host Issue Resolver Handler
  const handleResolveIssue = (
    matchId: string,
    updated: { team1: string; team2: string; court: string; time: string; issueReason: string }
  ) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            team1: { ...m.team1, name: updated.team1 },
            team2: { ...m.team2, name: updated.team2 },
            court: updated.court,
            time: updated.time,
            status: "ISSUE_MODIFIED",
            issueAuditReason: updated.issueReason,
          };
        }
        return m;
      })
    );
    showToast(`Fixture #${matchId} updated with audit note: ${updated.issueReason}`, "success");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl space-y-7 text-[#1E293B]">
      {/* Top Breadcrumb & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/host/tournaments/tour-1/entries"
            className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#1D4A38] transition-colors mb-2 cursor-pointer font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#1D4A38]" /> Back to Players & Entries
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-[#1E293B] tracking-tight">
              Tournament Fixtures & Draws
            </h1>
            <span className="rounded-full bg-[#E8EFEA] border border-[#CAD7CE] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#1D4A38]">
              Live Knockout
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isLocked}
            className="inline-flex items-center gap-2 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] text-[#1E293B] px-3.5 py-2 text-xs font-bold transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Shuffle Draw</span>
          </button>

          <button
            type="button"
            onClick={handleLockPublish}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black transition-all shadow-xs cursor-pointer ${
              isLocked
                ? "bg-[#E8EFEA] border border-[#CAD7CE] text-[#1D4A38] hover:bg-[#DCE7E0]"
                : "bg-[#1D4A38] hover:bg-[#16392B] text-white"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLocked ? "Published & Locked" : "Lock & Publish to Players"}</span>
          </button>
        </div>
      </div>

      {/* Strategy Switcher: Picker Wheel vs Standard Seeding */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {["Men's Doubles (BYOP)", "Mixed Doubles", "Random Wheel Doubles", "Men's Singles"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1D4A38] text-white shadow-2xs"
                  : "bg-[#F9FAF6] text-[#64748B] hover:text-[#1E293B] border border-[#E2E6DD]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Draw Strategy */}
        <div className="flex items-center gap-1.5 bg-[#F5F6F0] p-1 rounded-xl border border-[#E2E6DD]">
          <button
            type="button"
            onClick={() => setDrawStrategy("wheel")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
              drawStrategy === "wheel"
                ? "bg-[#1D4A38] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Picker Wheel (Anti-Rigging)</span>
          </button>
          <button
            type="button"
            onClick={() => setDrawStrategy("standard")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
              drawStrategy === "standard"
                ? "bg-[#1E3A8A] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Standard Seeding (1 vs 8)</span>
          </button>
        </div>
      </div>

      {/* Option 1: Live Interactive Picker Wheel Section */}
      {drawStrategy === "wheel" && (
        <PickerWheelDraw
          soloPlayers={soloPlayers}
          teams={teams}
          onPairCreated={(team) => {
            showToast(`Random Doubles Pair created: ${team.name}`, "success");
          }}
          onBracketRandomized={(hash) => {
            showToast(`Anti-fixing bracket draw randomized with hash ${hash}`, "success");
          }}
        />
      )}

      {/* Main Tournament Bracket Tree */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-black text-[#1E293B]">Championship Knockout Bracket</h3>
            <span className="text-[11px] text-[#64748B]">
              {matches.length} Scheduled Fixtures · Click &apos;Resolve Issue&apos; to edit with audit trail
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1D4A38] animate-pulse" /> Live
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Host Modified
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-[#E2E6DD] bg-white p-6 shadow-sm overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[760px]">
            {/* Column 1: Quarter Finals */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1D4A38] block pb-1 border-b border-[#E2E6DD]">
                QUARTER-FINALS (QF)
              </span>

              {matches.slice(0, 4).map((m) => (
                <div
                  key={m.id}
                  className={`rounded-2xl p-4 space-y-2 border transition-all ${
                    m.status === "LIVE"
                      ? "border-2 border-[#1D4A38] bg-[#E8EFEA] shadow-xs"
                      : m.status === "ISSUE_MODIFIED"
                      ? "border-amber-300 bg-[#FEF3C7]/40"
                      : "border-[#E2E6DD] bg-[#F9FAF6]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span className="font-mono">{m.time} · {m.court}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedMatchForIssue(m)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] hover:text-[#92400E] underline cursor-pointer"
                    >
                      <Edit3 className="w-2.5 h-2.5" /> Resolve Issue
                    </button>
                  </div>

                  {/* Team 1 */}
                  <div className="p-2 rounded-xl bg-white border border-[#E2E6DD] flex items-center justify-between text-xs font-bold text-[#1E293B]">
                    <span className="truncate mr-2">
                      {m.team1.seed && <span className="text-[#1D4A38] font-mono mr-1">#{m.team1.seed}</span>}
                      {m.team1.name}
                    </span>
                    <span className="font-mono text-[#1D4A38] font-black">{m.team1.score ?? "—"}</span>
                  </div>

                  {/* Team 2 */}
                  <div className="p-2 rounded-xl bg-white border border-[#E2E6DD] flex items-center justify-between text-xs font-bold text-[#1E293B]">
                    <span className="truncate mr-2">
                      {m.team2.seed && <span className="text-[#1D4A38] font-mono mr-1">#{m.team2.seed}</span>}
                      {m.team2.name}
                    </span>
                    <span className="font-mono text-[#1D4A38] font-black">{m.team2.score ?? "—"}</span>
                  </div>

                  {/* Playo Peer Review Button for Completed Match */}
                  {m.status === "COMPLETED" && (
                    <button
                      type="button"
                      onClick={() => setSelectedMatchForRating(m)}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-[#E8EFEA] hover:bg-[#D5E4D9] text-[#1D4A38] text-[11px] font-black border border-[#CAD7CE] transition-all cursor-pointer shadow-2xs mt-1"
                    >
                      <Award className="w-3.5 h-3.5 text-[#1D4A38]" />
                      <span>Rate Match (Playo Flow)</span>
                    </button>
                  )}

                  {/* Audit Warning if Modified */}
                  {m.issueAuditReason && (
                    <div className="p-1.5 rounded-lg bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A] text-[10px] font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-[#B45309] shrink-0" />
                      <span className="truncate">Adjusted: {m.issueAuditReason}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Column 2: Semi Finals */}
            <div className="space-y-4 pt-10">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1D4A38] block pb-1 border-b border-[#E2E6DD]">
                SEMI-FINALS (SF)
              </span>

              {matches.slice(4, 6).map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl p-4 space-y-2 border border-[#E2E6DD] bg-[#F9FAF6] mt-6"
                >
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span className="font-mono">{m.time} · {m.court}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedMatchForIssue(m)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-[#B45309] hover:text-[#92400E] underline cursor-pointer"
                    >
                      <Edit3 className="w-2.5 h-2.5" /> Resolve Issue
                    </button>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-[#E2E6DD] flex items-center justify-between text-xs font-bold text-[#1E293B]">
                    <span className="truncate mr-2">{m.team1.name}</span>
                    <span className="font-mono text-[#94A3B8]">—</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-[#E2E6DD] flex items-center justify-between text-xs font-bold text-[#1E293B]">
                    <span className="truncate mr-2">{m.team2.name}</span>
                    <span className="font-mono text-[#94A3B8]">—</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 3: Championship Final */}
            <div className="space-y-4 pt-24">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#B45309] block pb-1 border-b border-[#E2E6DD]">
                🏆 CHAMPIONSHIP FINAL
              </span>

              <div className="rounded-2xl p-4.5 space-y-3 border-2 border-[#CAD7CE] bg-gradient-to-b from-[#E8EFEA] to-white shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#1D4A38] flex items-center gap-1.5 uppercase">
                    Gold Medal Match
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedMatchForIssue(matches[6])}
                    className="text-[10px] font-bold text-[#B45309] hover:text-[#92400E] underline cursor-pointer"
                  >
                    Adjust
                  </button>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#CAD7CE] flex items-center justify-between text-xs font-black text-[#1E293B]">
                  <span>{matches[6]?.team1.name}</span>
                  <span className="text-[#B45309] font-mono">TBD</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#CAD7CE] flex items-center justify-between text-xs font-black text-[#1E293B]">
                  <span>{matches[6]?.team2.name}</span>
                  <span className="text-[#B45309] font-mono">TBD</span>
                </div>

                <div className="pt-1 text-[11px] font-semibold text-[#64748B] flex items-center justify-between">
                  <span>{matches[6]?.time} · Center Court</span>
                  <span className="text-[#1D4A38] font-bold">Best of 3 Sets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Fixture Issue Resolver Dialog */}
      <FixtureIssueModal
        match={selectedMatchForIssue}
        isOpen={Boolean(selectedMatchForIssue)}
        onClose={() => setSelectedMatchForIssue(null)}
        availableTeams={teams.map((t) => t.name)}
        onResolveIssue={handleResolveIssue}
      />

      {/* Playo Post-Match Rating Modal */}
      {selectedMatchForRating && (
        <PlayoPostMatchRatingModal
          isOpen={Boolean(selectedMatchForRating)}
          onClose={() => setSelectedMatchForRating(null)}
          matchId={selectedMatchForRating.id}
          matchTitle={`${selectedMatchForRating.round} · ${selectedMatchForRating.court}`}
          team1Players={
            selectedMatchForRating.team1.name.includes("/")
              ? selectedMatchForRating.team1.name.split("/").map((n, i) => ({ id: `t1-${i}`, name: n.trim() }))
              : selectedMatchForRating.team1.name.includes("&")
              ? selectedMatchForRating.team1.name.split("&").map((n, i) => ({ id: `t1-${i}`, name: n.trim() }))
              : [{ id: "t1-0", name: selectedMatchForRating.team1.name }]
          }
          team2Players={
            selectedMatchForRating.team2.name.includes("/")
              ? selectedMatchForRating.team2.name.split("/").map((n, i) => ({ id: `t2-${i}`, name: n.trim() }))
              : selectedMatchForRating.team2.name.includes("&")
              ? selectedMatchForRating.team2.name.split("&").map((n, i) => ({ id: `t2-${i}`, name: n.trim() }))
              : [{ id: "t2-0", name: selectedMatchForRating.team2.name }]
          }
          finalScore="21–18, 21–14"
          onSaveReviews={(reviews) => {
            showToast(
              `Playo peer ratings submitted for ${reviews.length} players! Skill tiers calibrated.`,
              "success"
            );
          }}
        />
      )}
    </div>
  );
}
