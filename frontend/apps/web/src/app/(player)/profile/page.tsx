"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/common/Avatar";
import { AvatarPickerModal } from "@/components/common/AvatarPickerModal";
import {
  Trophy,
  Award,
  Activity,
  LogOut,
  ShieldCheck,
  Flame,
  ThumbsUp,
  Sparkles,
  MapPin,
  User as UserIcon,
  Info,
  Camera,
  Smile,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import {
  PLAYO_SKILL_TIERS,
  SkillTierConfig,
  getTierFromRating,
  PlayoSkillLevel,
} from "@/types/playo";
import { PlayoSkillBadge } from "@/components/common/PlayoSkillBadge";
import { PlayoMySportsCard } from "@/components/common/PlayoMySportsCard";
import {
  buildPeerDistribution,
  computePlayoOverallRating,
  distributionToPercentages,
  getProgressWithinTier,
} from "@/lib/playoRating";
import {
  getDemoBadmintonActivityTimeline,
  getDemoPoolActivityTimeline,
  getPeerRatingsForUser,
} from "@/lib/playoRatingStore";

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

// Playpal peer-awarded recognition badges
const PLAYPAL_BADGES = [
  { id: "smash", label: "Smash Specialist", count: 14, icon: Flame, color: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  { id: "defense", label: "Iron Defense", count: 9, icon: ShieldCheck, color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
  { id: "sportsman", label: "True Sportsman", count: 22, icon: ThumbsUp, color: "text-rose-400 bg-rose-400/10 border-rose-400/20" },
  { id: "lines", label: "Honest Line Calls", count: 19, icon: Award, color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
];

export default function ProfilePage() {
  const { user, updateUser, logout } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || "Kishan");
  const [city, setCity] = useState(user?.city || "Bengaluru");
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatarUrl || "sticker:smash-beast");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Playo skill level & rating
  const initialRating = user?.rating || (user?.playingLevel === "Professional" ? 6.2 : user?.playingLevel === "Advanced" ? 5.0 : user?.playingLevel === "Amateur" ? 3.0 : user?.playingLevel === "Beginner" ? 1.8 : 4.2);
  const [playerRating, setPlayerRating] = useState<number>(initialRating);
  const selfTier = useMemo(() => getTierFromRating(playerRating).id, [playerRating]);

  const [peerEvents, setPeerEvents] = useState(() =>
    getPeerRatingsForUser(user?.id ?? "demo-user")
  );

  useEffect(() => {
    const sync = () =>
      setPeerEvents(getPeerRatingsForUser(user?.id ?? "demo-user"));
    window.addEventListener("gelavu-playo-ratings-updated", sync);
    return () => window.removeEventListener("gelavu-playo-ratings-updated", sync);
  }, [user?.id]);

  const badmintonEvents = useMemo(
    () => peerEvents.filter((e) => e.sportId === "badminton"),
    [peerEvents]
  );

  const poolEvents = useMemo(
    () => peerEvents.filter((e) => e.sportId === "pool"),
    [peerEvents]
  );

  const playoOverall = useMemo(
    () => computePlayoOverallRating(selfTier as PlayoSkillLevel, badmintonEvents),
    [selfTier, badmintonEvents]
  );

  const currentTier = useMemo(
    () => playoOverall.overallTier,
    [playoOverall]
  );

  const tierProgress = useMemo(
    () => getProgressWithinTier(playoOverall.overallRating),
    [playoOverall]
  );

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Men's Doubles",
    "Mixed Doubles",
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarSelect = (newAvatar: string) => {
    setAvatarUrl(newAvatar);
    updateUser({ avatarUrl: newAvatar });
    showToast("Profile avatar updated successfully!", "success");
  };

  const peerRatings = useMemo(() => {
    const dist = buildPeerDistribution(badmintonEvents);
    const rows = distributionToPercentages(dist);
    const colorMap: Record<PlayoSkillLevel, string> = {
      Beginner: "bg-sky-500",
      Amateur: "bg-teal-500",
      Intermediate: "bg-emerald-500",
      Advanced: "bg-amber-500",
      Professional: "bg-purple-500",
    };
    return rows.map((r) => ({
      tier: r.tier,
      count: r.count,
      percent: r.percent,
      color: colorMap[r.tier],
    }));
  }, [badmintonEvents]);

  const mySportsTabs = useMemo(
    () => [
      {
        id: "badminton",
        label: "Badminton",
        gamesPlayed: 225,
        selfTier: selfTier as PlayoSkillLevel,
        peerRank: 81,
        events: badmintonEvents,
        activityTimeline: getDemoBadmintonActivityTimeline(),
      },
      {
        id: "pool",
        label: "Pool",
        gamesPlayed: 8,
        selfTier: "Amateur" as PlayoSkillLevel,
        peerRank: 384,
        events: poolEvents,
        activityTimeline: getDemoPoolActivityTimeline(),
      },
      {
        id: "football",
        label: "Football",
        gamesPlayed: 2,
        selfTier: "Beginner" as PlayoSkillLevel,
        peerRank: 1204,
        events: [],
        activityTimeline: [],
      },
      {
        id: "cycling",
        label: "Cycling",
        gamesPlayed: 1,
        selfTier: "Beginner" as PlayoSkillLevel,
        peerRank: 890,
        events: [],
        activityTimeline: [],
      },
    ],
    [selfTier, badmintonEvents, poolEvents]
  );

  const totalPeerVotes = peerRatings.reduce((sum, r) => sum + r.count, 0);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSelectTier = (tier: SkillTierConfig) => {
    setPlayerRating(tier.defaultRating);
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please enter your name", "error");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      updateUser({
        name: name.trim(),
        city,
        avatarUrl,
        playingLevel: currentTier.id,
        rating: playoOverall.overallRating,
      });
      setIsSaving(false);
      showToast("Profile credentials updated successfully", "success");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#DE9D35] animate-pulse" />
              <span className="text-[11px] font-black uppercase tracking-widest text-[#DE9D35]">
                Official Athlete Profile
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
              Player Profile &amp; Bio
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage your verified sports credentials, Playo rating graph, and match bio.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 self-start sm:self-auto rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-300 hover:bg-rose-500/20 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* 1. Main Athlete Identity Card */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#121622] p-6 sm:p-8 shadow-2xl">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Interactive Avatar with Selfie, Upload & Crazy Sticker Trigger */}
              <div
                className="relative group cursor-pointer"
                onClick={() => setIsAvatarModalOpen(true)}
                title="Click to snap selfie, upload photo or choose crazy sticker"
              >
                <Avatar
                  name={name}
                  url={avatarUrl}
                  size="xl"
                  className="border-2 border-[#DE9D35]/60 shadow-2xl group-hover:scale-105 transition-all ring-2 ring-white/10"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAvatarModalOpen(true);
                  }}
                  className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#F3D15A] text-[#0A0D14] shadow-lg border-2 border-[#121622] hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  title="Change Avatar (Selfie / Upload / Crazy Stickers)"
                  aria-label="Change Avatar"
                >
                  <Camera className="h-3.5 w-3.5 stroke-[2.5]" />
                </button>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-2xl font-black text-white tracking-tight">{name}</h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Athlete
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-gray-400 font-mono">
                    {user?.phone || "+91 98745 61230"} · {city}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsAvatarModalOpen(true)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F3D15A] hover:underline cursor-pointer"
                  >
                    <Smile className="w-3 h-3" />
                    <span>Change Avatar</span>
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-xs ${currentTier.badgeBg} ${currentTier.badgeText}`}>
                    <Award className="w-3.5 h-3.5" />
                    <span>{currentTier.label}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-gray-300">
                    <MapPin className="w-3 h-3 text-[#F3D15A]" /> {city} Circuit
                  </span>
                </div>
              </div>
            </div>

            {/* Tournaments Played Summary */}
            <div className="rounded-2xl border border-white/10 bg-[#1A2234] p-4 text-center sm:text-right shrink-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Tournaments</p>
              <p className="font-mono text-2xl font-black text-[#F3D15A] mt-0.5">8 Entered</p>
              <p className="text-[11px] text-emerald-400 font-semibold">5 Podiums</p>
            </div>
          </div>

          {/* Key Stats Row (Real Match & Tournament Metrics - No Arbitrary Points) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 mt-6 border-t border-white/10">
            <div className="rounded-2xl border border-white/10 bg-[#161D2E] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Matches Played</p>
                <p className="text-2xl font-mono font-black text-white mt-1">34</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">28 Wins · 6 Losses</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-[#DE9D35]/15 text-[#DE9D35] flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#161D2E] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Titles Won</p>
                <p className="text-2xl font-mono font-black text-white mt-1">5</p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">3 Gold · 2 Silver</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#161D2E] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Win Rate</p>
                <p className="text-2xl font-mono font-black text-white mt-1">82%</p>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">Tournament match average</p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <PlayoMySportsCard
          sports={mySportsTabs}
          onEditSelfRating={() => {
            document.getElementById("playo-self-rating")?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
        />

        {/* 2. Playo Skill Level & User Rating Graph */}
        <div className="rounded-[28px] border border-white/10 bg-[#121622] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">Skill calibration &amp; peer breakdown</h3>
                <span className="text-[10px] font-bold text-[#DE9D35] bg-[#DE9D35]/15 px-2 py-0.5 rounded-full border border-[#DE9D35]/30">
                  Dynamic 90/10 Algorithm
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Your skill level is calculated using a dynamic weighted average of self-assessment and anonymous peer ratings.
              </p>
            </div>

            <div className="self-start sm:self-auto w-full sm:max-w-xs rounded-2xl border border-white/10 bg-[#161D2E] p-4">
              <PlayoSkillBadge
                level={currentTier.id}
                rating={playoOverall.overallRating}
                progress={tierProgress}
                showOverallLabel
                layout="meter"
                size="lg"
                theme="dark"
              />
            </div>
          </div>

          {/* User Rating Graph (Peer Distribution) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-300">
              <span className="uppercase tracking-wider">Peer Rating Breakdown ({totalPeerVotes} ratings received)</span>
              <span className="text-[11px] text-gray-400">90% recent weightage (last 25 games)</span>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/5 bg-[#161D2E] p-4 sm:p-5">
              {peerRatings.map((r) => (
                <div key={r.tier} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-300 flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${r.color}`} />
                      <span>{r.tier}</span>
                    </span>
                    <span className="font-mono text-xs text-gray-300">
                      <strong>{r.count}</strong> votes ({r.percent}%)
                    </span>
                  </div>
                  {/* Visual Bar */}
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full ${r.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.max(r.percent, r.count > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Playo Rules Notice */}
          <div className="rounded-2xl border border-white/5 bg-[#161D2E]/70 p-4 text-xs text-gray-400 space-y-2">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#DE9D35] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-bold">How Peer Ratings Calibrate Your Level:</strong>
                <ul className="list-disc list-inside space-y-1 mt-1 text-[11px] text-gray-300">
                  <li><strong>90% Weightage:</strong> Derived from your self-rating combined with ratings from your last 25 activities.</li>
                  <li><strong>10% Weightage:</strong> Anchored to your lifetime baseline prior to the last 25 games.</li>
                  <li><strong>Unique Deduplication:</strong> If the same peer rates you again, their newest rating replaces the older one.</li>
                  <li><strong>Unrated Matches:</strong> If peers don&apos;t rate a match, your previous rating carries forward.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Playpal Badges */}
          <div className="space-y-2.5 pt-2">
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Playpal Badges Awarded by Opponents &amp; Partners
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PLAYPAL_BADGES.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#161D2E] p-3 text-xs"
                  >
                    <div className={`p-2 rounded-lg border ${b.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate">{b.label}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">+{b.count} endorsements</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Edit Credentials & Baseline Form */}
        <div className="rounded-[28px] border border-white/10 bg-[#121622] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-lg font-black text-white tracking-tight">Edit Profile &amp; Baseline Preferences</h3>
            <p className="text-xs text-gray-400 mt-1">
              Update your athlete identity, city circuit, and baseline self-rating.
            </p>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-6">
            {/* Full Name & City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="flex items-center rounded-2xl border border-white/10 bg-[#161D2E] px-4 py-3 focus-within:border-[#DE9D35] focus-within:ring-2 focus-within:ring-[#DE9D35]/20 transition-all">
                  <UserIcon className="w-4 h-4 text-gray-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent text-sm font-semibold text-white placeholder:text-gray-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Home City
                </label>
                <CustomDropdown
                  value={city}
                  onChange={setCity}
                  options={CITIES.map((c) => ({ value: c, label: c }))}
                  buttonClassName="h-11 rounded-2xl border-white/10 bg-[#161D2E] text-white text-sm font-semibold"
                />
              </div>
            </div>

            {/* Baseline Skill Tier Selector */}
            <div className="space-y-3 rounded-2xl border border-white/5 bg-[#161D2E] p-4 sm:p-5" id="playo-self-rating">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                    Skill Level Tier
                  </label>
                  <p className="text-[11px] text-gray-400">
                    Your self-assessed tier; peer ratings from tournament matches calibrate your level.
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${currentTier.badgeBg} ${currentTier.badgeText}`}>
                  {currentTier.label}
                </span>
              </div>

              {/* 5 Quick Tiers */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                {PLAYO_SKILL_TIERS.map((tier) => {
                  const isSelected = currentTier.id === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => handleSelectTier(tier)}
                      className={`px-3 py-3 rounded-xl text-center transition-all cursor-pointer border flex items-center justify-center ${
                        isSelected
                          ? "bg-[#0B101B] text-[#F3D15A] border-[#DE9D35] shadow-sm ring-2 ring-[#DE9D35]/30 font-black"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 font-bold"
                      }`}
                    >
                      <span className="text-xs leading-tight block w-full truncate">
                        {tier.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Tier capability explanation */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: currentTier.indicatorColor }} />
                <div>
                  <strong className="text-white block font-bold">{currentTier.label} ({currentTier.summary})</strong>
                  <span className="text-gray-400 text-[11px] block mt-0.5">{currentTier.description}</span>
                </div>
              </div>
            </div>

            {/* Preferred Categories */}
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Preferred Tournament Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {PREFERRED_CATEGORIES.map((cat) => {
                  const active = selectedCategories.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                        active
                          ? "border-[#DE9D35] bg-[#DE9D35]/15 text-[#F3D15A] shadow-xs"
                          : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      {active ? "✓ " : "+ "}
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save CTA */}
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-full bg-[#DE9D35] hover:bg-[#c98b2c] active:scale-[0.99] disabled:opacity-50 text-[#0A0D14] py-3.5 px-8 text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl group"
            >
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-12" />
            </button>
          </form>
        </div>

        {/* Modal for Live Camera Selfie, File Upload & Crazy Stickers */}
        <AvatarPickerModal
          isOpen={isAvatarModalOpen}
          onClose={() => setIsAvatarModalOpen(false)}
          currentAvatar={avatarUrl}
          userName={name}
          onSelectAvatar={handleAvatarSelect}
        />

      </div>
    </div>
  );
}
