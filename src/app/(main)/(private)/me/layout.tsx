import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
