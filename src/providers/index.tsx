"use client";

import { SessionProvider } from "@/app/session-provider";
import { api } from "@/trpc/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = api.public.user.getCurrentUser.useQuery();
  return (
    <SessionProvider user={user} isUserLoading={isLoading}>
      {children}
    </SessionProvider>
  );
}
