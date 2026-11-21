import React from "react";
import Link from "next/link";
import { MOCK_REGISTRATIONS } from "@/data/mock-data";
import { formatMoney, formatDate } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { Gamepad2, Sparkles, ArrowRight } from "lucide-react";

export default async function MyGamesPage() {
  const registrations = MOCK_REGISTRATIONS;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-emerald-400" /> My Tournaments & Matches
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Track your registrations, court assignments and match schedules
          </p>
        </div>

        <Link href="/tournaments">
          <Button variant="primary" size="sm">
            Explore More Tournaments
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {registrations.map((reg) => (
          <div
            key={reg.id}
            className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {reg.category.replace(/_/g, " ")}
                </span>
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {reg.paymentStatus}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{reg.tournamentTitle}</h3>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <span>Entry: {formatMoney(reg.amount)}</span>
                <span>Date: {formatDate(reg.createdAt)}</span>
                {reg.partnerName && (
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Partner: {reg.partnerName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {reg.category === "BLIND_DRAW_DOUBLES" && !reg.partnerName && (
                <Link href={`/partner-draw/${reg.id}`}>
                  <Button variant="gold" size="sm">
                    Spin Partner Wheel 🎯
                  </Button>
                </Link>
              )}
              <Link href={`/tournaments/${reg.tournamentSlug}/bracket`}>
                <Button variant="secondary" size="sm" className="gap-1.5">
                  View Bracket
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
