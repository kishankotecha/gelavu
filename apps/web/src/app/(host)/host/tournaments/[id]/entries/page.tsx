"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, UserPlus, Users, CheckCircle2 } from "lucide-react";

export default function HostTournamentEntriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualCategory, setManualCategory] = useState("Men's Singles");

  const [entries, setEntries] = useState([
    { id: "e-1", name: "Rohan Kumar", phone: "9876543210", category: "Men's Singles", status: "CONFIRMED", fee: "₹1,200", method: "Razorpay" },
    { id: "e-2", name: "Karthik Gowda", phone: "9812345678", category: "Men's Singles", status: "CONFIRMED", fee: "₹1,200", method: "Razorpay" },
    { id: "e-3", name: "Aditya Hegde", phone: "9834567890", category: "Men's Singles", status: "CONFIRMED", fee: "₹1,200", method: "Cash (Manual)" },
  ]);

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualName) {
      setEntries([
        ...entries,
        {
          id: `e-${Date.now()}`,
          name: manualName,
          phone: manualPhone || "N/A",
          category: manualCategory,
          status: "CONFIRMED",
          fee: "₹1,200",
          method: "Cash (Manual)",
        },
      ]);
      setManualName("");
      setManualPhone("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <Link href={`/host/tournaments/${id}`} className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Tournament Overview
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Users className="w-7 h-7 text-emerald-400" /> Player Entries
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage participants and record manual / offline registrations</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)} variant="primary" size="sm" className="gap-2">
          <UserPlus className="w-4 h-4" /> Add Player Manually
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/60 shadow-xl">
        <div className="grid grid-cols-12 gap-4 px-6 py-3.5 bg-gray-950/80 border-b border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
          <div className="col-span-4">Player Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-3 text-right">Payment / Source</div>
        </div>

        <div className="divide-y divide-gray-800/60">
          {entries.map((entry) => (
            <div key={entry.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-4">
                <p className="font-bold text-white text-sm">{entry.name}</p>
                <p className="text-xs text-gray-500">{entry.phone}</p>
              </div>
              <div className="col-span-3 text-xs text-gray-300 font-medium">{entry.category}</div>
              <div className="col-span-2 text-center">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Confirmed
                </span>
              </div>
              <div className="col-span-3 text-right">
                <span className="font-mono text-xs font-semibold text-white">{entry.fee}</span>
                <p className="text-[10px] text-gray-400">{entry.method}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Entry Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogHeader>
          <DialogTitle>Add Player Manually</DialogTitle>
          <DialogDescription>
            Record on-spot or offline cash registrations directly into the tournament draw.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAddManual} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-300">Player Full Name</label>
            <Input value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder="e.g. Varun Shenoy" required />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300">Mobile Phone</label>
            <Input value={manualPhone} onChange={(e) => setManualPhone(e.target.value)} placeholder="9876543210" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300">Category</label>
            <select
              value={manualCategory}
              onChange={(e) => setManualCategory(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-700 bg-gray-900 px-3 text-sm text-gray-100"
            >
              <option value="Men's Singles">Men&apos;s Singles</option>
              <option value="Men's Doubles">Men&apos;s Doubles</option>
              <option value="Mixed Doubles">Mixed Doubles</option>
              <option value="Blind-Draw Doubles">Blind-Draw Doubles</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Player to Draw
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}
