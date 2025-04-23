import { type ReactNode } from "react";
import ProfileHeader from "./_components/profile-header";
import { getCurrentUser } from "@/auth/current-user";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SessionProvider } from "../../../session-provider";
import { notFound } from "next/navigation";
import { LinkButton } from "@/components/link-button";
import { CalendarSearch, History, Plus, User } from "lucide-react";

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
      <MaxWidthWrapper className="max-w-[1000px]">
        <ProfileHeader user={user} />
        <nav className="scrollbar-hide -mx-2.5 mt-6 flex gap-x-2 overflow-scroll px-2.5">
          <LinkButton variant="outline" href="/profile">
            <User /> Mój profil
          </LinkButton>
          <LinkButton variant="outline" href="/profile/appointments/history">
            <History /> Historia wizyt
          </LinkButton>
          <LinkButton variant="outline" href="/appointments/new">
            <Plus className="text-primary-foreground bg-primary min-h-5 min-w-5 rounded-full stroke-4 p-0.5" />{" "}
            Nowa wizyta
          </LinkButton>
          <LinkButton variant="outline" href="/profile/appointments">
            <CalendarSearch /> Wszystkie wizyty
          </LinkButton>
        </nav>
        <div className="relative mt-6 mb-14 min-h-60">{children}</div>
      </MaxWidthWrapper>
    </SessionProvider>
  );
}
