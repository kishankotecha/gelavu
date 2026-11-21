import React from "react";
import { MOCK_BRACKET_MATCHES } from "@/data/mock-data";
import { Radio } from "lucide-react";
import Link from "next/link";

export default async function BigScreenLiveBoardPage({
  params,
}: {
  params: Promise<{ tournamentId: string }>;
}) {
  const { tournamentId } = await params;
  const matches = MOCK_BRACKET_MATCHES;

  return (
    <div className="min-h-screen bg-[#05070D] text-white p-4 sm:p-8 flex flex-col">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-red-600 rounded-xl animate-pulse">
            <Radio className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
              GELAVU LIVE ARENA BROADCAST
            </span>
            <h1 className="text-2xl sm:text-4xl font-black">
              Tournament Live Court Board ({tournamentId})
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-gray-400">
            AUTO-SYNC ⚡
          </span>
          <Link href="/tournaments" className="text-xs text-gray-400 hover:text-white">
            Exit Fullscreen
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 flex-1">
        {matches.slice(0, 3).map((m, idx) => (
          <div
            key={m.id}
            className="rounded-3xl border-2 border-emerald-500/40 bg-gray-900/90 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <span className="text-lg font-black text-amber-400 uppercase tracking-wider">
                COURT {m.courtNumber || idx + 1}
              </span>
              <span className="text-xs font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full animate-pulse">
                {m.status}
              </span>
            </div>

            <div className="my-6 space-y-4">
              <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-gray-800">
                <span className="text-xl font-bold truncate max-w-[200px]">{m.team1Name}</span>
                <span className="text-4xl font-mono font-black text-emerald-400">
                  {m.scores[0]?.team1Score ?? 21}
                </span>
              </div>
              <div className="flex items-center justify-between bg-black/40 p-4 rounded-2xl border border-gray-800">
                <span className="text-xl font-bold truncate max-w-[200px]">{m.team2Name}</span>
                <span className="text-4xl font-mono font-black text-emerald-400">
                  {m.scores[0]?.team2Score ?? 19}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-between text-xs text-gray-400">
              <span>{m.category.replace(/_/g, " ")}</span>
              <span>{m.roundName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
