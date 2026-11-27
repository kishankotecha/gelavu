"use client";

import React, { useState, Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Trophy,
  CalendarPlus,
  Check,
  ArrowRight,
  User as UserIcon,
  Building2,
  Sparkles,
  Info,
  ShieldCheck,
  Flame,
  Award,
  Camera,
  Smile,
} from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { AvatarPickerModal } from "@/components/common/AvatarPickerModal";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/toast";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { GelavuLogo } from "@/components/common/GelavuLogo";
import {
  PLAYO_SKILL_TIERS,
  SkillTierConfig,
  getTierFromRating,
} from "@/types/playo";

const CITIES = [
  "Bengaluru",
  "Mysuru",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Pune",
  "Delhi NCR",
];

const PREFERRED_CATEGORIES = [
  "Singles",
  "Men's Doubles",
  "Women's Doubles",
  "Mixed Doubles",
];

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "HOST" ? "HOST" : "PLAY";

  const { updateUser } = useAuth();
  const { showToast } = useToast();

  const [activeMode, setActiveMode] = useState<"PLAY" | "HOST">(initialMode);
  const [name, setName] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [avatarUrl, setAvatarUrl] = useState<string>("sticker:rocket-birdie");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Playo Skill Level state (default to Intermediate 4.0)
  const [playerRating, setPlayerRating] = useState<number>(4.0);
  const currentTier = useMemo(() => getTierFromRating(playerRating), [playerRating]);

  const [showFormulaDetails, setShowFormulaDetails] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Men's Doubles",
  ]);
  const [organizationName, setOrganizationName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSelectTier = (tier: SkillTierConfig) => {
    setPlayerRating(tier.defaultRating);
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please enter your full name", "error");
      return;
    }
    if (activeMode === "HOST" && !organizationName.trim()) {
      showToast("Please enter your club or organization name", "error");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      updateUser({
        name: name.trim(),
        city,
        avatarUrl,
        role: activeMode === "HOST" ? "HOST" : "PLAYER",
        roles: activeMode === "HOST" ? ["PLAYER", "HOST"] : ["PLAYER"],
        active_mode: activeMode,
        playingLevel: activeMode === "PLAY" ? currentTier.id : undefined,
        rating: activeMode === "PLAY" ? playerRating : undefined,
        organizationName:
          activeMode === "HOST" ? organizationName.trim() : undefined,
      });

      setIsSaving(false);
      showToast("Profile ready! Welcome to Gelavu.", "success");

      if (activeMode === "HOST") {
        router.push("/host");
      } else {
        router.push("/tournaments");
      }
    }, 400);
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-navy overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-hotpink/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-hotpink/10 blur-3xl" />

      {/* Floating Pristine High-Contrast White Card */}
      <div className="relative w-full max-w-2xl rounded-[28px] sm:rounded-[32px] bg-white text-navy shadow-2xl p-6 sm:p-9 border border-white/20 transition-all">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <GelavuLogo variant="light" size="md" href="/" />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-hotpink/15 border border-[#FF685B]/30 text-[#9E6514] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-hotpink" />
              STEP 2 OF 2 · COMPLETE YOUR PROFILE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight mt-1">
            Set up your Gelavu account
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-white/60 font-medium leading-relaxed">
            You can switch between Play and Host mode anytime from the top bar.
          </p>
        </div>

        <form onSubmit={handleFinish} className="space-y-5">
          {/* 1. Mode Switcher (Play Mode vs Host Mode) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setActiveMode("PLAY")}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === "PLAY"
                  ? "border-[#14212D] bg-navy text-white shadow-xl ring-2 ring-black/10"
                  : "border-gray-200 bg-gray-50/80 hover:bg-gray-100 text-navy"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeMode === "PLAY"
                      ? "bg-white/10 text-hotpink"
                      : "bg-gray-200/60 text-gray-600"
                  }`}
                >
                  <Trophy className="w-5 h-5" />
                </div>
                {activeMode === "PLAY" && (
                  <span className="w-5 h-5 rounded-full bg-hotpink text-navy flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <strong className="block text-sm sm:text-base font-black">Play Mode</strong>
                <small
                  className={`text-[11px] block mt-0.5 leading-snug font-medium ${
                    activeMode === "PLAY" ? "text-white/80" : "text-white/60"
                  }`}
                >
                  Enter tournaments &amp; track rank
                </small>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("HOST")}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === "HOST"
                  ? "border-[#14212D] bg-navy text-white shadow-xl ring-2 ring-black/10"
                  : "border-gray-200 bg-gray-50/80 hover:bg-gray-100 text-navy"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                    activeMode === "HOST"
                      ? "bg-white/10 text-hotpink"
                      : "bg-gray-200/60 text-gray-600"
                  }`}
                >
                  <CalendarPlus className="w-5 h-5" />
                </div>
                {activeMode === "HOST" && (
                  <span className="w-5 h-5 rounded-full bg-hotpink text-navy flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
              </div>
              <div>
                <strong className="block text-sm sm:text-base font-black">Host Mode</strong>
                <small
                  className={`text-[11px] block mt-0.5 leading-snug font-medium ${
                    activeMode === "HOST" ? "text-white/80" : "text-white/60"
                  }`}
                >
                  Create events, draws &amp; courts
                </small>
              </div>
            </button>
          </div>

          {/* 1.5 Avatar Choice (Selfie / File Upload / Crazy Sticker) */}
          <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50/90 border border-gray-200">
            <div
              className="relative cursor-pointer group shrink-0"
              onClick={() => setIsAvatarModalOpen(true)}
              title="Click to snap selfie, upload photo or choose crazy sticker"
            >
              <Avatar
                name={name || "Player"}
                url={avatarUrl}
                size="lg"
                className="border-2 border-[#FF685B] shadow-sm group-hover:scale-105 transition-transform"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAvatarModalOpen(true);
                }}
                className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-hotpink shadow-md border border-white hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                aria-label="Change Avatar"
              >
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-xs font-black text-navy">
                Profile Photo &amp; Crazy Sticker
              </span>
              <p className="text-[11px] text-white/60 mt-0.5 leading-snug">
                Take a selfie, upload from device, or pick a crazy sports sticker.
              </p>
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#9E6514] hover:text-navy mt-1 cursor-pointer"
              >
                <Smile className="w-3 h-3 text-hotpink" />
                <span>Customize Avatar ➜</span>
              </button>
            </div>
          </div>

          {/* 2. Full Name & Home City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
                Full Name *
              </label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 focus-within:border-[#14212D] focus-within:bg-white focus-within:ring-2 focus-within:ring-black/10 transition-all">
                <UserIcon className="w-4 h-4 text-white/70 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Rohan Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm font-semibold text-navy placeholder:text-white/70 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
                Home City *
              </label>
              <CustomDropdown
                value={city}
                onChange={setCity}
                options={CITIES.map((c) => ({ value: c, label: c }))}
                buttonClassName="h-11 rounded-2xl border-gray-200 bg-gray-50/80 text-sm font-semibold"
              />
            </div>
          </div>

          {/* 3. Mode-Specific Configuration */}
          {activeMode === "PLAY" ? (
            <div className="space-y-4 pt-1">
              
              {/* Playo Dynamic Skill Rating Section */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4 sm:p-5 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <label className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-1.5">
                      <span>Playing Level &amp; Skill Rating</span>
                      <span className="text-[10px] font-bold text-hotpink bg-hotpink/10 px-2 py-0.5 rounded-full border border-[#FF685B]/20">
                        Playo Algorithm
                      </span>
                    </label>
                    <p className="text-[11px] text-white/60 font-medium">
                      Select your starting skill tier. Post-match peer ratings will calibrate your rating.
                    </p>
                  </div>

                  {/* Rating Score Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${currentTier.badgeBg} ${currentTier.badgeText}`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{currentTier.label}</span>
                    </span>
                  </div>
                </div>

                {/* 5 Playo Tier Quick Buttons (Beginner, Amateur, Intermediate, Advanced, Professional - No Numbers) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {PLAYO_SKILL_TIERS.map((tier) => {
                    const isSelected = currentTier.id === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleSelectTier(tier)}
                        className={`px-3 py-3 rounded-xl text-center transition-all cursor-pointer border flex items-center justify-center ${
                          isSelected
                            ? "bg-navy text-hotpink border-[#14212D] shadow-sm ring-2 ring-black/10 font-black"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 font-bold"
                        }`}
                      >
                        <span className="text-xs leading-tight block w-full truncate">
                          {tier.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Tier Description */}
                <div className="p-3.5 rounded-xl bg-white border border-gray-200/90 text-xs text-gray-700 flex items-start gap-2.5 shadow-2xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: currentTier.indicatorColor }}
                  />
                  <div>
                    <strong className="text-navy font-bold block">
                      {currentTier.label} ({currentTier.summary})
                    </strong>
                    <span className="text-white/60 leading-snug block mt-0.5">
                      {currentTier.description}
                    </span>
                  </div>
                </div>

                {/* Playo 90/10 Formula Info Accordion */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowFormulaDetails((v) => !v)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/60 hover:text-navy transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-hotpink" />
                    <span>How Playo calculates your rating</span>
                    <span className="text-[10px] text-white/70">
                      {showFormulaDetails ? "(Hide)" : "(90% recent weightage)"}
                    </span>
                  </button>

                  {showFormulaDetails && (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-white border border-gray-200 text-[11px] text-gray-600 space-y-2 animate-in fade-in duration-150">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-hotpink shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-navy block">Two-Tier Weighted Average</strong>
                          <span>
                            <strong>90% Weightage:</strong> Your self-rating combined with post-match anonymous peer ratings from your <strong>last 25 tournament &amp; practice games</strong>.
                          </span>
                          <span className="block mt-0.5">
                            <strong>10% Weightage:</strong> All historical ratings prior to your last 25 games.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 pt-1 border-t border-gray-100">
                        <Flame className="w-4 h-4 text-hotpink shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-navy block">Smart Deduplication &amp; Carryover</strong>
                          <span>
                            If the same partner or opponent rates you multiple times, their newest rating replaces their old one. Unrated matches carry forward your previous valid rating.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Preferred Categories */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
                  Preferred Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {PREFERRED_CATEGORIES.map((cat) => {
                    const active = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                          active
                            ? "border-[#14212D] bg-navy text-hotpink shadow-xs"
                            : "border-gray-200 bg-gray-50 text-gray-600 hover:text-navy hover:border-gray-300"
                        }`}
                      >
                        {active ? "✓ " : "+ "}
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wider">
                Club / Organization Name *
              </label>
              <div className="flex items-center rounded-2xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 focus-within:border-[#14212D] focus-within:bg-white focus-within:ring-2 focus-within:ring-black/10 transition-all">
                <Building2 className="w-4 h-4 text-white/70 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Apex Badminton Academy"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm font-semibold text-navy placeholder:text-white/70 outline-none"
                />
              </div>
              <p className="text-[11px] text-white/60 mt-1.5">
                You can complete host verification and bank account details later from your Host Dashboard.
              </p>
            </div>
          )}

          {/* Action CTA Button */}
          <button
            type="submit"
            disabled={isSaving}
            className="btn-cta w-full py-3.5 px-6 text-sm sm:text-base font-black flex items-center justify-center gap-2.5 cursor-pointer mt-3 group"
          >
            <span>
              {isSaving
                ? "Setting up..."
                : activeMode === "HOST"
                ? "Go to Host Dashboard"
                : "Explore Tournaments"}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 stroke-[2.5]" />
          </button>
        </form>

        {/* Modal for Live Camera Selfie, File Upload & Crazy Stickers */}
        <AvatarPickerModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          currentAvatar={avatarUrl}
          userName={name}
          onSelectAvatar={(selected) => setAvatarUrl(selected)}
        />

      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center text-xs font-semibold text-white/70 bg-navy">
          Loading onboarding...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
