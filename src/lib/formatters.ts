import { format } from "date-fns";
import { pl } from "date-fns/locale";

// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//   dateStyle: "medium",
// });

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd", { locale: pl });
}

// const timeFormatter = new Intl.DateTimeFormat(undefined, {
//   timeStyle: "short",
// });

export function formatTimeString(date: Date) {
  return format(date, "HH:mm", { locale: pl });
}
