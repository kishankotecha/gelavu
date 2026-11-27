import React from "react";
import Link from "next/link";
import { Avatar } from "@/components/common/Avatar";
import { StatTile } from "@/components/common/StatTile";
import {
  Trophy,
  Award,
  MapPin,
  ArrowLeft,
  Activity,
  Hand,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Calendar,
} from "lucide-react";
import { getPartnerById, PARTNER_CANDIDATES } from "@/data/partners";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const candidate = getPartnerById(id) || PARTNER_CANDIDATES[0];

  const player = {
    id: candidate.id,
    name: candidate.name,
    city: candidate.city,
    area: candidate.area,
    points: candidate.rating,
    tournamentsPlayed: candidate.tournamentsPlayed,
    titlesWon: candidate.titlesWon,
    winRate: candidate.winRate,
    circuitRank: candidate.circuitRank,
    playStyle: candidate.playStyle,
    dominantHand: candidate.dominantHand,
    preferredCategory: candidate.preferredCategory,
    bio: candidate.bio,
    lookingForNote: candidate.lookingForNote,
    doublesComplement: candidate.doublesComplement,
    tournamentSlug: candidate.tournamentSlug,
    tournamentTitle: candidate.tournamentTitle,
    verified: candidate.verified,
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-gray-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tournaments</span>
          </Link>

          <GelavuLogo variant="light" size="md" href="/" />

          <span className="text-xs font-mono text-gray-400">ID: {id}</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-9 shadow-md space-y-6">
          {/* Header Row: Avatar, Info, Circuit Rating */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar name={player.name} size="xl" />

            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">{player.name}</h1>
                {player.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Player
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {player.area}, {player.city}, India
              </p>

              {/* Playstyle & Handedness Badges */}
              <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="rounded-xl bg-hotpink/10 border border-hotpink/30 px-3 py-1 text-xs font-bold text-navy">
                  {player.playStyle}
                </span>
                <span className="rounded-xl bg-gray-100 border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <Hand className="w-3.5 h-3.5 text-gray-500" /> {player.dominantHand}
                </span>
                <span className="rounded-xl bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-semibold text-emerald-800">
                  {player.preferredCategory}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed">{player.bio}</p>
            </div>

            {/* Rating Tile */}
            <div className="text-center sm:text-right bg-gray-50 border border-gray-200 p-4 rounded-2xl shrink-0 min-w-[130px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                Circuit Rating
              </span>
              <p className="text-3xl font-black text-gray-900 font-mono mt-0.5">{player.points}</p>
              <span className="text-[11px] font-bold text-hotpink bg-hotpink/10 border border-hotpink/30 px-2 py-0.5 rounded-full inline-block mt-1">
                Rank #{player.circuitRank} State
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-100">
            <StatTile label="Tournaments" value={player.tournamentsPlayed} icon={Trophy} />
            <StatTile label="Championships" value={player.titlesWon} icon={Award} />
            <StatTile label="Win Rate" value={player.winRate} icon={Activity} />
          </div>

          {/* Doubles Synergy & Playstyle Breakdown */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4.5 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-800">
              <Sparkles className="w-4 h-4 text-hotpink" />
              <span>Doubles Compatibility & Synergy</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {player.doublesComplement}
            </p>
          </div>

          {/* Active Tournament Seeking Partner Card */}
          {player.tournamentSlug && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center justify-center sm:justify-start gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Seeking BYOP Partner
                </span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900">{player.tournamentTitle}</h3>
                <p className="text-xs text-gray-600 italic">
                  &ldquo;{player.lookingForNote}&rdquo;
                </p>
              </div>

              <Link
                href={`/tournaments/${player.tournamentSlug}/register?pairWith=${player.id}&partnerName=${encodeURIComponent(
                  player.name
                )}&playStyle=${encodeURIComponent(player.playStyle)}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-black hover:bg-gray-800 text-white px-5 py-2.5 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                Pair Up & Enter
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
