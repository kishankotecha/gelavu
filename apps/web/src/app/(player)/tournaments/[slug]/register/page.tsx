"use client";

import React, { useState, use, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { TournamentCategory } from "@/types";
import { formatMoney } from "@/utils/formatters";
import { openRazorpayCheckout } from "@/lib/razorpay";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Users,
  Lock,
} from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";
import { getPartnersForTournament } from "@/data/partners";

function RegisterContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pairWithId = searchParams.get("pairWith");
  const queryPartnerName = searchParams.get("partnerName") || "";
  const queryPlayStyle = searchParams.get("playStyle") || "";
  const queryCategory = searchParams.get("category");

  const [category, setCategory] = useState<TournamentCategory>(
    queryCategory === "BLIND_DRAW_DOUBLES"
      ? "BLIND_DRAW_DOUBLES"
      : pairWithId
      ? "MEN_DOUBLES"
      : "MEN_DOUBLES"
  );

  const [byopMode, setByopMode] = useState<"HAVE_PARTNER" | "SEEKING_PARTNER">(
    pairWithId ? "HAVE_PARTNER" : "HAVE_PARTNER"
  );

  const [partnerName, setPartnerName] = useState(queryPartnerName);
  const [partnerPhone, setPartnerPhone] = useState(pairWithId ? "98450 12345 (Verified)" : "");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(pairWithId);
  const [selectedPlayStyle, setSelectedPlayStyle] = useState<string>(queryPlayStyle);
  const [isProcessing, setIsProcessing] = useState(false);

  const poolCandidates = getPartnersForTournament(slug);

  const categoryOptions = [
    {
      value: "MEN_DOUBLES" as TournamentCategory,
      title: "Men's Doubles (BYOP)",
      sub: "Bring your own partner or pair up in pool",
      fee: 1200,
    },
    {
      value: "MIXED_DOUBLES" as TournamentCategory,
      title: "Mixed Doubles (BYOP)",
      sub: "Bring your own partner or pair up in pool",
      fee: 1200,
    },
    {
      value: "BLIND_DRAW_DOUBLES" as TournamentCategory,
      title: "Host Random Draw Doubles 🎯",
      sub: "Solo entry • Host draws random teams",
      fee: 1100,
    },
    {
      value: "MEN_SINGLES" as TournamentCategory,
      title: "Men's Singles",
      sub: "Individual knockout tournament",
      fee: 800,
    },
  ];

  const currentOption = categoryOptions.find((c) => c.value === category) || categoryOptions[0];
  const entryFee = currentOption.fee;

  const handleSelectPoolPartner = (cand: { id: string; name: string; playStyle: string }) => {
    setSelectedCandidateId(cand.id);
    setPartnerName(cand.name);
    setSelectedPlayStyle(cand.playStyle);
    setPartnerPhone("98450 12345 (Verified)");
    setByopMode("HAVE_PARTNER");
  };

  const handleClearPartner = () => {
    setSelectedCandidateId(null);
    setPartnerName("");
    setSelectedPlayStyle("");
    setPartnerPhone("");
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    const regId = `reg-${Date.now()}`;
    try {
      await openRazorpayCheckout({
        amount: entryFee * 100,
        currency: "INR",
        name: "Gelavu Tournaments",
        description: `Entry Fee for ${slug}`,
        handler: () => {
          if (category === "BLIND_DRAW_DOUBLES") {
            router.push(`/partner-draw/${regId}`);
          } else {
            router.push(`/my-games?registered=true&partner=${encodeURIComponent(partnerName || "Seeking Partner")}`);
          }
        },
      });
    } catch {
      if (category === "BLIND_DRAW_DOUBLES") {
        router.push(`/partner-draw/${regId}`);
      } else {
        router.push(`/my-games?registered=true&partner=${encodeURIComponent(partnerName || "Seeking Partner")}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-gray-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href={`/tournaments/${slug}`}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tournament</span>
          </Link>

          <GelavuLogo variant="light" size="md" href="/" />

          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Secure Entry</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-9 shadow-lg space-y-7">
          {/* Card Header */}
          <div className="border-b border-gray-100 pb-5">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 block">
              Official Registration
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
              Tournament Entry
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Bengaluru Open Badminton 2026 · Game Theory Arena, Indiranagar
            </p>
          </div>

          {/* 1. Category Selection */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-gray-400 block">
              1. Select Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categoryOptions.map((opt) => {
                const isSelected = category === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCategory(opt.value)}
                    className={`rounded-2xl p-4 text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "border-black bg-gray-50 shadow-xs ring-1 ring-black"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-gray-900">
                        {opt.title}
                      </span>
                      <span className="text-xs font-black text-gray-900">
                        {formatMoney(opt.fee)}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                      {opt.sub}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Partner Configuration */}
          {(category === "MEN_DOUBLES" || category === "MIXED_DOUBLES") && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gray-700" />
                  2. BYOP Partner Arrangement
                </span>
                <span className="text-[11px] text-gray-500 font-medium">Bring partner or pair up</span>
              </div>

              {/* State A: Partner Already Selected */}
              {selectedCandidateId && partnerName ? (
                <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-xs">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                          Paired Partner Selected
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">{partnerName}</h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleClearPartner}
                      className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-black transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Change
                    </button>
                  </div>

                  {selectedPlayStyle && (
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs">
                      <span className="rounded-lg bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
                        {selectedPlayStyle}
                      </span>
                      <Link
                        href={`/players/${selectedCandidateId}`}
                        target="_blank"
                        className="text-[11px] font-semibold text-gray-600 underline hover:text-black"
                      >
                        Inspect Full Profile ↗
                      </Link>
                    </div>
                  )}

                  <p className="text-[11px] text-gray-600 leading-relaxed pt-0.5">
                    ✓ Both players will be entered as an official doubles pair in the tournament draw.
                  </p>
                </div>
              ) : (
                /* State B: No partner selected yet - choose Bring or Find in Pool */
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setByopMode("HAVE_PARTNER")}
                      className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        byopMode === "HAVE_PARTNER"
                          ? "bg-black text-white shadow-xs"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      I Have a Partner
                    </button>
                    <button
                      type="button"
                      onClick={() => setByopMode("SEEKING_PARTNER")}
                      className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                        byopMode === "SEEKING_PARTNER"
                          ? "bg-black text-white shadow-xs"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      Find in BYOP Pool ({poolCandidates.length})
                    </button>
                  </div>

                  {byopMode === "HAVE_PARTNER" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                          Partner Full Name
                        </label>
                        <Input
                          placeholder="e.g. Karthik Rao"
                          value={partnerName}
                          onChange={(e) => setPartnerName(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                          Partner Mobile Number
                        </label>
                        <Input
                          placeholder="98765 43210"
                          value={partnerPhone}
                          onChange={(e) => setPartnerPhone(e.target.value)}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {byopMode === "SEEKING_PARTNER" && (
                    <div className="space-y-2.5 pt-1">
                      <p className="text-xs text-gray-600">
                        Select an available solo player from the BYOP pool to team up immediately:
                      </p>
                      <div className="space-y-2">
                        {poolCandidates.map((cand) => (
                          <div
                            key={cand.id}
                            className="rounded-xl border border-gray-200 bg-white p-3 flex items-center justify-between gap-3 hover:border-gray-400 transition"
                          >
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-gray-900">{cand.name}</span>
                                <span className="rounded-md bg-emerald-50 text-[10px] font-semibold text-emerald-700 px-1.5 py-0.5">
                                  {cand.playStyle}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 truncate mt-0.5">
                                Rating: {cand.rating} • {cand.dominantHand}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleSelectPoolPartner(cand)}
                              className="rounded-lg bg-black text-white px-3 py-1.5 text-xs font-bold shrink-0 hover:bg-gray-800 transition cursor-pointer"
                            >
                              Pair Up
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Host Random Draw Notice */}
          {category === "BLIND_DRAW_DOUBLES" && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Host Random Team Draw (Solo Entry)
                </h3>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                You are registering as a <strong>solo participant</strong>. No partner is required at checkout.
              </p>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                When registrations close, the <strong>Tournament Host</strong> will spin the official Picker Wheel to pair solo players into balanced teams for the knockout draw.
              </p>
            </div>
          )}

          {/* 3. Fee Breakdown */}
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-2 text-xs text-gray-600 font-medium">
            <div className="flex justify-between">
              <span>Entry Fee ({currentOption.title}):</span>
              <span className="font-bold text-gray-900">{formatMoney(entryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>Court Surcharge & Shuttles:</span>
              <span className="font-bold text-emerald-700">INCLUDED</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-black text-gray-900">
              <span>Total Payable:</span>
              <span className="text-base text-gray-900 font-mono">{formatMoney(entryFee)}</span>
            </div>
          </div>

          {/* CTA Payment */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full rounded-2xl bg-black hover:bg-gray-800 text-white py-4 px-6 text-sm font-black flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all cursor-pointer disabled:opacity-60"
            >
              <Lock className="w-4 h-4 text-[#D4FF00]" />
              <span>
                {isProcessing ? "Opening Razorpay..." : `Pay ${formatMoney(entryFee)} via UPI / Card`}
              </span>
            </button>

            <p className="text-center text-[11px] text-gray-400 font-medium flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Secure Payment • Razorpay India
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TournamentRegisterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F5F0] flex items-center justify-center text-xs font-bold text-gray-500">
          Loading checkout...
        </div>
      }
    >
      <RegisterContent slug={slug} />
    </Suspense>
  );
}
