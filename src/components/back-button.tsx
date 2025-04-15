"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
};

export function BackButton({ className }: BackButtonProps) {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      size="icon"
      className={cn("", className)}
    >
      <ArrowLeft />
    </Button>
  );
}
