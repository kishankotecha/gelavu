"use client";

import { useState } from "react";
import { User } from "@/types";
import { getStoredUser, setStoredUser, clearStoredUser } from "@/lib/auth";

export function useAuthStore() {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [isLoading] = useState(false);

  const login = (newUser: User, token?: string) => {
    setStoredUser(newUser);
    if (token) localStorage.setItem("gelavu_auth_token", token);
    setUser(newUser);
  };

  const logout = () => {
    clearStoredUser();
    localStorage.removeItem("gelavu_auth_token");
    setUser(null);
  };

  return { user, isLoading, login, logout, isAuthenticated: !!user };
}
