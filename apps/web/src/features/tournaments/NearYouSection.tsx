"use client";

import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TournamentExplorer } from "@/features/tournaments/TournamentExplorer";
import { useCity } from "@/hooks/useCity";
import type { TournamentCardData } from "@/types/tournament";

export function NearYouSection({ tournaments }: { tournaments: TournamentCardData[] }) {
  const { city } = useCity();

  return (
    <section aria-labelledby="near-you" className="space-y-5">
      <div id="near-you">
        <SectionHeader
          title="Near you"
          subtitle={`Upcoming tournaments in ${city}`}
          href="/tournaments"
          linkLabel="See all"
        />
      </div>
      <TournamentExplorer tournaments={tournaments} />
    </section>
  );
}
