"use client";

import { useState, useEffect } from "react";

export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export function useCountdown(targetDate: string | Date): CountdownResult {
  const [timeLeft, setTimeLeft] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculate = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculate();
    const timer = setInterval(calculate, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
