"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Users, BarChart3, ArrowRight, ShieldCheck, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: "player" | "host";
  initialMode?: "join" | "login";
}

export function JoinModal({
  isOpen,
  onClose,
  defaultRole = "player",
  initialMode = "join",
}: JoinModalProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [modalMode, setModalMode] = useState<"join" | "login">(initialMode);
  const [prevInitialMode, setPrevInitialMode] = useState(initialMode);
  const [role, setRole] = useState<"player" | "host">(defaultRole);
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync mode during render without triggering effect cascading re-render
  if (prevInitialMode !== initialMode) {
    setPrevInitialMode(initialMode);
    setModalMode(initialMode);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isLogin = modalMode === "login";

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
      onClose();
      if (!isLogin && role === "host") {
        router.push("/host");
      } else {
        router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}`);
      }
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md rounded-3xl bg-surface border border-line p-6 sm:p-8 shadow-2xl text-ink">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute right-5 top-5 p-2 rounded-full text-muted hover:text-ink hover:bg-paper transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Official Gelavu Logo */}
        <GelavuLogo variant="light" size="md" href="" className="mb-4" />

        {/* Mode Switcher Tabs inside Modal */}
        <div className="inline-flex rounded-full bg-paper p-1 border border-line text-xs font-bold mb-4">
          <button
            type="button"
            onClick={() => setModalMode("login")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              isLogin
                ? "bg-ink text-white shadow-sm font-black"
                : "text-muted hover:text-ink"
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log in</span>
          </button>
          <button
            type="button"
            onClick={() => setModalMode("join")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              !isLogin
                ? "bg-ink text-white shadow-sm font-black"
                : "text-muted hover:text-ink"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Join Gelavu</span>
          </button>
        </div>

        {/* Dynamic Kicker & Heading */}
        {isLogin ? (
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#6366F1] block">
              WELCOME BACK
            </span>
            <h2 className="text-2xl font-black text-ink tracking-tight mt-1">
              Log in to your account.
            </h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Enter your registered mobile number to receive your secure sign-in OTP.
            </p>
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-lime-600 block">
              YOUR GAME STARTS HERE
            </span>
            <h2 className="text-2xl font-black text-ink tracking-tight mt-1">
              Join the competition.
            </h2>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Choose how you want to start. You can switch anytime.
            </p>
          </div>
        )}

        {/* Role Cards: Only for Join / Sign Up mode */}
        {!isLogin && (
          <div className="grid grid-cols-2 gap-3 my-5">
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
        )}

        {/* Phone Input Form */}
        <form onSubmit={handleSubmit} className={`space-y-4 ${isLogin ? "mt-5" : ""}`}>
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
            className="w-full rounded-full bg-lime hover:brightness-95 active:scale-[0.99] text-ink py-3 px-5 text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{isLoading ? "Sending OTP..." : isLogin ? "Log in with OTP" : "Continue with OTP"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Switcher text */}
        <div className="text-center pt-3">
          {isLogin ? (
            <button
              type="button"
              onClick={() => setModalMode("join")}
              className="text-xs text-muted hover:text-ink transition-colors font-medium cursor-pointer"
            >
              New to Gelavu? <strong className="text-ink underline">Create an account</strong>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setModalMode("login")}
              className="text-xs text-muted hover:text-ink transition-colors font-medium cursor-pointer"
            >
              Already have an account? <strong className="text-ink underline">Log in here</strong>
            </button>
          )}
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted mt-4">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Your number stays private and secure</span>
        </div>
      </div>
    </div>
  );
}
