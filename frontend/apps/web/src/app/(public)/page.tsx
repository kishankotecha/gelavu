"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { HeroRally } from "@/features/home/HeroRally";
import { PlayNearYou } from "@/features/play-near-you/PlayNearYou";
import { HostShowcase } from "@/features/home/HostShowcase";
import { RankingsShowcase } from "@/features/home/RankingsShowcase";
import { HomeMiniCourtSection } from "@/features/home/HomeMiniCourtSection";
import { HowItWorksRally } from "@/features/home/HowItWorksRally";
import { JoinModal } from "@/components/common/JoinModal";

export default function HomePage() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinModalRole, setJoinModalRole] = useState<"player" | "host">("player");

  const handleOpenJoin = (role: "player" | "host" = "player") => {
    setJoinModalRole(role);
    setJoinModalOpen(true);
  };

  return (
    <main className="w-full min-h-screen overflow-x-hidden flex flex-col font-sans">
      {/* 1. Hero with Athlete Smash, Play/Host Switcher & Court 3 Live Match + Stats Strip */}
      <HeroRally city={siteConfig.city} onJoin={() => handleOpenJoin("player")} />

      {/* 2. Play Near You: Neighbourhood Map, Match Ticket & Weekend Timeline */}
      <PlayNearYou />

      {/* 3. Built For Organizers: Realistic Angled Host Command Centre */}
      <HostShowcase />

      {/* 4. Earn Your Rank: Glowing AM Player of the Month & Circuit Leaderboard */}
      <RankingsShowcase />

      {/* 5. Interactive Court Simulator: Warm Up, Beat Robo-Pro & Earn Badges */}
      <HomeMiniCourtSection />

      {/* 6. Three Steps & High-Energy Dark CTA Banner */}
      <HowItWorksRally onJoin={() => handleOpenJoin("player")} />

      {/* Interactive Join / Login Modal */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        defaultRole={joinModalRole}
      />
    </main>
  );
}
