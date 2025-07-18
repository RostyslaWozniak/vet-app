"use client";

import type { FullUser } from "@/auth/current-user";
import type { $Enums } from "@prisma/client";
import { createContext, useContext, useState } from "react";

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
};

const SessionContext = createContext<SessionContextType | null>(null);

type SessionProviderProps = {
  children: React.ReactNode;
  user: FullUser | null;
};

export const SessionProvider = ({
  children,
  user: currentUser,
}: SessionProviderProps) => {
  const [user, setUser] = useState<FullUser | null>(currentUser);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
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
