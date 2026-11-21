import React from "react";
import Link from "next/link";
import { MOCK_TOURNAMENTS } from "@/data/mock-data";
import { StatTile } from "@/components/common/StatTile";
import { Button } from "@/components/ui/button";
import { Users, Calendar, GitBranch, Trophy, ArrowLeft, Clock } from "lucide-react";

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
      desc: "View registrations, approve entries, or manually add offline players",
      href: `/host/tournaments/${id}/entries`,
      icon: Users,
      badge: "48 Players",
    },
    {
      title: "Fixtures & Bracket",
      desc: "Generate tournament draw, seed players, and configure knockout rounds",
      href: `/host/tournaments/${id}/fixtures`,
      icon: GitBranch,
      badge: "Draw Ready",
    },
    {
      title: "Court Schedules",
      desc: "Allocate courts 1-4, assign match time slots, and dispatch umpires",
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
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      <Link href="/host" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Host Control Room</span>
          <h1 className="text-3xl font-black text-white">{tournament?.title}</h1>
          <p className="text-xs text-gray-400 mt-1">Status: {tournament?.status} • ID: {id}</p>
        </div>

        <Link href={`/live/${id}`} target="_blank">
          <Button variant="secondary" size="sm" className="gap-2 text-amber-300">
            Open Live Big Screen 📺
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatTile label="Registered Entries" value="48 / 64" icon={Users} />
        <StatTile label="Prize Pool" value="₹50,000" icon={Trophy} />
        <StatTile label="Match Progress" value="12 / 16 Done" icon={Clock} trend="75%" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {navCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="p-6 rounded-2xl border border-gray-800 bg-gray-900/60 hover:border-emerald-500/40 hover:bg-gray-800/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    {c.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{c.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{c.desc}</p>
              </div>
              <div className="mt-6 text-xs font-semibold text-emerald-400 flex items-center gap-1">
                Manage Section →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
