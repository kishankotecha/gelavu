"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, GitBranch, Calendar } from "lucide-react";
import { PlayerEntriesManager } from "@/features/host/PlayerEntriesManager";

export default function HostTournamentEntriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 py-6">
      {/* Navigation and Quick Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <Link
          href={`/host/tournaments/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#1D4A38] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#1D4A38]" />
          <span>Back to Tournament Overview</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href={`/host/tournaments/${id}/fixtures`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] px-3.5 py-2 text-xs font-bold text-[#1E293B] transition-colors shadow-2xs"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#1D4A38]" />
            <span>Go to Fixtures & Wheel Draw →</span>
          </Link>
          <Link
            href={`/host/tournaments/${id}/schedule`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] px-3.5 py-2 text-xs font-bold text-[#1E293B] transition-colors shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#1D4A38]" />
            <span>Courts & Schedule</span>
          </Link>
        </div>
      </div>

      {/* Main Entries Manager */}
      <PlayerEntriesManager tournamentId={id} />
    </div>
  );
}
