"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SPORTS } from "@/config/constants";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CreateTournamentPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [sport, setSport] = useState("BADMINTON");
  const [venueName, setVenueName] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [entryFee, setEntryFee] = useState("1000");
  const [prizePool, setPrizePool] = useState("35000");
  const [maxEntries, setMaxEntries] = useState("32");
  const [partnerDrawEnabled, setPartnerDrawEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/host");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Host Dashboard
      </Link>

      <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
        <div className="pb-6 border-b border-gray-800">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Host Wizard</span>
          <h1 className="text-3xl font-black text-white mt-1">Create New Tournament</h1>
          <p className="text-xs text-gray-400 mt-1">Set up rules, registration fees, categories, and venue details</p>
        </div>

        <form onSubmit={handleSubmit} className="py-6 space-y-6">
          <div>
            <label className="text-xs font-semibold text-gray-300">Tournament Title</label>
            <Input
              placeholder="e.g. Bangalore Shuttle Clash 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300">Sport</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-700 bg-gray-900 px-3 text-sm text-gray-100"
              >
                {SPORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300">City</label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300">Venue & Address</label>
            <Input
              placeholder="e.g. Padukone-Dravid Centre for Sports Excellence"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300">Entry Fee (₹)</label>
              <Input type="number" value={entryFee} onChange={(e) => setEntryFee(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300">Prize Pool (₹)</label>
              <Input type="number" value={prizePool} onChange={(e) => setPrizePool(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300">Max Entries</label>
              <Input type="number" value={maxEntries} onChange={(e) => setMaxEntries(e.target.value)} required />
            </div>
          </div>

          {/* Blind Draw Feature Toggle */}
          <div className="p-4 rounded-2xl border border-gray-800 bg-gray-950/60 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Enable Blind-Draw Doubles Wheel
              </span>
              <p className="text-xs text-gray-400 mt-0.5">
                Allows solo players to register and spins the wheel live for partner assignment
              </p>
            </div>
            <input
              type="checkbox"
              checked={partnerDrawEnabled}
              onChange={(e) => setPartnerDrawEnabled(e.target.checked)}
              className="h-5 w-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Publish Tournament & Open Registrations
          </Button>
        </form>
      </div>
    </div>
  );
}
