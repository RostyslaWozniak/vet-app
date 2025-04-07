import { $Enums } from "@prisma/client";

export function mapDayOfWeek(day: $Enums.ScheduleDayOfWeek) {
  switch (day) {
    case $Enums.ScheduleDayOfWeek.SUNDAY:
      return "Niedziela";
    case $Enums.ScheduleDayOfWeek.MONDAY:
      return "Poniedziałek";
    case $Enums.ScheduleDayOfWeek.TUESDAY:
      return "Wtorek";
    case $Enums.ScheduleDayOfWeek.WEDNESDAY:
      return "Środa";
    case $Enums.ScheduleDayOfWeek.THURSDAY:
      return "Czwartek";
    case $Enums.ScheduleDayOfWeek.FRIDAY:
      return "Piątek";
    case $Enums.ScheduleDayOfWeek.SATURDAY:
      return "Sobota";
    default:
      return "Błąd";
  }
}
