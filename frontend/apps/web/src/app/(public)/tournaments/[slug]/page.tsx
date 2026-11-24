"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  MapPin,
  Clock,
  Lock,
  UserPlus,
  Check,
  ChevronDown,
  Users,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Hand,
  Trophy,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";
import { getPartnersForTournament } from "@/data/partners";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TournamentDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || "bengaluru-open-badminton-2026";

  const { showToast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("md_inter");
  const [partnerMode, setPartnerMode] = useState<"bring" | "random">("bring");
  const [partnerPhone, setPartnerPhone] = useState("90123 45678");
  const [paymentMode, setPaymentMode] = useState<"full" | "split">("full");
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPaying, setIsPaying] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const partnerCandidates = getPartnersForTournament(slug);

  // Countdown timer for Slot held (09:42 format)
  const [timeLeft, setTimeLeft] = useState(582); // 9 mins 42 secs
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const categories = [
    {
      id: "md_inter",
      name: "Men's Doubles (BYOP)",
      sub: "Bring your partner or pair up in BYOP pool • 32 teams",
      price: 1200,
      fee: 40,
      left: "4 slots left",
      leftColor: "text-amber-600",
    },
    {
      id: "xd_open",
      name: "Mixed Doubles (BYOP)",
      sub: "Bring your partner or pair up in BYOP pool • 24 teams",
      price: 1200,
      fee: 40,
      left: "6 slots left",
      leftColor: "text-amber-600",
    },
    {
      id: "ms_open",
      name: "Men's Singles • Advanced",
      sub: "Open category • 32 players",
      price: 800,
      fee: 30,
      left: "2 slots left",
      leftColor: "text-red-500",
    },
    {
      id: "blind_draw",
      name: "Host Random Draw Doubles 🎯",
      sub: "Solo entry • All teams randomly drawn by tournament host",
      price: 1100,
      fee: 35,
      left: "8 slots left",
      leftColor: "text-emerald-600",
    },
  ];

  const currentCat = categories.find((c) => c.id === selectedCategory) || categories[0];
  const totalAmount =
    paymentMode === "split" ? currentCat.price / 2 + currentCat.fee : currentCat.price + currentCat.fee;

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showToast(isBookmarked ? "Removed from saved tournaments" : "Tournament saved to your bookmarks!", "success");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Bengaluru Open Badminton 2026",
        text: "Join me at Bengaluru Open Badminton! Registration open on Gelavu.",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tournament link copied to clipboard!", "success");
    }
  };

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaidSuccess(true);
      showToast("Payment successful! Registration confirmed.", "success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-gray-900 pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Tournaments</span>
          </Link>

          <GelavuLogo variant="light" size="md" href="/" />

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              className={`p-2 rounded-full border transition-all ${
                isBookmarked
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
              title="Save tournament"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-white text-gray-600 border border-gray-200 hover:border-gray-300 transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (approx 63%) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hero Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#2D2A57] via-[#1E1B3D] to-[#111024] p-7 sm:p-9 text-white shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

              <div className="inline-flex items-center gap-1 rounded-full bg-[#D4FF00] px-3 py-1 text-[11px] font-black tracking-wider text-black uppercase mb-4 shadow-sm">
                REGISTRATION OPEN
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black leading-tight tracking-tight text-white">
                Bengaluru Open Badminton 2026
              </h1>

              <div className="flex flex-wrap items-center gap-5 mt-5 text-xs sm:text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Sat & Sun · Upcoming Weekend</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Game Theory Arena, Indiranagar</span>
                </div>
              </div>
            </div>

            {/* 4 Stat Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
                <span className="text-[11px] font-semibold text-gray-500 block">Prize pool</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">₹1.5L</span>
              </div>
              <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
                <span className="text-[11px] font-semibold text-gray-500 block">Format</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">Groups + KO</span>
              </div>
              <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
                <span className="text-[11px] font-semibold text-gray-500 block">Scoring</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">21 • Best of 3</span>
              </div>
              <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
                <span className="text-[11px] font-semibold text-gray-500 block">Partners Wanted</span>
                <span className="text-lg font-black text-amber-600 mt-1 block">{partnerCandidates.length} Seeking</span>
              </div>
            </div>

            {/* Tabs Row */}
            <div className="flex items-center gap-6 border-b border-gray-200 pt-2 text-xs font-bold text-gray-500 overflow-x-auto">
              {["Overview", "BYOP Partner Pool", "Categories", "Players (86)", "Rules & FAQ"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 transition-colors shrink-0 cursor-pointer ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black font-black"
                      : "hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* PARTNER POOL (Seeking Pair) Section */}
            {(activeTab === "Overview" || activeTab === "BYOP Partner Pool") && (
              <div className="rounded-3xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-amber-600" />
                    <div>
                      <h2 className="text-sm font-black text-gray-900">
                        BYOP Partner Pool: Players Seeking a Pair ({partnerCandidates.length})
                      </h2>
                      <p className="text-[11px] text-gray-500">
                        In BYOP, if you don&apos;t have a partner, check playing styles & ratings to pair up before registering!
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/tournaments/${slug}/register?category=BLIND_DRAW_DOUBLES`}
                    className="inline-flex items-center gap-1 rounded-full bg-white border border-gray-300 px-3 py-1 text-xs font-bold text-gray-800 hover:border-black transition shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Prefer Host Random Draw? 🎯
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-1">
                  {partnerCandidates.map((cand) => (
                    <div
                      key={cand.id}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs transition hover:border-black/40 hover:shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-white font-bold text-xs shadow-xs">
                            {cand.initials}
                            {cand.verified && (
                              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <ShieldCheck className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-bold text-gray-900">{cand.name}</span>
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                                <Trophy className="w-2.5 h-2.5" /> Rank #{cand.circuitRank}
                              </span>
                              <span className="text-[11px] text-gray-500 font-mono">
                                Rating: <strong>{cand.rating}</strong> ({cand.winRate} win)
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                              <span className="rounded-lg bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 font-bold text-emerald-800">
                                {cand.playStyle}
                              </span>
                              <span className="rounded-lg bg-gray-100 px-2 py-0.5 font-semibold text-gray-700 flex items-center gap-1">
                                <Hand className="w-3 h-3 text-gray-400" /> {cand.dominantHand}
                              </span>
                            </div>

                            <p className="text-xs text-gray-600 italic pt-1">
                              &ldquo;{cand.lookingForNote}&rdquo;
                            </p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                          <Link
                            href={`/players/${cand.id}`}
                            className="text-xs font-semibold text-gray-500 hover:text-black underline underline-offset-4 cursor-pointer"
                          >
                            View Profile
                          </Link>
                          <Link
                            href={`/tournaments/${slug}/register?pairWith=${cand.id}&partnerName=${encodeURIComponent(
                              cand.name
                            )}&playStyle=${encodeURIComponent(cand.playStyle)}`}
                            className="inline-flex items-center gap-1.5 rounded-full bg-black hover:bg-gray-800 text-white px-4 py-2 text-xs font-bold transition shadow-xs cursor-pointer"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            Pair Up & Enter
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Card */}
            {activeTab === "Overview" && (
              <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs space-y-4">
                <h2 className="text-sm font-black text-gray-900">About the Tournament</h2>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  Three days of competitive badminton across singles, doubles and mixed categories. Eight synthetic and
                  teak courts, certified state umpires, live digital scoring and a public bracket. Winners get trophies, cash
                  prizes and a shareable winner poster on the Gelavu circuit.
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#FAF9F5] border border-amber-200/70 px-3.5 py-2 text-xs font-bold text-gray-800">
                    🏆 1st ₹60,000
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#FAF9F5] border border-gray-200 px-3.5 py-2 text-xs font-bold text-gray-800">
                    🥈 2nd ₹30,000
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#FAF9F5] border border-amber-300/40 px-3.5 py-2 text-xs font-bold text-gray-800">
                    🥉 3rd ₹15,000
                  </span>
                </div>
              </div>
            )}

            {/* Categories Section */}
            {(activeTab === "Overview" || activeTab === "Categories") && (
              <div className="space-y-3">
                <h2 className="text-sm font-black text-gray-900">Tournament Categories</h2>
                <div className="space-y-2.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`cursor-pointer rounded-2xl p-4 sm:p-4.5 flex items-center justify-between transition-all ${
                          isSelected
                            ? "bg-[#F7FDE8] border-2 border-[#A3E635] shadow-xs"
                            : "bg-white border border-gray-200/90 hover:border-gray-300"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-gray-900">{cat.name}</span>
                            {isSelected && <span className="h-2 w-2 rounded-full bg-[#84CC16]" />}
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">{cat.sub}</p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-gray-900 block">
                            ₹{cat.price.toLocaleString("en-IN")}
                          </span>
                          <span className={`text-[11px] font-bold ${cat.leftColor} block mt-0.5`}>
                            {cat.left}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Confirmed Players Tab */}
            {activeTab === "Players (86)" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-black text-gray-900">Confirmed Players & Pairs (86)</h2>
                  <span className="text-xs text-gray-500">Seedings update Friday 6 PM</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { name: "Vikram Patel & Karthik Reddy", category: "Men's Doubles", seed: "Seed #1", style: "Lefty Angles + Backcourt Attack" },
                    { name: "Rohan Kumar & Ananya Sharma", category: "Mixed Doubles", seed: "Seed #2", style: "Rear Smashes + Fast Net Play" },
                    { name: "Suresh Hegde & Manoj Gowda", category: "Men's Doubles", seed: "Seed #3", style: "High Stamina Baseline" },
                    { name: "Nitin Kamath & Partner TBD (Blind Draw)", category: "Blind Draw Doubles", seed: "Unseeded", style: "Tactical Placement" },
                  ].map((pair, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-gray-900 block">{pair.name}</span>
                        <span className="text-[11px] text-gray-500">{pair.category} · {pair.style}</span>
                      </div>
                      <span className="text-xs font-mono font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                        {pair.seed}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rules & FAQ Tab */}
            {activeTab === "Rules & FAQ" && (
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs space-y-3 text-xs text-gray-600 leading-relaxed">
                <h2 className="text-sm font-black text-gray-900">Tournament Rules & Guidelines</h2>
                <ul className="list-disc pl-4 space-y-1.5">
                  <li>BWF standard feather shuttlecocks provided by the tournament committee.</li>
                  <li>Non-marking badminton shoes are strictly mandatory on synthetic and teak courts.</li>
                  <li>Warm-up courts available 30 minutes before first round matches.</li>
                  <li>In Blind-Draw categories, pairs are auto-matched by circuit rating tier.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Register Card (approx 37%) */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-lg space-y-5">
              {/* Card Header & Slot Held Timer */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900">Quick Entry</h3>
                <div className="flex items-center gap-1 rounded-full bg-[#FEF3C7] border border-amber-300/60 px-3 py-1 text-[11px] font-bold text-amber-800">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Slot held {formatTimer(timeLeft)}</span>
                </div>
              </div>

              {/* CATEGORY Select */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                  CATEGORY
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800 pr-9 focus:outline-none focus:border-black cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* PARTNER Segmented & Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                    PARTNER
                  </label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("Partner Pool (Seeking Pair)")}
                    className="text-[11px] font-bold text-amber-600 hover:underline cursor-pointer"
                  >
                    Browse {partnerCandidates.length} seeking pair →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPartnerMode("bring")}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      partnerMode === "bring"
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    I Have Partner
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerMode("random")}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      partnerMode === "random"
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Random Draw 🎯
                  </button>
                </div>

                {partnerMode === "bring" ? (
                  <div className="relative mt-2">
                    <div className="flex items-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 focus-within:border-black transition-colors">
                      <span className="text-gray-400 font-normal mr-2">+91</span>
                      <input
                        type="tel"
                        value={partnerPhone}
                        onChange={(e) => setPartnerPhone(e.target.value)}
                        placeholder="Partner phone number"
                        className="w-full bg-transparent text-xs font-semibold focus:outline-none"
                      />
                      <UserPlus className="w-4 h-4 text-gray-400 shrink-0 ml-1 cursor-pointer hover:text-black" />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-2.5 text-[11px] text-amber-800 leading-relaxed">
                    🎲 <strong>Host Random Draw:</strong> Solo entry. The Tournament Host spins the official Picker Wheel to form randomized, balanced teams before Round 1.
                  </div>
                )}
              </div>

              {/* PAYMENT Segmented */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                  PAYMENT
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMode("full")}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      paymentMode === "full"
                        ? "border-2 border-black bg-white text-black font-black"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    I pay full
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("split")}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      paymentMode === "split"
                        ? "border-2 border-black bg-white text-black font-black"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Split with partner
                  </button>
                </div>
              </div>

              {/* Fee Summary */}
              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs text-gray-600 font-medium">
                <div className="flex items-center justify-between">
                  <span>Entry fee</span>
                  <span>
                    ₹{(paymentMode === "split" ? currentCat.price / 2 : currentCat.price).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Platform fee</span>
                  <span>₹{currentCat.fee}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200 font-black text-gray-900 text-sm">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* CTA Pay Button */}
              {paidSuccess ? (
                <div className="w-full rounded-2xl bg-emerald-600 text-white py-3.5 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-md">
                  <Check className="w-4 h-4" /> Registration Confirmed!
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handlePay}
                    disabled={isPaying}
                    className="w-full rounded-2xl bg-black hover:bg-gray-800 text-white py-3.5 px-4 text-xs font-black flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#D4FF00]" />
                    <span>
                      {isPaying ? "Processing UPI..." : `Pay ₹${totalAmount.toLocaleString("en-IN")} via UPI`}
                    </span>
                  </button>
                  <Link
                    href={`/tournaments/${slug}/register`}
                    className="w-full rounded-2xl border border-gray-300 hover:border-black text-gray-800 hover:text-black py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 transition text-center cursor-pointer"
                  >
                    Full Registration Form →
                  </Link>
                </div>
              )}

              <p className="text-center text-[10px] text-gray-400 font-medium">
                Secured by Razorpay • UPI, cards & netbanking
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
