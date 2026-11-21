"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, BarChart3, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [role, setRole] = useState<"player" | "host">("player");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      showToast("Please enter a valid 10-digit mobile number", "error");
      return;
    }

    setIsLoading(true);
    showToast(`Sending 6-digit OTP to +91 ${cleanPhone}...`, "info");

    setTimeout(() => {
      setIsLoading(false);
      if (role === "host") {
        router.push("/host");
      } else {
        router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}`);
      }
    }, 700);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-2xl text-ink">
        {/* Official Gelavu Logo */}
        <GelavuLogo variant="light" size="lg" href="/" className="mb-4" />

        {/* Heading */}
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-lime-600 block">
          YOUR GAME STARTS HERE
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight mt-1">
          Join the competition.
        </h1>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          Choose how you want to start. You can switch anytime.
        </p>

        {/* Role Toggle Cards */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <button
            type="button"
            onClick={() => setRole("player")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              role === "player"
                ? "border-ink bg-ink text-white shadow-md scale-[1.01]"
                : "border-line bg-paper/60 hover:bg-paper text-ink"
            }`}
          >
            <Users className={`w-5 h-5 mb-3 ${role === "player" ? "text-lime" : "text-muted"}`} />
            <div>
              <strong className="block text-sm font-bold">I’m a player</strong>
              <small className={`text-[11px] block mt-0.5 leading-snug ${role === "player" ? "text-white/70" : "text-muted"}`}>
                Find events and build my rank
              </small>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole("host")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              role === "host"
                ? "border-ink bg-ink text-white shadow-md scale-[1.01]"
                : "border-line bg-paper/60 hover:bg-paper text-ink"
            }`}
          >
            <BarChart3 className={`w-5 h-5 mb-3 ${role === "host" ? "text-lime" : "text-muted"}`} />
            <div>
              <strong className="block text-sm font-bold">I’m a host</strong>
              <small className={`text-[11px] block mt-0.5 leading-snug ${role === "host" ? "text-white/70" : "text-muted"}`}>
                Create and manage tournaments
              </small>
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              Mobile number
            </label>
            <div className="relative flex items-center rounded-2xl border border-line bg-paper/50 px-3.5 py-2.5 focus-within:border-ink focus-within:bg-white focus-within:ring-2 focus-within:ring-ink/10 transition-all">
              <span className="text-xs font-bold text-muted mr-2 pr-2 border-r border-line">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-sm font-semibold text-ink placeholder:text-muted/60 outline-none"
                required
                autoFocus
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-lime hover:brightness-95 active:scale-[0.99] text-ink py-3 px-5 text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
          >
            <span>{isLoading ? "Sending OTP..." : "Continue with OTP"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted mt-5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Your number stays private and secure</span>
        </div>
      </div>
    </div>
  );
}
