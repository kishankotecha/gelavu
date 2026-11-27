import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Check, X } from "lucide-react";
import {
  AdminPageShell,
  DashboardTitle,
  DashboardLead,
} from "@/components/layout/DashboardTypography";

export default function AdminHostsPage() {
  const hosts = [
    { id: "h-1", name: "Apex Badminton Academy", contact: "Rajesh Sharma", city: "Bengaluru", status: "VERIFIED", tournaments: 5 },
    { id: "h-2", name: "Mysore Pickleball Club", contact: "Pradeep Rao", city: "Mysuru", status: "PENDING_VERIFICATION", tournaments: 1 },
    { id: "h-3", name: "Hubballi Smash Trust", contact: "Kiran Patil", city: "Hubballi", status: "VERIFIED", tournaments: 2 },
  ];

  return (
    <AdminPageShell>
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 mb-2">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <DashboardTitle tone="dark" className="flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-hotpink shrink-0" />
            Host verifications
          </DashboardTitle>
          <DashboardLead tone="dark">
            Audit bank details, identity proofs, and organizer permissions
          </DashboardLead>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy/80 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-navy border-b border-white/10 text-xs font-bold text-white/70 uppercase tracking-wider">
          <div className="col-span-4">Organizer Name</div>
          <div className="col-span-3">Contact Person</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        <div className="divide-y divide-gray-800/60">
          {hosts.map((h) => (
            <div key={h.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-4">
                <p className="font-bold text-white text-sm">{h.name}</p>
                <p className="text-xs text-white/60">{h.city} • {h.tournaments} Events</p>
              </div>
              <div className="col-span-3 text-xs text-white/80">{h.contact}</div>
              <div className="col-span-2 text-center">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  h.status === "VERIFIED"
                    ? "bg-hotpink/10 text-hotpink border-hotpink/30"
                    : "bg-hotpink/100/10 text-hotpink border-hotpink/30"
                }`}>
                  {h.status}
                </span>
              </div>
              <div className="col-span-3 flex justify-end gap-2">
                <Button variant="primary" size="sm" className="h-8 px-2 text-xs">
                  <Check className="w-3.5 h-3.5" /> Approve
                </Button>
                <Button variant="danger" size="sm" className="h-8 px-2 text-xs">
                  <X className="w-3.5 h-3.5" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminPageShell>
  );
}
