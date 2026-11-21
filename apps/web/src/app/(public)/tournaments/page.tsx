import React from "react";
import type { Metadata } from "next";
import { getTournamentCards } from "@/data/tournaments";
import { TournamentsCatalog } from "@/features/tournaments/TournamentsCatalog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Tournaments in ${siteConfig.city} - ${siteConfig.name}`,
  description: "Browse verified badminton tournaments, open draws and upcoming cups across India.",
};

export default async function TournamentsPage() {
  const allCards = await getTournamentCards();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-6xl">
      <TournamentsCatalog initialTournaments={allCards} />
    </div>
  );
}
