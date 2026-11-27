"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { PartnerWheel } from "@/components/common/PartnerWheel";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  GitBranch,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export default function PartnerDrawPage({
  params,
}: {
  params: Promise<{ registrationId: string }>;
}) {
  const { registrationId } = use(params);
  const [partnerAssigned, setPartnerAssigned] = useState<{ id: string; name: string } | null>(null);

  const eligibleCandidates = [
    { id: "cand-1", name: "Preetham Rao", rating: 1450 },
    { id: "cand-2", name: "Suresh Hegde", rating: 1520 },
    { id: "cand-3", name: "Deepak Nayak", rating: 1390 },
    { id: "cand-4", name: "Manoj Gowda", rating: 1480 },
    { id: "cand-5", name: "Vivek Joshi", rating: 1410 },
    { id: "cand-6", name: "Nitin Kamath", rating: 1560 },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-gray-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/my-games"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Games</span>
          </Link>

          <GelavuLogo variant="light" size="md" href="/" />

          <span className="text-xs font-mono text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-0.5 rounded-full">
            Ref #{registrationId}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {/* Host Draw Notice Banner */}
        <div className="rounded-2xl border border-hotpink/30 bg-hotpink/10/80 p-4.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-navy">
              <Sparkles className="w-4 h-4 text-hotpink" />
              <span>Host-Conducted Random Team Draw</span>
            </div>
            <p className="text-xs text-navy/80 leading-relaxed">
              Teams in this category are randomly formed by the tournament host before the bracket is published.
            </p>
          </div>
          <span className="shrink-0 text-[11px] font-bold text-navy bg-hotpink/15 border border-hotpink/30 px-2.5 py-1 rounded-full">
            Solo Entry Verified
          </span>
        </div>

        {/* The Animated Host Wheel */}
        <PartnerWheel
          title="Host Partner Wheel Ceremony"
          subtitle="Watch the host ceremony wheel draw your doubles partner from eligible registered solo players"
          buttonLabel="WATCH / SIMULATE HOST DRAW 🎯"
          candidates={eligibleCandidates}
          onWinnerSelected={(winner) => setPartnerAssigned(winner)}
        />

        {/* Result & Next Steps */}
        {partnerAssigned && (
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50/90 p-6 sm:p-7 text-center space-y-4 shadow-md animate-in fade-in zoom-in-95">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> Official Host Draw Confirmed
            </span>

            <div>
              <h3 className="text-2xl font-black text-gray-900">
                Your Assigned Partner: {partnerAssigned.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
                Your doubles team is officially seeded into the knockout bracket. Match timings will appear in your player schedule.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/my-games"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-black hover:bg-gray-800 text-white px-6 py-3 text-xs font-black transition shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Go to My Games & Schedule
              </Link>
              <Link
                href="/tournaments/bengaluru-open-badminton-2026/bracket"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <GitBranch className="w-4 h-4 text-emerald-600" />
                View Tournament Bracket
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
