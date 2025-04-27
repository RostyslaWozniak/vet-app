// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//   dateStyle: "medium",
// });

import {
  addYears,
  differenceInMonths,
  differenceInYears,
  format,
  setISOWeek,
  startOfISOWeek,
} from "date-fns";
import { pl } from "date-fns/locale";

export function formatDate(date: Date) {
  return format(date, "d MMMM yyyy", { locale: pl });
}

export function formatTimeString(date: Date) {
  return format(date, "HH:mm", { locale: pl });
}

export function getDateFromWeekAndYear(week: number, year: number): Date {
  const date = new Date(year, 0, 4); // Jan 4, to ensure week 1
  const withWeekSet = setISOWeek(date, week);
  return startOfISOWeek(withWeekSet);
}

export function getDateFromAge(age: number | undefined) {
  if (age === undefined) return age;
  const now = new Date();
  const years = Math.floor(age);
  const months = Math.round((age - years) * 12);

  // Subtract years
  now.setFullYear(now.getFullYear() - years);

  // Subtract months
  now.setMonth(now.getMonth() - months);
  now.setHours(0, 0, 0);

  return now;
}

export function formatYearsAndMonths(fromDate: Date, toDate = new Date()) {
  const years = differenceInYears(toDate, fromDate);
  const datePlusYears = addYears(fromDate, years);
  const months = differenceInMonths(toDate, datePlusYears);

  const parts = [];
  if (years > 0) {
    parts.push(
      `${years} ${years === 1 ? "rok" : years >= 2 && years <= 4 ? "lata" : "lat"}`,
    );
  }
  if (months > 0) {
    parts.push(
      `${months} ${months === 1 ? "miesiąc" : months >= 2 && months <= 4 ? "miesiące" : "miesięcy"}`,
    );
  }

  return parts.join(", ");
}
