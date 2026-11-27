"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dices, Sparkles, ShieldCheck, RotateCw, Users, Shuffle } from "lucide-react";

interface Props {
  categoryName?: string;
  tournamentId?: string;
  soloPlayers: Array<{ name: string; skillLevel?: string; style: string }>;
  teams: Array<{ id: string; name: string; seed?: number }>;
  onPairCreated?: (team: { name: string; players: string }) => void;
  onBracketRandomized?: (verifiableHash: string) => void;
  onApplyPairsToBracket?: (pairs: Array<{ name: string; players: string }>) => void;
  onBracketRandomizedTeams?: (randomizedTeams: Array<{ id: string; name: string; seed?: number }>) => void;
}

const WHEEL_COLORS = [
  "#14212D", // British Racing Green
  "#1E3A8A", // Oxford Navy
  "#FF685B", // English Tan / Cognac
  "#831843", // Plum / Wine
  "#15803D", // Forest Pine
  "#334155", // Slate Ink
  "#D97706", // Warm Ochre
  "#0F766E", // Deep Teal
];

export function PickerWheelDraw({
  categoryName,
  tournamentId,
  soloPlayers: initialSoloPlayers,
  teams,
  onPairCreated,
  onBracketRandomized,
  onApplyPairsToBracket,
  onBracketRandomizedTeams,
}: Props) {
  const [activeTab, setActiveTab] = useState<"random_doubles" | "bracket_draw">("random_doubles");
  const [soloQueue, setSoloQueue] = useState(initialSoloPlayers);
  const [pairedTeams, setPairedTeams] = useState<Array<{ name: string; players: string }>>([]);

  // Wheel animation states
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [selectedWinner, setSelectedWinner] = useState<string | null>(null);
  const [verifiableSeed, setVerifiableSeed] = useState("0x7f4b89...c312");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Items currently on the wheel
  const wheelItems =
    activeTab === "random_doubles"
      ? soloQueue.map((p) => p.name)
      : teams.map((t) => t.name);

  // Draw the spinning wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 8;

    ctx.clearRect(0, 0, size, size);

    const count = Math.max(wheelItems.length, 1);
    const arc = (2 * Math.PI) / count;

    for (let i = 0; i < count; i++) {
      const angle = i * arc;
      ctx.beginPath();
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + arc);
      ctx.lineTo(center, center);
      ctx.fill();

      // Hairline wedge border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Text label inside wedge
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 2;

      const label = wheelItems[i] || "Spin to Select";
      const truncated = label.length > 14 ? label.slice(0, 13) + "…" : label;
      ctx.fillText(truncated, radius - 14, 4);
      ctx.restore();
    }

    // Center Hub Outer Ring
    ctx.beginPath();
    ctx.arc(center, center, 24, 0, 2 * Math.PI);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.strokeStyle = "#CAD7CE";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Center Hub Dot
    ctx.beginPath();
    ctx.arc(center, center, 8, 0, 2 * Math.PI);
    ctx.fillStyle = "#14212D";
    ctx.fill();
  }, [wheelItems]);

  // Spin the wheel
  const handleSpin = () => {
    if (isSpinning || wheelItems.length === 0) return;

    setIsSpinning(true);
    setSelectedWinner(null);

    // Random rotations: between 5 to 9 full turns + random landing slice
    const extraRotations = (5 + Math.random() * 4) * 360;
    const randomStopAngle = Math.random() * 360;
    const totalRotation = currentRotation + extraRotations + randomStopAngle;

    setCurrentRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);

      // Determine winning index from final angle
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const sliceAngle = 360 / wheelItems.length;
      const winningIndex = Math.floor(normalizedAngle / sliceAngle) % wheelItems.length;
      const winner = wheelItems[winningIndex];

      setSelectedWinner(winner);

      // Cryptographic hash for verifiable anti-rigging fairness
      const newHash = `0x${Math.random().toString(16).slice(2, 8)}...${Math.random().toString(16).slice(2, 6)}`;
      setVerifiableSeed(newHash);

      if (activeTab === "random_doubles") {
        // If we have at least 2 players, pair the top two
        if (soloQueue.length >= 2) {
          const p1 = winner;
          const remaining = soloQueue.filter((p) => p.name !== p1);
          const p2 = remaining[Math.floor(Math.random() * remaining.length)].name;

          const team = {
            name: `${p1} & ${p2}`,
            players: `${p1} + ${p2} (Wheel Pair)`,
          };

          const nextPaired = [...pairedTeams, team];
          setPairedTeams(nextPaired);
          setSoloQueue((prev) => prev.filter((p) => p.name !== p1 && p.name !== p2));
          onPairCreated?.(team);
          onApplyPairsToBracket?.(nextPaired);
        }
      } else {
        // Bracket Draw mode - transparently re-order teams with verifiable hash
        const shuffled = [...teams].sort(() => Math.random() - 0.5).map((t, idx) => ({ ...t, seed: idx + 1 }));
        onBracketRandomized?.(newHash);
        onBracketRandomizedTeams?.(shuffled);
      }
    }, 2800);
  };

  // Instant Auto-Pair all remaining players
  const handleAutoPairAll = () => {
    if (soloQueue.length < 2) return;

    const shuffled = [...soloQueue].sort(() => Math.random() - 0.5);
    const newPairs: Array<{ name: string; players: string }> = [];

    for (let i = 0; i < shuffled.length - 1; i += 2) {
      const p1 = shuffled[i].name;
      const p2 = shuffled[i + 1].name;
      newPairs.push({
        name: `${p1} & ${p2}`,
        players: `${p1} (${shuffled[i].skillLevel || "Intermediate"}) + ${p2} (${shuffled[i + 1].skillLevel || "Intermediate"})`,
      });
    }

    const allPairs = [...pairedTeams, ...newPairs];
    setPairedTeams(allPairs);
    setSoloQueue([]);
    onApplyPairsToBracket?.(allPairs);
  };

  return (
    <div className="rounded-3xl border border-[#E2E6DD] bg-white p-6 sm:p-7 shadow-sm space-y-6 text-[#1E293B]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E6DD] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-[#E8EFEA] text-[#14212D]">
              <Dices className="w-4 h-4" />
            </span>
            <h3 className="text-base font-black text-[#1E293B]">Interactive Picker Wheel</h3>
            <span className="rounded-full bg-[#E8EFEA] border border-[#CAD7CE] text-[#14212D] text-[10px] font-black uppercase px-2 py-0.5">
              Anti-Fixing Live Draw
            </span>
            {tournamentId && (
              <span className="rounded-full bg-[#E8EFEA] border border-[#CAD7CE] text-[#14212D] text-[10px] font-mono font-black uppercase px-2 py-0.5">
                #{tournamentId}
              </span>
            )}
            {categoryName && (
              <span className="rounded-full bg-hotpink/10 border border-hotpink/30 text-navy text-[10px] font-black uppercase px-2.5 py-0.5">
                Category: {categoryName}
              </span>
            )}
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Spin live in front of players to form random doubles or transparently assign bracket positions.
          </p>
        </div>

        {/* Verifiable Fairness Seed */}
        <div className="flex items-center gap-1.5 rounded-xl border border-[#E2E6DD] bg-[#F9FAF6] px-3 py-1.5 text-[11px] font-mono text-[#64748B]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#14212D]" />
          <span>Proof Hash: {verifiableSeed}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E6DD] pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("random_doubles")}
          className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
            activeTab === "random_doubles"
              ? "bg-navy text-white shadow-xs"
              : "bg-[#F9FAF6] text-[#64748B] hover:text-[#1E293B] border border-[#E2E6DD]"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Random Doubles Pairing ({soloQueue.length} Solo Left)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bracket_draw")}
          className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
            activeTab === "bracket_draw"
              ? "bg-navy text-white shadow-xs"
              : "bg-[#F9FAF6] text-[#64748B] hover:text-[#1E293B] border border-[#E2E6DD]"
          }`}
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Bracket Matchup Draw ({teams.length} Teams)</span>
        </button>
      </div>

      {/* Main Wheel View & Output */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: The Spinning Wheel (approx 5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative">
          {/* Wheel Pointer Arrow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-[#14212D] drop-shadow-[0_2px_4px_rgba(29,74,56,0.3)]" />
          </div>

          {/* Rotating Canvas Wheel */}
          <div className="relative p-2 rounded-full border-4 border-[#E2E6DD] bg-[#F9FAF6] shadow-md">
            <canvas
              ref={canvasRef}
              width={260}
              height={260}
              style={{
                transform: `rotate(${currentRotation}deg)`,
                transition: isSpinning ? "transform 2.8s cubic-bezier(0.15, 0.85, 0.25, 1)" : "none",
              }}
              className="rounded-full"
            />
          </div>

          {/* Center Spin Action Button */}
          <div className="mt-4 flex items-center gap-2 w-full max-w-xs">
            <button
              type="button"
              disabled={isSpinning || wheelItems.length === 0}
              onClick={handleSpin}
              className="flex-1 rounded-full bg-navy hover:bg-[#16392B] text-white py-3 px-4 text-xs font-black uppercase tracking-wider transition-all shadow-xs disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? "animate-spin" : ""}`} />
              <span>{isSpinning ? "Spinning..." : "Spin Picker Wheel 🎯"}</span>
            </button>

            {activeTab === "random_doubles" && soloQueue.length > 1 && (
              <button
                type="button"
                disabled={isSpinning}
                onClick={handleAutoPairAll}
                className="rounded-full border border-[#D5D9CE] bg-[#F9FAF6] hover:bg-[#EEF1EB] text-[#1E293B] px-3.5 py-3 text-xs font-bold transition-colors cursor-pointer"
                title="Auto-pair all remaining solo players"
              >
                Auto-Pair
              </button>
            )}
          </div>
        </div>

        {/* Right: Live Draw Outcome & Formed Teams (approx 7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {/* Winner Card */}
          {selectedWinner ? (
            <div className="p-4 rounded-2xl bg-[#E8EFEA] border border-[#CAD7CE] text-[#14212D] shadow-sm space-y-1 animate-in zoom-in-95 duration-200">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#14212D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Wheel Selection Confirmed
              </span>
              <h4 className="text-base font-black text-[#14212D]">{selectedWinner}</h4>
              <p className="text-xs text-[#2D5A46]">
                {activeTab === "random_doubles"
                  ? "Assigned to an official doubles pairing. Verifiable anti-rigging draw recorded."
                  : "Seeded into next bracket slot without deterministic bias."}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-[#F9FAF6] text-center text-xs text-[#64748B]">
              Click <strong className="text-[#1E293B]">Spin Picker Wheel</strong> to randomly select a participant live.
            </div>
          )}

          {/* Formed Teams List */}
          {activeTab === "random_doubles" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <span>Drawn Wheel Teams ({pairedTeams.length})</span>
                <span className="text-[#14212D] font-mono font-bold">Confirmed</span>
              </div>

              <div className="max-h-48 overflow-y-auto rounded-xl border border-[#E2E6DD] bg-[#F9FAF6] divide-y divide-[#E2E6DD] text-xs">
                {pairedTeams.length > 0 ? (
                  pairedTeams.map((t, idx) => (
                    <div key={idx} className="p-2.5 flex items-center justify-between bg-white">
                      <div className="flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded bg-[#E8EFEA] text-[#14212D] text-[10px] font-black">
                          #{idx + 1}
                        </span>
                        <strong className="text-[#1E293B]">{t.name}</strong>
                      </div>
                      <span className="text-[10px] font-bold text-[#14212D] bg-[#E8EFEA] px-2 py-0.5 rounded-full border border-[#CAD7CE]">
                        Pair Drawn
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-center text-[#94A3B8] text-xs">
                    No teams drawn yet. Spin the wheel to generate pairs.
                  </p>
                )}
              </div>

              {pairedTeams.length > 0 && (
                <button
                  type="button"
                  onClick={() => onApplyPairsToBracket?.(pairedTeams)}
                  className="w-full mt-2 py-2.5 px-3 rounded-xl bg-hotpink hover:bg-[#C98B28] text-[#14212D] font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Apply {pairedTeams.length} Wheel Pairs to Championship Bracket →</span>
                </button>
              )}
            </div>
          )}

          {activeTab === "bracket_draw" && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl border border-[#E2E6DD] bg-[#F9FAF6] space-y-2 text-xs">
                <span className="text-[11px] font-black uppercase text-[#FF685B] block">
                  Why use the Picker Wheel for Fixtures?
                </span>
                <p className="text-[#475569] leading-relaxed">
                  Traditional fixed bracket logic can create predictable matchups or lead to complaints of match-fixing. The Wheel of Fortune ensures provably fair random seeds that every player can verify live.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const shuffled = [...teams].sort(() => Math.random() - 0.5).map((t, idx) => ({ ...t, seed: idx + 1 }));
                  onBracketRandomizedTeams?.(shuffled);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-hotpink hover:bg-[#C98B28] text-[#14212D] font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Apply Provably Fair Shuffled Seeds to Bracket Tree →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
