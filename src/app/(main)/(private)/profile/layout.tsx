import { type ReactNode } from "react";
import { ProfileHeader } from "./_components/profile-header";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProfileNav } from "./_components/profile-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Footer } from "@/components/footer";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <main className="my-4 min-h-[40rem] flex-grow lg:my-12">
        <MaxWidthWrapper className="max-w-[800px]">
          <ProfileHeader />
          <ProfileNav />
          <div className="relative mt-6 mb-14 min-h-100">{children}</div>
        </MaxWidthWrapper>
        <MobileNav />
      </main>
      <Footer />
    </>
  );
}
