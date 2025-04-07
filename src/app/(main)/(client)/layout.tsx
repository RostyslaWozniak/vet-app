import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
