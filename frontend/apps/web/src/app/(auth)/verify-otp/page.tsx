"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/toast";
import { GelavuLogo } from "@/components/common/GelavuLogo";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "9876543210";
  const initialMode = searchParams.get("mode") === "HOST" ? "HOST" : "PLAY";

  const { login } = useAuth();
  const { showToast } = useToast();

  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(digits);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    showToast(`New 6-digit OTP sent to +91 ${phone}`, "info");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      showToast("Please enter the 6-digit verification code", "error");
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      login(
        {
          id: "p-me",
          name: `Player ${phone.slice(-4)}`,
          phone,
          role: initialMode === "HOST" ? "HOST" : "PLAYER",
          roles: initialMode === "HOST" ? ["PLAYER", "HOST"] : ["PLAYER"],
          active_mode: initialMode,
          city: "Bengaluru",
        },
        "mock_jwt_token_123"
      );
      showToast("Mobile number verified!", "success");
      router.push(`/onboarding?mode=${initialMode}`);
    }, 450);
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-7 sm:p-9 shadow-2xl text-ink">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Change number</span>
          </Link>
          <GelavuLogo variant="light" size="sm" href="/" />
        </div>

        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-paper border border-line text-ink">
            <ShieldCheck className="h-6 w-6 text-hotpink" />
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-lime-600 block">
            STEP 1 OF 2 · VERIFICATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-ink tracking-tight mt-1">
            Enter 6-digit code
          </h1>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Sent via SMS to{" "}
            <span className="font-bold text-ink">+91 {phone}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label
              htmlFor="otp-input"
              className="block text-xs font-bold text-ink mb-1.5"
            >
              One-Time Password (OTP)
            </label>
            <input
              id="otp-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="• • • • • •"
              value={otp}
              onChange={handleOtpChange}
              maxLength={6}
              autoFocus
              required
              className="w-full h-14 rounded-2xl border border-line bg-paper/50 px-4 text-center text-2xl tracking-[0.45em] font-mono font-black text-ink placeholder:text-muted/50 focus:border-ink focus:bg-white focus:ring-2 focus:ring-ink/10 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying || otp.length !== 6}
            className="w-full rounded-full bg-lime hover:brightness-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-ink py-3 px-5 text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>{isVerifying ? "Verifying..." : "Verify & Continue"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted">
          <span>Didn&apos;t receive the code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="inline-flex items-center gap-1 font-bold text-ink hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed cursor-pointer"
          >
            <RotateCw className="w-3 h-3" />
            <span>
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : "Resend OTP"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center text-xs font-semibold text-muted">
          Loading OTP verification...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
