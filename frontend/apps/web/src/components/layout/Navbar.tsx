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
    { label: "For hosts", href: "/for-hosts" },
  ];

  const isTabActive = useCallback(
    (href: string) => {
      if (href === "/tournaments") return pathname.startsWith("/tournaments");
      if (href === "/leaderboard") return pathname.startsWith("/leaderboard");
      if (href === "/for-hosts") return pathname.startsWith("/for-hosts") || pathname.startsWith("/host");
      return false;
    },
    [pathname]
  );

  const getRouteIndex = useCallback((path: string) => {
    if (path.startsWith("/tournaments")) return 1;
    if (path.startsWith("/leaderboard")) return 2;
    if (path.startsWith("/for-hosts") || path.startsWith("/host")) return 3;
    if (typeof window !== "undefined") {
      if (window.location.hash.includes("how")) return 0;
    }
    if (path === "/") return 0;
    return -1;
  }, []);

  const [activeTab, setActiveTab] = useState<number>(() => getRouteIndex(pathname));
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const highlightedTab = hoveredTab !== null ? hoveredTab : activeTab;
  const [prevRoutePath, setPrevRoutePath] = useState(pathname);

  // Sync activeTab during render when pathname changes
  if (prevRoutePath !== pathname) {
    setPrevRoutePath(pathname);
    const idx = getRouteIndex(pathname);
    if (idx !== -1) {
      setActiveTab(idx);
    }
  }

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

  useEffect(() => {
    const handleHash = () => {
      const idx = getRouteIndex(pathname);
      if (idx !== -1) {
        setActiveTab(idx);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [pathname, getRouteIndex]);

  // When mouse leaves the nav bar, always return to the active tab
  const handleMouseLeave = useCallback(() => {
    setHoveredTab(null);
    if (activeTab !== -1) {
      movePill(activeTab);
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeTab, movePill]);

  // Position pill on mount and whenever activeTab changes
  useEffect(() => {
    if (activeTab === -1) return;
    const updatePosition = () => {
      movePill(activeTab);
    };
    updatePosition();
    const frame = requestAnimationFrame(updatePosition);
    const timer = setTimeout(updatePosition, 100);
    const timer2 = setTimeout(updatePosition, 300);

    // Recompute after web fonts finish loading to ensure pixel-perfect width
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updatePosition);
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [activeTab, movePill]);

  useEffect(() => {
    const handleResize = () => {
      if (activeTab !== -1) {
        movePill(activeTab);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, movePill]);

  if (hidden) return null;

  return (
    <>
      {/* ========================================================= */}
      {/* Full-Width Solid Navbar (Matches Reference Screenshot)   */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 w-full border-b border-navy/40 bg-navy text-white">
        <div className="w-full h-16 sm:h-[68px] px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* 1. LEFT: Brand Logo + Clean Nav Links (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-8 lg:gap-12 h-full">
            <GelavuLogo variant="dark" size="lg" href="/" />

            {/* Desktop Nav Links - Solid Coral Pill matching Image Reference */}
            <nav
              ref={navRef}
              aria-label="Main Navigation"
              onMouseLeave={handleMouseLeave}
              className="relative hidden lg:flex items-center gap-1.5 py-1"
            >
              {/* Sliding active pill indicator - Solid Coral Pill */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] bg-coral shadow-[0_2px_8px_rgba(255,104,91,0.35)]"
                style={{
                  transform: `translate3d(${pillStyle.left}px, ${pillStyle.top}px, 0)`,
                  width: `${pillStyle.width}px`,
                  height: `${pillStyle.height}px`,
                  opacity: pillStyle.opacity,
                }}
              />

              {/* Navigation Links */}
              {navTabs.map((tab, idx) => {
                const isPillUnder = highlightedTab === idx;
                return (
                  <Link
                    key={tab.label}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    href={tab.href}
                    onMouseEnter={() => {
                      setHoveredTab(idx);
                      movePill(idx);
                    }}
                    onClick={() => {
                      setHoveredTab(null);
                      setActiveTab(idx);
                      movePill(idx);
                    }}
                    className="relative z-10 px-5 h-9 rounded-full text-sm font-semibold tracking-normal transition-colors duration-150 select-none cursor-pointer flex items-center justify-center"
                  >
                    <span
                      className={`inline-flex items-center justify-center leading-none transition-colors duration-150 ${
                        isPillUnder ? "text-white font-bold" : "text-white/80 hover:text-white"
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
              className="grid h-9 w-9 place-items-center rounded-full text-white hover:text-hotpink hover:bg-white/10 transition active:scale-95 cursor-pointer"
              title="Search tournaments (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>

            {/* Red Circle Quick Action (+) Button */}
            <QuickActionMenu />

            {/* Auth State Controls */}
            {user ? (
              <UserMenu name={user.name || "Player"} avatarUrl={user.avatarUrl} onLogout={logout} />
            ) : (
              <div className="flex items-center gap-4 pl-1">
                <button
                  type="button"
                  onClick={() => {
                    setJoinMode("login");
                    setJoinOpen(true);
                  }}
                  className="text-sm font-semibold text-white hover:text-hotpink transition-all duration-200 cursor-pointer py-1"
                >
                  Log in
                </button>

                {/* Rectangular Sunroom Apricot GET STARTED Button */}
                <button
                  type="button"
                  onClick={() => {
                    setJoinMode("join");
                    setJoinOpen(true);
                  }}
                  className="btn-cta rounded-md text-xs uppercase tracking-wider px-4 py-2 active:scale-95 cursor-pointer"
                >
                  GET STARTED
                </button>
              </div>
            )}
          </div>

          {/* 3. MOBILE HEADER BAR */}
          <div className="flex lg:hidden items-center justify-between w-full h-full">
            {/* Mobile Left: Brand Logo */}
            <div className="flex items-center">
              <GelavuLogo variant="dark" size="md" href="/" />
            </div>

            {/* Mobile Right: Action Button (+) + Hamburger Menu Button */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <QuickActionMenu />
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
