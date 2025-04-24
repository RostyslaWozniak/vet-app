import { type ReactNode } from "react";
import ProfileHeader from "./_components/profile-header";
import { getCurrentUser } from "@/auth/current-user";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SessionProvider } from "../../../session-provider";
import { notFound } from "next/navigation";
import { ProfileNav } from "./_components/profile-nav";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  });

  if (!user.roles.includes("CLIENT") && !user.roles.includes("ADMIN"))
    return notFound();

  return (
    <SessionProvider user={user}>
      <MaxWidthWrapper className="max-w-[800px]">
        <ProfileHeader user={user} />
        <ProfileNav />
        <div className="relative mt-6 mb-14 min-h-60">{children}</div>
      </MaxWidthWrapper>
    </SessionProvider>
  );
}
