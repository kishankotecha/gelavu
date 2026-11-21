"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GelavuLogo } from "@/components/common/GelavuLogo";

export function Footer() {
  const pathname = usePathname();

  // Hide on host and umpire dedicated console viewports
  if (pathname.startsWith("/host") || pathname.startsWith("/umpire")) {
    return null;
  }

  return (
    <footer className="w-full border-t border-white/10 bg-[#070A12] text-white font-sans pt-16 pb-24 md:pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid (Matches Image 6) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <GelavuLogo variant="dark" size="md" href="/" />
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
              India&apos;s home for competitive community sport.
            </p>
          </div>

          {/* Col 2: Play */}
          <div className="space-y-3 text-xs">
            <strong className="block text-xs font-black uppercase tracking-wider text-white mb-2">
              PLAY
            </strong>
            <div><Link href="/tournaments" className="text-gray-400 hover:text-white transition-colors">Find tournaments</Link></div>
            <div><Link href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Rankings</Link></div>
            <div><Link href="/profile" className="text-gray-400 hover:text-white transition-colors">Player profiles</Link></div>
          </div>

          {/* Col 3: Host */}
          <div className="space-y-3 text-xs">
            <strong className="block text-xs font-black uppercase tracking-wider text-white mb-2">
              HOST
            </strong>
            <div><Link href="/host/tournaments/new" className="text-gray-400 hover:text-white transition-colors">Host an event</Link></div>
            <div><Link href="/host" className="text-gray-400 hover:text-white transition-colors">Host toolkit</Link></div>
            <div><Link href="/host/verify" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></div>
          </div>

          {/* Col 4: Gelavu Platform */}
          <div className="space-y-3 text-xs">
            <strong className="block text-xs font-black uppercase tracking-wider text-white mb-2">
              GELAVU
            </strong>
            <div><Link href="/#how" className="text-gray-400 hover:text-white transition-colors">About</Link></div>
            <div><Link href="/winners" className="text-gray-400 hover:text-white transition-colors">Contact</Link></div>
            <div><Link href="/umpire" className="text-gray-400 hover:text-white transition-colors">Help centre</Link></div>
          </div>
        </div>

        {/* Bottom Strip (Matches Image 6) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-gray-400">
          <span>© 2025 Gelavu Sports Technologies</span>
          <div className="flex items-center gap-3">
            <Link href="/#terms" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/#terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/#terms" className="hover:text-white transition-colors">Refund policy</Link>
          </div>
          <span className="font-semibold text-gray-300">Built for the love of the game.</span>
        </div>
      </div>
    </footer>
  );
}
