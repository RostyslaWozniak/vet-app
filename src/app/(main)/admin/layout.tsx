import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdminNav } from "./_components/admin-nav";
import { Header } from "@/components/header";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user.roles.includes("ADMIN")) return notFound();

  return (
    <main>
      <Header />
      <div className="relative container mx-auto my-6 flex min-h-[calc(100vh-200px)] w-full flex-grow justify-between">
        <AdminNav />
        <div className="relative grow">{children}</div>
      </div>
    </main>
  );
}
