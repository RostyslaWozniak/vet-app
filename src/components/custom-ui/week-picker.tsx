"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type WeekPickerProps = {
  children: ReactNode;
  isCurrentWeek: boolean;
  navigateToNextWeek: () => void;
  navigateToPreviousWeek: () => void;
  navigateToToday: () => void;
};

export default function WeekPicker({
  children,
  isCurrentWeek,
  navigateToNextWeek,
  navigateToPreviousWeek,
  navigateToToday,
}: WeekPickerProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant={isCurrentWeek ? "default" : "outline"}
        size="sm"
        onClick={navigateToToday}
      >
        Dzisiaj
      </Button>
      <div className="flex flex-grow items-center justify-center gap-2">
        <Button variant="ghost" size="icon" onClick={navigateToPreviousWeek}>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          className={cn("min-w-20 text-center font-medium", {
            "text-primary": isCurrentWeek,
          })}
        >
          {children}
        </div>

        <Button variant="ghost" size="icon" onClick={navigateToNextWeek}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
