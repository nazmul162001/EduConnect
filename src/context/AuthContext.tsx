"use client";
import { loadFromStorage, saveToStorage, storageKeys } from "@/lib/storage";
import { UserProfile } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithSocial: (provider: "github" | "facebook" | "x") => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const existing = loadFromStorage<UserProfile | null>(
      storageKeys.user,
      null
    );
    setUser(existing);
    setLoading(false);
  }, []);

  const simulateNetwork = (ms = 600) =>
    new Promise((res) => setTimeout(res, ms));

  const login = async (email: string, _password: string) => {
    await simulateNetwork();
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: email.split("@")[0] ?? "User",
      email,
      avatarUrl: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(
        email
      )}`,
    };
    setUser(profile);
    saveToStorage(storageKeys.user, profile);
  };

  const register = async (name: string, email: string, _password: string) => {
    await simulateNetwork();
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name,
      email,
      avatarUrl: `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(
        name
      )}`,
    };
    setUser(profile);
    saveToStorage(storageKeys.user, profile);
  };

  const loginWithGoogle = async () => {
    await simulateNetwork();
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: "Google User",
      email: "google.user@example.com",
      avatarUrl: `https://api.dicebear.com/9.x/bottts/svg?seed=GoogleUser`,
    };
    setUser(profile);
    saveToStorage(storageKeys.user, profile);
  };

  const loginWithSocial = async (provider: "github" | "facebook" | "x") => {
    await simulateNetwork();
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: `${provider.toUpperCase()} User`,
      email: `${provider}.user@example.com`,
      avatarUrl: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(
        provider
      )}`,
    } as UserProfile;
    setUser(profile);
    saveToStorage(storageKeys.user, profile);
  };

  const logout = () => {
    setUser(null);
    saveToStorage(storageKeys.user, null);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...data };
      saveToStorage(storageKeys.user, next);
      return next;
    });
  };

  const resetPassword = async (_email: string) => {
    await simulateNetwork(800);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      login,
      register,
      loginWithGoogle,
      loginWithSocial,
      logout,
      updateProfile,
      resetPassword,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
