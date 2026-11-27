"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Compass, Award, Gamepad2, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileTabBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/host") || pathname.startsWith("/umpire")) {
    return null;
  }

  const tabs = [
    { label: "Discover", href: "/", icon: Compass },
    { label: "Matches", href: "/my-games", icon: Gamepad2 },
    { label: "Rankings", href: "/leaderboard", icon: Trophy },
    { label: "Saved", href: "/winners", icon: Award },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-40 w-full border-t border-white/10 bg-[#070A12]/95 backdrop-blur-lg md:hidden">
      <div className="grid h-16 grid-cols-5 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all text-[11px] font-semibold",
                isActive ? "text-lime font-black" : "text-white/70 hover:text-white"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform", isActive && "text-lime scale-110")} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
