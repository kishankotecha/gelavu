import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy, Award } from "lucide-react";

export default async function HostResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <Link href={`/host/tournaments/${id}`} className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Tournament Overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Trophy className="w-7 h-7 text-amber-400" /> Results & Winner Declaration
          </h1>
          <p className="text-sm text-gray-400 mt-1">Confirm final scores, award championship trophies, and trigger ranking updates</p>
        </div>

        <Button variant="gold" size="sm" className="gap-2">
          <Award className="w-4 h-4" /> Declare Official Winners
        </Button>
      </div>

      <div className="rounded-2xl border border-gray-800 bg-gray-900/60 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Men&apos;s Singles Final Podium</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10">
            <span className="text-[10px] font-bold text-amber-400 uppercase">1st Place (Champion)</span>
            <p className="text-lg font-black text-white mt-1">Rohan Kumar</p>
            <p className="text-xs text-gray-400">Prize: ₹25,000 + Trophy + Gold Medal</p>
          </div>
          <div className="p-4 rounded-xl border border-gray-700 bg-gray-800/40">
            <span className="text-[10px] font-bold text-gray-400 uppercase">2nd Place (Runner-up)</span>
            <p className="text-lg font-black text-white mt-1">Aditya Hegde</p>
            <p className="text-xs text-gray-400">Prize: ₹15,000 + Silver Medal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
