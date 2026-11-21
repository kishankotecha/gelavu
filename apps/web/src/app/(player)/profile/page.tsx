"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatTile } from "@/components/common/StatTile";
import { Trophy, Award, Activity, LogOut, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "Rohan Kumar");
  const [city, setCity] = useState(user?.city || "Bengaluru");

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Player Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your athlete credentials and sports bio</p>
        </div>
        <Button onClick={logout} variant="ghost" size="sm" className="gap-2 text-rose-400 hover:text-rose-300">
          <LogOut className="w-4 h-4" /> Sign Out
        </Button>
      </div>

      <div className="rounded-3xl border border-gray-800 bg-gray-900/60 p-6 sm:p-8 backdrop-blur-sm mb-6 space-y-6">
        <div className="flex items-center gap-5">
          <Avatar name={name} size="xl" />
          <div>
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-xs text-gray-400">{user?.phone || "+91 98765 43210"}</p>
            <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Athlete
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
          <StatTile label="Ranking Points" value="3,420" icon={Trophy} />
          <StatTile label="Titles Won" value="5" icon={Award} />
          <StatTile label="Win Rate" value="82%" icon={Activity} />
        </div>

        <div className="pt-4 border-t border-gray-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-gray-400">Home City</label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
          </div>
          <Button variant="primary" size="md">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
