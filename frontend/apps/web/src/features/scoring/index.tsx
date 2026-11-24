"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function PointButtons({
  onAddPoint,
  onDeductPoint,
  label = "Team Point",
}: {
  onAddPoint: () => void;
  onDeductPoint: () => void;
  label?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 text-center">{label}</span>
      <div className="flex gap-2">
        <Button onClick={onAddPoint} variant="primary" size="lg" className="flex-1 text-2xl font-black h-14">
          +1
        </Button>
        <Button onClick={onDeductPoint} variant="secondary" size="lg" className="h-14 w-12 font-bold text-lg">
          -1
        </Button>
      </div>
    </div>
  );
}

export function ScoreSheet({
  team1Name,
  team2Name,
  t1Score,
  t2Score,
  setNumber = 1,
}: {
  team1Name: string;
  team2Name: string;
  t1Score: number;
  t2Score: number;
  setNumber?: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6 text-center">
      <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Set {setNumber}</span>
      <div className="grid grid-cols-2 gap-4 mt-4 items-center">
        <div>
          <h4 className="text-base font-bold text-white truncate">{team1Name}</h4>
          <span className="text-5xl font-mono font-black text-white">{t1Score}</span>
        </div>
        <div>
          <h4 className="text-base font-bold text-white truncate">{team2Name}</h4>
          <span className="text-5xl font-mono font-black text-white">{t2Score}</span>
        </div>
      </div>
    </div>
  );
}

export function GameSummary({
  scores,
  winner,
}: {
  scores: { set: number; t1: number; t2: number }[];
  winner?: string;
}) {
  return (
    <div className="rounded-xl bg-gray-950 p-4 border border-gray-800 text-xs">
      <p className="font-bold text-white mb-2">Game Summary</p>
      {scores.map((s) => (
        <div key={s.set} className="flex justify-between text-gray-400 py-1 border-b border-gray-900">
          <span>Set {s.set}</span>
          <span className="font-mono text-white font-semibold">{s.t1} - {s.t2}</span>
        </div>
      ))}
      {winner && <p className="mt-2 text-emerald-400 font-bold">Winner: {winner}</p>}
    </div>
  );
}

export * from "./PlayoPostMatchRatingModal";

