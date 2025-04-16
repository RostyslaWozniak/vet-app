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

export function createLocalDateTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const newDate = new Date(date); // kopia daty

  newDate.setHours(hours!);
  newDate.setMinutes(minutes!);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate; // ten obiekt reprezentuje datę 2025-04-16 14:00 w local time
}
