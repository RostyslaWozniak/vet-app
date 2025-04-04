import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

export default async function VetLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser({ redirectIfNotFound: true });

  if (!user.roles.includes("ADMIN") && !user.roles.includes("VET"))
    return notFound();

  return <main className="container mx-auto my-6">{children}</main>;
}
