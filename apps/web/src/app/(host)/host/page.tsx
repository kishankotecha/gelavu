"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  UserPlus,
  Dices,
  Zap,
  PauseCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function HostDashboardPage() {
  const { showToast } = useToast();
  const [signupsPaused, setSignupsPaused] = useState(false);

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
      statusClass: "bg-[#DCFCE7] text-[#16A34A]",
      avatar: "AR",
      avatarBg: "bg-emerald-600",
    },
    {
      id: "reg-2",
      player: "Meera Iyer",
      category: "Women's Singles",
      paid: "₹839",
      status: "Pending",
      statusClass: "bg-[#FEF3C7] text-[#D97706]",
      avatar: "MI",
      avatarBg: "bg-amber-600",
    },
    {
      id: "reg-3",
      player: "Kiran Shah",
      category: "Mixed Doubles",
      paid: "Cash",
      status: "Added by host",
      statusClass: "bg-[#EDE9FE] text-[#7C3AED]",
      avatar: "KS",
      avatarBg: "bg-purple-600",
    },
    {
      id: "reg-4",
      player: "Sana Khan",
      category: "Women's Singles",
      paid: "—",
      status: "Waitlisted",
      statusClass: "bg-[#F1F5F9] text-[#64748B]",
      avatar: "SK",
      avatarBg: "bg-slate-600",
    },
  ];

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-gray-500 font-semibold block">Welcome back, Ace Arena</span>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Bengaluru Open 2025
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              {signupsPaused ? "Registrations paused" : "Registration open • closes 10 Mar"}
            </span>
          </div>
        </div>

        <Link href="/host/tournaments/new">
          <button className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-gray-800 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>Create tournament</span>
          </button>
        </Link>
      </div>

      {/* 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Registrations</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black text-gray-900">86</span>
          </div>
          <span className="text-xs font-bold text-emerald-600 mt-2 block">↑ 14 this week</span>
        </div>

        {/* Metric 2: Payments Collected (Dark Card with Neon Lime Text) */}
        <div className="rounded-2xl bg-[#0B101B] p-5 text-white shadow-xs">
          <span className="text-xs font-semibold text-gray-400">Payments collected</span>
          <div className="mt-2">
            <span className="text-3xl font-black text-[#D4FF00] tracking-tight">₹92,400</span>
          </div>
          <span className="text-xs text-gray-400 mt-2 block">Payout after event</span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Slots left</span>
          <div className="mt-2">
            <span className="text-3xl font-black text-gray-900">34</span>
          </div>
          <span className="text-xs text-gray-500 mt-2 block">of 120 total</span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Confirmed / Pending</span>
          <div className="mt-2">
            <span className="text-3xl font-black text-gray-900">
              79 <span className="text-gray-300 font-normal">/</span> <span className="text-[#F59E0B]">7</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Split: Left Recent Registrations, Right Fill + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Recent Registrations Table) */}
        <div className="lg:col-span-8 rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-gray-900">Recent registrations</h2>
            <button
              onClick={() => showToast("Exporting registrations report (PDF/Excel)...", "info")}
              className="text-xs font-bold text-gray-700 hover:text-black flex items-center gap-1 underline underline-offset-4"
            >
              Export PDF / Excel
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 uppercase tracking-wider pb-2">
                  <th className="pb-3 font-bold">Player / Team</th>
                  <th className="pb-3 font-bold">Category</th>
                  <th className="pb-3 font-bold">Paid</th>
                  <th className="pb-3 font-bold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {recentRegistrations.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full ${row.avatarBg} text-white flex items-center justify-center text-[10px] font-bold shrink-0`}
                        >
                          {row.avatar}
                        </div>
                        <span className="font-bold text-gray-900">{row.player}</span>
                      </div>
                    </td>
                    <td className="py-3.5 text-gray-600">{row.category}</td>
                    <td className="py-3.5 text-gray-900 font-semibold">{row.paid}</td>
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
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-gray-900">Category fill</h3>

            <div className="space-y-4">
              {/* Category 1: Men's Doubles */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-800 mb-1.5">
                  <span>Men&apos;s Doubles</span>
                  <span>26/32</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-black rounded-full" style={{ width: "81%" }} />
                </div>
              </div>

              {/* Category 2: Mixed Doubles */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-800 mb-1.5">
                  <span>Mixed Doubles</span>
                  <span>10/24</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-[#84CC16] rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              {/* Category 3: Women's Singles */}
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-800 mb-1.5">
                  <span>Women&apos;s Singles</span>
                  <span>16/16</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-[#EF4444] rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-2xl border border-gray-200/90 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-gray-900">Quick actions</h3>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/host/tournaments/tour-1/entries"
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors text-center group"
              >
                <UserPlus className="w-5 h-5 text-gray-700 group-hover:text-black mb-1.5" />
                <span className="text-[11px] font-bold text-gray-800">Add player</span>
              </Link>

              <Link
                href="/host/tournaments/tour-1/fixtures"
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors text-center group"
              >
                <Dices className="w-5 h-5 text-gray-700 group-hover:text-black mb-1.5" />
                <span className="text-[11px] font-bold text-gray-800">Run draw</span>
              </Link>

              <Link
                href="/host/tournaments/tour-1/schedule"
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors text-center group"
              >
                <Zap className="w-5 h-5 text-gray-700 group-hover:text-black mb-1.5" />
                <span className="text-[11px] font-bold text-gray-800">Assign umpires</span>
              </Link>

              <button
                type="button"
                onClick={togglePause}
                className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 transition-colors text-center group cursor-pointer"
              >
                <PauseCircle className="w-5 h-5 text-gray-700 group-hover:text-black mb-1.5" />
                <span className="text-[11px] font-bold text-gray-800">
                  {signupsPaused ? "Resume signups" : "Pause signups"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
