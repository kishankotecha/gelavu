"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Search } from "lucide-react";
import { CitySelectorModal } from "@/components/common/CitySelectorModal";
import { GelavuLogo } from "@/components/common/GelavuLogo";
import { JoinModal } from "@/components/common/JoinModal";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { QuickActionMenu } from "@/components/layout/QuickActionMenu";
import { SearchPalette } from "@/components/layout/SearchPalette";
import { UserMenu } from "@/components/layout/UserMenu";
import { NAV_ITEMS } from "@/config/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useCity } from "@/hooks/useCity";

/* Dedicated consoles hide this navbar */
const HIDDEN = [/^\/host(\/|$)/, /^\/umpire(\/|$)/, /^\/tournaments\/[^/]+$/];

export function Navbar() {
  const pathname = usePathname();
  const { city } = useCity();
  const { user, logout } = useAuth();

  const [cityOpen, setCityOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [joinMode, setJoinMode] = useState<"join" | "login">("join");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  // Close mobile drawer on route change
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  const hidden = HIDDEN.some((r) => r.test(pathname));

  useEffect(() => {
    if (hidden) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hidden]);

  // Navigation tabs matching the reference screenshot top bar
  const navTabs = [
    { label: "How it Works", href: pathname === "/" ? "#how" : "/#how" },
    { label: "Tournaments", href: "/tournaments" },
    { label: "Rankings", href: "/leaderboard" },
    { label: "For hosts", href: pathname === "/" ? "#hosts" : "/host/verify" },
  ];

  const isTabActive = useCallback(
    (href: string) => {
      if (href === "/tournaments") return pathname.startsWith("/tournaments");
      if (href === "/leaderboard") return pathname.startsWith("/leaderboard");
      if (href === "/host/verify" || href === "#hosts") return pathname.startsWith("/host");
      return false;
    },
    [pathname]
  );

  // Sliding indicator state and refs
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });

  const activeIndex = navTabs.findIndex((tab) => isTabActive(tab.href));

  const movePill = useCallback((index: number | null) => {
    if (index === null || index === -1) {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const el = tabRefs.current[index];
    if (!el) return;
    setPillStyle({
      left: el.offsetLeft,
      top: el.offsetTop,
      width: el.offsetWidth,
      height: el.offsetHeight,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (activeIndex !== -1) {
      movePill(activeIndex);
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeIndex, movePill]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (activeIndex !== -1) {
        movePill(activeIndex);
      } else {
        setPillStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, activeIndex, movePill]);

  useEffect(() => {
    const handleResize = () => {
      if (activeIndex !== -1) {
        movePill(activeIndex);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex, movePill]);

  if (hidden) return null;

  return (
    <>
      {/* ========================================================= */}
      {/* Full-Width Solid Navbar (Matches Reference Screenshot)   */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070F1E] text-white">
        <div className="w-full h-16 sm:h-[68px] px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* 1. LEFT: Brand Logo + Clean Nav Links (Desktop) */}
          <div className="flex items-center gap-8 lg:gap-12 h-full">
            <GelavuLogo variant="dark" size="lg" href="/" />

            {/* Desktop Nav Links - Sliding Crystal Glass Background Pill with Karnataka Accent */}
            <nav
              ref={navRef}
              aria-label="Main Navigation"
              onMouseLeave={handleMouseLeave}
              className="relative hidden lg:flex items-center gap-1.5 py-1"
            >
              {/* Sliding Glass Background Pill */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
                style={{
                  transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
                  width: `${pillStyle.width}px`,
                  height: `${pillStyle.height}px`,
                  opacity: pillStyle.opacity,
                }}
              >
                {/* Layer 1: Solid Dark Crystal Glass Base (Prevents muddy brown tint) */}
                <div className="absolute inset-0 rounded-full bg-[#0E182A]/90 backdrop-blur-xl border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]" />

                {/* Layer 2: Radiant Karnataka Flag Gradient (Pure Gold Yellow -> Warm Saffron -> Vibrant Crimson Red) */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FACC15]/25 via-[#FB923C]/20 to-[#EF4444]/25" />

                {/* Layer 3: Top Specular Glass Reflection */}
                <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>

              {/* Navigation Links */}
              {navTabs.map((tab, idx) => {
                const active = isTabActive(tab.href);
                return (
                  <Link
                    key={tab.label}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    href={tab.href}
                    onMouseEnter={() => movePill(idx)}
                    onClick={() => movePill(idx)}
                    className="relative z-10 px-5 py-2 rounded-full text-sm font-semibold tracking-tight transition-colors duration-150 select-none cursor-pointer flex items-center justify-center"
                  >
                    <span
                      className={`transition-colors duration-150 ${
                        active ? "text-white font-bold" : "text-white/85 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 2. RIGHT: Search, Action (+), User Controls / Get Started */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search tournaments"
              className="grid h-9 w-9 place-items-center rounded-full text-white hover:text-[#FACC15] hover:bg-white/10 transition active:scale-95 cursor-pointer"
              title="Search tournaments (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Red Circle Quick Action (+) Button */}
            <QuickActionMenu />

            {/* Auth State Controls */}
            {user ? (
              <UserMenu name={user.name || "Player"} onLogout={logout} />
            ) : (
              <div className="flex items-center gap-4 pl-1">
                <button
                  type="button"
                  onClick={() => {
                    setJoinMode("login");
                    setJoinOpen(true);
                  }}
                  className="text-sm font-semibold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#FACC15] hover:via-[#FB923C] hover:to-[#EF4444] transition-all duration-200 cursor-pointer py-1"
                >
                  Log in
                </button>

                {/* Rectangular Lime GET STARTED Button from Reference */}
                <button
                  type="button"
                  onClick={() => {
                    setJoinMode("join");
                    setJoinOpen(true);
                  }}
                  className="rounded-md bg-[#84CC16] hover:bg-[#96C93D] active:scale-95 text-[#070F1E] font-black text-xs uppercase tracking-wider px-4 py-2 transition-all shadow-sm cursor-pointer"
                >
                  GET STARTED
                </button>
              </div>
            )}
          </div>

          {/* 3. MOBILE HEADER BAR (Matches Bottom-Left Screen in Reference) */}
          <div className="flex lg:hidden items-center justify-between w-full">
            {/* Mobile Left: Red Action Button (+) */}
            <div className="flex items-center gap-3">
              <QuickActionMenu />
            </div>

            {/* Mobile Center: Centered Logo */}
            <div className="mx-auto">
              <GelavuLogo variant="dark" size="md" href="/" />
            </div>

            {/* Mobile Right: Hamburger Menu Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="grid h-9 w-9 place-items-center rounded-lg text-white hover:bg-white/10 transition active:scale-95 cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Full-Screen Mobile Drawer (Matches Reference Screenshot) */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={NAV_ITEMS}
        city={city}
        user={user}
        isActive={(href) => isTabActive(href)}
        onCity={() => setCityOpen(true)}
        onJoin={(m) => {
          setJoinMode(m || "join");
          setJoinOpen(true);
        }}
        onLogout={logout}
      />

      {/* Global Modals & Palettes */}
      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CitySelectorModal isOpen={cityOpen} onClose={() => setCityOpen(false)} />
      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} initialMode={joinMode} />
    </>
  );
}
