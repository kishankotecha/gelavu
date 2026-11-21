"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface Props {
  title: string;
  text: string;
  path: string;
  variant?: "icon" | "pill";
  tone?: "light" | "dark";
}

export function ShareButton({ title, text, path, variant = "icon", tone = "light" }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the person closed the share sheet: nothing to do */
    }
  };

  const Icon = copied ? Check : Share2;
  const colors =
    tone === "light"
      ? "bg-white/20 text-white backdrop-blur hover:bg-white/30 focus-visible:ring-white"
      : "border border-line text-ink hover:bg-paper focus-visible:ring-ink/40";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={share}
        className={`relative z-10 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
          tone === "light" ? "border border-white/25 text-white hover:bg-white/10 focus-visible:ring-white" : colors
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Link copied" : `Share ${title}`}
      className={`relative z-10 grid h-9 w-9 place-items-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${colors}`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
