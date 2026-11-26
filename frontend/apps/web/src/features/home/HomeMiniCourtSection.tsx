"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MiniCourt } from "@/features/minicourt/MiniCourt";

export function HomeMiniCourtSection() {
  return (
    <section
      className="relative w-full bg-[#0A0D14] py-12 sm:py-16 text-white overflow-hidden border-t border-[#313747]/40"
      id="minicourt"
    >
      {/* Subtle Sunroom Ambient Lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -left-32 h-[450px] w-[450px] rounded-full bg-[#91B979]/5 blur-[150px]" />
        <div className="absolute bottom-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-[#DE9D35]/5 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* The 2-Column MiniCourt Arena (Left Info & Console, Right Court) */}
        <MiniCourt />

        {/* Footnote: Ready for real tournament courts? */}
        <div className="text-center pt-2">
          <Link
            href="/tournaments"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#DE9D35] hover:text-[#F3D15A] transition-colors group"
          >
            <span>Ready for real badminton courts? Browse upcoming tournaments near you</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
