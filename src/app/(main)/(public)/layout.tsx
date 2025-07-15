import { SessionProvider } from "@/app/session-provider";
import { getCurrentUser } from "@/auth/current-user";
import { Breadcrumb } from "@/components/custom-ui/breadcrumb";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileNav } from "@/components/mobile-nav";
import type { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <SessionProvider user={user}>
      <Header />
      <main className="my-4 min-h-[40rem] flex-grow lg:my-12">
        <MaxWidthWrapper className="mb-8">
          <Breadcrumb />
        </MaxWidthWrapper>
        {children}
      </main>
      <MobileNav />
      <Footer />
    </SessionProvider>
  );
}
