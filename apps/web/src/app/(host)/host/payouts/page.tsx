import React from "react";
import Link from "next/link";
import { MOCK_PAYOUTS } from "@/data/mock-data";
import { formatMoney } from "@/utils/formatters";
import { Button } from "@/components/ui/button";
import { ArrowLeft, IndianRupee, CheckCircle2, Clock } from "lucide-react";

export default async function HostPayoutsPage() {
  const payouts = MOCK_PAYOUTS;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Host Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <IndianRupee className="w-7 h-7 text-emerald-400" /> Payouts & Settlement
          </h1>
          <p className="text-sm text-gray-400 mt-1">Automatic entry fee transfers to your verified bank account</p>
        </div>

        <Button variant="primary" size="sm">
          Request Instant Withdrawal
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-950/80 border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-5">Tournament</div>
          <div className="col-span-2 text-center">Date</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Amount / Reference</div>
        </div>

        <div className="divide-y divide-gray-800/60">
          {payouts.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-5 font-bold text-white text-sm">{p.tournamentTitle}</div>
              <div className="col-span-2 text-center text-xs text-gray-400">{p.date}</div>
              <div className="col-span-2 text-center">
                {p.status === "PROCESSED" ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Processed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    <Clock className="w-3 h-3" /> Processing
                  </span>
                )}
              </div>
              <div className="col-span-3 text-right">
                <p className="font-mono font-bold text-emerald-400 text-sm">{formatMoney(p.amount)}</p>
                <p className="text-[10px] text-gray-500 font-mono">{p.referenceId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
