"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { DAYS_OF_WEEK_IN_ORDER } from "@/data/constants";
import type { $Enums } from "@prisma/client";

export type ScheduleSlot = {
  id: string;
  vetScheduleId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: $Enums.ScheduleDayOfWeek;
};

export default function VetSchedule({
  scheduleByDay,
}: {
  scheduleByDay: Record<
    string,
    {
      id: string;
      dayOfWeek: $Enums.ScheduleDayOfWeek;
      startTime: string;
      endTime: string;
      vetScheduleId: string;
    }[]
  >;
}) {
  const getMinMaxTimes = (
    scheduleByDay: Record<string, ScheduleSlot[]>,
  ): { minStartTime: number; maxEndTime: number } => {
    let minStartTime: string | null = null;
    let maxEndTime: string | null = null;

    for (const day in scheduleByDay) {
      const slots = scheduleByDay[day];
      for (const slot of slots!) {
        if (minStartTime === null || slot.startTime < minStartTime) {
          minStartTime = slot.startTime;
        }
        if (maxEndTime === null || slot.endTime > maxEndTime) {
          maxEndTime = slot.endTime;
        }
      }
    }

    return {
      minStartTime: minStartTime
        ? parseInt(minStartTime.substring(0, 2), 10)
        : 9,
      maxEndTime: maxEndTime ? parseInt(maxEndTime.substring(0, 2), 10) : 17,
    };
  };

  const { minStartTime, maxEndTime } = getMinMaxTimes(scheduleByDay);
  // Generate time slots from 9:00 to 17:00 with hourly intervals
  const timeSlots = generateTimeSlots({ minStartTime, maxEndTime });

  return (
    <div className="flex flex-col">
      <div className="flex flex-1 flex-col overflow-hidden p-4">
        <div className="bg-card flex flex-1 flex-col overflow-hidden rounded-lg shadow">
          {/* Calendar header with days */}
          <div className="border-card-foreground grid grid-cols-8 border-b">
            <div className="bg-card border-card-foreground w-16 border-r px-2 py-2"></div>
            {DAYS_OF_WEEK_IN_ORDER.map((day, index) => {
              const hasSchedule = scheduleByDay[day] !== undefined;

              return (
                <div
                  key={index}
                  className={cn(
                    "border-card-foreground border-r py-2 text-center",
                    hasSchedule ? "bg-card" : "bg-muted",
                  )}
                >
                  <p className="text-card-foreground font-medium">
                    {formatDayName(day)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Calendar body with time slots */}
          <div className="grid flex-1 grid-cols-8 overflow-auto">
            {/* Time labels column */}
            <div className="border-card-foreground w-16 border-r">
              {timeSlots.map((time, index) => (
                <div
                  key={index}
                  className="border-card-foreground flex h-12 items-center justify-end border-b px-2"
                >
                  <span className="text-card-foreground text-xs font-medium">
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Days columns */}
            {DAYS_OF_WEEK_IN_ORDER.map((day, dayIndex) => {
              const daySchedule = scheduleByDay[day] ?? [];

              return (
                <div
                  key={dayIndex}
                  className="border-card-foreground relative border-r"
                >
                  {/* Time grid */}
                  {timeSlots.map((time, timeIndex) => (
                    <div
                      key={timeIndex}
                      className={cn("border-card-foreground h-12 border-b")}
                    ></div>
                  ))}

                  {/* Schedule blocks */}
                  {daySchedule.map((item) => {
                    const { top, height } = calculatePosition(
                      item.startTime,
                      item.endTime,
                    );

                    return (
                      <div
                        key={item.id}
                        className="bg-accent/90 border-accent absolute right-0 left-0 mx-1 overflow-hidden rounded-md border p-1"
                        style={{
                          top: `${top}px`,
                          height: `${height}px`,
                        }}
                      >
                        <div className="text-accent-foreground flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span className="text-xs font-medium">
                            {item.startTime} - {item.endTime}
                          </span>
                        </div>
                        <p className="text-accent-foreground truncate text-xs font-medium">
                          Dostępny
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatDayName(day: string): string {
  return day.charAt(0) + day.slice(1).toLowerCase();
}

function generateTimeSlots({
  minStartTime,
  maxEndTime,
}: {
  minStartTime: number;
  maxEndTime: number;
}): string[] {
  const slots: string[] = [];
  for (let hour = minStartTime; hour <= maxEndTime; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
  }
  return slots;
}

function calculatePosition(
  startTime: string,
  endTime: string,
): { top: number; height: number } {
  // Convert time strings to hours since 9:00
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  if (
    startHour === undefined ||
    startMinute === undefined ||
    endHour === undefined ||
    endMinute === undefined
  ) {
    throw new Error("Invalid time format");
  }

  console.log({ startHour, startMinute, endHour, endMinute });

  const startTimeInHours = startHour - 9 + startMinute / 60;
  const endTimeInHours = endHour - 9 + endMinute / 60;

  // Each hour is 48px tall
  const hourHeight = 48;

  return {
    top: startTimeInHours * hourHeight,
    height: (endTimeInHours - startTimeInHours) * hourHeight,
  };
}
