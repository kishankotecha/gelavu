"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TournamentCategory } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { openRazorpayCheckout } from "@/lib/razorpay";
import { ArrowLeft, ShieldCheck, Sparkles, CreditCard } from "lucide-react";

export default function TournamentRegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const [category, setCategory] = useState<TournamentCategory>("MEN_SINGLES");
  const [partnerType, setPartnerType] = useState<"BLIND_DRAW" | "MY_PARTNER">("BLIND_DRAW");
  const [partnerName, setPartnerName] = useState("");
  const [partnerPhone, setPartnerPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const entryFee = 1200;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      await openRazorpayCheckout({
        amount: entryFee * 100,
        currency: "INR",
        name: "Gelavu Tournaments",
        description: `Entry Fee for ${slug}`,
        handler: () => {
          const regId = `reg-${Date.now()}`;
          if (category === "BLIND_DRAW_DOUBLES" || partnerType === "BLIND_DRAW") {
            router.push(`/partner-draw/${regId}`);
          } else {
            router.push(`/my-games?registered=true`);
          }
        },
      });
    } catch {
      const regId = `reg-${Date.now()}`;
      if (category === "BLIND_DRAW_DOUBLES" || partnerType === "BLIND_DRAW") {
        router.push(`/partner-draw/${regId}`);
      } else {
        router.push(`/my-games?registered=true`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-2xl">
      <Link href={`/tournaments/${slug}`} className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Tournament
      </Link>

      <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="pb-6 border-b border-gray-800">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Entry Registration</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Register for Tournament</h1>
          <p className="text-xs text-gray-400 mt-1">Tournament ID / Slug: {slug}</p>
        </div>

        <div className="py-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
              Select Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { value: "MEN_SINGLES", label: "Men's Singles" },
                { value: "MEN_DOUBLES", label: "Men's Doubles" },
                { value: "MIXED_DOUBLES", label: "Mixed Doubles" },
                { value: "BLIND_DRAW_DOUBLES", label: "Blind-Draw Doubles 🎯" },
              ].map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setCategory(c.value as TournamentCategory)}
                  className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    category === c.value
                      ? "border-emerald-500 bg-emerald-500/10 text-white"
                      : "border-gray-800 bg-gray-950/60 text-gray-400 hover:border-gray-700"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {(category === "MEN_DOUBLES" || category === "MIXED_DOUBLES" || category === "BLIND_DRAW_DOUBLES") && (
            <div className="rounded-2xl border border-gray-800 bg-gray-950/50 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Doubles Partner Arrangement</span>
                <span className="text-[10px] text-amber-400 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" /> Blind-Draw Available
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPartnerType("BLIND_DRAW")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border ${
                    partnerType === "BLIND_DRAW"
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/40"
                      : "bg-gray-900 text-gray-400 border-gray-800"
                  }`}
                >
                  Draw Random Partner Wheel
                </button>
                <button
                  type="button"
                  onClick={() => setPartnerType("MY_PARTNER")}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border ${
                    partnerType === "MY_PARTNER"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/40"
                      : "bg-gray-900 text-gray-400 border-gray-800"
                  }`}
                >
                  I Have a Partner
                </button>
              </div>

              {partnerType === "MY_PARTNER" && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] text-gray-400">Partner Full Name</label>
                    <Input
                      placeholder="e.g. Karthik Rao"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-400">Partner Mobile</label>
                    <Input
                      placeholder="9876543210"
                      value={partnerPhone}
                      onChange={(e) => setPartnerPhone(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="rounded-2xl bg-gray-950 p-4 border border-gray-800 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Tournament Entry Fee:</span>
              <span className="text-white font-semibold">{formatMoney(entryFee)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Platform & Court Surcharge:</span>
              <span className="text-emerald-400 font-semibold">FREE</span>
            </div>
            <div className="pt-2 border-t border-gray-800 flex justify-between text-sm font-bold text-white">
              <span>Total Payable:</span>
              <span className="text-emerald-400 font-mono text-base">{formatMoney(entryFee)}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          variant="primary"
          size="lg"
          className="w-full gap-2 shadow-lg shadow-emerald-500/25"
        >
          <CreditCard className="w-4 h-4" />
          {isProcessing ? "Opening Razorpay..." : `Pay ${formatMoney(entryFee)} via Razorpay`}
        </Button>

        <p className="mt-4 text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          100% Secure Payment powered by Razorpay India
        </p>
      </div>
    </div>
  );
}
