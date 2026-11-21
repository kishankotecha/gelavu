"use client";

import { useSyncExternalStore } from "react";
import { Bookmark } from "lucide-react";

const KEY = "gelavu:saved";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("gelavu:saved", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("gelavu:saved", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function readSaved(): string[] {
  try {
    return JSON.parse(getSnapshot()) as string[];
  } catch {
    return [];
  }
}

export function BookmarkButton({ id, title }: { id: string; title: string }) {
  const storeValue = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  let saved = false;
  try {
    saved = (JSON.parse(storeValue) as string[]).includes(id);
  } catch {
    saved = false;
  }

  const toggle = () => {
    const current = readSaved();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("gelavu:saved"));
    } catch {
      /* storage unavailable (private mode) */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-white" : ""}`} aria-hidden="true" />
    </button>
  );
}
