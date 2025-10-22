import { Breadcrumb } from "@/components/custom-ui/breadcrumb";
import { Footer } from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { MobileNav } from "@/components/mobile-nav";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="my-4 min-h-[40rem] flex-grow lg:my-12">
        <MaxWidthWrapper className="mb-8">
          <Breadcrumb />
        </MaxWidthWrapper>
        {children}
      </main>
      <MobileNav />
      <Footer />
    </>
  );
}
