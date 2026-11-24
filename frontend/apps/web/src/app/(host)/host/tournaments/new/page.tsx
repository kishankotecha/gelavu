"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Sparkles, Trophy, Calendar, IndianRupee, Layers } from "lucide-react";
import { GoogleCourtLocationPicker, POPULAR_BADMINTON_VENUES, type BadmintonCourtVenue } from "@/features/host/GoogleCourtLocationPicker";

export default function CreateTournamentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [selectedVenue, setSelectedVenue] = useState<BadmintonCourtVenue | null>(POPULAR_BADMINTON_VENUES[0]);
  const [customVenueName, setCustomVenueName] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [category, setCategory] = useState("Men's Doubles (BYOP)");
  const [tournamentDate, setTournamentDate] = useState("2026-08-22");
  const [courtsBooked, setCourtsBooked] = useState("4");
  const [entryFee, setEntryFee] = useState("1200");
  const [prizePool, setPrizePool] = useState("35000");
  const [maxEntries, setMaxEntries] = useState("32");
  const [drawMode, setDrawMode] = useState<"standard" | "wheel">("wheel");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      // In production this saves to state/db; routes to host fixtures & entries
      router.push("/host/tournaments/tour-1/entries");
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl text-[#1E293B]">
      {/* Breadcrumb Back Link */}
      <Link href="/host" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#1D4A38] transition-colors mb-6 cursor-pointer">
        <ArrowLeft className="w-3.5 h-3.5 text-[#1D4A38]" />
        <span>Back to Host Command Centre</span>
      </Link>

      <div className="rounded-3xl border border-[#E2E6DD] bg-white p-6 sm:p-10 shadow-sm space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-[#EEF0E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] border border-[#C5D5CA] px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#1D4A38]">
              <Trophy className="w-3.5 h-3.5" /> Host Tournament Wizard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1E293B] mt-2 tracking-tight">Create & Host Tournament</h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-1">
              Select verified badminton courts via Google Maps, set draw rules, and open registration.
            </p>
          </div>

          <div className="rounded-2xl border border-[#E2E6DD] bg-[#F9FAF6] p-3 text-right shrink-0">
            <span className="text-[10px] text-[#64748B] uppercase font-bold block">Status</span>
            <span className="text-xs font-black text-[#1D4A38] flex items-center gap-1 justify-end mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#1D4A38] animate-pulse" /> Draft Setup
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* 1. Tournament Title & Format */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#475569] block mb-1.5">
                Tournament Title
              </label>
              <input
                type="text"
                placeholder="e.g. Bengaluru Morning Doubles Clash 2026"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full h-12 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-4 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#1D4A38] focus:outline-none focus:ring-1 focus:ring-[#1D4A38] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] block mb-1.5">
                  Category & Pairing
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs font-semibold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none cursor-pointer"
                >
                  <option value="Men's Doubles (BYOP)">Men&apos;s Doubles (BYOP - Bring Your Own Partner)</option>
                  <option value="Men's Singles">Men&apos;s Singles</option>
                  <option value="Mixed Doubles">Mixed Doubles</option>
                  <option value="Random Wheel Doubles">Random Draw Doubles (Host Picker Wheel)</option>
                  <option value="Women's Singles">Women&apos;s Singles</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] block mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#1D4A38]" /> Tournament Date
                </label>
                <input
                  type="date"
                  value={tournamentDate}
                  onChange={(e) => setTournamentDate(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs font-semibold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#475569] block mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs font-semibold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 2. Google Maps Court Location Search */}
          <div className="pt-2 border-t border-[#EEF0E8]">
            <GoogleCourtLocationPicker
              selectedVenue={selectedVenue}
              onSelectVenue={setSelectedVenue}
              customVenueName={customVenueName}
              onCustomVenueNameChange={setCustomVenueName}
              customAddress={customAddress}
              onCustomAddressChange={setCustomAddress}
            />
          </div>

          {/* 3. Capacity, Courts & Financials */}
          <div className="pt-4 border-t border-[#EEF0E8] space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#1D4A38]" />
              <span>Court Capacity & Entry Fees</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                  Synthetic/Wood Courts Booked
                </label>
                <input
                  type="number"
                  min="1"
                  max="32"
                  value={courtsBooked}
                  onChange={(e) => setCourtsBooked(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm font-bold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                  Max Teams / Slots
                </label>
                <input
                  type="number"
                  min="4"
                  max="128"
                  value={maxEntries}
                  onChange={(e) => setMaxEntries(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm font-bold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#64748B] block mb-1 flex items-center gap-1">
                  <IndianRupee className="w-3 h-3 text-[#1D4A38]" /> Entry Fee (₹ / team)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm font-bold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#64748B] block mb-1 flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-amber-600" /> Prize Pool (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  required
                  className="w-full h-11 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm font-bold text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 4. Anti-Match-Fixing Draw Mode Selection */}
          <div className="pt-4 border-t border-[#EEF0E8] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#475569] block">
              Draw Method & Fixtures Policy
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Live Picker Wheel */}
              <div
                onClick={() => setDrawMode("wheel")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  drawMode === "wheel"
                    ? "border-[#1D4A38] bg-[#E8EFEA] ring-1 ring-[#1D4A38]"
                    : "border-[#E2E6DD] bg-[#F9FAF6] hover:border-[#CBD2C5]"
                }`}
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm ${
                  drawMode === "wheel" ? "bg-[#1D4A38] text-white" : "bg-white text-[#64748B] border border-[#D5D9CE]"
                }`}>
                  🎯
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1E293B]">Live Picker Wheel Draw</span>
                    <span className="rounded-full bg-[#1D4A38]/10 text-[#1D4A38] px-2 py-0.5 text-[9px] font-black uppercase">
                      Anti-Rigging
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Spin the wheel live in front of participants for random doubles pairings and transparent bracket slots with verifiable random seed.
                  </p>
                </div>
              </div>

              {/* Option 2: Standard Seeding */}
              <div
                onClick={() => setDrawMode("standard")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  drawMode === "standard"
                    ? "border-[#1D4A38] bg-[#E8EFEA] ring-1 ring-[#1D4A38]"
                    : "border-[#E2E6DD] bg-[#F9FAF6] hover:border-[#CBD2C5]"
                }`}
              >
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-sm ${
                  drawMode === "standard" ? "bg-[#1D4A38] text-white font-black" : "bg-white text-[#64748B] border border-[#D5D9CE]"
                }`}>
                  📊
                </span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1E293B]">Ranked Seeding Logic</span>
                    <span className="rounded-full bg-white text-[#64748B] border border-[#D5D9CE] px-2 py-0.5 text-[9px] font-bold uppercase">
                      Standard
                    </span>
                  </div>
                  <p className="text-[11px] text-[#475569] leading-relaxed">
                    Places Top 1–4 seeded players at opposite ends of the bracket based on historical Gelavu match ratings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-[#EEF0E8]">
            <Link
              href="/host"
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-[#D5D9CE] bg-white text-xs font-bold text-[#1E293B] hover:bg-[#F5F6F0] text-center transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1D4A38] hover:bg-[#16392B] text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing Tournament...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Publish Tournament & Manage Entries →</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
