"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@/types";
import { getStoredUser, setStoredUser, clearStoredUser } from "@/lib/auth";

type AuthListener = (user: User | null) => void;
const listeners = new Set<AuthListener>();

function notifyListeners(nextUser: User | null) {
  listeners.forEach((listener) => listener(nextUser));
}

export function useAuthStore() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isLoading] = useState(false);

  useEffect(() => {
    const handleSync: AuthListener = (nextUser) => setUser(nextUser);
    listeners.add(handleSync);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "gelavu_auth_user") {
        setUser(getStoredUser());
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      listeners.delete(handleSync);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const login = useCallback((newUser: User, token?: string, refreshToken?: string) => {
    setStoredUser(newUser);
    if (token) localStorage.setItem("gelavu_auth_token", token);
    if (refreshToken) localStorage.setItem("gelavu_refresh_token", refreshToken);
    notifyListeners(newUser);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    const current = getStoredUser();
    if (!current) return;
    const updated = { ...current, ...updates };
    setStoredUser(updated);
    notifyListeners(updated);
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    localStorage.removeItem("gelavu_auth_token");
    localStorage.removeItem("gelavu_refresh_token");
    notifyListeners(null);
  }, []);

  return { user, isLoading, login, updateUser, logout, isAuthenticated: !!user };
}
