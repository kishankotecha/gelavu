"use client";

import React, { useState } from "react";
import { Check, ShieldAlert, Clock, UserX, Calendar, ArrowRightLeft } from "lucide-react";
import { CustomDropdown } from "@/components/ui/CustomDropdown";

export interface FixtureMatch {
  id: string;
  round: string;
  team1: { name: string; score?: number; seed?: number };
  team2: { name: string; score?: number; seed?: number };
  court: string;
  time: string;
  status: "SCHEDULED" | "LIVE" | "COMPLETED" | "ISSUE_MODIFIED";
  issueAuditReason?: string;
}

interface Props {
  match: FixtureMatch | null;
  isOpen: boolean;
  onClose: () => void;
  availableTeams?: string[];
  onResolveIssue: (matchId: string, updated: {
    team1: string;
    team2: string;
    court: string;
    time: string;
    issueReason: string;
  }) => void;
}

const ISSUE_REASONS = [
  { id: "injury", label: "Player Injury / Walkover", icon: UserX },
  { id: "court_conflict", label: "Court Scheduling & Double Booking Clash", icon: Clock },
  { id: "emergency_sub", label: "Emergency BYOP Partner Substitution", icon: ArrowRightLeft },
  { id: "mutual_request", label: "Mutual Participant Reschedule Request", icon: Calendar },
];

export function FixtureIssueModal({
  match,
  isOpen,
  onClose,
  availableTeams = [],
  onResolveIssue,
}: Props) {
  const [selectedReason, setSelectedReason] = useState(ISSUE_REASONS[0].label);
  const [team1Name, setTeam1Name] = useState(match?.team1.name || "");
  const [team2Name, setTeam2Name] = useState(match?.team2.name || "");
  const [court, setCourt] = useState(match?.court || "Court 1");
  const [time, setTime] = useState(match?.time || "3:00 PM");
  const [hostNotes, setHostNotes] = useState("");

  if (!isOpen || !match) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onResolveIssue(match.id, {
      team1: team1Name || match.team1.name,
      team2: team2Name || match.team2.name,
      court: court || match.court,
      time: time || match.time,
      issueReason: `${selectedReason}${hostNotes ? ` (${hostNotes})` : ""}`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 text-[#1E293B]">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#D5D9CE] bg-white p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E2E6DD] pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#FF685B]">
              <ShieldAlert className="w-3.5 h-3.5" /> Host Issue Override
            </span>
            <h3 className="text-xl font-black text-[#1E293B]">Resolve Fixture Issue</h3>
            <p className="text-xs text-[#64748B]">
              Fixtures are anti-tamper locked. Edit only when an exceptional player emergency or scheduling issue arises.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748B] hover:text-[#1E293B] text-sm cursor-pointer p-1 rounded-lg hover:bg-[#F5F6F0]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Reason Selector */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#475569] block mb-1.5">
              Select Legitimate Issue Reason *
            </label>
            <div className="grid grid-cols-1 gap-2">
              {ISSUE_REASONS.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedReason === r.label;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedReason(r.label)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isSelected
                        ? "border-[#14212D] bg-[#E8EFEA] text-[#14212D]"
                        : "border-[#E2E6DD] bg-[#F9FAF6] text-[#64748B] hover:text-[#1E293B] hover:bg-[#EEF1EB]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#14212D]" : "text-[#94A3B8]"}`} />
                    <span className="flex-1">{r.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#14212D]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Teams Reassignment */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                Team 1 / Player 1
              </label>
              <input
                type="text"
                list="teams-list"
                defaultValue={match.team1.name}
                onChange={(e) => setTeam1Name(e.target.value)}
                className="w-full h-10 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                Team 2 / Player 2
              </label>
              <input
                type="text"
                list="teams-list"
                defaultValue={match.team2.name}
                onChange={(e) => setTeam2Name(e.target.value)}
                className="w-full h-10 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none"
              />
            </div>

            <datalist id="teams-list">
              {availableTeams.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>

          {/* Court & Time adjustments */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                Court Assignment
              </label>
              <CustomDropdown
                value={court || match.court}
                onChange={setCourt}
                options={[
                  { value: "Court 1", label: "Court 1 (Center Synthetic)", badge: "Center" },
                  { value: "Court 2", label: "Court 2 (Synthetic)", badge: "Synthetic" },
                  { value: "Court 3", label: "Court 3 (Synthetic)", badge: "Synthetic" },
                  { value: "Court 4", label: "Court 4 (Wooden)", badge: "Wooden" },
                ]}
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
                Rescheduled Time
              </label>
              <input
                type="text"
                defaultValue={match.time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:30 AM"
                className="w-full h-10 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Additional Auditor Note */}
          <div>
            <label className="text-[11px] font-semibold text-[#64748B] block mb-1">
              Host Transparency Audit Note (Visible to public bracket)
            </label>
            <input
              type="text"
              placeholder="e.g. Swapped with permission due to ankle sprain in warmups"
              value={hostNotes}
              onChange={(e) => setHostNotes(e.target.value)}
              className="w-full h-10 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-xs text-[#1E293B] focus:border-[#14212D] focus:bg-white focus:outline-none placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#E2E6DD]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#D5D9CE] bg-[#F9FAF6] hover:bg-[#EEF1EB] px-5 py-2.5 text-xs font-bold text-[#64748B] hover:text-[#1E293B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-navy hover:bg-[#16392B] text-white px-6 py-2.5 text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              Save & Audit Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
