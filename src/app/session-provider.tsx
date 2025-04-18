"use client";

import type { FullUser } from "@/auth/current-user";
import { createContext, useContext } from "react";

type SessionContextType = {
  user: FullUser;
};

const SessionContext = createContext<SessionContextType | null>(null);

type SessionProviderProps = {
  children: React.ReactNode;
  user: FullUser;
};

export const SessionProvider = ({ children, user }: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={{ user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (context === null) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
