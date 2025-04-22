// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//   dateStyle: "medium",
// });

import { format, setISOWeek, startOfISOWeek } from "date-fns";
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
