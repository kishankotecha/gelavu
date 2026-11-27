"use client";

import React, { useState, useRef, useEffect, use } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Lock,
  Dices,
  ArrowLeft,
  Edit3,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Trophy,
  CheckCircle2,
  Users,
  Sliders,
} from "lucide-react";
import {
  RealisticTrophy,
  RealisticShuttlecock,
  RealisticGoldMedal,
  RealisticVerifiedShield,
} from "@/components/common/RealisticSportsIcons";
import { useToast } from "@/components/ui/toast";
import { PickerWheelDraw } from "@/features/host/PickerWheelDraw";
import { FixtureIssueModal, type FixtureMatch } from "@/features/host/FixtureIssueModal";
import { PlayoPostMatchRatingModal } from "@/features/scoring";
import {
  getTournament,
  getTournamentEntries,
  getTournamentFixtures,
  saveTournamentFixtures,
  generateBracketFromEntries,
  generateBracketFromCustomTeams,
} from "@/lib/tournamentStore";
import { useAuth } from "@/hooks/useAuth";
import { appendMatchPeerReviews } from "@/lib/playoRatingStore";
import { DashboardTitle, DashboardLead } from "@/components/layout/DashboardTypography";

export default function HostFixturesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: tournamentId } = use(params);
  const { showToast } = useToast();
  const { user } = useAuth();

  const tournament = getTournament(tournamentId);

  // Load entries for this tournament
  const [entries, setEntries] = useState(() => getTournamentEntries(tournamentId));
  const confirmedEntries = entries.filter((e) => e.status === "CONFIRMED");

  const [selectedCategory, setSelectedCategory] = useState("Men's Doubles (BYOP)");
  const [drawStrategy, setDrawStrategy] = useState<"standard" | "wheel">("standard");
  const [isLocked, setIsLocked] = useState(false);
  const [selectedMatchForIssue, setSelectedMatchForIssue] = useState<FixtureMatch | null>(null);
  const [selectedMatchForRating, setSelectedMatchForRating] = useState<FixtureMatch | null>(null);

  // Tournament Bracket Matches State, scoped by tournamentId & category
  const [matches, setMatches] = useState<FixtureMatch[]>(() => {
    const existing = getTournamentFixtures(tournamentId, "Men's Doubles (BYOP)");
    if (existing && existing.length > 0) return existing;
    return generateBracketFromEntries(tournamentId, entries, "Men's Doubles (BYOP)");
  });

  // Listen for Excel imports / manual player additions in /entries
  useEffect(() => {
    const handleEntriesSync = (event: Event) => {
      const customEvent = event as CustomEvent<{ tournamentId: string; count: number }>;
      if (!customEvent.detail || customEvent.detail.tournamentId === tournamentId) {
        const freshEntries = getTournamentEntries(tournamentId);
        setEntries(freshEntries);
        if (!isLocked) {
          const freshMatches = generateBracketFromEntries(tournamentId, freshEntries, selectedCategory);
          setMatches(freshMatches);
          saveTournamentFixtures(tournamentId, freshMatches, selectedCategory);
        }
        showToast(`Sync: Fixtures linked with ${customEvent.detail?.count ?? freshEntries.length} tournament entries!`, "success");
      }
    };

    window.addEventListener("gelavu_entries_updated", handleEntriesSync);
    return () => window.removeEventListener("gelavu_entries_updated", handleEntriesSync);
  }, [tournamentId, selectedCategory, isLocked, showToast]);

  // Dynamic Category Switcher: loads stored bracket or generates fresh one for that category
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const updatedEntries = getTournamentEntries(tournamentId);
    setEntries(updatedEntries);
    const existing = getTournamentFixtures(tournamentId, category);
    if (existing && existing.length > 0) {
      setMatches(existing);
      const finalMatch = existing[6];
      if (finalMatch?.status === "COMPLETED") {
        const t1Score = finalMatch.team1.score ?? 0;
        const t2Score = finalMatch.team2.score ?? 0;
        setChampionTeam(t1Score > t2Score ? finalMatch.team1.name : t2Score > t1Score ? finalMatch.team2.name : null);
      } else {
        setChampionTeam(null);
      }
    } else {
      const generated = generateBracketFromEntries(tournamentId, updatedEntries, category);
      setMatches(generated);
      saveTournamentFixtures(tournamentId, generated, category);
      setChampionTeam(null);
    }
    showToast(`Loaded ${category} fixtures bracket!`, "info");
  };

  // Wheel Pairs -> Championship Bracket Direct Applier
  const handleApplyWheelPairsToBracket = (pairs: Array<{ name: string; players: string }>) => {
    const customTeams = pairs.map((p, idx) => ({
      name: p.name,
      seed: idx + 1,
    }));
    const wheelBracket = generateBracketFromCustomTeams(tournamentId, customTeams, selectedCategory);
    setMatches(wheelBracket);
    saveTournamentFixtures(tournamentId, wheelBracket, selectedCategory);
    setChampionTeam(null);
    setDrawStrategy("standard");
    showToast(`🎯 Applied ${pairs.length} Wheel Pairs directly into Championship Bracket!`, "success");
  };

  // Randomized Seeds -> Championship Bracket Direct Applier
  const handleBracketRandomizedTeams = (shuffledTeams: Array<{ id: string; name: string; seed?: number }>) => {
    const randomizedBracket = generateBracketFromCustomTeams(tournamentId, shuffledTeams, selectedCategory);
    setMatches(randomizedBracket);
    saveTournamentFixtures(tournamentId, randomizedBracket, selectedCategory);
    setChampionTeam(null);
    setDrawStrategy("standard");
    showToast(`🎲 Bracket seeds randomized via Verifiable Cryptographic Hash!`, "success");
  };

  // Champion Winner state
  const [championTeam, setChampionTeam] = useState<string | null>(() => {
    const finalMatch = matches.find((m) => m.round.includes("FINAL") && !m.round.includes("SEMI") && !m.round.includes("QUARTER"));
    if (finalMatch?.status === "COMPLETED") {
      const t1Score = finalMatch.team1.score ?? 0;
      const t2Score = finalMatch.team2.score ?? 0;
      if (t1Score > t2Score) return finalMatch.team1.name;
      if (t2Score > t1Score) return finalMatch.team2.name;
    }
    return null;
  });

  // Bracket scroll viewport and drag-to-pan state
  const bracketScrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragScrollLeft, setDragScrollLeft] = useState(0);

  // Update scroll percentage when bracket is scrolled
  const handleScroll = () => {
    if (!bracketScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = bracketScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    const percent = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
    setScrollProgress(percent);
  };

  // Drag-to-pan mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!bracketScrollRef.current) return;
    setIsDragging(true);
    setDragStartX(e.pageX - bracketScrollRef.current.offsetLeft);
    setDragScrollLeft(bracketScrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !bracketScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - bracketScrollRef.current.offsetLeft;
    const walk = (x - dragStartX) * 1.5; // Smooth multiplier
    bracketScrollRef.current.scrollLeft = dragScrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

  // Smooth scroll to round column
  const scrollToRound = (columnPercent: number) => {
    if (!bracketScrollRef.current) return;
    const { scrollWidth, clientWidth } = bracketScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    bracketScrollRef.current.scrollTo({
      left: (columnPercent / 100) * maxScroll,
      behavior: "smooth",
    });
  };

  // Sync scroll from horizontal slider scrubber
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setScrollProgress(val);
    if (!bracketScrollRef.current) return;
    const { scrollWidth, clientWidth } = bracketScrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    bracketScrollRef.current.scrollLeft = (val / 100) * maxScroll;
  };

  // Re-generate bracket dynamically from current tournament entries
  const handleRegenerateFromEntries = () => {
    const updatedEntries = getTournamentEntries(tournamentId);
    setEntries(updatedEntries);
    const newMatches = generateBracketFromEntries(tournamentId, updatedEntries, selectedCategory);
    setMatches(newMatches);
    saveTournamentFixtures(tournamentId, newMatches, selectedCategory);
    setChampionTeam(null);
    showToast(`Generated fresh tournament bracket for ${selectedCategory} from ${updatedEntries.length} registered entrants!`, "success");
  };

  const handleLockPublish = () => {
    setIsLocked(!isLocked);
    showToast(
      !isLocked ? "Draw locked & published to live public bracket!" : "Bracket unlocked for host edits",
      "success"
    );
  };

  // Kid-simple 1-Click Winner Advance
  const handlePickWinner = (matchIndex: number, winnerTeamIndex: 1 | 2) => {
    if (isLocked) {
      showToast("Bracket is locked. Unlock it at the top to modify winners.", "info");
      return;
    }

    setMatches((prev) => {
      const next = [...prev];
      const match = { ...next[matchIndex] };
      const winnerName = winnerTeamIndex === 1 ? match.team1.name : match.team2.name;
      const winnerSeed = winnerTeamIndex === 1 ? match.team1.seed : match.team2.seed;

      match.status = "COMPLETED";
      match.team1 = { ...match.team1, score: winnerTeamIndex === 1 ? 21 : 17 };
      match.team2 = { ...match.team2, score: winnerTeamIndex === 2 ? 21 : 17 };
      next[matchIndex] = match;

      // Quarter-Finals -> Semi-Finals progression
      if (matchIndex === 0 && next[4]) {
        next[4] = { ...next[4], team1: { name: winnerName, seed: winnerSeed } };
      } else if (matchIndex === 1 && next[4]) {
        next[4] = { ...next[4], team2: { name: winnerName, seed: winnerSeed } };
      } else if (matchIndex === 2 && next[5]) {
        next[5] = { ...next[5], team1: { name: winnerName, seed: winnerSeed } };
      } else if (matchIndex === 3 && next[5]) {
        next[5] = { ...next[5], team2: { name: winnerName, seed: winnerSeed } };
      }
      // Semi-Finals -> Championship Final progression
      else if (matchIndex === 4 && next[6]) {
        next[6] = { ...next[6], team1: { name: winnerName, seed: winnerSeed } };
      } else if (matchIndex === 5 && next[6]) {
        next[6] = { ...next[6], team2: { name: winnerName, seed: winnerSeed } };
      }
      // Championship Final -> Crown Champion
      else if (matchIndex === 6) {
        setChampionTeam(winnerName);
        showToast(`🏆 ${winnerName} is crowned TOURNAMENT CHAMPION!`, "success");
      }

      saveTournamentFixtures(tournamentId, next, selectedCategory);
      return next;
    });

    showToast(`Advanced match winner to next round!`, "success");
  };

  // Host Issue Resolver Handler
  const handleResolveIssue = (
    matchId: string,
    updated: { team1: string; team2: string; court: string; time: string; issueReason: string }
  ) => {
    setMatches((prev) => {
      const next = prev.map((m) => {
        if (m.id === matchId) {
          return {
            ...m,
            team1: { ...m.team1, name: updated.team1 },
            team2: { ...m.team2, name: updated.team2 },
            court: updated.court,
            time: updated.time,
            status: "ISSUE_MODIFIED" as const,
            issueAuditReason: updated.issueReason,
          };
        }
        return m;
      });
      saveTournamentFixtures(tournamentId, next, selectedCategory);
      return next;
    });
    showToast(`Fixture #${matchId} updated with audit note: ${updated.issueReason}`, "success");
  };

  // Filter confirmed entries for active category
  const activeCategoryEntries = confirmedEntries.filter(
    (e) => e.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  const wheelPool = activeCategoryEntries.length >= 2 ? activeCategoryEntries : confirmedEntries;

  // Solo players queue for Picker Wheel
  const soloPlayers = wheelPool.map((e) => ({
    name: e.name,
    skillLevel: e.skillLevel || "Intermediate",
    style: "Tactical Competitor",
  }));

  const teams = wheelPool.map((e, idx) => ({
    id: `t-${idx + 1}`,
    name: e.partnerName ? `${e.name} / ${e.partnerName}` : e.name,
    seed: idx + 1,
  }));

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-[1720px] space-y-7 text-[#1E293B]">
      
      {/* ============================================================ */}
      {/* 1. Top Breadcrumb & Tournament Connection Banner             */}
      {/* ============================================================ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-7 rounded-3xl border border-[#E2E6DD] bg-white shadow-xs">
        <div className="flex items-start gap-4">
          <RealisticVerifiedShield size={42} className="mt-1" />
          <div className="space-y-1">
            <Link
              href={`/host/tournaments/${tournamentId}/entries`}
              className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#14212D] transition-colors font-bold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#14212D]" />
              <span>← Back to Entrants ({confirmedEntries.length} Players in #{tournamentId})</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2.5">
              <DashboardTitle className="truncate max-w-full">
                {tournament.title}
              </DashboardTitle>
              <span className="rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sanctioned #{tournamentId}
              </span>
            </div>

            <DashboardLead className="text-xs sm:text-sm flex items-center gap-2 pt-1 !mt-0">
              <Users className="w-3.5 h-3.5 text-[#14212D]" />
              <span>
                <strong className="text-[#1E293B] font-extrabold">
                  {activeCategoryEntries.length > 0 ? activeCategoryEntries.length : confirmedEntries.length}
                </strong>{" "}
                Confirmed Entrants in &ldquo;{selectedCategory}&rdquo; ·{" "}
                <strong className="text-[#1E293B] font-extrabold">{confirmedEntries.length}</strong> Total Registered
              </span>
            </DashboardLead>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleRegenerateFromEntries}
            disabled={isLocked}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#FF685B] hover:bg-[#C98B28] text-[#14212D] px-5 py-3 text-xs font-black transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            title="Re-populate bracket seeds using latest Excel / manual player entries"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-Generate Bracket ({activeCategoryEntries.length > 0 ? activeCategoryEntries.length : confirmedEntries.length} Entrants)</span>
          </button>

          <button
            type="button"
            onClick={handleLockPublish}
            className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-black transition-all shadow-xs cursor-pointer ${
              isLocked
                ? "bg-[#E8EFEA] border border-[#CAD7CE] text-[#14212D] hover:bg-[#DCE7E0]"
                : "bg-navy hover:brightness-105 text-white shadow-md shadow-emerald-950/15"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isLocked ? "Bracket Published (Click to Unlock)" : "Lock & Publish to Players"}</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Format & Strategy Switcher Bar                            */}
      {/* ============================================================ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {["Men's Doubles (BYOP)", "Mixed Doubles", "Random Wheel Doubles", "Men's Singles"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#14212D] text-white shadow-2xs"
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
            onClick={() => setDrawStrategy("standard")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
              drawStrategy === "standard"
                ? "bg-[#14212D] text-white shadow-xs"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Standard Bracket Tree</span>
          </button>
          <button
            type="button"
            onClick={() => setDrawStrategy("wheel")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-black transition-all cursor-pointer ${
              drawStrategy === "wheel"
                ? "bg-[#FF685B] text-[#14212D] shadow-xs"
                : "text-[#64748B] hover:text-[#1E293B]"
            }`}
          >
            <Dices className="w-3.5 h-3.5" />
            <span>Picker Wheel Live Draw</span>
          </button>
        </div>
      </div>

      {/* Option: Interactive Picker Wheel */}
      {drawStrategy === "wheel" && (
        <PickerWheelDraw
          key={`${tournamentId}-${selectedCategory}`}
          categoryName={selectedCategory}
          tournamentId={tournamentId}
          soloPlayers={soloPlayers}
          teams={teams}
          onPairCreated={(team) => {
            showToast(`Random Doubles Pair created: ${team.name}`, "success");
          }}
          onBracketRandomized={(hash) => {
            showToast(`Anti-fixing bracket draw randomized with hash ${hash}`, "success");
          }}
          onApplyPairsToBracket={handleApplyWheelPairsToBracket}
          onBracketRandomizedTeams={handleBracketRandomizedTeams}
        />
      )}

      {/* ============================================================ */}
      {/* 3. ULTRA-SMOOTH BRACKET VIEWER WITH SIDE BOTTOM SCROLLER     */}
      {/* ============================================================ */}
      <div className="space-y-4">
        
        {/* Header & Quick Round Jump Chips */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#FF685B]" />
              <span>Championship Knockout Tree</span>
            </h3>
            <span className="rounded-full bg-[#E8EFEA] border border-[#CAD7CE] px-2.5 py-0.5 text-[11px] font-black text-[#14212D]">
              {selectedCategory}
            </span>
            <span className="text-xs font-semibold text-[#64748B]">
              (Click &quot;Advance Winner&quot; to progress teams)
            </span>
          </div>

          {/* Quick Round Navigation Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
            <button
              type="button"
              onClick={() => scrollToRound(0)}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#CAD7CE] hover:bg-[#E8EFEA] text-[#14212D] transition-colors cursor-pointer"
            >
              1. Quarter-Finals (4)
            </button>
            <button
              type="button"
              onClick={() => scrollToRound(50)}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#CAD7CE] hover:bg-[#E8EFEA] text-[#14212D] transition-colors cursor-pointer"
            >
              2. Semi-Finals (2)
            </button>
            <button
              type="button"
              onClick={() => scrollToRound(100)}
              className="px-3 py-1.5 rounded-lg bg-hotpink/10 border border-hotpink/30 hover:bg-hotpink/15 text-navy transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>3. Grand Final 🏆</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Integrated Bracket Container with Attached Bottom Scroller    */}
        {/* ============================================================ */}
        <div className="rounded-3xl border-2 border-[#14212D]/20 bg-white shadow-sm overflow-hidden">
          
          {/* Scrollable Bracket Rounds Canvas */}
          <div
            ref={bracketScrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`p-6 sm:p-8 bg-[#FAF9F5] overflow-x-auto select-none transition-colors ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ scrollbarWidth: "thin" }}
          >
          <div className="flex items-center min-w-[1280px] py-3 select-none">
            
            {/* -------------------------------------------------------- */}
            {/* COLUMN 1: QUARTER-FINALS (4 Matches)                     */}
            {/* -------------------------------------------------------- */}
            <div className="w-[280px] shrink-0 space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-emerald-600">
                <span className="text-xs font-black uppercase tracking-wider text-[#14212D] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Quarter-Finals (QF)
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  4 Matches
                </span>
              </div>

              {matches.slice(0, 4).map((m, idx) => {
                const isT1Winner = m.status === "COMPLETED" && (m.team1.score ?? 0) > (m.team2.score ?? 0);
                const isT2Winner = m.status === "COMPLETED" && (m.team2.score ?? 0) > (m.team1.score ?? 0);

                return (
                  <div
                    key={m.id}
                    className="rounded-2xl p-3.5 space-y-2 border-2 border-slate-200/90 bg-white shadow-xs transition-all hover:shadow-md hover:border-emerald-500/50"
                  >
                    <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                      <span className="font-mono font-bold text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-slate-600">
                        {m.court} · {m.time}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedMatchForIssue(m)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FF685B] hover:underline cursor-pointer"
                      >
                        <Edit3 className="w-2.5 h-2.5" /> Adjust
                      </button>
                    </div>

                    {/* Team 1 */}
                    <div
                      onClick={() => handlePickWinner(idx, 1)}
                      className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isT1Winner
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-2xs"
                          : isT2Winner
                          ? "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60"
                          : "bg-white border-slate-200 hover:border-emerald-300 text-slate-800 font-bold hover:bg-emerald-50/20"
                      }`}
                      title="Click to advance as Winner"
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <span className="w-5 h-5 rounded-md bg-navy text-white font-mono text-[9px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                          {m.team1.seed ? `#${m.team1.seed}` : "1"}
                        </span>
                        <span className="truncate">{m.team1.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">
                          {m.team1.score ?? "—"}
                        </span>
                        {isT1Winner ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <span className="text-[10px] text-slate-400 hover:text-emerald-700 font-bold">Pick Winner</span>
                        )}
                      </div>
                    </div>

                    {/* Team 2 */}
                    <div
                      onClick={() => handlePickWinner(idx, 2)}
                      className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isT2Winner
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-2xs"
                          : isT1Winner
                          ? "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60"
                          : "bg-white border-slate-200 hover:border-emerald-300 text-slate-800 font-bold hover:bg-emerald-50/20"
                      }`}
                      title="Click to advance as Winner"
                    >
                      <div className="flex items-center gap-2 truncate mr-2">
                        <span className="w-5 h-5 rounded-md bg-navy text-white font-mono text-[9px] font-black flex items-center justify-center shrink-0 shadow-2xs">
                          {m.team2.seed ? `#${m.team2.seed}` : "2"}
                        </span>
                        <span className="truncate">{m.team2.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">
                          {m.team2.score ?? "—"}
                        </span>
                        {isT2Winner ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <span className="text-[10px] text-slate-400 hover:text-emerald-700 font-bold">Pick Winner</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* -------------------------------------------------------- */}
            {/* CONNECTOR 1: QF -> SF (SVG Stepped Branching Lines)      */}
            {/* -------------------------------------------------------- */}
            <div className="w-10 shrink-0 h-[620px] relative pointer-events-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* QF1 & QF2 to SF1 */}
                <path
                  d="M 0 102 H 20 V 254 H 0 M 20 178 H 40"
                  fill="none"
                  stroke={matches[4]?.status === "COMPLETED" ? "#059669" : "#CBD5E1"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* QF3 & QF4 to SF2 */}
                <path
                  d="M 0 406 H 20 V 558 H 0 M 20 482 H 40"
                  fill="none"
                  stroke={matches[5]?.status === "COMPLETED" ? "#059669" : "#CBD5E1"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* -------------------------------------------------------- */}
            {/* COLUMN 2: SEMI-FINALS (2 Matches)                        */}
            {/* -------------------------------------------------------- */}
            <div className="w-[280px] shrink-0 h-[620px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-hotpink/30">
                <span className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-hotpink animate-pulse" />
                  Semi-Finals (SF)
                </span>
                <span className="text-[10px] font-mono font-bold text-navy bg-hotpink/15 px-2 py-0.5 rounded-full border border-hotpink/30">
                  2 Matches
                </span>
              </div>

              {/* Matches vertically centered with QF branches */}
              <div className="my-auto space-y-36">
                {matches.slice(4, 6).map((m, idx) => {
                  const matchIdx = idx + 4;
                  const isT1Winner = m.status === "COMPLETED" && (m.team1.score ?? 0) > (m.team2.score ?? 0);
                  const isT2Winner = m.status === "COMPLETED" && (m.team2.score ?? 0) > (m.team1.score ?? 0);

                  return (
                    <div
                      key={m.id}
                      className="rounded-2xl p-3.5 space-y-2 border-2 border-hotpink/30 bg-white shadow-xs transition-all hover:shadow-md hover:border-hotpink/30"
                    >
                      <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                        <span className="font-mono font-bold text-[10px] bg-hotpink/10 border border-hotpink/30 px-2 py-0.5 rounded-md text-navy">
                          {m.court} · {m.time}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedMatchForIssue(m)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-[#FF685B] hover:underline cursor-pointer"
                        >
                          <Edit3 className="w-2.5 h-2.5" /> Adjust
                        </button>
                      </div>

                      {/* Team 1 */}
                      <div
                        onClick={() => handlePickWinner(matchIdx, 1)}
                        className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-xs cursor-pointer ${
                          isT1Winner
                            ? "bg-hotpink/15 border-hotpink/30 text-navy font-black shadow-2xs"
                            : isT2Winner
                            ? "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60"
                            : "bg-white border-slate-200 hover:border-hotpink/30 text-slate-800 font-bold hover:bg-hotpink/10/30"
                        }`}
                      >
                        <span className="truncate mr-2">{m.team1.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">
                            {m.team1.score ?? "—"}
                          </span>
                          {isT1Winner ? (
                            <CheckCircle2 className="w-4 h-4 text-hotpink" />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold hover:text-navy">Advance</span>
                          )}
                        </div>
                      </div>

                      {/* Team 2 */}
                      <div
                        onClick={() => handlePickWinner(matchIdx, 2)}
                        className={`p-2 rounded-xl border-2 transition-all flex items-center justify-between text-xs cursor-pointer ${
                          isT2Winner
                            ? "bg-hotpink/15 border-hotpink/30 text-navy font-black shadow-2xs"
                            : isT1Winner
                            ? "bg-slate-50/50 border-slate-100 text-slate-400 opacity-60"
                            : "bg-white border-slate-200 hover:border-hotpink/30 text-slate-800 font-bold hover:bg-hotpink/10/30"
                        }`}
                      >
                        <span className="truncate mr-2">{m.team2.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800">
                            {m.team2.score ?? "—"}
                          </span>
                          {isT2Winner ? (
                            <CheckCircle2 className="w-4 h-4 text-hotpink" />
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold hover:text-navy">Advance</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* CONNECTOR 2: SF -> FINAL (SVG Stepped Branching Line)    */}
            {/* -------------------------------------------------------- */}
            <div className="w-10 shrink-0 h-[620px] relative pointer-events-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                {/* SF1 & SF2 to Grand Final */}
                <path
                  d="M 0 178 H 20 V 482 H 0 M 20 330 H 40"
                  fill="none"
                  stroke={matches[6]?.status === "COMPLETED" ? "#FF685B" : "#CBD5E1"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* -------------------------------------------------------- */}
            {/* COLUMN 3: CHAMPIONSHIP FINAL (1 Match)                   */}
            {/* -------------------------------------------------------- */}
            <div className="w-[310px] shrink-0 h-[620px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-[#FF685B]">
                <span className="text-xs font-black uppercase tracking-wider text-[#FF685B] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF685B] animate-pulse" />
                  Grand Championship Final
                </span>
                <span className="text-[10px] font-mono font-bold text-navy bg-hotpink/15 px-2 py-0.5 rounded-full border border-hotpink/30">
                  Gold Showdown
                </span>
              </div>

              {matches[6] && (
                <div className="my-auto rounded-3xl p-5 space-y-3.5 border-3 border-coral bg-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <RealisticShuttlecock size={24} />
                      <span className="text-xs font-black text-[#FF685B] uppercase">
                        Center Court Gold Match
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedMatchForIssue(matches[6])}
                      className="text-[10px] font-bold text-[#FF685B] hover:underline cursor-pointer"
                    >
                      Adjust
                    </button>
                  </div>

                  {/* Finalist 1 */}
                  <div
                    onClick={() => handlePickWinner(6, 1)}
                    className="p-3 rounded-2xl border-2 border-hotpink/30 hover:border-hotpink/30 bg-white flex items-center justify-between text-xs font-black text-[#1E293B] cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <span className="text-sm">🥇</span>
                      <span className="truncate">{matches[6].team1.name}</span>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1.5 rounded-xl bg-coral text-[#14212D] text-[10px] font-black uppercase hover:brightness-105 shadow-xs cursor-pointer shrink-0"
                    >
                      Crown Winner 👑
                    </button>
                  </div>

                  {/* Finalist 2 */}
                  <div
                    onClick={() => handlePickWinner(6, 2)}
                    className="p-3 rounded-2xl border-2 border-hotpink/30 hover:border-hotpink/30 bg-white flex items-center justify-between text-xs font-black text-[#1E293B] cursor-pointer shadow-xs transition-all hover:scale-[1.01]"
                  >
                    <div className="flex items-center gap-2 truncate mr-2">
                      <span className="text-sm">🥇</span>
                      <span className="truncate">{matches[6].team2.name}</span>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1.5 rounded-xl bg-coral text-[#14212D] text-[10px] font-black uppercase hover:brightness-105 shadow-xs cursor-pointer shrink-0"
                    >
                      Crown Winner 👑
                    </button>
                  </div>

                  <div className="pt-2 text-xs font-bold text-slate-600 flex items-center justify-between border-t border-hotpink/30">
                    <span>{matches[6].time} · Center Court</span>
                    <span className="text-emerald-700 font-black">Official BWF · Best of 3 Sets</span>
                  </div>
                </div>
              )}
            </div>

            {/* -------------------------------------------------------- */}
            {/* CONNECTOR 3: FINAL -> PODIUM                             */}
            {/* -------------------------------------------------------- */}
            <div className="w-8 shrink-0 h-[620px] relative pointer-events-none">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <line
                  x1="0"
                  y1="330"
                  x2="32"
                  y2="330"
                  stroke={championTeam ? "#FF685B" : "#CBD5E1"}
                  strokeWidth="3"
                  strokeDasharray={championTeam ? "none" : "4 4"}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* -------------------------------------------------------- */}
            {/* COLUMN 4: PODIUM & CHAMPION PRESENTATION                 */}
            {/* -------------------------------------------------------- */}
            <div className="w-[290px] shrink-0 h-[620px] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2.5 border-b-2 border-hotpink/30">
                <span className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-hotpink" />
                  Podium Celebration
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live Status
                </span>
              </div>

              <div className="my-auto rounded-3xl border-3 border-hotpink/30 bg-cream p-6 text-center space-y-4 shadow-xl shadow-hotpink/20 relative overflow-hidden">
                {/* Top Radiant Specular Ribbon */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-coral" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#FF685B]/15 blur-2xl pointer-events-none" />

                {/* 3D Realistic Trophy */}
                <div className="relative z-10 flex justify-center py-1">
                  <RealisticTrophy size={68} />
                </div>

                <div className="relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF685B] block">
                    OFFICIAL GELAVU CHAMPION
                  </span>
                  <h4 className="text-lg font-black text-[#14212D] mt-1 tracking-tight">
                    {championTeam || "Awaiting Final Result..."}
                  </h4>
                </div>

                {championTeam ? (
                  <div className="relative z-10 p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs font-extrabold text-emerald-950 flex items-center justify-center gap-2 shadow-2xs">
                    <RealisticGoldMedal size={24} />
                    <span>Gold Trophy &amp; Points Awarded!</span>
                  </div>
                ) : (
                  <p className="relative z-10 text-xs text-slate-500 font-medium leading-relaxed">
                    Click &quot;Crown Winner 👑&quot; in the final showdown to award the trophy &amp; update standings!
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* RASA-STYLE INTEGRATED BOTTOM BRACKET SCROLLER BAR            */}
        {/* ------------------------------------------------------------ */}
        <div className="bg-white border-t-2 border-[#14212D]/20 p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-100 text-[#14212D] shadow-2xs">
                <Sliders className="w-4 h-4 text-[#FF685B]" />
              </span>
              <div>
                <span className="text-xs font-black text-[#1E293B] block">
                  Championship Round Navigator
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Drag bracket sideways or scrub slider to navigate rounds 1-4 &amp; Grand Final
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => scrollToRound(0)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  scrollProgress < 25
                    ? "bg-[#14212D] text-white border-[#14212D] shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Quarter-Finals (4)</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToRound(50)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  scrollProgress >= 25 && scrollProgress < 75
                    ? "bg-[#14212D] text-white border-[#14212D] shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span>Semi-Finals (2)</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToRound(100)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                  scrollProgress >= 75
                    ? "bg-[#FF685B] text-[#14212D] border-[#FF685B] shadow-xs"
                    : "bg-hotpink/10 border-hotpink/30 text-navy hover:bg-hotpink/15"
                }`}
              >
                <span>Final &amp; Podium 🏆</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Draggable Scrubber Range Track */}
          <div className="space-y-1.5">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={scrollProgress}
              onChange={handleSliderChange}
              className="w-full h-3 rounded-lg bg-slate-200 accent-[#14212D] cursor-pointer"
              aria-label="Horizontal Bracket Scroller"
            />
            <div className="flex justify-between text-[10px] font-bold text-slate-500 font-mono">
              <span className={scrollProgress < 25 ? "text-emerald-800 font-black" : "text-slate-500"}>
                Quarter-Finals (Round 1)
              </span>
              <span className={scrollProgress >= 25 && scrollProgress < 75 ? "text-emerald-800 font-black" : "text-slate-500"}>
                Semi-Finals (Round 2)
              </span>
              <span className={scrollProgress >= 75 ? "text-[#FF685B] font-black" : "text-slate-500"}>
                Championship Final &amp; Podium 🏆
              </span>
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
            const raterId = user?.id ?? "host-rater";
            const matchAt = new Date().toISOString();
            reviews.forEach((review) => {
              appendMatchPeerReviews({
                targetUserId: review.playerId,
                sportId: "badminton",
                matchId: selectedMatchForRating.id,
                matchAt,
                reviews: [{ raterId, tier: review.skillTier }],
              });
            });
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
