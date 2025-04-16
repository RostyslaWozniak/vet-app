// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//   dateStyle: "medium",
// });

import { format } from "date-fns";
import { pl } from "date-fns/locale";

// export function formatDate(date: Date) {
//   return dateFormatter.format(date);
// }

// const timeFormatter = new Intl.DateTimeFormat(undefined, {
//   timeStyle: "short",
// });

// export function formatTimeString(date: Date) {
//   return timeFormatter.format(date);
// }

export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd", { locale: pl });
}

export function formatTimeString(date: Date) {
  return format(date, "HH:mm", { locale: pl });
}
