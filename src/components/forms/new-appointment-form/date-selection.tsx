"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { isSameDay } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
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
  validTimes: Date[] | undefined;
  isOpen: boolean;
  isGettingValidTimes: boolean;
  isUser: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTimeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCalendarMonthChange: (month: number, year: number) => void;
};

export function DateSelection({
  field,
  validTimes,
  isOpen,
  isGettingValidTimes,
  isUser,
  setIsOpen,
  setIsTimeDialogOpen,
  handleCalendarMonthChange,
}: DateSelectionProps) {
  function handleSelectDate(value: Date | undefined) {
    if (!value) return field.onChange(value);
    field.onChange(value);
    setIsOpen(false);
    setIsTimeDialogOpen(true);
  }

  const currentDate = new Date();

  const currentTimeInMs = currentDate.getTime();

  const maxTimeInMs = currentTimeInMs + 14 * 24 * 60 * 60 * 1000; // 14 days in ms

  return (
    <>
      <DialogWrapper
        title="Data"
        description="Wybierz datę"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="relative overflow-hidden"
      >
        {isGettingValidTimes && (
          <div className="absolute inset-0 z-[999] flex items-center justify-center bg-white/70">
            <Loader className="animate-spin" />
          </div>
        )}
        <Calendar
          onMonthChange={(e) =>
            handleCalendarMonthChange(e.getMonth(), e.getFullYear())
          }
          defaultMonth={field.value}
          className="sm:mx-auto"
          mode="single"
          selected={field.value}
          onSelect={(e) => handleSelectDate(e)}
          disabled={(date: string | number | Date) =>
            !validTimes?.some((time) => isSameDay(date, time))
          }
          fromMonth={new Date()}
          fromDate={new Date()}
          toDate={isUser ? undefined : new Date(maxTimeInMs)}
          initialFocus
        />
      </DialogWrapper>
      <Button
        onClick={() => {
          setIsOpen(true);
          handleCalendarMonthChange(
            field.value?.getMonth() ?? new Date().getMonth(),
            field.value?.getFullYear() ?? new Date().getFullYear(),
          );
        }}
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
