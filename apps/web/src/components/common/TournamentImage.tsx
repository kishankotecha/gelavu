"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { PosterArt } from "@/components/common/PosterArt";
import type { PosterTheme } from "@/types/tournament";

interface Props {
  src?: string;
  alt?: string;
  theme: PosterTheme;
  sizes: string;
  className?: string;
  priority?: boolean;
  children?: ReactNode;
}

export function TournamentImage({ src, alt = "", theme, sizes, className = "", priority, children }: Props) {
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(src) && !failed;

  return (
    <PosterArt theme={theme} className={className}>
      {showPhoto && (
        <>
          <Image
            src={src as string}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            onError={() => setFailed(true)}
            className="-z-10 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/75 via-ink/10 to-ink/35" />
        </>
      )}
      {children}
    </PosterArt>
  );
}
