"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { GelavuLogo } from "@/components/common/GelavuLogo";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone") || "9876543210";
  const [otp, setOtp] = useState("");
  const { login } = useAuth();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length >= 4) {
      login(
        {
          id: "p-me",
          name: "Rohan Kumar",
          phone,
          role: "PLAYER",
          city: "Bengaluru",
        },
        "mock_jwt_token_123"
      );
      router.push("/onboarding");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-800 bg-gray-900/80 p-8 backdrop-blur-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <GelavuLogo variant="dark" size="sm" href="/" />
        </div>

        <div className="text-center mb-6">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-white">Enter Verification Code</h1>
          <p className="mt-1 text-xs text-gray-400">
            Sent 6-digit OTP to <span className="font-semibold text-white">+91 {phone}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            type="text"
            placeholder="• • • • • •"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center text-xl tracking-[0.5em] font-mono h-12"
            maxLength={6}
            required
          />

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Verify & Continue
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          Didn&apos;t receive code?{" "}
          <button type="button" className="text-emerald-400 font-semibold hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="text-center p-12 text-gray-400">Loading OTP verification...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
