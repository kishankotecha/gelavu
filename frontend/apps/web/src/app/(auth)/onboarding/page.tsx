"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Trophy,
  CalendarPlus,
  Check,
  ArrowRight,
  MapPin,
  User as UserIcon,
  Building2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";

const CITIES = [
  "Bengaluru",
  "Mysuru",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Pune",
  "Delhi NCR",
];

const PLAYING_LEVELS = [
  { id: "BEGINNER", label: "Beginner" },
  { id: "AMATEUR", label: "Amateur" },
  { id: "INTERMEDIATE", label: "Intermediate" },
  { id: "ADVANCED", label: "Advanced" },
  { id: "PRO", label: "Pro" },
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
  const [playingLevel, setPlayingLevel] = useState("INTERMEDIATE");
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
        role: activeMode === "HOST" ? "HOST" : "PLAYER",
        roles: activeMode === "HOST" ? ["PLAYER", "HOST"] : ["PLAYER"],
        active_mode: activeMode,
        playingLevel: activeMode === "PLAY" ? playingLevel : undefined,
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
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-2xl text-ink">
        {/* Header */}
        <div className="mb-6">
          <GelavuLogo variant="light" size="md" href="/" className="mb-4" />
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-lime-600 block">
            STEP 2 OF 2 · COMPLETE YOUR PROFILE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight mt-1">
            Set up your Gelavu account
          </h1>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            You can switch between Play and Host mode anytime from the top bar.
          </p>
        </div>

        <form onSubmit={handleFinish} className="space-y-5">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setActiveMode("PLAY")}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === "PLAY"
                  ? "border-ink bg-ink text-white shadow-md"
                  : "border-line bg-paper/60 hover:bg-paper text-ink"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Trophy
                  className={`w-5 h-5 ${
                    activeMode === "PLAY" ? "text-lime" : "text-muted"
                  }`}
                />
                {activeMode === "PLAY" && (
                  <Check className="w-4 h-4 text-lime" />
                )}
              </div>
              <div>
                <strong className="block text-sm font-bold">Play Mode</strong>
                <small
                  className={`text-[11px] block mt-0.5 leading-snug ${
                    activeMode === "PLAY" ? "text-white/70" : "text-muted"
                  }`}
                >
                  Enter tournaments & track rank
                </small>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("HOST")}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeMode === "HOST"
                  ? "border-ink bg-ink text-white shadow-md"
                  : "border-line bg-paper/60 hover:bg-paper text-ink"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <CalendarPlus
                  className={`w-5 h-5 ${
                    activeMode === "HOST" ? "text-lime" : "text-muted"
                  }`}
                />
                {activeMode === "HOST" && (
                  <Check className="w-4 h-4 text-lime" />
                )}
              </div>
              <div>
                <strong className="block text-sm font-bold">Host Mode</strong>
                <small
                  className={`text-[11px] block mt-0.5 leading-snug ${
                    activeMode === "HOST" ? "text-white/70" : "text-muted"
                  }`}
                >
                  Create events, draws & courts
                </small>
              </div>
            </button>
          </div>

          {/* Name + City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                Full Name *
              </label>
              <div className="flex items-center rounded-2xl border border-line bg-paper/50 px-3.5 py-2.5 focus-within:border-ink focus-within:bg-white focus-within:ring-2 focus-within:ring-ink/10 transition-all">
                <UserIcon className="w-4 h-4 text-muted mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Rohan Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-muted/60 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                City *
              </label>
              <div className="flex items-center rounded-2xl border border-line bg-paper/50 px-3.5 py-2.5 focus-within:border-ink focus-within:bg-white focus-within:ring-2 focus-within:ring-ink/10 transition-all">
                <MapPin className="w-4 h-4 text-muted mr-2 shrink-0" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-semibold text-ink outline-none cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mode-Specific Fields */}
          {activeMode === "PLAY" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Playing Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {PLAYING_LEVELS.map((lvl) => {
                    const active = playingLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setPlayingLevel(lvl.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          active
                            ? "border-ink bg-ink text-white"
                            : "border-line bg-paper/60 text-ink hover:bg-paper"
                        }`}
                      >
                        {lvl.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
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
                            ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                            : "border-line bg-paper/60 text-muted hover:text-ink"
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
              <label className="block text-xs font-bold text-ink mb-1.5">
                Club / Organization Name *
              </label>
              <div className="flex items-center rounded-2xl border border-line bg-paper/50 px-3.5 py-2.5 focus-within:border-ink focus-within:bg-white focus-within:ring-2 focus-within:ring-ink/10 transition-all">
                <Building2 className="w-4 h-4 text-muted mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Apex Badminton Academy"
                  value={organizationName}
                  onChange={(e) => setOrganizationName(e.target.value)}
                  required
                  className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-muted/60 outline-none"
                />
              </div>
              <p className="text-[11px] text-muted mt-1.5">
                You can submit KYC &amp; bank payout details later from your Host Dashboard.
              </p>
            </div>
          )}

          {/* CTA */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full rounded-full bg-lime hover:brightness-95 active:scale-[0.99] disabled:opacity-50 text-ink py-3 px-5 text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
          >
            <span>
              {isSaving
                ? "Setting up..."
                : activeMode === "HOST"
                ? "Go to Host Dashboard"
                : "Explore Tournaments"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center text-xs font-semibold text-muted">
          Loading onboarding...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
