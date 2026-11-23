import React from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Award } from "lucide-react";

export default async function HostResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl text-[#1E293B]">
      <Link href={`/host/tournaments/${id}`} className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#1D4A38] mb-6 font-semibold">
        <ArrowLeft className="w-3.5 h-3.5 text-[#1D4A38]" /> Back to Tournament Overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4A38]">Honours & Podium</span>
          <h1 className="text-3xl font-black text-[#1E293B] flex items-center gap-2 mt-1">
            <Trophy className="w-7 h-7 text-[#B45309]" /> Results & Winner Declaration
          </h1>
          <p className="text-sm text-[#64748B] mt-1">Confirm final scores, award championship trophies, and trigger ranking updates</p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-[#1D4A38] hover:bg-[#16392B] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer">
          <Award className="w-4 h-4 text-[#A7F3D0]" />
          <span>Declare Official Winners</span>
        </button>
      </div>

      <div className="rounded-2xl border border-[#E2E6DD] bg-white p-6 sm:p-8 space-y-5 shadow-xs">
        <h3 className="text-sm font-bold text-[#1E293B] uppercase tracking-wider">Men&apos;s Singles Final Podium</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-[#FDE68A] bg-[#FEF3C7]/60">
            <span className="text-[10px] font-black text-[#B45309] uppercase tracking-wider">1st Place (Champion)</span>
            <p className="text-xl font-black text-[#1E293B] mt-1">Rohan Kumar</p>
            <p className="text-xs text-[#64748B] mt-0.5">Prize: ₹25,000 + Gold Trophy + Circuit Points</p>
          </div>
          <div className="p-5 rounded-2xl border border-[#E2E6DD] bg-[#F9FAF6]">
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-wider">2nd Place (Runner-up)</span>
            <p className="text-xl font-black text-[#1E293B] mt-1">Aditya Hegde</p>
            <p className="text-xs text-[#64748B] mt-0.5">Prize: ₹15,000 + Silver Medal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
