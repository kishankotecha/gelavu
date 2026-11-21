"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowLeft, CheckCircle2 } from "lucide-react";

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
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Host Dashboard
      </Link>

      <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">Host KYC & Bank Verification</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Required for automated Razorpay escrow payouts directly into your bank
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">KYC Documents Submitted!</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Our compliance team will verify your details within 24 hours. Your tournament entry escrow accounts are active.
            </p>
            <Link href="/host">
              <Button variant="primary" size="md" className="mt-4">
                Return to Host Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-300">Club / Organization Name</label>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300">PAN Number</label>
                <Input value={pan} onChange={(e) => setPan(e.target.value)} maxLength={10} required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300">GSTIN (Optional)</label>
                <Input placeholder="29ABCDE1234F1Z5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-300">Bank Account Number</label>
                <Input value={account} onChange={(e) => setAccount(e.target.value)} required />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-300">IFSC Code</label>
                <Input value={ifsc} onChange={(e) => setIfsc(e.target.value)} required />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" className="w-full">
                Submit KYC for Verification
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
