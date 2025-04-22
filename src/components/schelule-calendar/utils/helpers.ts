import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  getHours,
  getMinutes,
} from "date-fns";
import type {
  AppointmentType,
  WeekDayInfo,
  AppointmentPosition,
} from "../types/appointment";
import { pl } from "date-fns/locale";
import type { AvailabilityType } from "../types/availability";
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";

/**
 * Generates an array of week days starting from the given date
 */
export function generateWeekDays(
  currentDate: Date,
  availabilities: AvailabilityType[],
): WeekDayInfo[] {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday

  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(weekStart, index);
    const availability = availabilities.find(
      (availability) => availability.dayOfWeek === DAYS_OF_WEEK_IN_ORDER[index],
    );
    return {
      name: format(date, "EEEE", { locale: pl }),
      date: date,
      dayOfMonth: format(date, "d"),
      isToday: isSameDay(date, new Date()),
      startTime: availability?.startTime,
      endTime: availability?.endTime,
    };
  });
}

/**
 * Generates time slot labels for the calendar
 */
export function generateTimeSlots(
  visibleHours: number,
  startHour: number,
): string[] {
  return Array.from({ length: visibleHours }).map((_, hourIndex) => {
    const hour = startHour + hourIndex;
    return `${hour.toString().padStart(2, "0")}:00`;
  });
}

/**
 * Filters appointments that fall within the current week view
 */
export function filterAppointmentsForWeek(
  appointments: AppointmentType[] | undefined,
  weekDays: WeekDayInfo[],
): AppointmentType[] {
  if (!appointments) return [];
  return appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.startTime);
    return weekDays.some((day) => isSameDay(day.date, appointmentDate));
  });
}

/**
 * Calculates the position and height of an appointment in the calendar grid
 */
export function calculateAppointmentPosition(
  startTime: Date,
  endTime: Date,
  cellSize: number,
  dayStartHour: number,
): AppointmentPosition {
  const startHour = getHours(startTime);
  const startMinute = getMinutes(startTime);
  const endHour = getHours(endTime);
  const endMinute = getMinutes(endTime);

  // Calculate position based on time and cell size
  const minutesSinceCalendarStart =
    (startHour - dayStartHour) * 60 + startMinute;
  // const minutesSinceCalendarStart = (startHour - 10) * 60 + startMinute;

  const durationInMinutes =
    (endHour - startHour) * 60 + (endMinute - startMinute);

  const topPosition = minutesSinceCalendarStart * (cellSize / 60);
  const appointmentHeight = durationInMinutes * (cellSize / 60);

  return {
    top: `${topPosition}px`,
    height: `${appointmentHeight}px`,
  };
}

/**
 * Formats a time range for display
 */
export function formatTimeRange(startTime: Date, endTime: Date): string {
  return `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`;
}

export function getCallendarRangeHours(
  availabilities?: { startTime: string; endTime: string }[],
) {
  let startTime = 24;
  let endTime = 0;
  if (!availabilities)
    return {
      startHour: startTime,
      visibleHours: endTime - startTime,
    };
  availabilities.forEach((availability) => {
    const [startHour] = availability.startTime.split(":").map(parseInt);
    const [endHour] = availability.endTime.split(":").map(parseInt);

    if (startHour && startHour < startTime) {
      startTime = startHour;
    }
    if (endHour && endHour > endTime) {
      endTime = endHour;
    }
  });

  return {
    startHour: startTime,
    visibleHours: endTime - startTime + 1,
  };
}
