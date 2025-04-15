import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
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
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="my-4 min-h-[40rem] flex-grow lg:my-20">
        <MaxWidthWrapper className="max-w-[1000px]">
          <ProfileHeader user={user} />
          <div className="relative mt-8 min-h-60">{children}</div>
        </MaxWidthWrapper>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
}
