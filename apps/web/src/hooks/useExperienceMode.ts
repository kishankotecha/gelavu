"use client";

import { useEffect, useState } from "react";

type ExperienceMode = "play" | "host";

let globalMode: ExperienceMode = "play";
const listeners = new Set<(mode: ExperienceMode) => void>();

export function useExperienceMode() {
  const [mode, setModeState] = useState<ExperienceMode>(globalMode);

  useEffect(() => {
    const handleChange = (m: ExperienceMode) => setModeState(m);
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const setMode = (newMode: ExperienceMode) => {
    globalMode = newMode;
    listeners.forEach((listener) => listener(newMode));
  };

  return { mode, setMode };
}
