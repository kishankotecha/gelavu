import React from "react";
import { StatTile } from "@/components/common/StatTile";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Trophy, AlertTriangle, IndianRupee } from "lucide-react";
import {
  AdminPageShell,
  DashboardEyebrow,
  DashboardTitle,
  DashboardLead,
  DashboardSectionTitle,
} from "@/components/layout/DashboardTypography";

export default function AdminDashboardPage() {
  const pendingQueue = [
    { id: "q-1", type: "HOST_KYC", title: "Apex Badminton Academy KYC", time: "10 mins ago", status: "PENDING_REVIEW" },
    { id: "q-2", type: "TOURNAMENT_APPROVAL", title: "Bengaluru Shuttle Clash 2026", time: "1 hour ago", status: "PENDING_REVIEW" },
    { id: "q-3", type: "PAYMENT_PAYOUT", title: "Payout Release: ₹45,000", time: "3 hours ago", status: "PENDING_APPROVAL" },
    { id: "q-4", type: "DISPUTE", title: "Score Protest: Court 2 Match #4", time: "5 hours ago", status: "URGENT" },
  ];

  return (
    <AdminPageShell>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <DashboardEyebrow tone="dark" className="text-hotpink/90">
            Platform operations
          </DashboardEyebrow>
          <DashboardTitle tone="dark" className="mt-1.5">
            Review queue
          </DashboardTitle>
          <DashboardLead tone="dark">
            Audit hosts, approve escrows, and resolve match appeals
          </DashboardLead>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatTile label="Pending KYC" value="4" icon={ShieldCheck} trend="Needs Action" />
        <StatTile label="Live Tournaments" value="18" icon={Trophy} />
        <StatTile label="Escrow Held" value="₹4.8L" icon={IndianRupee} />
        <StatTile label="Active Disputes" value="2" icon={AlertTriangle} trend="Urgent" />
      </div>

      <div className="space-y-4">
        <DashboardSectionTitle tone="dark">Pending approvals</DashboardSectionTitle>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy/80">
          <div className="divide-y divide-gray-800/60">
            {pendingQueue.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-navy/40 transition-colors">
                <div>
                  <span className="text-[10px] font-bold text-hotpink uppercase tracking-wider bg-hotpink/10 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
                  <p className="text-xs text-white/60">{item.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="primary" size="sm">Approve</Button>
                  <Button variant="secondary" size="sm">Inspect</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}
