import Link from "next/link";
import { Star, Trophy } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import type { Champion } from "@/types/tournament";

export function WinnersWall({ champions }: { champions: Champion[] }) {
  return (
    <section aria-labelledby="winners-title" className="space-y-4">
      {/* Dark Enclosure Card Matching Design */}
      <div className="rounded-3xl bg-[#0D1520] p-6 sm:p-8 text-white shadow-lift border border-white/5">
        {/* Header inside dark card */}
        <div className="flex items-end justify-between gap-4 pb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B84F]">
              WINNERS WALL
            </p>
            <h2 id="winners-title" className="font-rogenz mt-1 text-2xl sm:text-3xl font-bold tracking-wide text-white">
              Champions of the month
            </h2>
          </div>
          <Link
            href="/winners"
            className="shrink-0 text-xs font-semibold text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            All results
          </Link>
        </div>

        {/* 3 Champions Cards Grid */}
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {champions.slice(0, 3).map((c) => {
            const isChampion = c.badge === "CHAMPION";
            const Icon = isChampion ? Trophy : Star;
            return (
              <li
                key={c.id}
                className="flex items-center gap-3.5 rounded-2xl bg-white/5 border border-white/10 p-4 transition duration-200 hover:bg-white/[0.08]"
              >
                <Avatar
                  name={c.name}
                  size="md"
                  className="h-12 w-12 shrink-0 ring-2 ring-[#E6B84F]/70"
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#E6B84F]">
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {c.badge}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-bold text-white">{c.name}</p>
                  <p className="truncate text-xs text-white/60">{c.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
