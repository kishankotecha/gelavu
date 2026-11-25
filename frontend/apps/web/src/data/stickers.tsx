import React from "react";

export interface StickerAvatar {
  id: string;
  name: string;
  trait: string;
  tagline: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  emoji: string;
  SvgComponent: React.ComponentType<{ className?: string }>;
}

// 1. Smash Beast (Roaring Tiger in Athletic Sweatband)
function SmashBeastSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="tigerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFA040" />
          <stop offset="100%" stopColor="#E64A19" />
        </radialGradient>
      </defs>
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="url(#tigerGlow)" />
      {/* Ears */}
      <path d="M22 28 C16 14 30 10 36 22 Z" fill="#D84315" />
      <path d="M24 26 C20 18 28 15 32 23 Z" fill="#FFE082" />
      <path d="M78 28 C84 14 70 10 64 22 Z" fill="#D84315" />
      <path d="M76 26 C80 18 72 15 68 23 Z" fill="#FFE082" />
      {/* Head */}
      <circle cx="50" cy="56" r="32" fill="#FF8F00" />
      {/* White Muzzle */}
      <ellipse cx="50" cy="65" rx="18" ry="13" fill="#FFF8E1" />
      {/* Black Tiger Stripes */}
      <path d="M50 30 L52 38 L48 38 Z" fill="#212121" />
      <path d="M43 32 L47 38 L42 40 Z" fill="#212121" />
      <path d="M57 32 L53 38 L58 40 Z" fill="#212121" />
      <path d="M22 52 L30 54 L24 58 Z" fill="#212121" />
      <path d="M78 52 L70 54 L76 58 Z" fill="#212121" />
      {/* Red Sweatband with mini shuttle */}
      <rect x="22" y="38" width="56" height="11" rx="4" fill="#D32F2F" />
      <rect x="22" y="42" width="56" height="3" fill="#FFF" opacity="0.8" />
      {/* Eyes (Fierce & Crazy) */}
      <ellipse cx="38" cy="53" rx="5" ry="6" fill="#FFF" />
      <circle cx="39" cy="53" r="3.2" fill="#212121" />
      <circle cx="40" cy="51.5" r="1.2" fill="#FFF" />
      <ellipse cx="62" cy="53" rx="5" ry="6" fill="#FFF" />
      <circle cx="61" cy="53" r="3.2" fill="#212121" />
      <circle cx="62" cy="51.5" r="1.2" fill="#FFF" />
      {/* Nose */}
      <polygon points="50,61 46,58 54,58" fill="#D84315" />
      {/* Mouth with Fangs */}
      <path d="M44 67 Q50 72 56 67" stroke="#212121" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <polygon points="45,67 47,67 46,71" fill="#FFF" />
      <polygon points="53,67 55,67 54,71" fill="#FFF" />
      {/* Whiskers */}
      <path d="M30 63 L20 62 M30 66 L21 68" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70 63 L80 62 M70 66 L79 68" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" />
      {/* Mini Racket in mouth / bottom */}
      <circle cx="75" cy="78" r="9" stroke="#FFD54F" strokeWidth="2.5" fill="none" strokeDasharray="2 1" />
      <line x1="68" y1="84" x2="60" y2="92" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 2. Court Ninja (Stealth Shuttler with Twin Rackets)
function CourtNinjaSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ninjaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#312E81" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ninjaGlow)" />
      {/* Crossed Rackets behind head */}
      <line x1="20" y1="20" x2="80" y2="80" stroke="#818CF8" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="23" cy="23" rx="10" ry="7" transform="rotate(-45 23 23)" stroke="#A5B4FC" strokeWidth="2" fill="none" />
      <line x1="80" y1="20" x2="20" y2="80" stroke="#818CF8" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="77" cy="23" rx="10" ry="7" transform="rotate(45 77 23)" stroke="#A5B4FC" strokeWidth="2" fill="none" />
      {/* Ninja Hood */}
      <ellipse cx="50" cy="54" rx="30" ry="32" fill="#18181B" />
      <ellipse cx="50" cy="52" rx="27" ry="29" fill="#27272A" />
      {/* Violet Headband */}
      <path d="M22 42 Q50 36 78 42 L78 49 Q50 43 22 49 Z" fill="#7C3AED" />
      {/* Metal Headplate with Shuttle Insignia */}
      <rect x="40" y="39" width="20" height="9" rx="2" fill="#E2E8F0" />
      <polygon points="50,41 46,46 54,46" fill="#7C3AED" />
      {/* Face Opening */}
      <rect x="30" y="50" width="40" height="15" rx="6" fill="#FDE047" />
      {/* Glowing Stealth Eyes */}
      <ellipse cx="41" cy="57" rx="5" ry="3" fill="#18181B" />
      <ellipse cx="59" cy="57" rx="5" ry="3" fill="#18181B" />
      <circle cx="42" cy="56" r="1.5" fill="#FFF" />
      <circle cx="60" cy="56" r="1.5" fill="#FFF" />
      {/* Fierce angled brows */}
      <path d="M35 53 L47 56" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M65 53 L53 56" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
      {/* Flying ribbon tails */}
      <path d="M78 44 Q88 40 92 48 Q85 50 82 56" fill="#6D28D9" />
    </svg>
  );
}

// 3. Rocket Birdie (Supersonic Shuttlecock with Jet Flames)
function RocketBirdieSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="rocketGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#EA580C" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#rocketGlow)" />
      {/* Jet Thruster Flames */}
      <path d="M42 80 Q50 96 50 98 Q50 96 58 80 Z" fill="#FACC15" />
      <path d="M45 80 Q50 90 50 92 Q50 90 55 80 Z" fill="#EF4444" />
      {/* Shuttle Feathers / Rocket Cone */}
      <path d="M30 65 L20 30 L50 20 L80 30 L70 65 Z" fill="#F8FAFC" />
      <line x1="38" y1="28" x2="42" y2="65" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="50" y1="20" x2="50" y2="65" stroke="#CBD5E1" strokeWidth="2" />
      <line x1="62" y1="28" x2="58" y2="65" stroke="#CBD5E1" strokeWidth="2" />
      {/* Cork Head (with face) */}
      <ellipse cx="50" cy="68" rx="16" ry="12" fill="#DE9D35" />
      <ellipse cx="50" cy="67" rx="14" ry="10" fill="#F3D15A" />
      {/* Aviator Sunglasses */}
      <rect x="36" y="62" width="12" height="9" rx="3" fill="#0F172A" />
      <rect x="52" y="62" width="12" height="9" rx="3" fill="#0F172A" />
      <line x1="47" y1="65" x2="53" y2="65" stroke="#0F172A" strokeWidth="2" />
      {/* Glass Glare */}
      <line x1="38" y1="64" x2="44" y2="69" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="54" y1="64" x2="60" y2="69" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Smug Grin */}
      <path d="M46 73 Q50 77 56 73" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Speed lines */}
      <line x1="12" y1="40" x2="18" y2="40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="82" y1="45" x2="90" y2="45" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// 4. Smash Monarch (Royal Crowned Badminton King)
function SmashMonarchSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="kingGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#CA8A04" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#kingGlow)" />
      {/* Mane / Hair */}
      <circle cx="50" cy="54" r="32" fill="#92400E" />
      {/* Face */}
      <ellipse cx="50" cy="56" rx="22" ry="20" fill="#FBBF24" />
      {/* Golden Crown */}
      <path d="M32 34 L38 22 L45 28 L50 18 L55 28 L62 22 L68 34 Z" fill="#FEE08B" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="50" cy="19" r="2.5" fill="#EF4444" />
      <circle cx="38" cy="23" r="2" fill="#3B82F6" />
      <circle cx="62" cy="23" r="2" fill="#10B981" />
      {/* Crown base */}
      <rect x="32" y="32" width="36" height="5" rx="2" fill="#D97706" />
      {/* Sunglasses (Boss style) */}
      <polygon points="34,48 48,48 46,57 36,56" fill="#18181B" />
      <polygon points="52,48 66,48 64,56 54,57" fill="#18181B" />
      <line x1="47" y1="50" x2="53" y2="50" stroke="#18181B" strokeWidth="2.5" />
      {/* White glares */}
      <circle cx="40" cy="51" r="1.5" fill="#FFF" />
      <circle cx="58" cy="51" r="1.5" fill="#FFF" />
      {/* Golden Tooth Smile */}
      <path d="M42 66 Q50 73 58 66" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="49" y="66" width="3.5" height="3.5" fill="#FEE08B" stroke="#B45309" strokeWidth="0.8" />
      {/* Gold Medal around neck */}
      <circle cx="50" cy="84" r="8" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />
      <text x="50" y="87" textAnchor="middle" fontSize="7" fontWeight="900" fill="#78350F">#1</text>
      <line x1="42" y1="76" x2="48" y2="81" stroke="#DC2626" strokeWidth="2" />
      <line x1="58" y1="76" x2="52" y2="81" stroke="#DC2626" strokeWidth="2" />
    </svg>
  );
}

