"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trophy, CalendarPlus, Check, ArrowRight } from "lucide-react";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"PLAYER" | "HOST">("PLAYER");

  const handleFinish = () => {
    if (selectedRole === "HOST") {
      router.push("/host");
    } else {
      router.push("/tournaments");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-3xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <GelavuLogo variant="dark" size="md" href="/" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Step 2 of 2</span>
          <h1 className="text-3xl font-black text-white mt-1">What brings you to Gelavu?</h1>
          <p className="mt-2 text-sm text-gray-400">
            Choose your primary experience. You can switch between playing and hosting anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Option: Play */}
          <div
            onClick={() => setSelectedRole("PLAYER")}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col justify-between ${
              selectedRole === "PLAYER"
                ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-950/40"
                : "border-gray-800 bg-gray-950/60 hover:border-gray-700"
            }`}
          >
            <div>
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 w-fit mb-4">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">I Want to Play</h3>
              <p className="text-xs text-gray-400 mt-2">
                Register for tournaments, track your match schedule, blind-draw partners, and climb the circuit rankings.
              </p>
            </div>
            {selectedRole === "PLAYER" && (
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Check className="w-4 h-4" /> Selected
              </div>
            )}
          </div>

          {/* Option: Host */}
          <div
            onClick={() => setSelectedRole("HOST")}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all flex flex-col justify-between ${
              selectedRole === "HOST"
                ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-950/40"
                : "border-gray-800 bg-gray-950/60 hover:border-gray-700"
            }`}
          >
            <div>
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 w-fit mb-4">
                <CalendarPlus className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">I Want to Host</h3>
              <p className="text-xs text-gray-400 mt-2">
                Create events, collect online entry fees with Razorpay, auto-generate brackets, and allocate umpire pads.
              </p>
            </div>
            {selectedRole === "HOST" && (
              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Check className="w-4 h-4" /> Selected
              </div>
            )}
          </div>
        </div>

        <Button onClick={handleFinish} variant="primary" size="lg" className="w-full gap-2">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
