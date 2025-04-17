import { type ReactNode } from "react";
import ProfileHeader from "./_components/profile-header";
import { getCurrentUser } from "@/auth/current-user";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

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
    <MaxWidthWrapper className="max-w-[1000px]">
      <ProfileHeader user={user} />
      <div className="relative mt-8 min-h-60">{children}</div>
    </MaxWidthWrapper>
  );
}
