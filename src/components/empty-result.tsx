import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export function EmptyResult({
  icon: Icon,
  title,
  description,
  actionButton,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionButton?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-muted/30 flex flex-col items-center justify-center rounded-lg border border-dashed px-4 pt-8 pb-4 sm:pt-14 sm:pb-8",
        className,
      )}
    >
      <Icon className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="mb-1 text-lg font-medium">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-md text-center text-sm">
          {description}
        </p>
      )}
      {actionButton}
    </div>
  );
}
