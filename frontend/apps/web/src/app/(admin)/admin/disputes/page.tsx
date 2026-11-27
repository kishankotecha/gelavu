import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import {
  AdminPageShell,
  DashboardTitle,
  DashboardLead,
} from "@/components/layout/DashboardTypography";

export default function AdminDisputesPage() {
  const disputes = [
    {
      id: "disp-1",
      matchId: "m-2",
      tournament: "Bengaluru Shuttle Clash 2026",
      filer: "Varun Shenoy",
      reason: "Contested line call in Set 3 at 20-19",
      status: "OPEN",
      time: "2 hours ago",
    },
    {
      id: "disp-2",
      matchId: "m-4",
      tournament: "Mysuru Pickleball Open",
      filer: "Preetham Rao",
      reason: "Paddle non-compliant specification protest",
      status: "RESOLVED",
      time: "1 day ago",
    },
  ];

  return (
    <AdminPageShell>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 mb-2">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <DashboardTitle tone="dark" className="flex items-center gap-2.5">
            <AlertTriangle className="w-7 h-7 text-hotpink shrink-0" />
            Disputes &amp; appeals
          </DashboardTitle>
          <DashboardLead tone="dark">
            Review complaints, line-call protests, and umpire reports
          </DashboardLead>
        </div>
      </div>

      <div className="space-y-4">
        {disputes.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl border border-white/10 bg-navy p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  d.status === "OPEN"
                    ? "bg-hotpink/10 text-hotpink-400 border-hotpink-500/30"
                    : "bg-hotpink/10 text-hotpink border-hotpink/30"
                }`}>
                  {d.status}
                </span>
                <span className="text-xs text-white/70">{d.time}</span>
              </div>
              <h3 className="text-base font-bold text-white">{d.tournament}</h3>
              <p className="text-xs text-hotpink mt-1 font-medium">&quot;{d.reason}&quot;</p>
              <p className="text-xs text-white/60 mt-0.5">Filed by: {d.filer} • Match ID: {d.matchId}</p>
            </div>

            {d.status === "OPEN" && (
              <div className="flex gap-2">
                <Button variant="primary" size="sm">
                  Uphold Score
                </Button>
                <Button variant="danger" size="sm">
                  Order Rematch / Adjust
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminPageShell>
  );
}
