import { H1 } from "@/components/typography";
import type { ReactNode } from "react";

export default function NewVisitLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative container mx-auto my-6 flex min-h-[calc(100vh-200px)] w-full flex-grow flex-col items-center px-2.5">
      <H1 className="pb-12">Nowa wizyta</H1>
      {children}
    </div>
  );
}