// 5. Panda Smasher (Martial-Arts Jumping Panda)
function PandaSmasherSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="pandaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#065F46" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#pandaGlow)" />
      {/* Ears */}
      <circle cx="28" cy="28" r="10" fill="#18181B" />
      <circle cx="72" cy="28" r="10" fill="#18181B" />
      {/* Head */}
      <ellipse cx="50" cy="54" rx="30" ry="28" fill="#FFFFFF" />
      {/* Red Headband with long tails */}
      <path d="M22 40 Q50 35 78 40 L78 46 Q50 41 22 46 Z" fill="#DC2626" />
      <path d="M78 42 Q88 38 92 46 Q85 49 80 54" fill="#B91C1C" />
      {/* Eye Patches */}
      <ellipse cx="37" cy="54" rx="8" ry="7" transform="rotate(-15 37 54)" fill="#18181B" />
      <ellipse cx="63" cy="54" rx="8" ry="7" transform="rotate(15 63 54)" fill="#18181B" />
      {/* Sparkling Eyes */}
      <circle cx="38" cy="53" r="3.2" fill="#FFFFFF" />
      <circle cx="39" cy="53" r="1.8" fill="#18181B" />
      <circle cx="62" cy="53" r="3.2" fill="#FFFFFF" />
      <circle cx="61" cy="53" r="1.8" fill="#18181B" />
      {/* Cute Nose */}
      <ellipse cx="50" cy="62" rx="4.5" ry="3" fill="#18181B" />
      {/* Mouth */}
      <path d="M46 66 Q50 69 54 66" stroke="#18181B" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Pink Cheeks */}
      <circle cx="28" cy="62" r="4" fill="#FDA4AF" opacity="0.7" />
      <circle cx="72" cy="62" r="4" fill="#FDA4AF" opacity="0.7" />
      {/* Badminton Racket tilted */}
      <ellipse cx="20" cy="74" rx="9" ry="7" transform="rotate(-25 20 74)" stroke="#F59E0B" strokeWidth="2" fill="none" />
      <line x1="25" y1="78" x2="35" y2="88" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// 6. Thunder Bolt (Electrified Anime Shuttler)
function ThunderBoltSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="thunderGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#thunderGlow)" />
      {/* Electric Spiky Hair */}
      <polygon points="50,12 56,26 66,16 68,30 80,24 74,38 84,40 72,50 50,30 28,50 16,40 26,38 20,24 32,30 34,16 44,26" fill="#FACC15" />
      {/* Face */}
      <ellipse cx="50" cy="56" rx="24" ry="24" fill="#FEF08A" />
      {/* Blue Headband */}
      <rect x="26" y="44" width="48" height="9" rx="3" fill="#0284C7" />
      <polygon points="50,45 46,51 54,51" fill="#FACC15" />
      {/* Electric Eyes */}
      <ellipse cx="40" cy="56" rx="4.5" ry="5.5" fill="#0369A1" />
      <circle cx="41" cy="55" r="2.2" fill="#FFFFFF" />
      <polygon points="40,54 39,57 42,56" fill="#38BDF8" />
      <ellipse cx="60" cy="56" rx="4.5" ry="5.5" fill="#0369A1" />
      <circle cx="59" cy="55" r="2.2" fill="#FFFFFF" />
      <polygon points="60,54 59,57 62,56" fill="#38BDF8" />
      {/* Lightning Cheeks */}
      <path d="M28 62 L32 65 L30 68 L35 70" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M72 62 L68 65 L70 68 L65 70" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Confident Smile */}
      <path d="M43 68 Q50 74 57 68" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Lightning Sparks in background */}
      <polygon points="18,18 14,26 19,25 15,34 23,24 18,24" fill="#FACC15" />
      <polygon points="84,65 80,72 85,71 82,80 89,71 85,71" fill="#FACC15" />
    </svg>
  );
}

