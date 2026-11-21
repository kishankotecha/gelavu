"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { PartnerWheel } from "@/components/common/PartnerWheel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

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
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
      <Link href="/my-games" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to My Games
      </Link>

      <div className="mb-4 text-center">
        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Registration #{registrationId}
        </span>
      </div>

      <PartnerWheel
        candidates={eligibleCandidates}
        onWinnerSelected={(winner) => setPartnerAssigned(winner)}
      />

      {partnerAssigned && (
        <div className="mt-8 text-center animate-in fade-in">
          <Link href="/my-games">
            <Button variant="primary" size="lg" className="gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Confirm Partner & View My Matches
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
