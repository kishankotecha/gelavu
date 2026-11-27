import React from "react";
import Link from "next/link";

export interface GelavuLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg" | "xl";
  badge?: "HOST" | "ADMIN" | "UMPIRE";
  href?: string;
  className?: string;
  logoClassName?: string;
}

const SIZES = {
  sm: "h-7 w-24 sm:h-8 sm:w-28",
  md: "h-8 w-28 sm:h-9 sm:w-32",
  lg: "h-9 w-32 sm:h-10 sm:w-36",
  xl: "h-11 w-40 sm:h-12 sm:w-44",
};

const BADGE_STYLES: Record<string, string> = {
  HOST: "bg-[#14212D] text-white/80 border-white/10",
  ADMIN: "bg-rose-950/60 text-rose-300 border-rose-800/80",
  UMPIRE: "bg-emerald-950/60 text-lime border-emerald-800/80",
};

export function GelavuLogo({
  variant = "light",
  size = "md",
  badge,
  href = "/",
  className = "",
  logoClassName = "",
}: GelavuLogoProps) {
  const isDark = variant === "dark";
  const letterColor = isDark ? "#FFFFFF" : "#14212D";

  const logoSvg = (
    <div className={`relative flex items-center gap-2.5 shrink-0 ${className}`}>
      <div className={`relative ${SIZES[size]} ${logoClassName}`}>
        <svg
          viewBox="20 54 914 271"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full object-contain"
          aria-label="Gelavu"
        >
          {/* Letters G, E, L, A, U in exact brand path geometry */}
          <path
            fill={letterColor}
            d="M617.77,312.24l-38.01.81-9.77-41.53-67.49-.65-10.24,41.95-159.16.03.21-188.34,37.72-.94.08,156.65,92.12-.11,40.97-156.08,63.88-.2L617.77,312.24ZM561.32,238.51c-9.06-35.45-14.37-61.93-25.85-94.52l-24.84,94.65L561.32,238.51Z"
          />
          <path
            fill={letterColor}
            d="M141.88,246.98l-44.23-.73.03-30.48h79.99s.06,96.99.06,96.99l-32.7.22-3.19-17.35c-10.57,17.63-27.65,22.38-47.6,21.27-33.58-1.86-62.46-25.74-65.27-61.14-1.99-25.04-1.51-50.88-.15-76.39,1.15-21.75,15.14-40.1,34.42-50.05,24.6-12.69,55.26-12.99,80.09-1.17,24.08,11.46,36.7,34.64,34.14,61.56h-35.22c-.53-9.58-3.2-21.31-9.59-27.89-11.31-11.64-37.69-15.25-54.9.41-6.34,5.76-13.35,15.49-13.6,24.47-1.32,48.82-6.99,95.6,36.66,98.15,10.97.64,22.72-1.14,29.88-7.24C138.41,271.03,142.73,258.72,141.88,246.98Z"
          />
          <polygon
            fill={letterColor}
            points="312.79 233.47 233.78 233.55 233.67 280.22 322.09 280.25 322.27 312.83 197.4 312.87 197.47 123.72 319.31 123.71 319.45 156.37 233.58 156.31 233.82 201.21 313 201.23 312.79 233.47"
          />
          <path
            fill={letterColor}
            d="M926.88,123.74l-.28,130.9c-.05,24.71-14.1,44.5-36.46,54.56-21.47,9.65-46.45,10-69.22,2.43-24.38-8.1-41.98-30.68-42.11-57.02l-.49-98.65c16.1-5.88,25.91-17.51,30.24-31.85l5.9-.1-.15,124.34c-.03,23.37,16.55,37.42,39.9,36.7,19.43-.59,36.29-12.65,36.28-33.56l-.04-127.69L926.88,123.74Z"
          />
          {/* Signature Red V Accent */}
          <path
            fill="#c02034"
            d="M727.73,147.04c11.03,6.96,20.28,10.59,33.56,12.95l-38.9,152.62-62.07.11-48.17-189.28,37.45.38,41.7,165.27L727.73,147.04Z"
          />
          {/* Signature Gold Crown Circle with White Stroke */}
          <circle
            cx="761.29"
            cy="109.53"
            r="44.78"
            fill="#f9c433"
            stroke="#ffffff"
            strokeWidth="10.13"
          />
        </svg>
      </div>

      {badge && (
        <span
          className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider border shadow-2xs ${
            BADGE_STYLES[badge] || "bg-navy text-white/80 border-white/10"
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center outline-none">
        {logoSvg}
      </Link>
    );
  }

  return logoSvg;
}