// 7. Avo-Smash (Hyperactive Avocado in Sports Gear)
function AvoSmashSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="avoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A3E635" />
          <stop offset="100%" stopColor="#166534" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#avoGlow)" />
      {/* Avocado Skin Outer */}
      <path d="M50 16 C38 16 32 30 30 50 C28 72 36 86 50 86 C64 86 72 72 70 50 C68 30 62 16 50 16 Z" fill="#14532D" />
      {/* Light Green Flesh */}
      <path d="M50 20 C40 20 35 32 33 50 C31 69 38 82 50 82 C62 82 69 69 67 50 C65 32 60 20 50 20 Z" fill="#D9F99D" />
      {/* Sweatband */}
      <rect x="34" y="32" width="32" height="7" rx="3" fill="#EF4444" />
      <line x1="34" y1="35" x2="66" y2="35" stroke="#FFF" strokeWidth="1.5" />
      {/* Crazy Big Eyes */}
      <circle cx="43" cy="45" r="6" fill="#FFFFFF" stroke="#166534" strokeWidth="1.5" />
      <circle cx="44" cy="45" r="3.2" fill="#18181B" />
      <circle cx="45" cy="44" r="1.2" fill="#FFFFFF" />
      <circle cx="57" cy="45" r="6" fill="#FFFFFF" stroke="#166534" strokeWidth="1.5" />
      <circle cx="56" cy="45" r="3.2" fill="#18181B" />
      <circle cx="57" cy="44" r="1.2" fill="#FFFFFF" />
      {/* Avocado Seed / Belly */}
      <circle cx="50" cy="65" r="12" fill="#78350F" />
      <circle cx="48" cy="63" r="10" fill="#92400E" />
      {/* Excited Open Smile */}
      <path d="M44 53 Q50 60 56 53 Z" fill="#DC2626" stroke="#166534" strokeWidth="1" />
      {/* Sweat drop */}
      <path d="M66 38 Q69 41 68 44 Q65 44 65 41 Z" fill="#38BDF8" />
    </svg>
  );
}

// 8. Cyber Bird (Cyborg Shuttlecock with Neon Laser Visor)
function CyberBirdSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="cyberGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#cyberGlow)" />
      {/* Metallic Circuit Feathers */}
      <polygon points="50,18 26,45 32,70 50,76 68,70 74,45" fill="#334155" stroke="#06B6D4" strokeWidth="2" />
      <line x1="38" y1="36" x2="42" y2="72" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="62" y1="36" x2="58" y2="72" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="3 2" />
      {/* Cybernetic Head Base */}
      <circle cx="50" cy="64" r="18" fill="#1E293B" stroke="#06B6D4" strokeWidth="2.5" />
      {/* Neon Red/Cyan Laser Visor */}
      <rect x="36" y="58" width="28" height="9" rx="3" fill="#0284C7" stroke="#38BDF8" strokeWidth="1.5" />
      <line x1="37" y1="62.5" x2="63" y2="62.5" stroke="#F43F5E" strokeWidth="3" />
      <circle cx="50" cy="62.5" r="2.5" fill="#FFF" />
      {/* Antenna with Signal Wave */}
      <line x1="50" y1="46" x2="50" y2="34" stroke="#38BDF8" strokeWidth="2" />
      <circle cx="50" cy="33" r="3" fill="#F43F5E" />
      <path d="M44 30 Q50 26 56 30" stroke="#38BDF8" strokeWidth="1.5" fill="none" />
      {/* Data HUD glyphs */}
      <text x="50" y="80" textAnchor="middle" fontSize="6" fontFamily="monospace" fontWeight="900" fill="#22D3EE">
        V-400 MAX
      </text>
    </svg>
  );
}

