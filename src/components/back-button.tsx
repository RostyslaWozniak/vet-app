"use client";

import { useRouter } from "next/navigation";
import { Button, type ButtonProps } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps extends ButtonProps {
  children?: React.ReactNode;
  className?: string;
}
export function BackButton({ children, className, ...props }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="link"
      size="sm"
      className={cn("", className)}
      {...props}
    >
      {children ?? (
        <>
          <ArrowLeft />
          Powrót
        </>
      )}
    </Button>
  );
}
