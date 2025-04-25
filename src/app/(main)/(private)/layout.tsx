import { getCurrentUser } from "@/auth/current-user";
import type { ReactNode } from "react";
import { SessionProvider } from "@/app/session-provider";
import { Header } from "@/components/header";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  });

  return (
    <SessionProvider user={user}>
      <div>
        <Header />
        {children}
      </div>
    </SessionProvider>
  );
}
