"use client";

import type { FullUser } from "@/auth/current-user";
import { createContext, useContext } from "react";

type PrivateSessionContextType = {
  user: FullUser;
};

const PrivateSessionContext = createContext<PrivateSessionContextType | null>(
  null,
);

type PrivateSessionProviderProps = {
  children: React.ReactNode;
  user: FullUser;
};

export const PrivateSessionProvider = ({
  children,
  user,
}: PrivateSessionProviderProps) => {
  return (
    <PrivateSessionContext.Provider value={{ user }}>
      {children}
    </PrivateSessionContext.Provider>
  );
};

export const usePrivateSession = () => {
  const context = useContext(PrivateSessionContext);

  if (context === null) {
    throw new Error(
      "usePrivateSession must be used within a PrivateSessionProvider",
    );
  }

  return context;
};
