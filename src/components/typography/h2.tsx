import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function H2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-philosopher text-foreground text-center text-4xl font-bold md:text-center lg:text-5xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
