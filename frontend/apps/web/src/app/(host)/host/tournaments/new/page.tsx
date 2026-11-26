"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Calendar,
  Clock,
  MapPin,
  Star,
  BarChart3,
  Dices,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import {
  GoogleCourtLocationPicker,
  POPULAR_BADMINTON_VENUES,
  type BadmintonCourtVenue,
} from "@/features/host/GoogleCourtLocationPicker";
import { createNewTournament } from "@/lib/tournamentStore";
import {
  RealisticTrophy,
  RealisticSilverMedal,
  RealisticBronzeMedal,
  RealisticMensDoublesIcon,
  RealisticWomensSinglesIcon,
  RealisticMensSinglesIcon,
  RealisticMixedDoublesIcon,
  RealisticRandomWheelIcon,
  RealisticMastersDoublesIcon,
} from "@/components/common/RealisticSportsIcons";

// 3 Curated Fast Blueprint Presets matching reference
const BLUEPRINT_PRESETS = [
  {
    id: "city_open",
    label: "City Grand Slam",
    meta: "6C · ₹50k",
    title: "Bengaluru City Badminton Grand Slam 2026",
    host: "Apex Badminton Academy",
    tier: "Open Semi-Pro" as const,
    courts: "6",
    maxEntries: "32",
    entryFee: "1400",
    prizePool: "50000",
    winnerShare: "30000",
    runnerUpShare: "12000",
    semiFinalShare: "8000",
    categories: ["Men's Doubles - BYOP", "Mixed Doubles", "Men's Singles"],
    isMultiDay: true,
    rules: "Best of 3 to 21 (BWF)",
    shuttle: "Yonex Aerosensa AS-30",
  },
  {
    id: "weekend_sprint",
    label: "Weekend Sprint",
    meta: "4C · ₹20k",
    title: "Bengaluru Weekend Rapid Badminton Clash",
    host: "Apex Badminton Academy",
    tier: "Open Semi-Pro" as const,
    courts: "4",
    maxEntries: "16",
    entryFee: "1000",
    prizePool: "20000",
    winnerShare: "12000",
    runnerUpShare: "5000",
    semiFinalShare: "3000",
    categories: ["Men's Doubles - BYOP", "Random wheel doubles"],
    isMultiDay: false,
    rules: "Best of 3 to 15 (Fast Sprint)",
    shuttle: "Yonex Aerosensa AS-30",
  },
  {
    id: "blind_draw",
    label: "Blind Draw Masters",
    meta: "4C · ₹25k",
    title: "Silicon City Blind Draw Badminton Masters",
    host: "Apex Badminton Academy",
    tier: "Open Semi-Pro" as const,
    courts: "4",
    maxEntries: "24",
    entryFee: "800",
    prizePool: "25000",
    winnerShare: "15000",
    runnerUpShare: "6000",
    semiFinalShare: "4000",
    categories: ["Random wheel doubles", "Men's Singles"],
    isMultiDay: false,
    rules: "Best of 3 to 21 (BWF)",
    shuttle: "Yonex Aerosensa AS-30",
  },
];

