import React from "react";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/data/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import {
  AdminPageShell,
  DashboardTitle,
  DashboardLead,
} from "@/components/layout/DashboardTypography";

export default async function AdminTournamentsPage() {
  const tournaments = MOCK_TOURNAMENTS;

  return (
    <AdminPageShell>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 mb-2">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <DashboardTitle tone="dark" className="flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-hotpink shrink-0" />
            Tournaments
          </DashboardTitle>
          <DashboardLead tone="dark">
            Review listings, prize allocations, and moderation status
          </DashboardLead>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy/80 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-navy border-b border-white/10 text-xs font-bold text-white/70 uppercase tracking-wider">
          <div className="col-span-5">Tournament</div>
          <div className="col-span-2 text-center">Sport</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-800/60">
          {tournaments.map((t) => (
            <div key={t.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-5">
                <p className="font-bold text-white text-sm">{t.title}</p>
                <p className="text-xs text-white/60">{t.city} • Organized by {t.hostName}</p>
              </div>
              <div className="col-span-2 text-center text-xs text-hotpink font-semibold">{t.sport}</div>
              <div className="col-span-2 text-center">
                <StatusBadge status={t.status} />
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                <Link href={`/tournaments/${t.slug}`}>
                  <Button variant="secondary" size="sm" className="h-8 px-3 text-xs">
                    View
                  </Button>
                </Link>
                <Button variant="outline" size="sm" className="h-8 px-3 text-xs">
                  Moderate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}
