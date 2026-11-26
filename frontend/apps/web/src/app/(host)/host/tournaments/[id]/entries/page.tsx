"use client";

import React, { use } from "react";
import { PlayerEntriesManager } from "@/features/host/PlayerEntriesManager";
import { getTournament } from "@/lib/tournamentStore";

export default function HostTournamentEntriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const currentTour = getTournament(id);
  const title = currentTour ? currentTour.title : "Bengaluru Morning Doubles Clash";

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <PlayerEntriesManager tournamentId={id} tournamentTitle={title} />
    </div>
  );
}
