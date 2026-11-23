import React from "react";
import Link from "next/link";
import { MOCK_PAYOUTS } from "@/data/mock-data";
import { formatMoney } from "@/utils/formatters";
import { ArrowLeft, IndianRupee, CheckCircle2, Clock } from "lucide-react";

export default async function HostPayoutsPage() {
  const payouts = MOCK_PAYOUTS;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl text-[#1E293B]">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#1D4A38] mb-6 font-semibold">
        <ArrowLeft className="w-3.5 h-3.5 text-[#1D4A38]" /> Back to Host Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#1D4A38]">Treasury & Escrow</span>
          <h1 className="text-3xl font-black text-[#1E293B] flex items-center gap-2 mt-1">
            <IndianRupee className="w-7 h-7 text-[#1D4A38]" /> Payouts & Settlement
          </h1>
          <p className="text-sm text-[#64748B] mt-1">Automated entry fee transfers to your verified bank account</p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-[#1D4A38] hover:bg-[#16392B] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer">
          Request Instant Withdrawal
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#F9FAF6] border-b border-[#E2E6DD] text-xs font-bold text-[#64748B] uppercase tracking-wider">
          <div className="col-span-5">Tournament</div>
          <div className="col-span-2 text-center">Date</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Amount / Reference</div>
        </div>

        <div className="divide-y divide-[#E2E6DD]">
          {payouts.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#F9FAF6] transition-colors">
              <div className="col-span-5 font-bold text-[#1E293B] text-sm">{p.tournamentTitle}</div>
              <div className="col-span-2 text-center text-xs text-[#64748B]">{p.date}</div>
              <div className="col-span-2 text-center">
                {p.status === "PROCESSED" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1D4A38] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full border border-[#CAD7CE]">
                    <CheckCircle2 className="w-3 h-3" /> Processed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B45309] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                    <Clock className="w-3 h-3" /> Processing
                  </span>
                )}
              </div>
              <div className="col-span-3 text-right">
                <p className="font-mono font-bold text-[#1D4A38] text-sm">{formatMoney(p.amount)}</p>
                <p className="text-[10px] text-[#64748B] font-mono">{p.referenceId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
