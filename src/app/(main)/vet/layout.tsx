import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { VetNav } from "./_components/vet-nav";
import { Header } from "@/components/header";

export default async function VetLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user.roles.includes("ADMIN") && !user.roles.includes("VET"))
    return notFound();

  return (
    <main className="w-screen">
      <Header />
      <div className="relative container mx-auto my-6 flex min-h-[calc(100vh-200px)] w-full flex-grow justify-between">
        <VetNav />
        <div className="relative grow">{children}</div>
      </div>
    </main>
  );
}
