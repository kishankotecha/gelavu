import React from "react";
import Link from "next/link";
import { Avatar } from "@/components/common/Avatar";
import { StatTile } from "@/components/common/StatTile";
import { Trophy, Award, MapPin, ArrowLeft, Activity } from "lucide-react";

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const player = {
    id,
    name: "Rohan Kumar",
    city: "Bengaluru",
    points: 3420,
    tournamentsPlayed: 14,
    titlesWon: 5,
    winRate: "82%",
    bio: "Right-handed attacking singles & doubles player. State circuit ranked #1.",
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      <Link href="/leaderboard" className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Leaderboard
      </Link>

      {/* Profile Card */}
      <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-6 sm:p-8 backdrop-blur-sm mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar name={player.name} size="xl" />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white">{player.name}</h1>
            <p className="text-xs text-gray-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {player.city}, India
            </p>
            <p className="text-sm text-gray-300 mt-3 max-w-xl">{player.bio}</p>
          </div>
          <div className="text-center sm:text-right bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Circuit Points</span>
            <p className="text-3xl font-black text-white font-mono">{player.points}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-800">
          <StatTile label="Tournaments" value={player.tournamentsPlayed} icon={Trophy} />
          <StatTile label="Championships" value={player.titlesWon} icon={Award} />
          <StatTile label="Win Rate" value={player.winRate} icon={Activity} />
        </div>
      </div>
    </div>
  );
}
