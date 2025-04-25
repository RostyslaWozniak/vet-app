import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { VetNav } from "./_components/vet-nav";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default async function VetLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user.roles.includes("VET")) return notFound();

  return (
    <MaxWidthWrapper className="relative flex min-h-[calc(100vh-200px)] w-full max-w-[1600px] flex-grow flex-col justify-between xl:flex-row">
      <VetNav />
      <div className="relative mt-8 flex-grow">{children}</div>
    </MaxWidthWrapper>
  );
}
