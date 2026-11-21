"use client";

import React, { useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Trophy, Check } from "lucide-react";

/* ========================================================================== */
/* CRISP CUSTOM SPORTS ICONS (PROPORTIONAL & ATHLETIC)                        */
/* ========================================================================== */

function BadmintonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="14.5" cy="7.5" rx="5.5" ry="5" transform="rotate(35 14.5 7.5)" />
      <line x1="12" y1="4.5" x2="17" y2="10.5" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="16.5" y1="4.5" x2="12.5" y2="10.5" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="11" y1="11.5" x2="4.5" y2="19.5" />
      <line x1="3.5" y1="20.5" x2="5.5" y2="18.5" strokeWidth="2.5" />
      <circle cx="18" cy="18" r="2" fill="currentColor" />
      <path d="M18 16 L21 13 M16.5 17.5 L13.5 20.5" strokeWidth="1.5" />
    </svg>
  );
}

function TennisBallIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M5.6 5.6a9 9 0 0 1 0 12.8" />
      <path d="M18.4 5.6a9 9 0 0 0 0 12.8" />
    </svg>
  );
}

function FootballIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <polygon
        points="12 8 14.8 10 13.7 13.2 10.3 13.2 9.2 10"
        fill="currentColor"
        fillOpacity="0.3"
      />
      <line x1="12" y1="8" x2="12" y2="3.1" />
      <line x1="14.8" y1="10" x2="20.2" y2="8.8" />
      <line x1="13.7" y1="13.2" x2="17.6" y2="18.2" />
      <line x1="10.3" y1="13.2" x2="6.4" y2="18.2" />
      <line x1="9.2" y1="10" x2="3.8" y2="8.8" />
    </svg>
  );
}

function BasketballIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <path d="M5.6 5.6c4.2 4.2 4.2 8.6 0 12.8" />
      <path d="M18.4 5.6c-4.2 4.2-4.2 8.6 0 12.8" />
    </svg>
  );
}

function CricketIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17l10-10a2 2 0 0 1 2.8 2.8L9.8 19.8l-2.8-2.8z" fill="currentColor" fillOpacity="0.2" />
      <line x1="17" y1="7" x2="21" y2="3" strokeWidth="2.4" />
      <circle cx="5" cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}