// 9. Dino Smasher (T-Rex with Tiny Arms and Giant Racket)
function DinoSmasherSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="dinoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#84CC16" />
          <stop offset="100%" stopColor="#3F6212" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#dinoGlow)" />
      {/* Dino Head Snout */}
      <path d="M25 55 C22 36 38 24 55 24 C72 24 82 34 82 48 C82 58 72 65 65 65 L35 65 Z" fill="#4D7C0F" />
      {/* Back Scales */}
      <polygon points="35,26 38,18 43,24" fill="#EAB308" />
      <polygon points="46,24 50,16 55,24" fill="#EAB308" />
      <polygon points="58,25 63,18 67,26" fill="#EAB308" />
      {/* Sweatband */}
      <rect x="36" y="32" width="42" height="8" rx="3" fill="#DC2626" />
      {/* Eye */}
      <circle cx="60" cy="42" r="6" fill="#FEF08A" stroke="#3F6212" strokeWidth="1.5" />
      <circle cx="61" cy="42" r="3" fill="#18181B" />
      <circle cx="62" cy="41" r="1" fill="#FFF" />
      {/* Nostril */}
      <circle cx="76" cy="48" r="2" fill="#365314" />
      {/* Sharp Teeth Jaw */}
      <path d="M42 58 L78 58" stroke="#18181B" strokeWidth="2" strokeLinecap="round" />
      <polygon points="48,58 51,58 49.5,62" fill="#FFF" />
      <polygon points="56,58 59,58 57.5,62" fill="#FFF" />
      <polygon points="64,58 67,58 65.5,62" fill="#FFF" />
      <polygon points="72,58 75,58 73.5,62" fill="#FFF" />
      {/* Tiny Racket held in tiny green arm */}
      <circle cx="22" cy="74" r="9" stroke="#EAB308" strokeWidth="2" fill="none" strokeDasharray="2 1" />
      <line x1="28" y1="76" x2="42" y2="70" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
      <circle cx="42" cy="70" r="3.5" fill="#4D7C0F" />
    </svg>
  );
}

// 10. Feather Fury (Crazy Intense Rooster at Match Point)
function FeatherFurySvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="roosterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#roosterGlow)" />
      {/* Red Comb */}
      <path d="M40 22 C34 14 42 8 48 16 C52 10 60 12 60 20 C66 16 74 20 70 28 Z" fill="#DC2626" />
      {/* Head */}
      <ellipse cx="50" cy="52" rx="26" ry="24" fill="#FFFFFF" />
      {/* Crazy Wide Eyes */}
      <circle cx="39" cy="46" r="7.5" fill="#FEF08A" stroke="#18181B" strokeWidth="2" />
      <circle cx="39" cy="46" r="3.5" fill="#DC2626" />
      <circle cx="39" cy="46" r="1.5" fill="#18181B" />
      <circle cx="61" cy="46" r="7.5" fill="#FEF08A" stroke="#18181B" strokeWidth="2" />
      <circle cx="61" cy="46" r="3.5" fill="#DC2626" />
      <circle cx="61" cy="46" r="1.5" fill="#18181B" />
      {/* Screaming Orange Beak */}
      <polygon points="50,48 38,58 62,58" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <polygon points="50,66 42,58 58,58" fill="#D97706" />
      {/* Wattle */}
      <path d="M46 66 C42 74 54 78 50 84 C46 76 44 70 46 66 Z" fill="#DC2626" />
      {/* Headband */}
      <rect x="25" y="36" width="50" height="7" rx="3" fill="#2563EB" />
      <circle cx="50" cy="39.5" r="2" fill="#FFF" />
    </svg>
  );
}

// 11. Pizza Slicer (Pepperoni Pizza Slice Diving for a Drop Shot)
function PizzaSlicerSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="pizzaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#C2410C" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#pizzaGlow)" />
      {/* Crust */}
      <path d="M20 30 Q50 18 80 30 L76 36 Q50 25 24 36 Z" fill="#D97706" />
      {/* Pizza Slice Body */}
      <polygon points="22,34 78,34 50,86" fill="#FACC15" />
      {/* Tomato Sauce Edge */}
      <polygon points="24,35 76,35 50,84" fill="#EF4444" opacity="0.3" />
      {/* Sweatband */}
      <rect x="30" y="40" width="40" height="7" rx="2" fill="#2563EB" />
      {/* Pepperoni Slices */}
      <circle cx="40" cy="62" r="5" fill="#B91C1C" />
      <circle cx="60" cy="62" r="5" fill="#B91C1C" />
      <circle cx="50" cy="74" r="4" fill="#B91C1C" />
      {/* Cool Winking Eyes */}
      <circle cx="42" cy="51" r="4" fill="#18181B" />
      <circle cx="43" cy="50" r="1.5" fill="#FFF" />
      <path d="M56 52 Q60 48 64 52" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Big Smirk */}
      <path d="M45 57 Q50 62 55 57" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// 12. Ghost Drop (Glowing Phantom Phasing Through The Net)
