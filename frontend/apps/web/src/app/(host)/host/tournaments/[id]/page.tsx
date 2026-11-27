import React from "react";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/data/mock-data";
import { Users, Calendar, GitBranch, Trophy, ArrowLeft } from "lucide-react";
import {
  DashboardEyebrow,
  DashboardTitle,
  DashboardLead,
  DashboardStatValue,
  HostPageShell,
} from "@/components/layout/DashboardTypography";

export default async function HostTournamentOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tournament = MOCK_TOURNAMENTS[0];

  const navCards = [
    {
      title: "Player Entries",
      desc: "View registrations, approve entries, or bulk import via Excel & AI camera scan",
      href: `/host/tournaments/${id}/entries`,
      icon: Users,
      badge: "48 Players",
    },
    {
      title: "Fixtures & Bracket",
      desc: "Interactive Picker Wheel live draw, seeding, and host audit issue resolution",
      href: `/host/tournaments/${id}/fixtures`,
      icon: GitBranch,
      badge: "Draw Ready",
    },
    {
      title: "Court Schedules",
      desc: "Allocate courts 1-4, assign match time slots, and issue umpire QR codes",
      href: `/host/tournaments/${id}/schedule`,
      icon: Calendar,
      badge: "4 Courts",
    },
    {
      title: "Results & Prizes",
      desc: "Review completed matches, approve scores, and issue prize certificates",
      href: `/host/tournaments/${id}/results`,
      icon: Trophy,
      badge: "Pending Final",
    },
  ];

  return (
    <HostPageShell className="max-w-5xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#14212D] mb-2 font-medium">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <DashboardEyebrow className="text-[#14212D]">Tournament workspace</DashboardEyebrow>
          <DashboardTitle className="mt-1.5">{tournament?.title}</DashboardTitle>
          <DashboardLead className="text-xs sm:text-sm">
            Status: {tournament?.status} · ID {id}
          </DashboardLead>
        </div>

        <Link href={`/live/${id}`} target="_blank">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#D5D9CE] bg-white hover:bg-[#F5F6F0] text-[#1E293B] px-4 py-2 text-xs font-bold transition-all shadow-xs cursor-pointer">
            Open Live Big Screen 📺
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Registered Entries</span>
          <div className="mt-2 flex items-baseline gap-2">
            <DashboardStatValue>48 / 64</DashboardStatValue>
          </div>
          <span className="text-xs font-bold text-[#14212D] mt-2 block">75% Capacity</span>
        </div>

        <div className="rounded-2xl bg-[#14212D] p-5 text-white shadow-sm border border-[#16392B]">
          <span className="text-xs font-semibold text-[#E8EFEA]/80">Prize Pool</span>
          <div className="mt-2">
            <DashboardStatValue inverted className="text-white">₹50,000</DashboardStatValue>
          </div>
          <span className="text-xs text-[#E8EFEA]/70 mt-2 block">Trophies & Medals Ready</span>
        </div>

        <div className="rounded-2xl border border-[#E2E6DD] bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-[#64748B]">Match Progress</span>
          <div className="mt-2 flex items-baseline gap-2">
            <DashboardStatValue>12 / 16</DashboardStatValue>
          </div>
          <span className="text-xs font-bold text-[#14212D] mt-2 block">Semi-finals in progress</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {navCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="p-6 rounded-2xl border border-[#E2E6DD] bg-white hover:border-[#14212D] hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#E8EFEA] text-[#14212D] group-hover:bg-[#14212D] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-[#14212D] bg-[#E8EFEA] px-2.5 py-1 rounded-full border border-[#CAD7CE]">
                    {c.badge}
                  </span>
                </div>
                <h3 className="font-rogenz text-lg font-bold tracking-wide text-[#14212D] group-hover:text-[#14212D] transition-colors">{c.title}</h3>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{c.desc}</p>
              </div>
              <div className="mt-6 text-xs font-bold text-[#14212D] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Manage Section →
              </div>
            </Link>
          );
        })}
      </div>
    </HostPageShell>
  );
}
