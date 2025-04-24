"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MONTH_NAMES = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

export default function MonthPicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get month and year from query params or use current date
  const getDateFromParams = () => {
    const monthParam = searchParams.get("month");
    const yearParam = searchParams.get("year");

    let month = currentDate.getMonth();
    let year = currentYear;

    if (monthParam) {
      const parsedMonth = Number.parseInt(monthParam);
      if (!isNaN(parsedMonth) && parsedMonth >= 0 && parsedMonth <= 11) {
        month = parsedMonth;
      }
    }

    if (yearParam) {
      const parsedYear = Number.parseInt(yearParam);
      if (!isNaN(parsedYear)) {
        year = parsedYear;
      }
    }

    return { month, year };
  };

  const { month, year } = getDateFromParams();

  // Navigate to previous month
  const goToPreviousMonth = () => {
    let newMonth = month - 1;
    let newYear = year;

    if (newMonth < 0) {
      newMonth = 11;
      newYear = year - 1;
    }

    updateDateParams(newMonth, newYear);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    let newMonth = month + 1;
    let newYear = year;

    if (newMonth > 11) {
      newMonth = 0;
      newYear = year + 1;
    }

    updateDateParams(newMonth, newYear);
  };

  // Update URL with new month and year parameters
  const updateDateParams = (month: number, year: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("month", month.toString());

    // Only include year in query params if it's not the current year
    if (year !== currentYear) {
      params.set("year", year.toString());
    } else {
      params.delete("year");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col-reverse items-center justify-center gap-2 md:flex-row md:gap-4 md:p-4">
      <Button
        variant={
          month === currentMonth && year === currentYear ? "default" : "outline"
        }
        size="sm"
        onClick={() => {
          updateDateParams(currentDate.getMonth(), currentDate.getFullYear());
        }}
        aria-label="Today"
        className="w-full sm:w-auto"
      >
        Dzisiaj
      </Button>
      <div className="flex items-center justify-center gap-2 md:flex-grow md:pr-20">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          className={cn("min-w-40 text-center text-lg font-medium", {
            "text-primary": month === currentMonth && year === currentYear,
          })}
        >
          {MONTH_NAMES[month]} {year}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