function GhostDropSvg({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="ghostGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#3B0764" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ghostGlow)" />
      {/* Net pattern in background */}
      <line x1="10" y1="50" x2="90" y2="50" stroke="#E9D5FF" strokeWidth="1.5" opacity="0.4" />
      <line x1="10" y1="62" x2="90" y2="62" stroke="#E9D5FF" strokeWidth="1.5" opacity="0.4" />
      <line x1="30" y1="45" x2="30" y2="70" stroke="#E9D5FF" strokeWidth="1.5" opacity="0.4" />
      <line x1="50" y1="45" x2="50" y2="70" stroke="#E9D5FF" strokeWidth="1.5" opacity="0.4" />
      <line x1="70" y1="45" x2="70" y2="70" stroke="#E9D5FF" strokeWidth="1.5" opacity="0.4" />
      {/* Ghost Body */}
      <path d="M50 22 C34 22 26 34 26 52 C26 70 30 84 36 82 C42 80 44 84 50 82 C56 80 58 84 64 82 C70 84 74 70 74 52 C74 34 66 22 50 22 Z" fill="#F5F3FF" />
      {/* Backwards Sports Cap */}
      <ellipse cx="50" cy="28" rx="20" ry="8" fill="#EC4899" />
      <path d="M50 26 C42 26 38 22 42 20 C48 18 56 18 58 20 C62 22 58 26 50 26 Z" fill="#BE185D" />
      {/* Mischievous Glowing Eyes */}
      <ellipse cx="42" cy="46" rx="4" ry="6" fill="#7E22CE" />
      <circle cx="43" cy="44" r="1.5" fill="#FFF" />
      <ellipse cx="58" cy="46" rx="4" ry="6" fill="#7E22CE" />
      <circle cx="59" cy="44" r="1.5" fill="#FFF" />
      {/* Tongue out cheeky smile */}
      <path d="M44 56 Q50 63 56 56" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M48 59 Q50 65 52 59 Z" fill="#F43F5E" />
    </svg>
  );
}

