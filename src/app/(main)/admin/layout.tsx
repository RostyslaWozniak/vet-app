import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SidebarNav } from "./_componetns/sidebar-nav";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user.roles.includes("ADMIN")) return notFound();

  return (
    <main className="relative container mx-auto my-6 flex min-h-[calc(100vh-240px)] w-full flex-grow justify-between">
      <SidebarNav />
      <div className="relative grow px-10 py-16">{children}</div>
    </main>
  );
}
