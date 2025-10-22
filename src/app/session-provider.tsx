"use client";

import type { FullUser } from "@/auth/current-user";
import type { $Enums } from "@prisma/client";
import { createContext, useContext, useEffect, useState } from "react";

type SessionContextType = {
  user: FullUser | null;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      email: string;
      phoneNumber: string | null;
      roles: $Enums.Roles[];
      photo: string | null;
    } | null>
  >;
  isUserLoading: boolean;
};

const SessionContext = createContext<SessionContextType | null>(null);

type SessionProviderProps = {
  children: React.ReactNode;
  user: FullUser | null | undefined;
  isUserLoading: boolean;
};

export const SessionProvider = ({
  children,
  user: currentUser,
  isUserLoading,
}: SessionProviderProps) => {
  const [user, setUser] = useState<FullUser | null>(null);

  useEffect(() => {
    if (!isUserLoading && currentUser) {
      setUser(currentUser);
      console.log(currentUser);
    }
  }, [currentUser, isUserLoading]);
  return (
    <SessionContext.Provider value={{ user, setUser, isUserLoading }}>
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
