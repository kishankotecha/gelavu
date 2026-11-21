import React from "react";
import Link from "next/link";
import { formatMoney } from "@/utils/formatters";
import { ArrowLeft, IndianRupee } from "lucide-react";

export default function AdminPaymentsPage() {
  const transactions = [
    { id: "tx-101", user: "Rohan Kumar", tournament: "Bengaluru Shuttle Clash 2026", amount: 1200, status: "SUCCESS", gateway: "Razorpay (UPI)" },
    { id: "tx-102", user: "Karthik Gowda", tournament: "Bengaluru Shuttle Clash 2026", amount: 1200, status: "SUCCESS", gateway: "Razorpay (Card)" },
    { id: "tx-103", user: "Aditya Hegde", tournament: "Mysuru Pickleball Open", amount: 800, status: "SUCCESS", gateway: "Razorpay (UPI)" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <IndianRupee className="w-7 h-7 text-emerald-400" /> Platform Payments & Escrow Ledger
          </h1>
          <p className="text-sm text-gray-400 mt-1">Audit Razorpay webhook feeds, platform commission, and prize disbursements</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-950/80 border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-3">Payer</div>
          <div className="col-span-4">Tournament</div>
          <div className="col-span-2 text-center">Gateway</div>
          <div className="col-span-3 text-right">Amount / Status</div>
        </div>

        <div className="divide-y divide-gray-800/60">
          {transactions.map((tx) => (
            <div key={tx.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-3 font-bold text-white text-sm">{tx.user}</div>
              <div className="col-span-4 text-xs text-gray-300">{tx.tournament}</div>
              <div className="col-span-2 text-center text-xs text-gray-400">{tx.gateway}</div>
              <div className="col-span-3 text-right">
                <span className="font-mono font-bold text-emerald-400 text-sm">{formatMoney(tx.amount)}</span>
                <span className="block text-[10px] text-emerald-300 font-semibold">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
