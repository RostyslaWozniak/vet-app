import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { VetNav } from "./_components/vet-nav";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SessionProvider } from "../../session-provider";

export default async function VetLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  });

  if (!user.roles.includes("ADMIN") && !user.roles.includes("VET"))
    return notFound();

  return (
    <SessionProvider user={user}>
      <MaxWidthWrapper className="relative -my-8 flex min-h-[calc(100vh-200px)] w-full flex-grow justify-between">
        <VetNav />
        <div className="relative grow">{children}</div>
      </MaxWidthWrapper>
    </SessionProvider>
  );
}
