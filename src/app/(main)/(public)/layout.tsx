import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="my-4 flex-grow lg:my-20">{children}</main>
      <Footer />
    </div>
  );
}
