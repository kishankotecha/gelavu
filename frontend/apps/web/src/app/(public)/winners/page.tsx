import React from "react";
import { Trophy, Award, Calendar, Sparkles } from "lucide-react";
import { formatMoney } from "@/utils/formatters";

export default function WinnersPage() {
  const winners = [
    {
      id: "w-1",
      tournamentTitle: "Karnataka State Badminton Super Open",
      champion: "Kavya Murthy",
      runnerUp: "Ananya Deshmukh",
      sport: "Badminton",
      category: "Women's Singles",
      date: "Nov 15, 2026",
      prize: 40000,
    },
    {
      id: "w-2",
      tournamentTitle: "Bengaluru Pickleball Masters Cup",
      champion: "Pranav Gowda & Vikram Singhania",
      runnerUp: "Siddharth Rao & Manjunath K",
      sport: "Pickleball",
      category: "Men's Doubles",
      date: "Nov 10, 2026",
      prize: 35000,
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hotpink/30 bg-hotpink/100/10 text-hotpink text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Hall of Champions
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Tournament Winners</h1>
        <p className="text-sm text-white/70 mt-2">
          Celebrating the grit, talent, and championship victories of grassroots athletes across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {winners.map((win) => (
          <div
            key={win.id}
            className="rounded-2xl border border-hotpink/30 bg-navy p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Trophy className="w-28 h-28 text-hotpink" />
            </div>

            <div className="flex items-center justify-between text-xs text-white/70 mb-2">
              <span className="font-bold text-hotpink uppercase tracking-wider">{win.sport}</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {win.date}
              </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-1">{win.tournamentTitle}</h3>
            <p className="text-xs text-hotpink font-semibold mb-6">{win.category}</p>

            <div className="space-y-3 bg-gray-950/60 p-4 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-hotpink flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-hotpink" /> Champion:
                </span>
                <span className="text-sm font-black text-white">{win.champion}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-white/60" /> Runner-up:
                </span>
                <span className="font-semibold text-white/80">{win.runnerUp}</span>
              </div>
              <div className="pt-2 border-t border-white/10/80 flex items-center justify-between text-xs">
                <span className="text-white/60">Prize Awarded:</span>
                <span className="font-bold text-hotpink">{formatMoney(win.prize)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