// Full catalogue of 12 crazy sports sticker avatars
export const STICKER_AVATARS: StickerAvatar[] = [
  {
    id: "smash-beast",
    name: "Smash Beast",
    trait: "Power Smasher",
    tagline: "Crushes 400 km/h jump smashes with pure tiger fury",
    bgGradient: "from-amber-500 via-orange-600 to-red-600",
    borderColor: "border-amber-400/40",
    accentColor: "#FF8F00",
    emoji: "🐯",
    SvgComponent: SmashBeastSvg,
  },
  {
    id: "court-ninja",
    name: "Court Ninja",
    trait: "Stealth Shuttler",
    tagline: "Disappears in the shadow, lands net kills without a sound",
    bgGradient: "from-indigo-600 via-purple-700 to-zinc-950",
    borderColor: "border-indigo-400/40",
    accentColor: "#7C3AED",
    emoji: "🥷",
    SvgComponent: CourtNinjaSvg,
  },
  {
    id: "rocket-birdie",
    name: "Rocket Birdie",
    trait: "Supersonic Shuttle",
    tagline: "Propelled by twin jet thrusters and zero fear",
    bgGradient: "from-yellow-400 via-orange-500 to-red-500",
    borderColor: "border-yellow-400/40",
    accentColor: "#F59E0B",
    emoji: "🚀",
    SvgComponent: RocketBirdieSvg,
  },
  {
    id: "smash-monarch",
    name: "Smash Monarch",
    trait: "Court Royalty",
    tagline: "King of Indiranagar courts with a golden crown",
    bgGradient: "from-yellow-300 via-amber-500 to-amber-700",
    borderColor: "border-yellow-300/40",
    accentColor: "#FACC15",
    emoji: "👑",
    SvgComponent: SmashMonarchSvg,
  },
  {
    id: "panda-power",
    name: "Panda Smasher",
    trait: "Martial Arts Ace",
    tagline: "Chubby, cheerful, and hits insane backhand cross-courts",
    bgGradient: "from-emerald-400 via-teal-600 to-emerald-900",
    borderColor: "border-emerald-400/40",
    accentColor: "#10B981",
    emoji: "🐼",
    SvgComponent: PandaSmasherSvg,
  },
  {
    id: "thunder-bolt",
    name: "Thunder Bolt",
    trait: "Electric Anime",
    tagline: "Spiky anime hair crackling with 10,000 volts on match point",
    bgGradient: "from-sky-400 via-blue-600 to-indigo-900",
    borderColor: "border-sky-400/40",
    accentColor: "#0284C7",
    emoji: "⚡",
    SvgComponent: ThunderBoltSvg,
  },
  {
    id: "avo-smash",
    name: "Avo-Smash",
    trait: "Pure Energy",
    tagline: "Hyperactive superfood with sweatbands diving for line calls",
    bgGradient: "from-lime-400 via-green-600 to-emerald-800",
    borderColor: "border-lime-400/40",
    accentColor: "#84CC16",
    emoji: "🥑",
    SvgComponent: AvoSmashSvg,
  },
  {
    id: "cyber-shuttle",
    name: "Cyber Birdie",
    trait: "Futuristic Bot",
    tagline: "Titanium shuttlecock with laser trajectory tracking",
    bgGradient: "from-cyan-400 via-blue-700 to-slate-900",
    borderColor: "border-cyan-400/40",
    accentColor: "#06B6D4",
    emoji: "🤖",
    SvgComponent: CyberBirdSvg,
  },
  {
    id: "dino-smasher",
    name: "T-Rex Smasher",
    trait: "Prehistoric Power",
    tagline: "Arms may be tiny, but the smashes rattle the stadium roof",
    bgGradient: "from-lime-500 via-yellow-600 to-lime-800",
    borderColor: "border-lime-500/40",
    accentColor: "#65A30D",
    emoji: "🦖",
    SvgComponent: DinoSmasherSvg,
  },
  {
    id: "rooster-fury",
    name: "Feather Fury",
    trait: "Match Point Screamer",
    tagline: "Zero chill, intense stare down across the net",
    bgGradient: "from-orange-500 via-red-600 to-amber-900",
    borderColor: "border-orange-500/40",
    accentColor: "#EA580C",
    emoji: "🐓",
    SvgComponent: FeatherFurySvg,
  },
  {
    id: "pizza-ace",
    name: "Pizza Slicer",
    trait: "Drop Shot Maestro",
    tagline: "Slices the birdie like fresh mozzarella over the net tape",
    bgGradient: "from-yellow-400 via-orange-500 to-red-600",
    borderColor: "border-yellow-400/40",
    accentColor: "#FBBF24",
    emoji: "🍕",
    SvgComponent: PizzaSlicerSvg,
  },
  {
    id: "ghost-drop",
    name: "Ghost Shuttler",
    trait: "Phantom Drop",
    tagline: "Phases through the net cord and giggles as it drops",
    bgGradient: "from-purple-400 via-fuchsia-600 to-purple-950",
    borderColor: "border-purple-400/40",
    accentColor: "#A855F7",
    emoji: "👻",
    SvgComponent: GhostDropSvg,
  },
];

// Helper to look up sticker by ID (e.g. "smash-beast" or "sticker:smash-beast")
export function getStickerById(id: string): StickerAvatar | undefined {
  const cleanId = id.replace(/^sticker:/, "").trim().toLowerCase();
  return STICKER_AVATARS.find((s) => s.id === cleanId);
}

// Deterministic sticker for any player name so NO player ever gets a dull initials circle!
export function getStickerForName(name: string): StickerAvatar {
  if (!name) return STICKER_AVATARS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % STICKER_AVATARS.length;
  return STICKER_AVATARS[index];
}

// Random sticker for the "Surprise Me" / "Roll Sticker" button
export function getRandomSticker(): StickerAvatar {
  const index = Math.floor(Math.random() * STICKER_AVATARS.length);
  return STICKER_AVATARS[index];
}
