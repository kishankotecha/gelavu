"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";
import {
  DashboardTitle,
  DashboardLead,
  HostPageShell,
} from "@/components/layout/DashboardTypography";

export default function HostVerifyKycPage() {
  const [submitted, setSubmitted] = useState(false);
  const [orgName, setOrgName] = useState("Apex Badminton Academy");
  const [pan, setPan] = useState("ABCDE1234F");
  const [account, setAccount] = useState("9876543210001");
  const [ifsc, setIfsc] = useState("HDFC0001234");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <HostPageShell className="max-w-2xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#14212D] mb-4 font-medium">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
      </Link>

      <div className="rounded-3xl border border-[#E2E6DD] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-[#E8EFEA] text-[#14212D] border border-[#CAD7CE]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <DashboardTitle as="h1" className="text-xl sm:text-2xl">
              Host verification
            </DashboardTitle>
            <DashboardLead className="text-xs sm:text-sm !mt-1">
              Required for automated escrow payouts to your verified bank account
            </DashboardLead>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#E8EFEA] text-[#14212D] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B]">KYC Documents Submitted!</h3>
            <p className="text-xs text-[#64748B] max-w-md mx-auto">
              Our compliance team will verify your details within 24 hours. Your tournament entry escrow accounts are active.
            </p>
            <Link href="/host">
              <button className="inline-flex items-center gap-2 rounded-full bg-navy hover:bg-[#16392B] text-white px-6 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer mt-4">
                Return to Host Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#1E293B] block mb-1">Club / Organization Name</label>
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3.5 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1">PAN Number</label>
                <input
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  maxLength={10}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3.5 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none uppercase"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1">GSTIN (Optional)</label>
                <input
                  placeholder="29ABCDE1234F1Z5"
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3.5 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none uppercase placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1">Bank Account Number</label>
                <input
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3.5 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1E293B] block mb-1">IFSC Code</label>
                <input
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3.5 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none uppercase"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full h-12 rounded-full bg-navy hover:bg-[#16392B] text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              >
                Submit KYC for Verification
              </button>
            </div>
          </form>
        )}
      </div>
    </HostPageShell>
  );
}
