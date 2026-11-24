import React from "react";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/data/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";

export default async function AdminTournamentsPage() {
  const tournaments = MOCK_TOURNAMENTS;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Trophy className="w-7 h-7 text-emerald-400" /> All Platform Tournaments
          </h1>
          <p className="text-sm text-gray-400 mt-1">Review event listings, inspect prize allocations, and moderate status</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-950/80 border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
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
                <p className="text-xs text-gray-500">{t.city} • Organized by {t.hostName}</p>
              </div>
              <div className="col-span-2 text-center text-xs text-emerald-400 font-semibold">{t.sport}</div>
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
    </div>
  );
}
