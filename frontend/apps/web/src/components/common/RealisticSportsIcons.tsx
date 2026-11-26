import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * 1. Realistic 3D Championship Gold Trophy
 * Layered metallic gradients, specular light rim, dual winged handles, and polished mahogany pedestal.
 */
export function RealisticTrophy({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Gold Metal Linear Gradients */}
        <linearGradient id="goldCupGrad" x1="16" y1="8" x2="48" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="20%" stopColor="#F5D061" />
          <stop offset="50%" stopColor="#E5A625" />
          <stop offset="78%" stopColor="#FDE38C" />
          <stop offset="100%" stopColor="#B37D14" />
        </linearGradient>
        <linearGradient id="goldRimGrad" x1="20" y1="8" x2="44" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9E5" />
          <stop offset="50%" stopColor="#F5CD58" />
          <stop offset="100%" stopColor="#D49419" />
        </linearGradient>
        <linearGradient id="handleGradLeft" x1="8" y1="14" x2="20" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="45%" stopColor="#E5A625" />
          <stop offset="100%" stopColor="#8C5C05" />
        </linearGradient>
        <linearGradient id="handleGradRight" x1="56" y1="14" x2="44" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="45%" stopColor="#E5A625" />
          <stop offset="100%" stopColor="#8C5C05" />
        </linearGradient>
        <linearGradient id="pedestalStem" x1="30" y1="36" x2="34" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5A625" />
          <stop offset="50%" stopColor="#FFF0B3" />
          <stop offset="100%" stopColor="#8C5C05" />
        </linearGradient>
        <linearGradient id="woodBaseGrad" x1="18" y1="48" x2="46" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2E1A11" />
          <stop offset="50%" stopColor="#4A2B1D" />
          <stop offset="100%" stopColor="#1E100A" />
        </linearGradient>
        <linearGradient id="plaqueGrad" x1="22" y1="50" x2="42" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF4D0" />
          <stop offset="50%" stopColor="#E5A625" />
          <stop offset="100%" stopColor="#B37D14" />
        </linearGradient>
      </defs>

      {/* Left Winged Handle */}
      <path
        d="M20 14C11 14 8 21 8 26C8 33 16 34 20 34"
        stroke="url(#handleGradLeft)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Right Winged Handle */}
      <path
        d="M44 14C53 14 56 21 56 26C56 33 48 34 44 34"
        stroke="url(#handleGradRight)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Main Cup Body */}
      <path
        d="M18 10C18 26 24 36 32 36C40 36 46 26 46 10H18Z"
        fill="url(#goldCupGrad)"
      />
      {/* Specular Left Highlight */}
      <path
        d="M20 12C20.5 22 23 30 26 33C24 30 22 22 22 12H20Z"
        fill="#FFFFFF"
        fillOpacity="0.4"
      />
      {/* Top Rim Ellipse */}
      <ellipse cx="32" cy="10" rx="14" ry="3.5" fill="url(#goldRimGrad)" stroke="#B37D14" strokeWidth="0.8" />
      <ellipse cx="32" cy="10" rx="11" ry="2.2" fill="#8C5C05" fillOpacity="0.8" />

      {/* Cup Emblem: Embossed Badminton Star Racket */}
      <circle cx="32" cy="22" r="5" fill="#FFEAA7" fillOpacity="0.85" />
      <path
        d="M32 18.5L33.2 21L35.8 21.3L33.8 23L34.4 25.5L32 24.2L29.6 25.5L30.2 23L28.2 21.3L30.8 21L32 18.5Z"
        fill="#B37D14"
      />

      {/* Pedestal Stem & Collar */}
      <ellipse cx="32" cy="37" rx="6" ry="1.8" fill="#FFF0B3" />
      <path d="M29 37L28 46H36L35 37H29Z" fill="url(#pedestalStem)" />
      <ellipse cx="32" cy="46" rx="8" ry="2.2" fill="#E5A625" />

      {/* Heavy Polished Wooden Base */}
      <path
        d="M22 47H42L45 57H19L22 47Z"
        fill="url(#woodBaseGrad)"
      />
      {/* Base Bevel Base */}
      <rect x="16" y="56" width="32" height="3" rx="1.5" fill="#140A06" />

      {/* Engraved Metallic Plaque */}
      <rect x="23" y="49.5" width="18" height="5.5" rx="1" fill="url(#plaqueGrad)" stroke="#FFEAA7" strokeWidth="0.5" />
      <line x1="25" y1="52" x2="39" y2="52" stroke="#4A2B1D" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 2. Realistic 16-Feather Badminton Tournament Shuttlecock
 * Natural goose feather shafts, dual red tension threads, and natural cork tip.
 */
export function RealisticShuttlecock({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="corkGrad" x1="24" y1="34" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF7F2" />
          <stop offset="35%" stopColor="#EFE8DE" />
          <stop offset="70%" stopColor="#D9CCA3" />
          <stop offset="100%" stopColor="#A88B58" />
        </linearGradient>
        <linearGradient id="featherGrad" x1="12" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>

      {/* Feather Skirt Outer Cone */}
      <path
        d="M10 8L18 34H30L38 8C35 6 13 6 10 8Z"
        fill="url(#featherGrad)"
        fillOpacity="0.95"
      />

      {/* Feather Vein Ribs (16 Feathers overlap) */}
      <g stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round">
        <line x1="12" y1="8" x2="19" y2="34" />
        <line x1="16" y1="7" x2="21" y2="34" />
        <line x1="20" y1="7" x2="23" y2="34" />
        <line x1="24" y1="7" x2="24" y2="34" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="28" y1="7" x2="25" y2="34" />
        <line x1="32" y1="7" x2="27" y2="34" />
        <line x1="36" y1="8" x2="29" y2="34" />
      </g>

      {/* Top Feather Overlap Ridges */}
      <path
        d="M10 8C14 10 18 10 24 10C30 10 34 10 38 8C35 6 13 6 10 8Z"
        fill="#FFFFFF"
        stroke="#E2E8F0"
        strokeWidth="0.8"
      />

      {/* Dual Red/Cyan Nylon Thread Bands (BWF Spec) */}
      <path d="M14 20C17 21.5 21 22 24 22C27 22 31 21.5 34 20" stroke="#DC2626" strokeWidth="1.2" />
      <path d="M16 26C18.5 27.2 21.5 27.5 24 27.5C26.5 27.5 29.5 27.2 32 26" stroke="#DC2626" strokeWidth="1.2" />

      {/* Natural Cork Dome Tip */}
      <path
        d="M18 34C18 34 18 43 24 43C30 43 30 34 30 34H18Z"
        fill="url(#corkGrad)"
        stroke="#CBD5E1"
        strokeWidth="0.8"
      />
      {/* Official Gold/Green Ribbon Tape on Cork Base */}
      <rect x="18" y="34" width="12" height="2.5" fill="#15803D" />
      <rect x="18" y="34.8" width="12" height="0.8" fill="#FACC15" />
    </svg>
  );
}

/**
 * 3. Realistic Gold Championship Medal
 * Dual-tone striped athletic lanyard ribbon, heavy gold medallion, and embossed laurel wreath.
 */
export function RealisticGoldMedal({ className = "", size = 44 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="medalRibbonLeft" x1="16" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="medalRibbonRight" x1="32" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <linearGradient id="medalGold" x1="16" y1="18" x2="32" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9E5" />
          <stop offset="25%" stopColor="#F5CD58" />
          <stop offset="50%" stopColor="#E5A625" />
          <stop offset="85%" stopColor="#FDE38C" />
          <stop offset="100%" stopColor="#A16207" />
        </linearGradient>
      </defs>

      {/* Lanyard Ribbon */}
      <path d="M17 4L22 24L26 24L21 4H17Z" fill="url(#medalRibbonLeft)" />
      <path d="M31 4L26 24L22 24L27 4H31Z" fill="url(#medalRibbonRight)" />
      {/* Center Gold Stripe */}
      <path d="M23 4L23.5 24L24.5 24L25 4H23Z" fill="#FACC15" />

      {/* Ribbon Loop Ring */}
      <ellipse cx="24" cy="22" rx="3.5" ry="1.5" fill="none" stroke="#D97706" strokeWidth="1.5" />

      {/* Heavy Gold Medallion Outer Rim */}
      <circle cx="24" cy="33" r="13" fill="url(#medalGold)" stroke="#B45309" strokeWidth="1" />
      {/* Inner Recessed Bevel */}
      <circle cx="24" cy="33" r="10.5" fill="#D97706" fillOpacity="0.25" stroke="#FFF4D0" strokeWidth="0.8" />

      {/* Embossed Number 1 with Laurel Wreath */}
      <path
        d="M23 27.5L25 26V37H23V27.5Z"
        fill="#78350F"
        stroke="#FEF3C7"
        strokeWidth="0.4"
      />
      {/* Laurel branches */}
      <path
        d="M17 33C17 37 20 39.5 24 40C28 39.5 31 37 31 33"
        stroke="#78350F"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="1.5 2.5"
      />
    </svg>
  );
}

/**
 * 4. Realistic Verified Circuit Accreditation Shield
 * Dimensionally beveled emerald crest, micro-guilloche border, and gold holographic checkmark.
 */
export function RealisticVerifiedShield({ className = "", size = 36 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shieldGrad" x1="6" y1="4" x2="30" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="40%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id="shieldBorder" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id="goldCheck" x1="12" y1="14" x2="24" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9E5" />
          <stop offset="50%" stopColor="#FACC15" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      {/* Shield Body */}
      <path
        d="M18 3L7 7.5V17C7 24.5 11.5 30.5 18 33C24.5 30.5 29 24.5 29 17V7.5L18 3Z"
        fill="url(#shieldGrad)"
        stroke="url(#shieldBorder)"
        strokeWidth="1.5"
      />

      {/* Inner Security Facet Reflection */}
      <path
        d="M18 4.5L9 8.2V17C9 23.5 12.8 28.8 18 31.2V4.5Z"
        fill="#FFFFFF"
        fillOpacity="0.12"
      />

      {/* Gold Holographic Checkmark */}
      <path
        d="M13 17.5L16.5 21L23 13.5"
        stroke="url(#goldCheck)"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 5. Realistic 3D Badminton Smart Radar Beacon
 * Dimensionally beveled radar dome, concentric court boundary circles, sonar sweep gradient, and 3D golden beacon pin.
 */
export function RealisticBadmintonRadar({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="radarDarkDome" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B2E21" />
          <stop offset="70%" stopColor="#061B13" />
          <stop offset="100%" stopColor="#030C08" />
        </radialGradient>
        <linearGradient id="radarBevelRim" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="35%" stopColor="#10B981" />
          <stop offset="70%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id="goldPinGrad" x1="28" y1="18" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9E5" />
          <stop offset="40%" stopColor="#F5CD58" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Metallic Beveled Housing */}
      <circle cx="32" cy="32" r="28" fill="url(#radarBevelRim)" stroke="#A7F3D0" strokeWidth="1" />
      <circle cx="32" cy="32" r="25.5" fill="#047857" />
      <circle cx="32" cy="32" r="24" fill="url(#radarDarkDome)" stroke="#065F46" strokeWidth="1.2" />

      {/* Concentric Court Coordinate Rings */}
      <circle cx="32" cy="32" r="18" fill="none" stroke="#10B981" strokeWidth="1" strokeOpacity="0.45" strokeDasharray="3 3" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="#34D399" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="32" cy="32" r="6" fill="none" stroke="#6EE7B7" strokeWidth="1" strokeOpacity="0.8" />

      {/* Court Crosshair Reticles */}
      <line x1="8" y1="32" x2="56" y2="32" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.35" />
      <line x1="32" y1="8" x2="32" y2="56" stroke="#34D399" strokeWidth="0.8" strokeOpacity="0.35" />

      {/* Rotating Sweep Arc Sector */}
      <path
        d="M32 32L46 18A20 20 0 0 1 52 32Z"
        fill="url(#beaconGlow)"
        opacity="0.9"
      />
      <line x1="32" y1="32" x2="46" y2="18" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" />

      {/* Tournament Targets (Pings) */}
      <circle cx="43" cy="22" r="2" fill="#FACC15" className="animate-ping" />
      <circle cx="43" cy="22" r="2.5" fill="#FDE047" stroke="#854D0E" strokeWidth="0.5" />
      <circle cx="21" cy="24" r="1.8" fill="#34D399" />
      <circle cx="25" cy="42" r="2" fill="#34D399" />

      {/* Center 3D Golden Marker Pin with Shuttlecock Head */}
      <ellipse cx="32" cy="36" rx="4" ry="1.5" fill="#000000" fillOpacity="0.5" />
      <path
        d="M32 20C29.2 20 27 22.2 27 25C27 28.5 32 34 32 34C32 34 37 28.5 37 25C37 22.2 34.8 20 32 20Z"
        fill="url(#goldPinGrad)"
        stroke="#78350F"
        strokeWidth="0.8"
      />
      <circle cx="32" cy="25" r="2.2" fill="#FFFBEB" stroke="#B45309" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * 6. Realistic 3D VIP Tournament Pass & Lanyard
 * Woven athletic neckstrap, metal lobster clasp, clear acrylic pocket, and holographic gold VIP card.
 */
export function RealisticVIPPassLanyard({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="lanyardLeft" x1="18" y1="2" x2="30" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <linearGradient id="lanyardRight" x1="46" y1="2" x2="34" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#9A3412" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#7C2D12" />
        </linearGradient>
        <linearGradient id="metalClipGrad" x1="30" y1="18" x2="34" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="40%" stopColor="#94A3B8" />
          <stop offset="80%" stopColor="#475569" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="cardGoldGrad" x1="16" y1="24" x2="48" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="45%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="holoStripe" x1="16" y1="36" x2="48" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="25%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="75%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Woven Athletic Neckstrap Lanyard */}
      <path d="M22 2L30 20H34L26 2H22Z" fill="url(#lanyardLeft)" />
      <path d="M42 2L34 20H30L38 2H42Z" fill="url(#lanyardRight)" />
      <line x1="24" y1="2" x2="32" y2="20" stroke="#FED7AA" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="40" y1="2" x2="32" y2="20" stroke="#FED7AA" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Brushed Steel Lobster Clasp & Ring */}
      <circle cx="32" cy="20" r="3" fill="none" stroke="url(#metalClipGrad)" strokeWidth="1.5" />
      <rect x="30" y="22" width="4" height="4" rx="1" fill="url(#metalClipGrad)" />

      {/* Clear Protective Acrylic Pass Pouch */}
      <rect x="15" y="24" width="34" height="38" rx="3.5" fill="#FFFFFF" fillOpacity="0.15" stroke="#CBD5E1" strokeWidth="0.8" />

      {/* High-Gloss VIP Credential Card Body */}
      <rect x="17" y="26" width="30" height="34" rx="2.5" fill="url(#cardGoldGrad)" stroke="#DE9D35" strokeWidth="0.8" />

      {/* Card Header: Gold Foil Crest */}
      <rect x="20" y="29" width="10" height="3" rx="0.8" fill="#F59E0B" />
      <circle cx="41" cy="30.5" r="2" fill="#10B981" />

      {/* Holographic Security Foil Ribbon */}
      <rect x="17" y="35" width="30" height="4.5" fill="url(#holoStripe)" fillOpacity="0.85" />

      {/* VIP ATHLETE Lettering Bar */}
      <rect x="20" y="42" width="18" height="2" rx="0.5" fill="#F8FAFC" />
      <rect x="20" y="45.5" width="12" height="1.5" rx="0.5" fill="#94A3B8" />

      {/* Mini QR Verification Matrix */}
      <rect x="36" y="42" width="7" height="7" rx="0.8" fill="#FFFFFF" />
      <rect x="37.5" y="43.5" width="4" height="4" fill="#000000" />
      <rect x="39" y="45" width="1" height="1" fill="#FFFFFF" />

      {/* Barcode Strip along bottom */}
      <g fill="#DE9D35" opacity="0.8">
        <rect x="20" y="52" width="1" height="4" />
        <rect x="22" y="52" width="1.5" height="4" />
        <rect x="25" y="52" width="0.8" height="4" />
        <rect x="27" y="52" width="2" height="4" />
        <rect x="30" y="52" width="1" height="4" />
        <rect x="33" y="52" width="1.8" height="4" />
        <rect x="36" y="52" width="0.8" height="4" />
        <rect x="38" y="52" width="1.5" height="4" />
        <rect x="41" y="52" width="1" height="4" />
      </g>
    </svg>
  );
}

/**
 * 7. Realistic 3D Graphite Tournament Badminton Racket
 * High-modulus carbon frame, isometric head, dual-tone string bed grid, metallic T-joint, and wrapped polyurethane grip.
 */
export function RealisticBadmintonRacket({ className = "", size = 48 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-md select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="racketFrame" x1="16" y1="4" x2="48" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="30%" stopColor="#DE9D35" />
          <stop offset="70%" stopColor="#1E3A2B" />
          <stop offset="100%" stopColor="#0B1220" />
        </linearGradient>
        <linearGradient id="shaftGrad" x1="30" y1="36" x2="34" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DE9D35" />
          <stop offset="50%" stopColor="#F5D061" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="gripWrapGrad" x1="28" y1="48" x2="36" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="30%" stopColor="#1E293B" />
          <stop offset="70%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
      </defs>

      {/* Racket Head Strings Bed (Cross-Woven Monofilament Grid) */}
      <g stroke="#E2E8F0" strokeWidth="0.6" strokeOpacity="0.75">
        <line x1="26" y1="9" x2="26" y2="31" />
        <line x1="29" y1="7" x2="29" y2="33" />
        <line x1="32" y1="6" x2="32" y2="34" />
        <line x1="35" y1="7" x2="35" y2="33" />
        <line x1="38" y1="9" x2="38" y2="31" />

        <line x1="24" y1="12" x2="40" y2="12" />
        <line x1="22" y1="16" x2="42" y2="16" />
        <line x1="21" y1="20" x2="43" y2="20" stroke="#DE9D35" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="22" y1="24" x2="42" y2="24" stroke="#DE9D35" strokeWidth="1" strokeOpacity="0.9" />
        <line x1="24" y1="28" x2="40" y2="28" />
      </g>

      {/* Isometric Frame Outer Rim */}
      <ellipse
        cx="32"
        cy="20"
        rx="12.5"
        ry="14.5"
        stroke="url(#racketFrame)"
        strokeWidth="2.8"
        fill="none"
      />
      {/* Frame Specular Reflection Ring */}
      <ellipse
        cx="32"
        cy="20"
        rx="11.5"
        ry="13.5"
        stroke="#FFFBEB"
        strokeWidth="0.6"
        strokeOpacity="0.5"
        fill="none"
      />

      {/* Reinforced Isometric T-Joint Collar */}
      <path d="M29 33.5C29 33.5 30 36.5 32 36.5C34 36.5 35 33.5 35 33.5H29Z" fill="#DE9D35" stroke="#78350F" strokeWidth="0.5" />

      {/* High-Flex Carbon Shaft */}
      <line x1="32" y1="36.5" x2="32" y2="48" stroke="url(#shaftGrad)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Polyurethane Overgrip Handle */}
      <rect x="30" y="48" width="4" height="12" rx="1" fill="url(#gripWrapGrad)" stroke="#475569" strokeWidth="0.5" />
      {/* Overgrip Spiral Texture Wraps */}
      <line x1="30" y1="50.5" x2="34" y2="52" stroke="#64748B" strokeWidth="0.8" />
      <line x1="30" y1="53.5" x2="34" y2="55" stroke="#64748B" strokeWidth="0.8" />
      <line x1="30" y1="56.5" x2="34" y2="58" stroke="#64748B" strokeWidth="0.8" />

      {/* Handle Butt Cap */}
      <rect x="29" y="59.5" width="6" height="2" rx="0.8" fill="#DE9D35" stroke="#78350F" strokeWidth="0.4" />
    </svg>
  );
}

/**
 * 8. Realistic Competitive Men's Doubles Icon
 * Dual crossed metallic tournament rackets, attacking doubles front-rear court formation, and high-speed BWF shuttlecock.
 */
export function RealisticMensDoublesIcon({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mdRacketL" x1="6" y1="6" x2="32" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id="mdRacketR" x1="42" y1="6" x2="16" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5D061" />
          <stop offset="50%" stopColor="#DE9D35" />
          <stop offset="100%" stopColor="#8C5C05" />
        </linearGradient>
        <radialGradient id="doublesAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Atmospheric Doubles Court Glow */}
      <circle cx="24" cy="24" r="22" fill="url(#doublesAura)" />
      
      {/* Background Court Alley Lines */}
      <rect x="10" y="8" width="28" height="32" rx="4" fill="#062319" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="24" y1="8" x2="24" y2="40" stroke="#10B981" strokeWidth="0.6" strokeOpacity="0.4" />
      <line x1="10" y1="24" x2="38" y2="24" stroke="#10B981" strokeWidth="0.8" strokeOpacity="0.6" />

      {/* Left Attacking Racket (Emerald Power) */}
      <ellipse cx="17" cy="16" rx="7" ry="8.5" stroke="url(#mdRacketL)" strokeWidth="1.8" />
      <line x1="17" y1="24.5" x2="10" y2="39" stroke="url(#mdRacketL)" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="8.5" y="37" width="3" height="5" rx="0.8" fill="#1E293B" transform="rotate(-30 8.5 37)" />

      {/* Right Attacking Racket (Gold Precision) */}
      <ellipse cx="31" cy="16" rx="7" ry="8.5" stroke="url(#mdRacketR)" strokeWidth="1.8" />
      <line x1="31" y1="24.5" x2="38" y2="39" stroke="url(#mdRacketR)" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="36.5" y="37" width="3" height="5" rx="0.8" fill="#1E293B" transform="rotate(30 36.5 37)" />

      {/* Center Dynamic Shuttlecock Strike Impact */}
      <circle cx="24" cy="18" r="3" fill="#FFFFFF" />
      <path d="M22 17L26 17L25 21L23 21Z" fill="#DC2626" />
      <path d="M21 17L27 17L25.5 12L22.5 12Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
      <circle cx="24" cy="18" r="5" stroke="#FDE047" strokeWidth="0.8" className="animate-ping" opacity="0.6" />
    </svg>
  );
}

/**
 * 9. Realistic Competitive Men's Singles Icon
 * High-voltage mid-air jump-smash athlete power strike, speed vector streak, and sharp championship focus.
 */
export function RealisticMensSinglesIcon({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="msShieldGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="60%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="msGoldStrike" x1="16" y1="6" x2="36" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9E5" />
          <stop offset="30%" stopColor="#F5CD58" />
          <stop offset="70%" stopColor="#E5A625" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Hexagonal Dynamic Armor Badge */}
      <path
        d="M24 4L40 12V28L24 44L8 28V12L24 4Z"
        fill="url(#msShieldGrad)"
        stroke="#E5A625"
        strokeWidth="1.2"
      />

      {/* Internal High-Speed Vector Smash Silhouette */}
      <path
        d="M28 8L20 22H27L19 40L32 24H25L31 8H28Z"
        fill="url(#msGoldStrike)"
        stroke="#FEF3C7"
        strokeWidth="0.6"
      />

      {/* Shuttlecock Sonic Boom at Strike Apex */}
      <circle cx="30" cy="10" r="2.2" fill="#FFFFFF" />
      <path d="M30 8L36 6L33 11Z" fill="#DC2626" />
      <line x1="33" y1="9" x2="42" y2="6" stroke="#FDE047" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 10. Realistic Competitive Women's Singles Icon
 * Elite precision dropshot, razor rallies, dynamic aerodynamic sweep and diamond championship crest.
 */
export function RealisticWomensSinglesIcon({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wsRubyGrad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BE123C" />
          <stop offset="45%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>
        <linearGradient id="wsGoldRim" x1="12" y1="4" x2="36" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {/* Diamond Precision Championship Crest */}
      <path
        d="M24 5L42 24L24 43L6 24L24 5Z"
        fill="url(#wsRubyGrad)"
        stroke="url(#wsGoldRim)"
        strokeWidth="1.5"
      />
      <path
        d="M24 9L38 24L24 39L10 24L24 9Z"
        stroke="#FDA4AF"
        strokeWidth="0.6"
        strokeOpacity="0.6"
      />

      {/* Aerodynamic Precision Racket Sweep */}
      <ellipse cx="24" cy="18" rx="6" ry="7.5" stroke="#FFFFFF" strokeWidth="1.4" />
      <line x1="24" y1="25.5" x2="24" y2="35" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="23" y="33" width="2" height="4" rx="0.5" fill="#4C0519" />

      {/* Laser-Sharp Shuttlecock Net Drop Point */}
      <circle cx="24" cy="15" r="2.2" fill="#FFFFFF" />
      <path d="M22 13L26 13L24 16Z" fill="#FB7185" />
      <circle cx="24" cy="15" r="4.5" stroke="#FDE68A" strokeWidth="0.8" opacity="0.8" />
    </svg>
  );
}

/**
 * 11. Realistic Competitive Mixed Doubles Icon
 * Male & female tactical tandem partnership, complementary emerald-sunset energy vectors, and crossed BWF court lines.
 */
export function RealisticMixedDoublesIcon({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mxEmerald" x1="10" y1="8" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="60%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
        <linearGradient id="mxCoral" x1="38" y1="8" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="60%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
      </defs>

      {/* Interlocking Tandem Circular Crests */}
      <circle cx="19" cy="22" r="13" fill="url(#mxEmerald)" stroke="#6EE7B7" strokeWidth="1.2" />
      <circle cx="29" cy="22" r="13" fill="url(#mxCoral)" stroke="#FDA4AF" strokeWidth="1.2" fillOpacity="0.85" />

      {/* Tandem Rackets & Intercepting Shuttlecock */}
      {/* Front Net Interceptor Racket */}
      <ellipse cx="20" cy="18" rx="4.5" ry="5.5" stroke="#FFFFFF" strokeWidth="1.2" />
      <line x1="20" y1="23.5" x2="16" y2="31" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

      {/* Rear Baseline Power Racket */}
      <ellipse cx="29" cy="18" rx="4.5" ry="5.5" stroke="#FFEAA7" strokeWidth="1.2" />
      <line x1="29" y1="23.5" x2="33" y2="31" stroke="#FFEAA7" strokeWidth="1.2" strokeLinecap="round" />

      {/* Center Golden Unity Crest */}
      <circle cx="24.5" cy="22" r="3.2" fill="#F59E0B" stroke="#FFFBEB" strokeWidth="0.8" />
      <circle cx="24.5" cy="22" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * 12. Realistic Random Wheel Draw Icon
 * High-tech anti-rigged roulette wheel with gold segmented sectors, central jewel bearing, and digital randomness indicator.
 */
export function RealisticRandomWheelIcon({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="wheelRimGold" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="80%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Outer Metal Wheel Frame */}
      <circle cx="24" cy="24" r="20" fill="#0B1220" stroke="url(#wheelRimGold)" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="17" fill="#1E293B" stroke="#DE9D35" strokeWidth="0.6" />

      {/* 8 Precision Slices */}
      <path d="M24 24L24 7A17 17 0 0 1 36 12Z" fill="#10B981" />
      <path d="M24 24L36 12A17 17 0 0 1 41 24Z" fill="#DE9D35" />
      <path d="M24 24L41 24A17 17 0 0 1 36 36Z" fill="#059669" />
      <path d="M24 24L36 36A17 17 0 0 1 24 41Z" fill="#F59E0B" />
      <path d="M24 24L24 41A17 17 0 0 1 12 36Z" fill="#047857" />
      <path d="M24 24L12 36A17 17 0 0 1 7 24Z" fill="#D97706" />
      <path d="M24 24L7 24A17 17 0 0 1 12 12Z" fill="#065F46" />
      <path d="M24 24L12 12A17 17 0 0 1 24 7Z" fill="#B45309" />

      {/* Separator Spokes */}
      <circle cx="24" cy="24" r="17" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeOpacity="0.4" />

      {/* Center Jewel Hub */}
      <circle cx="24" cy="24" r="5.5" fill="#0F172A" stroke="#FDE68A" strokeWidth="1.2" />
      <circle cx="24" cy="24" r="3" fill="#F59E0B" />
      <circle cx="24" cy="24" r="1.2" fill="#FFFFFF" />

      {/* Needle Pointer at Top */}
      <path d="M24 4L27 10H21L24 4Z" fill="#DC2626" stroke="#FFFFFF" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * 13. Realistic Masters 40+ Doubles Icon
 * Heavy cast bronze & gold veteran championship crest, embossed "40+" shield, victory laurel branches, and crossed rackets.
 */
export function RealisticMastersDoublesIcon({ className = "", size = 40 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bronzeShield" x1="10" y1="6" x2="38" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="50%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="bronzeGoldRim" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Shield Body */}
      <path
        d="M24 4L38 9V23C38 32 32 39 24 43C16 39 10 32 10 23V9L24 4Z"
        fill="url(#bronzeShield)"
        stroke="url(#bronzeGoldRim)"
        strokeWidth="1.5"
      />

      {/* Embossed "40+" Text Plaque */}
      <rect x="16" y="16" width="16" height="12" rx="2" fill="#F59E0B" stroke="#FFFBEB" strokeWidth="0.6" />
      <text
        x="24"
        y="25"
        textAnchor="middle"
        fontSize="8"
        fontWeight="900"
        fill="#451A03"
        fontFamily="sans-serif"
      >
        40+
      </text>

      {/* Laurel Wreath at Bottom */}
      <path
        d="M14 26C14 33 18 36.5 24 38C30 36.5 34 33 34 26"
        stroke="#FDE68A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      {/* Crown Crest atop Shield */}
      <path d="M20 7L24 5L28 7L27 9H21L20 7Z" fill="#FDE68A" stroke="#78350F" strokeWidth="0.4" />
    </svg>
  );
}

/**
 * 14. Realistic Silver Medal (2nd Place Runner-Up)
 */
export function RealisticSilverMedal({ className = "", size = 36 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="silverGrad" x1="14" y1="14" x2="34" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#E2E8F0" />
          <stop offset="80%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="silverRibbon" x1="16" y1="4" x2="32" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <path d="M17 4L22 24L26 24L21 4H17Z" fill="url(#silverRibbon)" />
      <path d="M31 4L26 24L22 24L27 4H31Z" fill="url(#silverRibbon)" />
      <circle cx="24" cy="32" r="12" fill="url(#silverGrad)" stroke="#64748B" strokeWidth="1" />
      <circle cx="24" cy="32" r="9.5" fill="#F8FAFC" fillOpacity="0.4" stroke="#CBD5E1" strokeWidth="0.6" />
      <text x="24" y="36" textAnchor="middle" fontSize="11" fontWeight="900" fill="#334155" fontFamily="sans-serif">2</text>
    </svg>
  );
}

/**
 * 15. Realistic Bronze Medal (3rd Place Semi-Finalist)
 */
export function RealisticBronzeMedal({ className = "", size = 36 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bronzeGrad" x1="14" y1="14" x2="34" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="40%" stopColor="#D97706" />
          <stop offset="80%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="bronzeRibbon" x1="16" y1="4" x2="32" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C2D12" />
          <stop offset="50%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
      </defs>
      <path d="M17 4L22 24L26 24L21 4H17Z" fill="url(#bronzeRibbon)" />
      <path d="M31 4L26 24L22 24L27 4H31Z" fill="url(#bronzeRibbon)" />
      <circle cx="24" cy="32" r="12" fill="url(#bronzeGrad)" stroke="#78350F" strokeWidth="1" />
      <circle cx="24" cy="32" r="9.5" fill="#FEF3C7" fillOpacity="0.3" stroke="#FDE68A" strokeWidth="0.6" />
      <text x="24" y="36" textAnchor="middle" fontSize="11" fontWeight="900" fill="#451A03" fontFamily="sans-serif">3</text>
    </svg>
  );
}


