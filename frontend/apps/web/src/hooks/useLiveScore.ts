"use client";

import { useState, useEffect } from "react";
import { Match } from "@/types";
import { liveSocket } from "@/lib/socket";
import { MOCK_BRACKET_MATCHES } from "@/data/mock-data";

export function useLiveScore(matchId: string, initialMatch?: Match | null) {
  const [match, setMatch] = useState<Match | null>(
    () => initialMatch || (matchId ? MOCK_BRACKET_MATCHES.find((m) => m.id === matchId) || MOCK_BRACKET_MATCHES[2] : null)
  );
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    liveSocket.connect();

    const unsubscribe = liveSocket.on<Match>(`score_update:${matchId}`, (updatedMatch) => {
      if (mounted) {
        setIsConnected(true);
        setMatch(updatedMatch);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [matchId]);

  return { match, isConnected, setMatch };
}
