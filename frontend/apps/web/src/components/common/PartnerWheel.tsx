"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Sparkles, Users } from "lucide-react";

interface PartnerWheelProps {
  candidates: { id: string; name: string; rating?: number }[];
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  onWinnerSelected?: (winner: { id: string; name: string }) => void;
}

export function PartnerWheel({
  candidates,
  title = "Host Random Partner Wheel",
  subtitle = "The tournament host spins the wheel to draw random teams from verified solo players",
  buttonLabel = "SPIN THE WHEEL 🎯",
  onWinnerSelected,
}: PartnerWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState<{ id: string; name: string } | null>(null);

  const spinWheel = () => {
    if (spinning || candidates.length === 0) return;

    setSpinning(true);
    setSelectedPartner(null);

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const chosen = candidates[randomIndex];
    const segmentAngle = 360 / candidates.length;
    const targetAngle = 360 * 5 + (candidates.length - randomIndex - 0.5) * segmentAngle;

    setRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setSelectedPartner(chosen);
      if (onWinnerSelected) onWinnerSelected(chosen);
    }, 4000);
  };

  const colors = ["#059669", "#0284c7", "#d97706", "#7c3aed", "#e11d48", "#0d9488", "#4f46e5", "#FF685B"];

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900/80 rounded-2xl border border-white/10 backdrop-blur-md">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-hotpink" />
          {title}
        </h3>
        <p className="text-xs text-white/70 mt-1 max-w-md mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Wheel Container */}
      <div className="relative w-72 h-72 my-4 flex items-center justify-center">
        {/* Pointer indicator */}
        <div className="absolute top-0 z-20 -mt-3 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-hotpink drop-shadow-md" />

        {/* The rotating wheel */}
        <div
          className="w-full h-full rounded-full border-4 border-hotpink/30 shadow-2xl overflow-hidden relative transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {candidates.map((cand, index) => {
            const angle = (360 / candidates.length) * index;
            return (
              <div
                key={cand.id}
                className="absolute w-1/2 h-full top-0 right-0 origin-left flex items-center pl-6 text-xs font-bold text-white select-none"
                style={{
                  transform: `rotate(${angle}deg)`,
                  backgroundColor: colors[index % colors.length],
                }}
              >
                <span className="truncate max-w-[90px] drop-shadow-sm">{cand.name}</span>
              </div>
            );
          })}
        </div>

        {/* Center hub */}
        <div className="absolute z-10 w-16 h-16 rounded-full bg-gray-950 border-4 border-hotpink/30 flex items-center justify-center shadow-lg">
          <Users className="w-6 h-6 text-hotpink" />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          onClick={spinWheel}
          disabled={spinning || candidates.length === 0}
          variant="gold"
          size="lg"
          className="px-8 shadow-lg shadow-hotpink/20 cursor-pointer"
        >
          {spinning ? "Drawing Random Team..." : buttonLabel}
        </Button>

        {selectedPartner && (
          <div className="mt-4 p-4 rounded-xl bg-hotpink/10 border border-hotpink/30 text-center animate-in zoom-in-95">
            <span className="text-xs font-semibold text-hotpink uppercase tracking-widest">Host Draw Result</span>
            <h4 className="text-lg font-bold text-white mt-1">Drawn Partner: {selectedPartner.name}</h4>
          </div>
        )}
      </div>
    </div>
  );
}
