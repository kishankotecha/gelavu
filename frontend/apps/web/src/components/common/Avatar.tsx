import React from "react";
import { cn } from "@/lib/utils";
import { getStickerById, getStickerForName } from "@/data/stickers";

interface AvatarProps {
  name: string;
  url?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  showStickerBadge?: boolean;
}

export function Avatar({
  name,
  url,
  size = "md",
  className,
  showStickerBadge = false,
}: AvatarProps) {
  const sizeMap = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
    "2xl": "w-32 h-32 text-3xl",
  };

  // Case 1: Custom Photo URL (file upload, selfie data URL, or external link)
  const isSticker = url && url.startsWith("sticker:");
  const isPhoto = url && !isSticker;

  if (isPhoto) {
    return (
      <div
        className={cn(
          "relative rounded-full bg-cover bg-center border-2 border-white/20 shrink-0 shadow-md overflow-hidden ring-1 ring-black/40",
          sizeMap[size],
          className
        )}
        style={{ backgroundImage: `url(${url})` }}
        role="img"
        aria-label={name}
      />
    );
  }

  // Case 2: Selected Crazy Sticker
  const sticker = isSticker
    ? getStickerById(url)
    : getStickerForName(name);

  if (sticker) {
    const Svg = sticker.SvgComponent;
    return (
      <div
        className={cn(
          "relative rounded-full shrink-0 flex items-center justify-center select-none shadow-md overflow-hidden border-2 border-white/20 transition-transform",
          sizeMap[size],
          className
        )}
        title={`${name} (${sticker.name} - ${sticker.trait})`}
        role="img"
        aria-label={`${name} avatar`}
      >
        <Svg className="w-full h-full object-cover" />
        
        {showStickerBadge && (
          <span className="absolute -bottom-1 -right-1 text-xs select-none">
            {sticker.emoji}
          </span>
        )}
      </div>
    );
  }

  // Fallback to initials if all else fails
  const initials = name
    ? name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "AM";

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-tr from-amber-600 via-orange-600 to-red-600 text-white font-black flex items-center justify-center border-2 border-white/20 select-none shadow-md shrink-0",
        sizeMap[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
