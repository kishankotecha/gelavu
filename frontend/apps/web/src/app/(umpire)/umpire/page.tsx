"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, QrCode } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export default function UmpireQRSignInPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [courtCode, setCourtCode] = useState("");

  const handleSimulateScan = () => {
    showToast("QR Verified! Signed in as scorekeeper for Court 2.", "success");
    setTimeout(() => {
      router.push("/umpire/matches/m-1");
    }, 600);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courtCode.trim()) return;
    showToast(`Code ${courtCode.toUpperCase()} verified! Opening Court 2 console...`, "success");
    setTimeout(() => {
      router.push("/umpire/matches/m-1");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-navy text-white flex flex-col justify-between items-center px-4 py-8 select-none">
      {/* Top Header: Official Gelavu Logo + UMPIRE Badge */}
      <GelavuLogo variant="dark" badge="UMPIRE" href="/umpire" />

      {/* Center Viewfinder & Instructions */}
      <div className="flex flex-col items-center max-w-sm w-full my-auto py-6">
        <h1 className="text-2xl sm:text-3xl font-black text-white text-center tracking-tight">
          Scan your court QR
        </h1>
        <p className="text-xs text-white/70 text-center mt-2 px-4 leading-relaxed">
          Point your camera at the QR on your court. No login needed.
        </p>

        {/* Viewfinder Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-8 rounded-3xl bg-[#121826] border border-white/10/80 flex items-center justify-center overflow-hidden shadow-2xl">
          {/* Neon Lime Corner Brackets */}
          <div className="absolute top-4 left-4 w-9 h-9 border-t-4 border-l-4 border-[#D4FF00] rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-9 h-9 border-t-4 border-r-4 border-[#D4FF00] rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-9 h-9 border-b-4 border-l-4 border-[#D4FF00] rounded-bl-xl" />
          <div className="absolute bottom-4 right-4 w-9 h-9 border-b-4 border-r-4 border-[#D4FF00] rounded-br-xl" />

          {/* Glowing Animated Laser Scan Beam */}
          <div className="absolute inset-x-4 h-0.5 bg-[#D4FF00] shadow-[0_0_15px_#D4FF00] animate-bounce" />

          {/* Faint QR graphic placeholder */}
          <QrCode className="w-24 h-24 text-gray-700/60" />
        </div>

        {/* Big Simulate Scan Button */}
        <button
          type="button"
          onClick={handleSimulateScan}
          className="w-full max-w-xs rounded-2xl bg-[#D4FF00] hover:bg-[#c6f500] text-black py-3.5 px-6 text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-[#D4FF00]/10 active:scale-98 transition-all cursor-pointer"
        >
          <Camera className="w-4 h-4 text-black" />
          <span>Simulate scan</span>
        </button>

        {/* Fallback Court Code Option */}
        <div className="mt-5 text-center w-full">
          {!showCodeInput ? (
            <button
              onClick={() => setShowCodeInput(true)}
              className="text-xs text-white/70 hover:text-white/90 transition-colors font-medium cursor-pointer"
            >
              Or enter the 6-digit court code instead
            </button>
          ) : (
            <form onSubmit={handleCodeSubmit} className="mt-2 flex gap-2 justify-center max-w-xs mx-auto">
              <input
                type="text"
                value={courtCode}
                onChange={(e) => setCourtCode(e.target.value)}
                placeholder="e.g. CRT-204"
                className="w-full rounded-xl bg-[#161F30] border border-white/10 px-3 py-2 text-xs text-white placeholder:text-white/60 font-mono uppercase focus:outline-none focus:border-[#D4FF00]"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-xl bg-white text-black px-4 py-2 text-xs font-bold hover:bg-gray-200"
              >
                Enter
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <footer className="text-center text-[11px] text-gray-600 font-medium">
        Access expires when the tournament ends
      </footer>
    </div>
  );
}