function CrossedRacquetsBadge({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#84CC16"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Racquet 1 */}
      <ellipse cx="7.5" cy="7.5" rx="4" ry="4" transform="rotate(-45 7.5 7.5)" />
      <line x1="10.5" y1="10.5" x2="20.5" y2="20.5" strokeWidth="2.4" />
      {/* Racquet 2 */}
      <ellipse cx="16.5" cy="7.5" rx="4" ry="4" transform="rotate(45 16.5 7.5)" />
      <line x1="13.5" y1="10.5" x2="3.5" y2="20.5" strokeWidth="2.4" />
      {/* Sparkle accents */}
      <circle cx="12" cy="3.5" r="1" fill="#84CC16" />
      <circle cx="20.5" cy="12" r="0.8" fill="#84CC16" />
      <circle cx="3.5" cy="12" r="0.8" fill="#84CC16" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Hide on host and umpire dedicated console viewports
  if (pathname.startsWith("/host") || pathname.startsWith("/umpire")) {
    return null;
  }

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <footer className="relative w-full bg-[#080E1B] text-white font-sans overflow-hidden">
      
      {/* ============================================================== */}
      {/* AMBIENT BACKGROUND GLOW                                         */}
      {/* ============================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        <div className="absolute -top-32 -left-20 w-[520px] h-[520px] rounded-full bg-[#84CC16]/[0.07] blur-[140px]" />
      </div>

      {/* ============================================================== */}
      {/* SPACIOUS WIDE CONTAINER (Generous Max-Width & Breathing Room)   */}
      {/* ============================================================== */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-16 pointer-events-auto">

        {/* ============================================================ */}
        {/* 1. TOP SPORTS STRIP ALIGNED TO 5-COLUMN BLUEPRINT GRID       */}
        {/* ============================================================ */}
        <div>
          
          {/* Mobile Non-Scrolling Responsive Sports Grid */}
          <div className="py-3 lg:py-4 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#84CC16]">
                ONE ARENA · EVERY SPORT
              </span>
              <Link
                href="/tournaments?sport=badminton"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#84CC16] hover:bg-[#94e01c] px-3 py-1 text-xs font-black text-[#080E1B] transition-all shadow-xs"
              >
                <BadmintonIcon className="h-3.5 w-3.5 text-[#080E1B]" />
                <span>Badminton</span>
                <span className="rounded-full bg-black text-[#84CC16] text-[9px] font-black px-1.5 py-0.5 tracking-wider">
                  LIVE
                </span>
              </Link>
            </div>

            {/* Upcoming sports in a clean 2x2 grid on small screens, 4 across on tablet */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              <Link
                href="/tournaments?sport=tennis"
                className="inline-flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-gray-300 transition-all"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <TennisBallIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">Tennis</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 shrink-0">SOON</span>
              </Link>
              <Link
                href="/tournaments?sport=football"
                className="inline-flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-gray-300 transition-all"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <FootballIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">Football</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 shrink-0">SOON</span>
              </Link>
              <Link
                href="/tournaments?sport=basketball"
                className="inline-flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-gray-300 transition-all"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <BasketballIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">Basketball</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 shrink-0">SOON</span>
              </Link>
              <Link
                href="/tournaments?sport=cricket"
                className="inline-flex items-center justify-between rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-gray-300 transition-all"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <CricketIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">Cricket</span>
                </div>
                <span className="text-[9px] font-bold text-gray-400 shrink-0">SOON</span>
              </Link>
            </div>
          </div>

          {/* Desktop 5-column continuous blueprint grid */}
          <div className="hidden lg:grid lg:grid-cols-[1.6fr_1fr_1.1fr_1fr_1.5fr] items-center">
            {/* Col 1 Header */}
            <div className="py-4 pr-6 lg:pr-10">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#84CC16]">
                ONE ARENA · EVERY SPORT
              </span>
            </div>

            {/* Col 2 Pill: Badminton (LIVE) */}
            <div className="py-4 px-4 sm:px-6 lg:px-8">
              <Link
                href="/tournaments?sport=badminton"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#84CC16] hover:bg-[#94e01c] px-4 py-2 text-sm font-black text-[#080E1B] transition-all shadow-xs"
              >
                <BadmintonIcon className="h-4 w-4 text-[#080E1B]" />
                <span>Badminton</span>
                <span className="rounded-full bg-black text-[#84CC16] text-[10px] font-black px-2 py-0.5 tracking-wider">
                  LIVE
                </span>
              </Link>
            </div>

            {/* Col 3 Pills: Tennis & Football */}
            <div className="py-4 px-4 sm:px-6 lg:px-8 flex items-center gap-2.5">
              <Link
                href="/tournaments?sport=tennis"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                <TennisBallIcon className="h-4 w-4 text-gray-400" />
                <span>Tennis</span>
                <span className="text-[10px] font-bold text-gray-400">SOON</span>
              </Link>
              <Link
                href="/tournaments?sport=football"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                <FootballIcon className="h-4 w-4 text-gray-400" />
                <span>Football</span>
                <span className="text-[10px] font-bold text-gray-400">SOON</span>
              </Link>
            </div>

            {/* Col 4 Pill: Basketball */}
            <div className="py-4 px-4 sm:px-6 lg:px-8">
              <Link
                href="/tournaments?sport=basketball"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                <BasketballIcon className="h-4 w-4 text-gray-400" />
                <span>Basketball</span>
                <span className="text-[10px] font-bold text-gray-400">SOON</span>
              </Link>
            </div>

            {/* Col 5 Pill: Cricket */}
            <div className="py-4 pl-4 sm:pl-6 lg:pl-10">
              <Link
                href="/tournaments?sport=cricket"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3.5 py-2 text-sm font-medium text-gray-300 hover:text-white transition-all"
              >
                <CricketIcon className="h-4 w-4 text-gray-400" />
                <span>Cricket</span>
                <span className="text-[10px] font-bold text-gray-400">SOON</span>
              </Link>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. MAIN 5-COLUMN ARCHITECTURAL BLUEPRINT GRID                */}
        {/* Mobile: 2-column balanced pairs with tight comfortable gaps  */}
        {/* Desktop: Generous 5-column wide architectural spread         */}
        {/* ============================================================ */}
        <div className="grid grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.1fr_1fr_1.5fr] gap-x-4 sm:gap-x-8 lg:gap-x-0 gap-y-4 sm:gap-y-6 lg:gap-y-0 pt-1 lg:pt-0">
          
          {/* ---------------------------------------------------------- */}
          {/* Col 1: Brand & Social (Full-width on mobile row 1)         */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-2 lg:col-span-1 pt-2 lg:pt-8 pb-1 lg:pb-5 lg:pr-10 space-y-3">
            <p className="text-sm sm:text-base text-gray-200 leading-snug sm:leading-relaxed max-w-sm font-normal">
              Where every rally counts. Find the court, win the bracket, get your name on the wall.
            </p>

            {/* Signature Neon Lime Accent Bar */}
            <div className="h-1 w-10 rounded-full bg-[#84CC16]" />

            {/* Social Link - Dedicated Instagram Community Pill */}
            <div className="flex items-center pt-0.5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow Gelavu on Instagram"
                className="group inline-flex items-center gap-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#84CC16]/50 px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-white transition-all shadow-xs"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 text-[#84CC16] group-hover:scale-110 transition-transform shrink-0"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                <span>Follow @gelavu</span>
                <span className="text-gray-400 group-hover:text-[#84CC16] text-[11px] transition-colors">↗</span>
              </a>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Col 2: PLAY (Mobile Row 2 - Left)                          */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-1 pt-1 lg:pt-8 pb-1 lg:pb-5 lg:px-6 xl:px-8 space-y-2 sm:space-y-3">
            <Link
              href="/tournaments"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-black uppercase tracking-wider text-white hover:text-[#84CC16] transition-colors"
            >
              <span>PLAY</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#84CC16]" />
            </Link>
            <div className="space-y-1.5 sm:space-y-2.5 pt-0.5 text-xs sm:text-[15px]">
              <div><Link href="/tournaments" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Find tournaments</Link></div>
              <div><Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Rankings</Link></div>
              <div><Link href="/profile" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Player profiles</Link></div>
              <div><Link href="/tournaments" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Live brackets</Link></div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Col 3: HOST (Mobile Row 2 - Right)                         */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-1 pt-1 lg:pt-8 pb-1 lg:pb-5 lg:px-6 xl:px-8 space-y-2 sm:space-y-3">
            <Link
              href="/host"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-black uppercase tracking-wider text-white hover:text-[#84CC16] transition-colors"
            >
              <span>HOST</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#84CC16]" />
            </Link>
            <div className="space-y-1.5 sm:space-y-2.5 pt-0.5 text-xs sm:text-[15px]">
              <div><Link href="/host/tournaments/new" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Host a tournament</Link></div>
              <div><Link href="/umpire" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Court QR for umpires</Link></div>
              <div><Link href="/host/verify" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Verify your venue</Link></div>
              <div><Link href="/host/verify" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Transparent pricing</Link></div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Col 4: GELAVU                                              */}
          {/* Mobile: 2-column links row (col-span-2)                    */}
          {/* Desktop: Standard Column 4 (lg:col-span-1)                 */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-2 lg:col-span-1 pt-1 lg:pt-8 pb-1 lg:pb-5 lg:px-6 xl:px-8 space-y-2 sm:space-y-3">
            <Link
              href="/#how"
              className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-black uppercase tracking-wider text-white hover:text-[#84CC16] transition-colors"
            >
              <span>GELAVU</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#84CC16]" />
            </Link>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-1.5 sm:gap-y-2.5 pt-0.5 text-xs sm:text-[15px]">
              <div><Link href="/#how" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">About</Link></div>
              <div><Link href="/winners" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Champions</Link></div>
              <div><Link href="/#contact" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Help & support</Link></div>
              <div><Link href="/#fairplay" className="text-gray-300 hover:text-white transition-colors block py-0.5 font-medium">Fair play code</Link></div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Col 5: STAY IN THE GAME                                    */}
          {/* Mobile: Full-width spacious newsletter strip (col-span-2)  */}
          {/* Desktop: Standard Column 5 (lg:col-span-1)                 */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-2 lg:col-span-1 pt-2 lg:pt-8 pb-1 lg:pb-5 lg:pl-10 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base font-black uppercase tracking-wider text-white">
              <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#84CC16] shrink-0" />
              <span>STAY IN THE GAME</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-snug sm:leading-relaxed font-normal max-w-md">
              New tournaments, draws and winners near you.
            </p>

            {/* Newsletter Subscription Input - Full Width & Comfortable on Mobile */}
            <form onSubmit={handleSubscribe} className="pt-0.5 max-w-md lg:max-w-none">
              {subscribed ? (
                <div className="flex items-center gap-2 p-2.5 rounded-full bg-white/[0.08] border border-[#84CC16]/60 text-xs sm:text-sm text-[#84CC16] font-bold">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>You&apos;re in! Check your inbox soon.</span>
                </div>
              ) : (
                <div className="relative flex items-center rounded-full border border-white/20 bg-white/[0.06] pl-3.5 sm:pl-4 pr-1 sm:pr-1.5 py-1 sm:py-1.5 focus-within:border-[#84CC16]/80 transition-all shadow-inner">
                  <Mail className="h-4 w-4 text-gray-300 shrink-0 mr-2 sm:mr-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Your email"
                    className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-gray-400 outline-none pr-2 font-normal min-w-0"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 shrink-0 rounded-full bg-[#84CC16] hover:bg-[#94e01c] active:scale-95 text-[#080E1B] font-black text-xs transition cursor-pointer shadow-md"
                  >
                    <span>Join</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[2.8]" />
                  </button>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. GIANT NEON LOGO WATERMARK                                 */}
        {/* Sits snug under grid on mobile with full visible headroom    */}
        {/* ============================================================ */}
        <div className="relative pt-3 sm:pt-4 lg:pt-6 select-none pointer-events-none overflow-visible">
          
          {/* Atmospheric Ambient Glow Overlay */}
          <div className="absolute left-[24%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[340px] rounded-full bg-white/[0.04] blur-[120px] pointer-events-none" />

          {/* Authentic GELAVU Brand Logo Vector with Original Color Palette */}
          {/* Letters in White, V in Red, Crown Circle in Yellow */}
          <div className="relative z-0 w-full flex items-center justify-center translate-y-0 sm:translate-y-2 lg:translate-y-6">
            <svg
              viewBox="20 54 914 271"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[66%] sm:w-[80%] lg:w-full h-auto max-h-[70px] sm:max-h-[130px] lg:max-h-[260px] overflow-visible"
              aria-label="Gelavu Logo"
            >
              {/* Letters A & L - Solid White */}
              <path
                fill="#FFFFFF"
                d="M617.77,312.24l-38.01.81-9.77-41.53-67.49-.65-10.24,41.95-159.16.03.21-188.34,37.72-.94.08,156.65,92.12-.11,40.97-156.08,63.88-.2L617.77,312.24ZM561.32,238.51c-9.06-35.45-14.37-61.93-25.85-94.52l-24.84,94.65L561.32,238.51Z"
              />
              {/* Letter G - Solid White */}
              <path
                fill="#FFFFFF"
                d="M141.88,246.98l-44.23-.73.03-30.48h79.99s.06,96.99.06,96.99l-32.7.22-3.19-17.35c-10.57,17.63-27.65,22.38-47.6,21.27-33.58-1.86-62.46-25.74-65.27-61.14-1.99-25.04-1.51-50.88-.15-76.39,1.15-21.75,15.14-40.1,34.42-50.05,24.6-12.69,55.26-12.99,80.09-1.17,24.08,11.46,36.7,34.64,34.14,61.56h-35.22c-.53-9.58-3.2-21.31-9.59-27.89-11.31-11.64-37.69-15.25-54.9.41-6.34,5.76-13.35,15.49-13.6,24.47-1.32,48.82-6.99,95.6,36.66,98.15,10.97.64,22.72-1.14,29.88-7.24C138.41,271.03,142.73,258.72,141.88,246.98Z"
              />
              {/* Letter E - Solid White */}
              <polygon
                fill="#FFFFFF"
                points="312.79 233.47 233.78 233.55 233.67 280.22 322.09 280.25 322.27 312.83 197.4 312.87 197.47 123.72 319.31 123.71 319.45 156.37 233.58 156.31 233.82 201.21 313 201.23 312.79 233.47"
              />
              {/* Letter U - Solid White */}
              <path
                fill="#FFFFFF"
                d="M926.88,123.74l-.28,130.9c-.05,24.71-14.1,44.5-36.46,54.56-21.47,9.65-46.45,10-69.22,2.43-24.38-8.1-41.98-30.68-42.11-57.02l-.49-98.65c16.1-5.88,25.91-17.51,30.24-31.85l5.9-.1-.15,124.34c-.03,23.37,16.55,37.42,39.9,36.7,19.43-.59,36.29-12.65,36.28-33.56l-.04-127.69L926.88,123.74Z"
              />
              {/* Signature V Accent - Solid Red */}
              <path
                fill="#C02034"
                d="M727.73,147.04c11.03,6.96,20.28,10.59,33.56,12.95l-38.9,152.62-62.07.11-48.17-189.28,37.45.38,41.7,165.27L727.73,147.04Z"
              />
              {/* Signature Crown Circle - Solid Yellow with White Border */}
              <circle
                cx="761.29"
                cy="109.53"
                r="44.78"
                fill="#F9C433"
                stroke="#FFFFFF"
                strokeWidth="8"
              />
            </svg>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. BOTTOM LEGAL & LOVE STRIP                                 */}
        {/* ============================================================ */}
        <div className="relative z-10 pt-2 sm:pt-4 pb-5 sm:pb-6 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400 font-normal text-center md:text-left">
          <div suppressHydrationWarning>
            © {new Date().getFullYear()} Gelavu Sports Technologies. All rights reserved.
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8">
            <Link href="/#terms" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/#terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/#terms" className="hover:text-white transition-colors">Refund policy</Link>
          </div>

          <div className="flex items-center justify-center gap-2 font-semibold text-gray-200">
            <CrossedRacquetsBadge className="h-4 w-4" />
            <span>Built for the love of the game.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
