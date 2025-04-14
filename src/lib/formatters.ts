const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
});

export function formatTimeString(date: Date) {
  return timeFormatter.format(date);
}
