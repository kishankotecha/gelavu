"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  UserPlus,
  Dices,
  Zap,
  PauseCircle,
  FileSpreadsheet,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import {
  DashboardEyebrow,
  DashboardTitle,
  DashboardLead,
  DashboardSectionTitle,
  DashboardStatValue,
  HostPageShell,
} from "@/components/layout/DashboardTypography";

export default function HostDashboardPage() {
  const { showToast } = useToast();
  const [signupsPaused, setSignupsPaused] = useState(false);
  const [selectedTourId, setSelectedTourId] = useState("tour-1");

  const togglePause = () => {
    setSignupsPaused(!signupsPaused);
    showToast(
      !signupsPaused ? "Registrations paused for new players" : "Registrations resumed",
      "info"
    );
  };

  const recentRegistrations = [
    {
      id: "reg-1",
      player: "Arjun & Rohan",
      category: "Men's Doubles",
      paid: "₹1,260",
      status: "Confirmed",
      statusClass: "bg-[#E8EFEA] text-[#1D4A38] border border-[#CAD7CE]",
      avatar: "AR",
      avatarBg: "bg-[#1D4A38]",
    },
    {
      id: "reg-2",
      player: "Meera Iyer",
      category: "Women's Singles",
      paid: "₹839",
      status: "Pending",
      statusClass: "bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]",
      avatar: "MI",
      avatarBg: "bg-[#B45309]",
    },
    {
      id: "reg-3",
      player: "Kiran Shah",
      category: "Mixed Doubles",
      paid: "Cash",
      status: "Added by host",
      statusClass: "bg-[#EEF2F6] text-[#1E3A8A] border border-[#BFDBFE]",
      avatar: "KS",
      avatarBg: "bg-[#1E3A8A]",
    },
    {
      id: "reg-4",
      player: "Sana Khan",
      category: "Women's Singles",
      paid: "—",
      status: "Waitlisted",
      statusClass: "bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]",
      avatar: "SK",
      avatarBg: "bg-[#64748B]",
    },
  ];

  return (
    <HostPageShell>
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <DashboardEyebrow>Welcome back · Ace Arena Pavilion</DashboardEyebrow>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <DashboardTitle>Bengaluru Open 2026</DashboardTitle>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] border border-[#CAD7CE] px-3 py-0.5 text-xs font-semibold text-[#1D4A38]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1D4A38] animate-pulse" />
              {signupsPaused ? "Registrations paused" : "Registration open • closes 10 Mar"}
            </span>
          </div>

          {/* Active Tournament Switcher for Multi-Tournament Management */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs font-bold text-slate-500">Managing Tournament:</span>
            <div className="w-72">
              <CustomDropdown
                value={selectedTourId}
                onChange={setSelectedTourId}
                options={[
                  { value: "tour-1", label: "Bengaluru Shuttle Clash 2026", badge: "Live" },
                  { value: "tour-2", label: "Mysuru Pickleball Open 2026", badge: "Draft" },
                  { value: "tour-3", label: "Hubballi Smash Masters", badge: "Upcoming" },
                ]}
              />
            </div>
            <Link
              href={`/host/tournaments/${selectedTourId}`}
              className="text-xs font-bold text-slate-900 hover:text-amber-500 transition-colors ml-1"
            >
              Open Space →
            </Link>
          </div>
        </div>

        <Link href="/host/tournaments/new">
          <button className="inline-flex items-center gap-2 rounded-full bg-[#1D4A38] hover:bg-[#16392B] text-white px-5 py-2.5 text-xs font-bold transition-all shadow-xs cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Create tournament</span>
          </button>
        </Link>
      </div>

      {/* 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Registrations</span>
          <div className="mt-2 flex items-baseline gap-2">
            <DashboardStatValue>86</DashboardStatValue>
          </div>
          <span className="text-xs font-bold text-[#1D4A38] mt-2 block">↑ 14 this week</span>
        </div>

        {/* Metric 2: Payments Collected (British Racing Green Heritage Card) */}
        <div className="rounded-2xl bg-[#1D4A38] p-5 text-white shadow-sm border border-[#16392B]">
          <span className="text-xs font-semibold text-[#E8EFEA]/80">Payments collected</span>
          <div className="mt-2">
            <DashboardStatValue inverted className="text-white">₹92,400</DashboardStatValue>
          </div>
          <span className="text-xs text-[#E8EFEA]/70 mt-2 block">Payout after tournament</span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Slots left</span>
          <div className="mt-2">
            <DashboardStatValue>34</DashboardStatValue>
          </div>
          <span className="text-xs text-[#64748B] mt-2 block">of 120 total capacity</span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Confirmed / Pending</span>
          <div className="mt-2">
            <DashboardStatValue>
              79 <span className="text-slate-300 font-sans text-xl">/</span>{" "}
              <span className="text-amber-700">7</span>
            </DashboardStatValue>
          </div>
          <span className="text-xs text-[#64748B] mt-2 block">Verifications in review</span>
        </div>
      </div>

      {/* Main Content Split: Left Recent Registrations, Right Fill + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Recent Registrations Table) */}
        <div className="lg:col-span-8 rounded-2xl border border-[#E2E6DD] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <DashboardSectionTitle>Recent registrations</DashboardSectionTitle>
              <DashboardLead className="mt-1 text-xs sm:text-sm">
                Players registered through public portal and host import
              </DashboardLead>
            </div>
            <button
              onClick={() => showToast("Exporting registrations report (PDF/Excel)...", "info")}
              className="text-xs font-bold text-[#1D4A38] hover:text-[#16392B] flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export PDF / Excel</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E2E6DD] text-[11px] font-bold text-[#64748B] uppercase tracking-wider pb-2">
                  <th className="pb-3 font-bold">Player / Team</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Paid</th>
                  <th className="pb-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6DD] font-medium">
                {recentRegistrations.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F9FAF6] transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full ${row.avatarBg} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}
                        >
                          {row.avatar}
                        </div>
                        <span className="font-bold text-[#1E293B]">{row.player}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-[#64748B]">{row.category}</td>
                    <td className="py-3.5 text-[#1E293B] font-semibold">{row.paid}</td>
                    <td className="py-3.5 text-right">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${row.statusClass}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Category Fill + Quick Actions) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category Fill Card */}
          <div className="rounded-2xl border border-[#E2E6DD] bg-white p-6 shadow-xs space-y-4">
            <DashboardSectionTitle className="text-base sm:text-lg">Category fill</DashboardSectionTitle>

            <div className="space-y-4">
              {/* Category 1: Men's Doubles */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                  <span>Men&apos;s Doubles</span>
                  <span>26/32</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F5F6F0] overflow-hidden">
                  <div className="h-full bg-[#1D4A38] rounded-full" style={{ width: "81%" }} />
                </div>
              </div>

              {/* Category 2: Mixed Doubles */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                  <span>Mixed Doubles</span>
                  <span>10/24</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F5F6F0] overflow-hidden">
                  <div className="h-full bg-[#2D6A4F] rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              {/* Category 3: Women's Singles */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1E293B] mb-1.5">
                  <span>Women&apos;s Singles</span>
                  <span className="text-[#B45309] font-bold">16/16 Full</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#F5F6F0] overflow-hidden">
                  <div className="h-full bg-[#B45309] rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-2xl border border-[#E2E6DD] bg-white p-6 shadow-xs space-y-4">
            <DashboardSectionTitle className="text-base sm:text-lg">Quick actions</DashboardSectionTitle>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href={`/host/tournaments/${selectedTourId}/entries`}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] border border-[#E2E6DD] transition-colors text-center group"
              >
                <UserPlus className="w-5 h-5 text-[#1D4A38] mb-1.5" />
                <span className="text-[11px] font-bold text-[#1E293B]">Add player</span>
              </Link>

              <Link
                href={`/host/tournaments/${selectedTourId}/fixtures`}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] border border-[#E2E6DD] transition-colors text-center group"
              >
                <Dices className="w-5 h-5 text-[#1D4A38] mb-1.5" />
                <span className="text-[11px] font-bold text-[#1E293B]">Run draw & fixtures</span>
              </Link>

              <Link
                href={`/host/tournaments/${selectedTourId}/schedule`}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] border border-[#E2E6DD] transition-colors text-center group"
              >
                <Zap className="w-5 h-5 text-[#1D4A38] mb-1.5" />
                <span className="text-[11px] font-bold text-[#1E293B]">Assign umpires</span>
              </Link>

              <button
                type="button"
                onClick={togglePause}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#F9FAF6] hover:bg-[#EEF1EB] border border-[#E2E6DD] transition-colors text-center group cursor-pointer"
              >
                <PauseCircle className="w-5 h-5 text-[#64748B] group-hover:text-[#1D4A38] mb-1.5" />
                <span className="text-[11px] font-bold text-[#1E293B]">
                  {signupsPaused ? "Resume signups" : "Pause signups"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </HostPageShell>
  );
}
