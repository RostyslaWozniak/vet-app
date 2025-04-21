// const dateFormatter = new Intl.DateTimeFormat(undefined, {
//   dateStyle: "medium",
// });

import { format } from "date-fns";
import { pl } from "date-fns/locale";

export function formatDate(date: Date) {
  return format(date, "d MMMM yyyy", { locale: pl });
}

export function formatTimeString(date: Date) {
  return format(date, "HH:mm", { locale: pl });
}