export default function CreateTournamentPage() {
  const router = useRouter();
  const { showToast } = useToast();

  // ---------------------------------------------------------------------------
  // STATE: SECTION 01 - TOURNAMENT INFORMATION
  // ---------------------------------------------------------------------------
  const [activeBlueprint, setActiveBlueprint] = useState("city_open");
  const [title, setTitle] = useState("Bengaluru City Badminton Grand Slam 2026");
  const [hostName, setHostName] = useState("Apex Badminton Academy");
  const [tier, setTier] = useState<"Open Semi-Pro" | "Amateur / Community" | "Corporate Shield" | "Masters 35+">("Open Semi-Pro");

  // ---------------------------------------------------------------------------
  // STATE: SECTION 02 - DATES & SCHEDULE
  // ---------------------------------------------------------------------------
  const [isMultiDay, setIsMultiDay] = useState(true);
  const [startDate, setStartDate] = useState("2026-12-12");
  const [endDate, setEndDate] = useState("2026-12-13");
  const [registrationDeadline, setRegistrationDeadline] = useState("10 Dec - 11:59 PM");
  const [playerCheckIn, setPlayerCheckIn] = useState("08:30 AM");
  const [firstMatch, setFirstMatch] = useState("09:00 AM");

  // ---------------------------------------------------------------------------
  // STATE: SECTION 03 - VENUE & COURTS
  // ---------------------------------------------------------------------------
  const [city, setCity] = useState("Bengaluru");
  const [selectedVenue, setSelectedVenue] = useState<BadmintonCourtVenue | null>(POPULAR_BADMINTON_VENUES[0]);
  const [customVenueName, setCustomVenueName] = useState("");
  const [customAddress, setCustomAddress] = useState("");
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [courtsBooked, setCourtsBooked] = useState("6");
  const [amenities, setAmenities] = useState<string[]>([
    "Parking",
    "Air-conditioned",
    "Changing rooms",
    "First aid",
  ]);

  // ---------------------------------------------------------------------------
  // STATE: SECTION 04 - DIVISIONS & RULES
  // ---------------------------------------------------------------------------
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Men's Doubles - BYOP",
    "Mixed Doubles",
    "Men's Singles",
  ]);
  const [scoringPreset, setScoringPreset] = useState("Best of 3 to 21 (BWF)");
  const [matchShuttlecock, setMatchShuttlecock] = useState("Yonex Aerosensa AS-30");

  // ---------------------------------------------------------------------------
  // STATE: SECTION 05 - ENTRY FEES & PRIZE POOL
  // ---------------------------------------------------------------------------
  const [maxTeams, setMaxTeams] = useState("32");
  const [entryFee, setEntryFee] = useState("1400");
  const [prizePool, setPrizePool] = useState("50000");
  const [winnerShare, setWinnerShare] = useState("30000");
  const [runnerUpShare, setRunnerUpShare] = useState("12000");
  const [semiFinalShare, setSemiFinalShare] = useState("8000");

  // ---------------------------------------------------------------------------
  // STATE: SECTION 06 - DRAW ENGINE & ANTI-RIGGING
  // ---------------------------------------------------------------------------
  const [drawEngine, setDrawEngine] = useState<"wheel" | "standard">("wheel");
  const [soloPlayerPairing, setSoloPlayerPairing] = useState(true);
  const [circuitRatingPoints, setCircuitRatingPoints] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  const totalSlotsNum = parseInt(maxTeams, 10) || 0;
  const entryFeeNum = parseInt(entryFee, 10) || 0;
  const prizePoolNum = parseInt(prizePool, 10) || 0;
  const courtsNum = parseInt(courtsBooked, 10) || 4;
  const projectedGross = totalSlotsNum * entryFeeNum;
  const estCourtCosts = courtsNum * 8 * 450; // 8 hrs @ ₹450/hr
  const hostNet = projectedGross - prizePoolNum - estCourtCosts;

  // Apply Blueprint
  const handleApplyBlueprint = (bp: typeof BLUEPRINT_PRESETS[0]) => {
    setActiveBlueprint(bp.id);
    setTitle(bp.title);
    setHostName(bp.host);
    setTier(bp.tier);
    setCourtsBooked(bp.courts);
    setMaxTeams(bp.maxEntries);
    setEntryFee(bp.entryFee);
    setPrizePool(bp.prizePool);
    setWinnerShare(bp.winnerShare);
    setRunnerUpShare(bp.runnerUpShare);
    setSemiFinalShare(bp.semiFinalShare);
    setSelectedCategories(bp.categories);
    setIsMultiDay(bp.isMultiDay);
    setScoringPreset(bp.rules);
    setMatchShuttlecock(bp.shuttle);
    showToast(`Loaded "${bp.label}" blueprint!`, "success");
  };

  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.length > 1
          ? prev.filter((c) => c !== catId)
          : prev
        : [...prev, catId]
    );
  };

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSaveDraft = () => {
    showToast("Tournament blueprint saved as draft.", "success");
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!title.trim()) {
      showToast("Please enter a tournament title.", "error");
      return;
    }

    setIsSubmitting(true);
    const venueName = selectedVenue ? selectedVenue.name : customVenueName || "Play9 Badminton Arena";
    const venueAddress = selectedVenue ? selectedVenue.address : customAddress || `${city}, Karnataka`;

    const newTournament = createNewTournament({
      title: title.trim(),
      sport: "BADMINTON",
      tier,
      hostName: hostName.trim() || "Apex Badminton Academy",
      city,
      venueName,
      address: venueAddress,
      startDate,
      endDate: isMultiDay ? endDate : startDate,
      entryFee: entryFeeNum,
      prizePool: prizePoolNum,
      maxEntries: totalSlotsNum,
      courtsCount: courtsNum,
      courtType: "BWF Approved Synthetic Mats",
      categories: selectedCategories,
      rulesSummary: `${scoringPreset}. ${matchShuttlecock}. Player Check-in at ${playerCheckIn}.`,
      drawMode: drawEngine,
      partnerDrawEnabled: soloPlayerPairing,
      scoringFormat: scoringPreset,
      equipment: matchShuttlecock,
    });

    showToast(`Tournament "${newTournament.title}" published!`, "success");

    setTimeout(() => {
      router.push(`/host/tournaments/${newTournament.id}/entries`);
    }, 500);
  };

  // Division catalogue items
  const divisionList = [
    {
      id: "Men's Doubles - BYOP",
      title: "Men's Doubles · BYOP",
      subtitle: "Bring your partner",
      icon: <RealisticMensDoublesIcon size={26} />,
    },
    {
      id: "Mixed Doubles",
      title: "Mixed Doubles",
      subtitle: "1 male + 1 female",
      icon: <RealisticMixedDoublesIcon size={26} />,
    },
    {
      id: "Men's Singles",
      title: "Men's Singles",
      subtitle: "1v1 knockout",
      icon: <RealisticMensSinglesIcon size={26} />,
    },
    {
      id: "Random wheel doubles",
      title: "Random wheel doubles",
      subtitle: "Solo players paired live",
      icon: <RealisticRandomWheelIcon size={26} />,
    },
    {
      id: "Women's Singles",
      title: "Women's Singles",
      subtitle: "1v1 knockout",
      icon: <RealisticWomensSinglesIcon size={26} />,
    },
    {
      id: "Masters 40+",
      title: "Masters 40+",
      subtitle: "Veteran category",
      icon: <RealisticMastersDoublesIcon size={26} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-24">
      {/* ============================================================ */}
      {/* 1. TOP HEADER & BREADCRUMB (Fluid Width & Mobile-Ready)       */}
      {/* ============================================================ */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <Link
              href="/host"
              className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-colors shadow-2xs shrink-0 cursor-pointer"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <span>Host studio</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span>New</span>
              </div>
              <h1 className="text-sm sm:text-xl font-bold text-slate-900 tracking-tight leading-tight whitespace-nowrap truncate">
                Create tournament
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>UPI escrow &amp; anti-rigging on</span>
            </div>

            <button
              type="button"
              onClick={handleSaveDraft}
              className="px-2.5 sm:px-4 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[11px] sm:text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
            >
              Save draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isSubmitting}
              className="px-3.5 sm:px-5 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-semibold transition-colors flex items-center gap-1 sm:gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50 whitespace-nowrap"
            >
              <span>Publish</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MAIN BODY: FORM CARDS (LEFT) + LIVE SUMMARY (RIGHT)       */}
      {/* ============================================================ */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        
        {/* QUICK START BLUEPRINT BANNER (Exact Dark Card Match) */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#0B101B] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm border border-slate-800/80">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-0.5">
              QUICK START
            </span>
            <p className="text-xs text-slate-300">
              Load a blueprint to autofill courts, divisions and rules.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {BLUEPRINT_PRESETS.map((bp) => {
              const isActive = activeBlueprint === bp.id;
              return (
                <button
                  key={bp.id}
                  type="button"
                  onClick={() => handleApplyBlueprint(bp)}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                      : "bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold"
                  }`}
                >
                  {bp.label} · {bp.meta}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col xl:flex-row items-stretch xl:items-start gap-6">
          
          {/* ========================================================== */}
          {/* LEFT EXPANDING COLUMN: CARDS 1 TO 6                        */}
          {/* ========================================================== */}
          <div className="w-full flex-1 min-w-0 space-y-6">
            <form onSubmit={handleSubmit} className="w-full space-y-6">

              {/* ------------------------------------------------------ */}
              {/* CARD 1: TOURNAMENT INFORMATION                          */}
              {/* ------------------------------------------------------ */}
              <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      Tournament Information
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Title, organiser and circuit tier
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-1">
                  {/* Tournament Title */}
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                      TITLE *
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Bengaluru City Badminton Grand Slam 2026"
                      required
                      className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Organiser & Tier */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        ORGANISER *
                      </label>
                      <input
                        type="text"
                        value={hostName}
                        onChange={(e) => setHostName(e.target.value)}
                        placeholder="Apex Badminton Academy"
                        required
                        className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        COMPETITIVE TIER *
                      </label>
                      <CustomDropdown
                        value={tier}
                        onChange={(val) =>
                          setTier(
                            val as
                              | "Open Semi-Pro"
                              | "Amateur / Community"
                              | "Corporate Shield"
                              | "Masters 35+"
                          )
                        }
                        options={[
                          { value: "Open Semi-Pro", label: "Open Semi-Pro", badge: "Pro Circuit" },
                          { value: "Amateur / Community", label: "Amateur / Community", badge: "Community" },
                          { value: "Corporate Shield", label: "Corporate Shield", badge: "Corporate" },
                          { value: "Masters 35+", label: "Masters 35+", badge: "Veterans" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------ */}
              {/* CARD 2: DATES & SCHEDULE                                */}
              {/* ------------------------------------------------------ */}
              <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 leading-tight">
                        Dates &amp; schedule
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Event days, check-in and registration cut-off
                      </p>
                    </div>
                  </div>

                  {/* Single day / Multi-day Pill Toggle: NEVER wraps awkwardly */}
                  <div className="inline-flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80 shrink-0 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setIsMultiDay(false)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        !isMultiDay
                          ? "bg-slate-950 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Single day
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMultiDay(true)}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isMultiDay
                          ? "bg-slate-950 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Multi-day
                    </button>
                  </div>
                </div>

                <div className="space-y-3.5 pt-1">
                  {/* Row 1: Start Date, Finals Date, Registration Closes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        START DATE
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={startDate === "2026-12-12" ? "12 Dec 2026" : startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full h-10 px-3.5 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        FINALS DATE
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={endDate === "2026-12-13" ? "13 Dec 2026" : endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          disabled={!isMultiDay}
                          className="w-full h-10 px-3.5 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none disabled:bg-slate-50 disabled:text-slate-400"
                        />
                        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        REGISTRATION CLOSES
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={registrationDeadline}
                          onChange={(e) => setRegistrationDeadline(e.target.value)}
                          className="w-full h-10 px-3.5 pr-8 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                        <Clock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Player Check-In & First Match */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        PLAYER CHECK-IN
                      </label>
                      <input
                        type="text"
                        value={playerCheckIn}
                        onChange={(e) => setPlayerCheckIn(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        FIRST MATCH
                      </label>
                      <input
                        type="text"
                        value={firstMatch}
                        onChange={(e) => setFirstMatch(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------ */}
              {/* CARD 3: VENUE & COURTS                                 */}
              {/* ------------------------------------------------------ */}
              <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      Venue &amp; courts
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      City, arena and reserved courts
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-1">
                  {/* City Selector */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">
                      CITY
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {["Bengaluru", "Mysuru", "Hyderabad", "Chennai", "Mumbai"].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setCity(c)}
                          className={`px-3.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                            city === c
                              ? "bg-slate-950 text-white font-bold shadow-xs"
                              : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Venue Card */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                        <MapPin className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {selectedVenue ? selectedVenue.name : customVenueName || "Play9 Badminton Arena"}
                          </span>
                          <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-500">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{selectedVenue?.rating || "4.8"}</span>
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {selectedVenue ? `${selectedVenue.address} · 8 courts · synthetic mats` : "Sarjapur Main Rd, Doddakannelli · 8 courts · synthetic mats"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowLocationPicker(!showLocationPicker)}
                      className="text-xs font-bold text-slate-800 hover:text-amber-600 hover:underline shrink-0 cursor-pointer"
                    >
                      {showLocationPicker ? "Done" : "Change"}
                    </button>
                  </div>

                  {/* Expandable Google Court Location Picker */}
                  {showLocationPicker && (
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <GoogleCourtLocationPicker
                        selectedVenue={selectedVenue}
                        onSelectVenue={setSelectedVenue}
                        customVenueName={customVenueName}
                        onCustomVenueNameChange={setCustomVenueName}
                        customAddress={customAddress}
                        onCustomAddressChange={setCustomAddress}
                      />
                    </div>
                  )}

                  {/* Courts Reserved */}
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1.5">
                      COURTS RESERVED
                    </span>
                    <div className="flex items-center gap-2">
                      {["2", "4", "6", "8", "12"].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setCourtsBooked(n)}
                          className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                            courtsBooked === n
                              ? "bg-slate-950 text-white shadow-xs"
                              : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-700"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      "Parking",
                      "Air-conditioned",
                      "Changing rooms",
                      "First aid",
                      "Spectator gallery",
                    ].map((item) => {
                      const isChecked = amenities.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleAmenity(item)}
                          className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                            isChecked
                              ? "bg-slate-100 border border-slate-300 text-slate-900 font-semibold"
                              : "bg-white hover:bg-slate-50 border border-slate-200 text-slate-500"
                          }`}
                        >
                          <span>{isChecked ? "✓" : "+"}</span>
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------ */}
              {/* CARD 4: DIVISIONS & RULES                              */}
              {/* ------------------------------------------------------ */}
              <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900 leading-tight">
                        Divisions &amp; rules
                      </h2>
                      <p className="text-[11px] text-slate-400">
                        Categories and official scoring
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-bold">
                    {selectedCategories.length} active
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  {/* 2-Column Grid matching reference */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {divisionList.map((div) => {
                      const isSelected = selectedCategories.includes(div.id);
                      return (
                        <div
                          key={div.id}
                          onClick={() => toggleCategory(div.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? "border-slate-950 bg-amber-50/20 ring-1 ring-slate-950/10 shadow-xs"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="shrink-0">
                              {div.icon}
                            </div>
                            <div className="min-w-0">
                              <span className="text-xs font-bold text-slate-900 block truncate">
                                {div.title}
                              </span>
                              <span className="text-[11px] text-slate-400 truncate block">
                                {div.subtitle}
                              </span>
                            </div>
                          </div>

                          {isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-slate-950 text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 shrink-0 cursor-pointer"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Scoring Preset & Match Shuttlecock */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        SCORING PRESET
                      </label>
                      <CustomDropdown
                        value={scoringPreset}
                        onChange={setScoringPreset}
                        options={[
                          { value: "Best of 3 to 21 (BWF)", label: "Best of 3 to 21 (BWF)", badge: "Standard" },
                          { value: "Best of 3 to 15 (Fast Sprint)", label: "Best of 3 to 15 (Fast Sprint)", badge: "Fast" },
                          { value: "Single Set to 30 (Golden Point)", label: "Single Set to 30 (Golden Point)", badge: "Sprint" },
                        ]}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        MATCH SHUTTLECOCK
                      </label>
                      <CustomDropdown
                        value={matchShuttlecock}
                        onChange={setMatchShuttlecock}
                        options={[
                          { value: "Yonex Aerosensa AS-30", label: "Yonex Aerosensa AS-30", badge: "Feather" },
                          { value: "Yonex Aerosensa AS-50", label: "Yonex Aerosensa AS-50", badge: "Premium" },
                          { value: "Li-Ning G800", label: "Li-Ning G800", badge: "Tournament" },
                          { value: "Yonex Mavis 350", label: "Yonex Mavis 350", badge: "Nylon" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------ */}
              {/* CARD 5: ENTRY FEES & PRIZE POOL                         */}
              {/* ------------------------------------------------------ */}
              <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    5
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      Entry fees &amp; prize pool
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Slots, ticket price and podium payouts
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-1">
                  {/* Row 1: Max Teams, Entry Fee / Team, Total Prize Pool */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        MAX TEAMS
                      </label>
                      <input
                        type="number"
                        min="4"
                        max="128"
                        value={maxTeams}
                        onChange={(e) => setMaxTeams(e.target.value)}
                        required
                        className="w-full h-10 px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        ENTRY FEE / TEAM
                      </label>
                      <div className="relative">
                        <span className="text-xs text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 font-semibold">₹</span>
                        <input
                          type="number"
                          min="100"
                          step="50"
                          value={entryFee}
                          onChange={(e) => setEntryFee(e.target.value)}
                          required
                          className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 block mb-1">
                        TOTAL PRIZE POOL
                      </label>
                      <div className="relative">
                        <span className="text-xs text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 font-semibold">₹</span>
                        <input
                          type="number"
                          min="0"
                          step="1000"
                          value={prizePool}
                          onChange={(e) => setPrizePool(e.target.value)}
                          required
                          className="w-full h-10 pl-7 pr-3 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: 3 Podium Payout Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Champion Card */}
                    <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                        <RealisticTrophy size={16} />
                        <span>Champion</span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">
                        ₹{parseInt(winnerShare, 10).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Runner-up Card */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <RealisticSilverMedal size={16} />
                        <span>Runner-up</span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">
                        ₹{parseInt(runnerUpShare, 10).toLocaleString("en-IN")}
                      </div>
                    </div>

                    {/* Semi-finalists Card */}
                    <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
                        <RealisticBronzeMedal size={16} />
                        <span>Semi-finalists</span>
                      </div>
                      <div className="text-base font-extrabold text-slate-900 font-mono">
                        ₹{parseInt(semiFinalShare, 10).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Financial Projection Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-500 font-medium">
                      Projected gross <strong className="text-slate-800 font-mono">₹{projectedGross.toLocaleString("en-IN")}</strong>
                    </span>
                    <span className="text-slate-500 font-medium">
                      Est. court costs <strong className="text-slate-800 font-mono">₹{estCourtCosts.toLocaleString("en-IN")}</strong>
                    </span>

                    {hostNet < 0 ? (
                      <span className="text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                        <span>⚠</span>
                        <span>Host net -₹{Math.abs(hostNet).toLocaleString("en-IN")} · raise fee or cut prizes</span>
                      </span>
                    ) : (
                      <span className="text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1">
                        <span>✓</span>
                        <span>Host net +₹{hostNet.toLocaleString("en-IN")} · sustainable margin</span>
                      </span>
                    )}
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------ */}
              {/* CARD 6: DRAW ENGINE & ANTI-RIGGING                     */}
              {/* ------------------------------------------------------ */}
              <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-950 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    6
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">
                      Draw engine &amp; anti-rigging
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      Pairing method and live scoring
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-1">
                  {/* Row 1: Live Picker-Wheel vs Ranked Seeding */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setDrawEngine("wheel")}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        drawEngine === "wheel"
                          ? "border-slate-950 bg-amber-50/20 ring-1 ring-slate-950/10 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Dices className="w-4 h-4 text-slate-900" />
                        <span className="text-xs font-bold text-slate-900">
                          Live picker-wheel draw
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Transparent spin, server-verified result.
                      </p>
                    </div>

                    <div
                      onClick={() => setDrawEngine("standard")}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        drawEngine === "standard"
                          ? "border-slate-950 bg-amber-50/20 ring-1 ring-slate-950/10 shadow-xs"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-slate-700" />
                        <span className="text-xs font-bold text-slate-900">
                          Ranked seeding
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Top seeds at opposite poles.
                      </p>
                    </div>
                  </div>

                  {/* Row 2: 2 Full-Width Checkboxes */}
                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer transition-colors hover:bg-slate-100/60">
                    <input
                      type="checkbox"
                      checked={soloPlayerPairing}
                      onChange={(e) => setSoloPlayerPairing(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-950 accent-slate-950"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        Solo player pair matching
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Solo sign-ups get paired on draw morning
                      </span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer transition-colors hover:bg-slate-100/60">
                    <input
                      type="checkbox"
                      checked={circuitRatingPoints}
                      onChange={(e) => setCircuitRatingPoints(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-950 accent-slate-950"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block leading-tight">
                        Circuit rating points
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Winners earn city ranking points
                      </span>
                    </div>
                  </label>
                </div>
              </section>

              {/* Bottom Actions Row */}
              <div className="pt-2 flex items-center justify-between gap-4">
                <Link
                  href="/host"
                  className="px-6 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
                >
                  <span>Create &amp; publish</span>
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>

            </form>
          </div>

          {/* ========================================================== */}
          {/* RIGHT FIXED-WIDTH COLUMN: LIVE SUMMARY (Docked on Right)   */}
          {/* ========================================================== */}
          <div className="w-full xl:w-[360px] 2xl:w-[380px] shrink-0 xl:sticky xl:top-20">
            <div className="bg-[#0B101B] text-white rounded-2xl p-5 sm:p-6 border border-slate-800/90 shadow-xl space-y-4">
              
              {/* Header: LIVE SUMMARY & Ready to publish badge */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  LIVE SUMMARY
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold">
                  Ready to publish
                </span>
              </div>

              {/* Title & Host Info */}
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                  {tier}
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  {title || "Untitled Championship"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  by {hostName || "Apex Badminton Academy"}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800/80 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dates</span>
                  <span className="font-semibold text-white">
                    {isMultiDay ? "12–13 Dec 2026" : "12 Dec 2026"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Venue</span>
                  <span className="font-semibold text-white truncate max-w-[170px]">
                    {selectedVenue ? selectedVenue.name.replace("Badminton", "").trim() : "Play9 Arena"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Courts</span>
                  <span className="font-semibold text-white">
                    {courtsBooked}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Divisions</span>
                  <span className="font-semibold text-white">
                    {selectedCategories.length}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Entry fee</span>
                  <span className="font-semibold text-white font-mono">
                    ₹{parseInt(entryFee, 10).toLocaleString("en-IN")} / team
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 font-bold">
                  <span className="text-slate-400">Prize pool</span>
                  <span className="text-amber-400 font-mono text-base font-black">
                    ₹{parseInt(prizePool, 10).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span>Publish tournament</span>
                </button>
              </div>

              {/* Footer Trust Pill */}
              <div className="pt-1 flex items-center justify-center text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>UPI escrow · Audit locked</span>
                </span>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
