import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="my-4 min-h-[40rem] flex-grow lg:my-12">{children}</main>
      <MobileNav />
      <Footer />
    </>
  );
}
