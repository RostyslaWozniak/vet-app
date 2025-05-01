"use client";

import { DialogWrapper } from "@/components/dialog-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar1Icon, CalendarDaysIcon } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

const yearsList = Array.from({ length: 26 }, (_, index) => index);
const monthsList = Array.from({ length: 11 }, (_, index) => 1 + index);

type PetAgeSelectionProps = {
  field: ControllerRenderProps<
    {
      name: string;
      species: string;
      breed?: string | undefined;
      age?: string | undefined;
    },
    "age"
  >;
};

export function PetAgeSelection({ field }: PetAgeSelectionProps) {
  const defaultYears = field.value
    ? parseInt(field.value.split(".")[0]!)
    : null;
  const defaultMonths = field.value
    ? parseInt(field.value.split(".")[1]!)
    : null;

  const [selectedYear, setSelectedYear] = useState<number | null>(defaultYears);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    defaultMonths,
  );

  const [isYearsDialogOpen, setIsYearsDialogOpen] = useState(false);
  const [isMonthDialogOpen, setIsMonthDialogOpen] = useState(false);

  function handleSelectYear(year: number) {
    setSelectedYear(year);
    setIsYearsDialogOpen(false);
    setIsMonthDialogOpen(true);
  }

  function hadleSelectMonth(month: number) {
    setSelectedMonth(month);
    setIsMonthDialogOpen(false);
    field.onChange(`${selectedYear}.${month}`);
  }

  return (
    <>
      <DialogWrapper
        title="Wybierz ile lat ma twój zwierzak"
        isOpen={isYearsDialogOpen}
        setIsOpen={setIsYearsDialogOpen}
      >
        <div className="grid grid-cols-5 gap-4">
          {yearsList.map((year, i) => {
            const isLastElement = i === yearsList.length - 1;
            return (
              <Button
                key={year}
                value={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => handleSelectYear(year)}
                className={cn({
                  "col-span-5": isLastElement,
                })}
              >
                {isLastElement ? `${year} i więcej` : year}
              </Button>
            );
          })}
        </div>
      </DialogWrapper>
      <DialogWrapper
        title="Wybierz miesięcy ma twój zwierzak"
        isOpen={isMonthDialogOpen}
        setIsOpen={setIsMonthDialogOpen}
      >
        <div className="grid grid-cols-5 gap-4">
          {monthsList.map((month) => (
            <Button
              key={month}
              value={month}
              variant={selectedMonth === month ? "default" : "outline"}
              onClick={() => hadleSelectMonth(month)}
            >
              {month}
            </Button>
          ))}
        </div>
      </DialogWrapper>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          className="text-muted-foreground border-foreground flex justify-between"
          onClick={() => setIsYearsDialogOpen(true)}
        >
          {selectedYear == null ? "Ile ma lat" : formatYearsPL(selectedYear)}
          <Calendar1Icon className="ml-auto h-4 w-4 opacity-60" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="text-muted-foreground border-foreground flex justify-between"
          onClick={() => setIsMonthDialogOpen(true)}
        >
          {selectedMonth == null
            ? "Ile ma miesięcy"
            : formatMonthsPL(selectedMonth)}
          <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-60" />
        </Button>
      </div>
    </>
  );
}

function formatYearsPL(years: number) {
  const lastDigit = years % 10;
  const lastTwoDigits = years % 100;

  if (years === 1) {
    return `${years} rok`;
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return `${years} lata`;
  } else {
    return `${years} lat`;
  }
}

function formatMonthsPL(months: number) {
  const lastDigit = months % 10;
  const lastTwoDigits = months % 100;

  if (months === 1) {
    return `${months} miesiąc`;
  } else if (
    [2, 3, 4].includes(lastDigit) &&
    ![12, 13, 14].includes(lastTwoDigits)
  ) {
    return `${months} miesiące`;
  } else {
    return `${months} miesięcy`;
  }
}
