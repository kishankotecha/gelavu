"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Target,
  Ticket,
  Trophy,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

interface HowItWorksRallyProps {
  onJoin?: () => void;
}

const DISTRICT_DATA = [
  {
    id: "indiranagar",
    name: "Indiranagar",
    title: "Indiranagar City Open",
    slots: "4 slots left",
    timing: "This Saturday · ₹699 · Prize ₹25,000",
  },
  {
    id: "koramangala",
    name: "Koramangala",
    title: "Koramangala Morning Singles",
    slots: "6 slots left",
    timing: "This Sunday · ₹799 · Prize ₹18,000",
  },
  {
    id: "hsr",
    name: "HSR",
    title: "HSR Weekend Rallies",
    slots: "8 slots left",
    timing: "This Friday Eve · ₹599 · Prize ₹15,000",
  },
];

export function HowItWorksRally({ onJoin }: HowItWorksRallyProps) {
  // Step switcher state: 0 (Find), 1 (Enter), 2 (Play)
  const [activeStep, setActiveStep] = useState(0);

  // Card 1 state: selected district
  const [selectedDistrict, setSelectedDistrict] = useState("indiranagar");
  const currentDistrict =
    DISTRICT_DATA.find((d) => d.id === selectedDistrict) || DISTRICT_DATA[0];

  // Card 2 state: singles vs doubles & lock pass
  const [format, setFormat] = useState<"singles" | "doubles">("doubles");
  const [passLocked, setPassLocked] = useState(false);

  // Card 3 state: match score simulation
  const [scored, setScored] = useState(false);

  return (
    <section
      className="w-full bg-[#F4EDE0] py-16 sm:py-24 text-navy relative overflow-hidden border-t border-navy/10"
      id="how"
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* ============================================================ */}
        {/* Header: Badge, Heading with Pill, Subtitle                   */}
        {/* ============================================================ */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-navy/15 text-navy font-bold text-xs uppercase tracking-wider shadow-xs">
            <span className="w-2 h-2 rounded-full bg-coral inline-block" />
            <span>HOW GELAVU WORKS</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy tracking-tight leading-tight">
            Three steps.{" "}
            <span className="inline-block bg-navy text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-2xl text-2xl sm:text-4xl lg:text-5xl align-middle font-black shadow-md border border-navy">
              Game on.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Find a badminton tournament, pay by UPI in seconds, and play with
            live scoring and city rankings.
          </p>

          {/* 3 Step Switcher Pills */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            {[
              { idx: 0, label: "01 Find" },
              { idx: 1, label: "02 Enter" },
              { idx: 2, label: "03 Play" },
            ].map((step) => {
              const isActive = activeStep === step.idx;
              return (
                <button
                  key={step.idx}
                  type="button"
                  onClick={() => setActiveStep(step.idx)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-navy text-white shadow-md border-2 border-navy"
                      : "bg-white/80 text-navy/70 hover:text-navy hover:bg-white border border-navy/15"
                  }`}
                >
                  {step.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3 Step Cards Grid                                            */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* CARD 01: Find your event */}
          <div
            onClick={() => setActiveStep(0)}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer ${
              activeStep === 0
                ? "bg-white border-2 border-navy shadow-xl ring-2 ring-navy/5"
                : "bg-white border border-navy/15 hover:border-navy/30 shadow-xs"
            }`}
          >
            <div>
              {/* Top Row: Icon & Large Watermark */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-coral/15 flex items-center justify-center text-coral shadow-xs">
                  <Target className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-300">
                  01
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-navy mt-5">Find your event</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 mb-6">
                Filter by city, level and category. Real slots, clear fees,
                verified hosts.
              </p>

              {/* District Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {DISTRICT_DATA.map((district) => {
                  const isSelected = selectedDistrict === district.id;
                  return (
                    <button
                      key={district.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDistrict(district.id);
                        setActiveStep(0);
                      }}
                      className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                        isSelected
                          ? "bg-navy text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {district.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Embedded Event Preview Box */}
            <div className="rounded-2xl border border-navy/10 bg-[#FAF6F0] p-4 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-navy">
                  {currentDistrict.title}
                </span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200/80 px-2 py-0.5 rounded-full">
                  {currentDistrict.slots}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                {currentDistrict.timing}
              </p>
            </div>
          </div>

          {/* CARD 02: Enter in seconds */}
          <div
            onClick={() => setActiveStep(1)}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer ${
              activeStep === 1
                ? "bg-white border-2 border-navy shadow-xl ring-2 ring-navy/5"
                : "bg-white border border-navy/15 hover:border-navy/30 shadow-xs"
            }`}
          >
            <div>
              {/* Top Row: Icon & Large Watermark */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-coral/15 flex items-center justify-center text-coral shadow-xs">
                  <Ticket className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-300">
                  02
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-navy mt-5">Enter in seconds</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 mb-6">
                Pick a category, add a partner and pay by UPI, card or wallet.
                Escrow protected.
              </p>

              {/* Format Switcher: Singles / Doubles */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormat("singles");
                    setActiveStep(1);
                  }}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-xl transition-colors cursor-pointer text-center ${
                    format === "singles"
                      ? "bg-navy text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Singles
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormat("doubles");
                    setActiveStep(1);
                  }}
                  className={`flex-1 text-xs font-bold py-1.5 rounded-xl transition-colors cursor-pointer text-center ${
                    format === "doubles"
                      ? "bg-navy text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Doubles
                </button>
              </div>
            </div>

            {/* Embedded Partner Split Box */}
            <div className="rounded-2xl border border-navy/10 bg-[#FAF6F0] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-navy">
                  {format === "doubles" ? "Arjun & Nikhil linked" : "Arjun Mehta linked"}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-slate-600 font-semibold">
                  {format === "doubles" ? "Split ₹379 / player" : "Entry ₹699"}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPassLocked(!passLocked);
                    setActiveStep(1);
                  }}
                  className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer shadow-xs ${
                    passLocked
                      ? "bg-emerald-600 text-white"
                      : "bg-navy hover:bg-navy/90 text-white"
                  }`}
                >
                  {passLocked ? "Pass locked ✓" : "Lock pass"}
                </button>
              </div>
            </div>
          </div>

          {/* CARD 03: Play. Score. Rise. */}
          <div
            onClick={() => setActiveStep(2)}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all cursor-pointer ${
              activeStep === 2
                ? "bg-white border-2 border-navy shadow-xl ring-2 ring-navy/5"
                : "bg-white border border-navy/15 hover:border-navy/30 shadow-xs"
            }`}
          >
            <div>
              {/* Top Row: Icon & Large Watermark */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-coral/15 flex items-center justify-center text-coral shadow-xs">
                  <Trophy className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-300">
                  03
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-navy mt-5">Play. Score. Rise.</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 mb-6">
                Get match calls, follow live scores and climb official city
                rankings.
              </p>
            </div>

            {/* Embedded Live Scoreboard Box */}
            <div className="space-y-3">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setScored(!scored);
                  setActiveStep(2);
                }}
                className="rounded-2xl bg-navy text-white p-4 space-y-2.5 shadow-md cursor-pointer hover:ring-1 hover:ring-coral/40 transition-all"
                title="Click to simulate match point"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-coral flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                    COURT 2 · FINALS
                  </span>
                  <span className="text-[10px] text-white/60 font-mono">
                    {scored ? "Match Won" : "Live"}
                  </span>
                </div>

                <div className="space-y-1 font-mono text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">Mehta / Rao</span>
                    <strong className="text-coral text-base font-black">
                      {scored ? 21 : 20}
                    </strong>
                  </div>
                  <div className="flex items-center justify-between text-white/60">
                    <span>Shah / Hegde</span>
                    <strong className="text-white/70 text-base font-bold">19</strong>
                  </div>
                </div>
              </div>

              {/* Rating Rise Pill */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy pt-1">
                <span>🏆 City seed #1 · {scored ? "+12 rating" : "+8 rating"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Bottom 2-Card Row: Good to know & Ready CTA                  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Good to know (FAQ) */}
          <div className="md:col-span-6 rounded-3xl bg-white border border-navy/15 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
            <h4 className="text-lg sm:text-xl font-bold text-navy mb-4">
              Good to know
            </h4>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <strong className="text-navy font-bold">Is payment safe? </strong>
                <span className="text-slate-600 font-normal">
                  UPI escrow holds your fee until the event runs.
                </span>
              </div>
              <div>
                <strong className="text-navy font-bold">What if it is cancelled? </strong>
                <span className="text-slate-600 font-normal">
                  Automatic refund to your account.
                </span>
              </div>
              <div>
                <strong className="text-navy font-bold">Can I play without a partner? </strong>
                <span className="text-slate-600 font-normal">
                  Yes, join the random partner draw.
                </span>
              </div>
            </div>
          </div>

          {/* Right Card: Ready? CTA */}
          <div className="md:col-span-6 rounded-3xl bg-navy text-white border border-white/10 p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-coral text-xs font-black uppercase tracking-widest block mb-1">
                READY?
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                Your next match starts here.
              </h4>
              <p className="text-white/70 text-xs sm:text-sm mt-1">
                2,400+ players. 14 courts live now.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6">
              {onJoin ? (
                <button
                  type="button"
                  onClick={onJoin}
                  className="bg-coral hover:bg-coral/90 text-navy font-black text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
                >
                  Find tournaments
                </button>
              ) : (
                <Link
                  href="/tournaments"
                  className="bg-coral hover:bg-coral/90 text-navy font-black text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
                >
                  Find tournaments
                </Link>
              )}

              <Link
                href="/host/tournaments/new"
                className="border border-white/25 hover:bg-white/10 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-full transition-all cursor-pointer"
              >
                Host one
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
