import { cn } from "@/lib/utils";

export function MaxWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[1500px] px-4", className)}>
      {children}
    </div>
  );
}
