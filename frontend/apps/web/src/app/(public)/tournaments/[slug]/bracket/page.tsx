import React from "react";
import Link from "next/link";
import { MOCK_TOURNAMENTS, MOCK_BRACKET_MATCHES } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { formatScoreSets } from "@/utils/formatters";
import { ArrowLeft, Radio, Trophy } from "lucide-react";

export default async function PublicBracketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tournament = MOCK_TOURNAMENTS.find((item) => item.slug === slug) || MOCK_TOURNAMENTS[0];
  const matches = MOCK_BRACKET_MATCHES;

  const quarters = matches.filter((m) => m.roundName === "Quarter-Finals");
  const semis = matches.filter((m) => m.roundName === "Semi-Finals");
  const finals = matches.filter((m) => m.roundName === "Finals");

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link href={`/tournaments/${slug}`} className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Tournament
          </Link>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            {tournament?.title} - Live Bracket
            <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-full">
              <Radio className="w-3 h-3 animate-pulse" /> LIVE
            </span>
          </h1>
        </div>

        <Link href={`/live/${tournament?.id || "tour-1"}`}>
          <Button variant="secondary" size="sm">
            Big Screen Court Board
          </Button>
        </Link>
      </div>

      {/* Bracket Tree Layout */}
      <div className="overflow-x-auto pb-8">
        <div className="flex gap-8 min-w-[750px]">
          {/* Quarter Finals */}
          <div className="flex-1 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 text-center py-2 bg-gray-900 rounded-lg border border-gray-800">
              Quarter-Finals
            </h3>
            {quarters.map((m) => (
              <div key={m.id} className="rounded-xl border border-gray-800 bg-gray-900/80 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Court {m.courtNumber}</span>
                  <span className="text-emerald-400 font-semibold">{m.status}</span>
                </div>
                <div className="space-y-1">
                  <div className={`flex justify-between items-center text-sm ${m.winnerTeam === 1 ? "font-bold text-emerald-400" : "text-gray-300"}`}>
                    <span className="truncate">{m.team1Name}</span>
                    <span className="font-mono text-xs">{formatScoreSets(m.scores).split(",")[0] || "0"}</span>
                  </div>
                  <div className={`flex justify-between items-center text-sm ${m.winnerTeam === 2 ? "font-bold text-emerald-400" : "text-gray-300"}`}>
                    <span className="truncate">{m.team2Name}</span>
                    <span className="font-mono text-xs">{formatScoreSets(m.scores).split(",")[1] || "0"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Semi Finals */}
          <div className="flex-1 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 text-center py-2 bg-emerald-950/40 rounded-lg border border-emerald-500/30">
              Semi-Finals
            </h3>
            {semis.map((m) => (
              <div key={m.id} className="rounded-xl border border-emerald-500/40 bg-gray-900/90 p-4 space-y-3 shadow-lg shadow-emerald-950/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Court {m.courtNumber}</span>
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" /> LIVE NOW
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span className="truncate">{m.team1Name}</span>
                    <span className="font-mono text-emerald-400 text-sm">
                      {m.scores.map((s) => s.team1Score).join(" | ")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-white">
                    <span className="truncate">{m.team2Name}</span>
                    <span className="font-mono text-emerald-400 text-sm">
                      {m.scores.map((s) => s.team2Score).join(" | ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Finals */}
          <div className="flex-1 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-hotpink text-center py-2 bg-hotpink/40 rounded-lg border border-hotpink/30 flex items-center justify-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-hotpink" /> Grand Finals
            </h3>
            {finals.map((m) => (
              <div key={m.id} className="rounded-xl border border-hotpink/30 bg-gray-900/80 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-hotpink font-semibold">
                  <span>Centre Court</span>
                  <span>{m.scheduledTime}</span>
                </div>
                <div className="space-y-2 text-center py-3 text-sm text-gray-400 italic">
                  Awaiting Winners of Semi-Finals
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
