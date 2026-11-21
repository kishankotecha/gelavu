import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Check, X } from "lucide-react";

export default function AdminHostsPage() {
  const hosts = [
    { id: "h-1", name: "Apex Badminton Academy", contact: "Rajesh Sharma", city: "Bengaluru", status: "VERIFIED", tournaments: 5 },
    { id: "h-2", name: "Mysore Pickleball Club", contact: "Pradeep Rao", city: "Mysuru", status: "PENDING_VERIFICATION", tournaments: 1 },
    { id: "h-3", name: "Hubballi Smash Trust", contact: "Kiran Patil", city: "Hubballi", status: "VERIFIED", tournaments: 2 },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-emerald-400" /> Host & Club Verifications
          </h1>
          <p className="text-sm text-gray-400 mt-1">Audit bank details, verify identity proofs, and manage organizer permissions</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-950/80 border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
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
                <p className="text-xs text-gray-500">{h.city} • {h.tournaments} Events</p>
              </div>
              <div className="col-span-3 text-xs text-gray-300">{h.contact}</div>
              <div className="col-span-2 text-center">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  h.status === "VERIFIED"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
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
    </div>
  );
}
