"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export default function TournamentDetailPage() {
  const { showToast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("md_inter");
  const [partnerMode, setPartnerMode] = useState<"bring" | "random">("bring");
  const [partnerPhone, setPartnerPhone] = useState("90123 45678");
  const [paymentMode, setPaymentMode] = useState<"full" | "split">("full");
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPaying, setIsPaying] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

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
      name: "Men's Doubles • Intermediate",
      sub: "Bring your partner • 32 teams",
      price: 1200,
      fee: 60,
      left: "6 left",
      leftColor: "text-amber-600",
      status: "OPEN",
    },
    {
      id: "xd_open",
      name: "Mixed Doubles • Open",
      sub: "Random partner draw • 24 teams",
      price: 1000,
      fee: 50,
      left: "14 left",
      leftColor: "text-emerald-600",
      status: "OPEN",
    },
    {
      id: "ws_open",
      name: "Women's Singles • Open",
      sub: "16 players",
      price: 799,
      fee: 40,
      left: "Waitlist",
      leftColor: "text-red-500",
      status: "WAITLIST",
    },
  ];

  const currentCat = categories.find((c) => c.id === selectedCategory) || categories[0];
  const totalAmount = paymentMode === "split" ? currentCat.price / 2 + currentCat.fee : currentCat.price + currentCat.fee;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tournament link copied to clipboard!", "success");
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    showToast(!isBookmarked ? "Tournament saved to your bookmarks" : "Tournament removed from bookmarks", "info");
  };

  const handlePay = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaidSuccess(true);
      showToast("UPI Payment of ₹" + totalAmount + " Successful! Entry Confirmed.", "success");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-paper text-ink pb-16 font-sans">
      {/* Dedicated Header: Back, Gelavu Logo, Actions */}
      <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-line px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
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
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1 rounded-full bg-[#D4FF00] px-3 py-1 text-[11px] font-black tracking-wider text-black uppercase mb-4 shadow-sm">
                REGISTRATION OPEN
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl lg:text-[40px] font-black leading-tight tracking-tight text-white">
                Bengaluru Open Badminton 2025
              </h1>

              {/* Date & Location */}
              <div className="flex flex-wrap items-center gap-5 mt-5 text-xs sm:text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>14–16 Mar</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>Koramangala Indoor Arena</span>
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
                <span className="text-lg font-black text-gray-900 mt-1 block">Knockout</span>
              </div>
              <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
                <span className="text-[11px] font-semibold text-gray-500 block">Scoring</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">21 • Best of 3</span>
              </div>
              <div className="rounded-2xl border border-gray-200/90 bg-white p-4 shadow-xs">
                <span className="text-[11px] font-semibold text-gray-500 block">Closes</span>
                <span className="text-lg font-black text-gray-900 mt-1 block">10 Mar</span>
              </div>
            </div>

            {/* Tabs Row */}
            <div className="flex items-center gap-6 border-b border-gray-200 pt-2 text-xs font-bold text-gray-500">
              {["Overview", "Categories", "Schedule", "Players (86)", "Rules & FAQ"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 transition-colors ${
                    activeTab === tab
                      ? "text-black border-b-2 border-black font-black"
                      : "hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* About Card */}
            <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs space-y-4">
              <h2 className="text-sm font-black text-gray-900">About</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                Three days of competitive badminton across singles, doubles and mixed categories. Eight courts,
                certified umpires, live scoring and a public bracket. Winners get trophies, cash prizes and a
                shareable winner poster.
              </p>

              {/* 3 Podium Badges */}
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

            {/* Categories Section */}
            <div className="space-y-3">
              <h2 className="text-sm font-black text-gray-900">Categories</h2>
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
                          {isSelected && (
                            <span className="h-2 w-2 rounded-full bg-[#84CC16]" />
                          )}
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
          </div>

          {/* Right Column: Sticky Register Card (approx 37%) */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-lg space-y-5">
              {/* Card Header & Slot Held Timer */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-900">Register</h3>
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
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">
                  PARTNER
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPartnerMode("bring")}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                      partnerMode === "bring"
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Bring partner
                  </button>
                  <button
                    type="button"
                    onClick={() => setPartnerMode("random")}
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
                      partnerMode === "random"
                        ? "bg-black text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    Random draw
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
                  <div className="rounded-xl bg-amber-50 border border-amber-200/80 p-2.5 text-[11px] text-amber-800">
                    🎲 You will be matched with another solo player before the tournament draw.
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
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
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
                    className={`rounded-xl py-2.5 text-xs font-bold transition-all ${
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
                  <span>₹{(paymentMode === "split" ? currentCat.price / 2 : currentCat.price).toLocaleString("en-IN")}</span>
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
              )}

              {/* Security Tag */}
              <p className="text-center text-[10px] text-gray-400 font-medium">
                Secured by Razorpay • UPI, cards & wallets
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
