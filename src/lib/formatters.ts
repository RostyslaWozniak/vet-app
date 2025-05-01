import {
  addYears,
  differenceInMonths,
  differenceInYears,
  format,
  intervalToDuration,
  setISOWeek,
  startOfISOWeek,
  sub,
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

export function getDateFromAge(ageString: string) {
  const [yearsStr, monthsStr] = ageString.split(".");

  const years = parseInt(yearsStr!, 10);
  const months = parseInt(monthsStr!, 10);

  const birthday = sub(new Date(), { years, months });
  return birthday;
}

export function formatYearsAndMonthsToString(
  fromDate: Date,
  toDate = new Date(),
) {
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

export function getAgeStringFromDate(date: Date) {
  const now = new Date();
  const duration = intervalToDuration({ start: date, end: now });

  return `${duration.years ?? 0}.${duration.months ?? 0}`;
}
