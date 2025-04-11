import { cn } from "@/lib/utils";

type PawsBgCardProps = {
  children: React.ReactNode;
  className?: string;
  bgPaws?: "bg-paws-white" | "bg-paws-primary";
  pawsOpacity?: number;
  childrenClassName?: string;
};

export function PawsBgCard({
  children,
  className,
  bgPaws = "bg-paws-white",
  pawsOpacity = 20,
  childrenClassName,
}: PawsBgCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-4 shadow lg:p-6",
        {
          "bg-primary": bgPaws === "bg-paws-white",
          "bg-background": bgPaws === "bg-paws-primary",
        },
        className,
      )}
    >
      <div
        className={cn(bgPaws, "absolute inset-0")}
        style={{ opacity: `${pawsOpacity}%` }}
      />
      <div className={cn("relative z-10", childrenClassName)}>{children}</div>
    </div>
  );
}
