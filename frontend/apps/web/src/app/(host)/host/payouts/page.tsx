import React from "react";
import Link from "next/link";
import { MOCK_PAYOUTS } from "@/data/mock-data";
import { formatMoney } from "@/utils/formatters";
import { ArrowLeft, IndianRupee, CheckCircle2, Clock } from "lucide-react";
import {
  DashboardEyebrow,
  DashboardTitle,
  DashboardLead,
  HostPageShell,
} from "@/components/layout/DashboardTypography";

export default async function HostPayoutsPage() {
  const payouts = MOCK_PAYOUTS;

  return (
    <HostPageShell className="max-w-4xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#14212D] mb-2 font-medium">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <DashboardEyebrow className="text-[#14212D]">Treasury &amp; escrow</DashboardEyebrow>
          <DashboardTitle className="mt-1.5 flex items-center gap-2.5">
            <IndianRupee className="w-7 h-7 text-[#14212D] shrink-0" />
            Payouts
          </DashboardTitle>
          <DashboardLead>Automated entry-fee transfers to your verified bank account</DashboardLead>
        </div>

        <button className="inline-flex items-center gap-2 rounded-full bg-navy hover:bg-[#16392B] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer">
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
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#14212D] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full border border-[#CAD7CE]">
                    <CheckCircle2 className="w-3 h-3" /> Processed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF685B] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                    <Clock className="w-3 h-3" /> Processing
                  </span>
                )}
              </div>
              <div className="col-span-3 text-right">
                <p className="font-mono font-bold text-[#14212D] text-sm">{formatMoney(p.amount)}</p>
                <p className="text-[10px] text-[#64748B] font-mono">{p.referenceId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HostPageShell>
  );
}
