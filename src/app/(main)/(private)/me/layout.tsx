import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="my-16 flex-grow lg:my-20">{children}</main>
      <MobileNav />
      <Footer />
    </div>
  );
}
