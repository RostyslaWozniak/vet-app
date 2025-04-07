import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-foreground text-5xl font-bold tracking-tighter lg:text-6xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
