"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { HeroRally } from "@/features/home/HeroRally";
import { HomeTournaments } from "@/features/home/HomeTournaments";
import { HostShowcase } from "@/features/home/HostShowcase";
import { RankingsShowcase } from "@/features/home/RankingsShowcase";
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
      {/* 1. Hero with Athlete Smash, Play/Host Switcher & Court 3 Live Match + Stats Strip (Image 1) */}
      <HeroRally city={siteConfig.city} onJoin={() => handleOpenJoin("player")} />

      {/* 2. Play Near You: Location Pill, Filters & Stylized Cards with Half-Moon SVG (Image 2) */}
      <HomeTournaments />

      {/* 3. Built For Organizers: Realistic Angled Host Command Centre (Image 3) */}
      <HostShowcase />

      {/* 4. Earn Your Rank: Glowing AM Player of the Month & Circuit Leaderboard (Image 4) */}
      <RankingsShowcase />

      {/* 5. Three Steps & High-Energy Dark CTA Banner (Image 5) */}
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
