"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { formatTimeString } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { ArrowLeft, Clock } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";

type TimeSelectionProps = {
  field: ControllerRenderProps<
    {
      startTime: Date;
      date: Date;
      guestEmail: string;
      guestName: string;
      guestNotes?: string | undefined;
    },
    "startTime"
  >;
  times: Date[] | undefined;
  disabled: boolean;
  isOpen: boolean;
  isPetChoosen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPetDialogOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

export function TimeSelection({
  field,
  times,
  disabled,
  isOpen,
  isPetChoosen,
  setIsOpen,
  setIsDateDialogOpen,
  setIsPetDialogOpen,
}: TimeSelectionProps) {
  return (
    <>
      <DialogWrapper
        title="Godzina"
        description="Wybierz wybierz godzinę"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Button
          variant="link"
          className="mb-3 w-min"
          onClick={() => {
            setIsOpen(false);
            setIsDateDialogOpen(true);
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wróć
        </Button>
        <div className="grid grid-cols-5 gap-2">
          {times?.map((time) => (
            <Button
              variant={
                time.getTime() === field.value?.getTime()
                  ? "default"
                  : "outline"
              }
              key={time?.toString()}
              value={time?.toString()}
              onClick={() => {
                field.onChange(time);
                setIsOpen(false);
                if (setIsPetDialogOpen && !isPetChoosen)
                  setIsPetDialogOpen(true);
              }}
            >
              {formatTimeString(time)}
            </Button>
          ))}
        </div>
      </DialogWrapper>
      <Button
        disabled={disabled}
        type="button"
        variant="outline"
        className={cn(
          "border-foreground flex w-full pl-3 text-left font-normal",
          disabled && "text-muted-foreground",
        )}
        onClick={() => setIsOpen(true)}
      >
        {field.value ? formatTimeString(field.value) : "Wybierz godzinę"}
        <Clock className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </>
  );
}
