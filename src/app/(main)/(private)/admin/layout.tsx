import { getCurrentUser } from "@/auth/current-user";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { AdminNav } from "./_components/admin-nav";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
  });

  if (!user.roles.includes("ADMIN")) return notFound();

  return (
    <MaxWidthWrapper className="relative my-8 flex min-h-[calc(100vh-200px)] w-full max-w-[1600px] flex-grow flex-col justify-between xl:flex-row">
      <AdminNav />
      <div className="relative grow">{children}</div>
    </MaxWidthWrapper>
  );
}
