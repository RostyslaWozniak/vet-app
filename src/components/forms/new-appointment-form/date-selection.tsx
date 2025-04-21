"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";

type DateSelectionProps = {
  field: ControllerRenderProps<
    {
      startTime: Date;
      date: Date;
      guestEmail: string;
      guestName: string;
      guestNotes?: string | undefined;
    },
    "date"
  >;
  validTimes: Date[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DateSelection({
  field,
  validTimes,
  isOpen,
  setIsOpen,
  setIsTimeDialogOpen,
}: DateSelectionProps) {
  function handleSelectDate(value: Date | undefined) {
    if (!value) return field.onChange(value);
    field.onChange(value);
    setIsOpen(false);
    setIsTimeDialogOpen(true);
  }

  return (
    <>
      <DialogWrapper
        title="Data"
        description="Wybierz datę"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Calendar
          className="sm:mx-auto"
          mode="single"
          selected={field.value}
          onSelect={(e) => handleSelectDate(e)}
          disabled={(date: string | number | Date) =>
            !validTimes.some((time) => isSameDay(date, time))
          }
          initialFocus
        />
      </DialogWrapper>
      <Button
        onClick={() => setIsOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "border-foreground flex w-full pl-3 text-left font-normal",
          !field.value && "text-muted-foreground",
        )}
      >
        {field.value ? formatDate(field.value) : <span>Wybierz datę</span>}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </>
  );
}
