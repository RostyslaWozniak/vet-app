import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps extends ButtonProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  external?: boolean;
}

export function LinkButton({
  href,
  className,
  children,
  external = false,
  ...props
}: LinkButtonProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Button asChild className={cn(className)} {...props}>
      <Link href={href} {...linkProps}>
        {children}
      </Link>
    </Button>
  );
}
