import React from "react";
import { StatTile } from "@/components/common/StatTile";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Trophy, AlertTriangle, IndianRupee } from "lucide-react";

export default function AdminDashboardPage() {
  const pendingQueue = [
    { id: "q-1", type: "HOST_KYC", title: "Apex Badminton Academy KYC", time: "10 mins ago", status: "PENDING_REVIEW" },
    { id: "q-2", type: "TOURNAMENT_APPROVAL", title: "Bengaluru Shuttle Clash 2026", time: "1 hour ago", status: "PENDING_REVIEW" },
    { id: "q-3", type: "PAYMENT_PAYOUT", title: "Payout Release: ₹45,000", time: "3 hours ago", status: "PENDING_APPROVAL" },
    { id: "q-4", type: "DISPUTE", title: "Score Protest: Court 2 Match #4", time: "5 hours ago", status: "URGENT" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Super Admin Console</span>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            Platform Review Queue
          </h1>
          <p className="text-sm text-gray-400 mt-1">Audit tournament hosts, approve prize escrows, and resolve match appeals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatTile label="Pending KYC" value="4" icon={ShieldCheck} trend="Needs Action" />
        <StatTile label="Live Tournaments" value="18" icon={Trophy} />
        <StatTile label="Escrow Held" value="₹4.8L" icon={IndianRupee} />
        <StatTile label="Active Disputes" value="2" icon={AlertTriangle} trend="Urgent" />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Pending Approval Queue</h2>
        <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60">
          <div className="divide-y divide-gray-800/60">
            {pendingQueue.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-800/40 transition-colors">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.time}</p>
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
    </div>
  );
}
