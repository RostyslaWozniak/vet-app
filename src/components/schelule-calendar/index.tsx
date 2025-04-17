"use client";

import { useState, useMemo } from "react";
import { format, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import AppointmentDialog from "./appointment-dialog";

// Import types, config and helpers
import type { AppointmentType, WeekDayInfo } from "./types/appointment";
import { CALENDAR_CONFIG } from "./configs/config";
import {
  generateWeekDays,
  generateTimeSlots,
  filterAppointmentsForWeek,
  calculateAppointmentPosition,
  formatTimeRange,
} from "./utils/helpers";
import { pl } from "date-fns/locale";
import { $Enums } from "@prisma/client";
import { mapAppointmentStatus } from "@/lib/map-appointment-status";
import type { AvailabilityType } from "./types/availability";

type ScheduleProps = {
  appointments: AppointmentType[];
  availabilities: AvailabilityType[];
  timesRange: { startHour: number; visibleHours: number };
};

export function ScheduleCalendar({
  appointments,
  availabilities,
  timesRange,
}: ScheduleProps) {
  // State management
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentType | null>(null);
  const [cellSize, setCellSize] = useState(CALENDAR_CONFIG.DEFAULT_CELL_SIZE);

  // Navigation handlers
  const navigateToToday = () => setCurrentDate(new Date());
  const navigateToPreviousWeek = () => setCurrentDate(addDays(currentDate, -7));
  const navigateToNextWeek = () => setCurrentDate(addDays(currentDate, 7));

  // Generate week days data
  const weekDays = useMemo(
    () => generateWeekDays(currentDate, availabilities),
    [currentDate, availabilities],
  );

  // Generate time slots
  const timeSlots = useMemo(
    () => generateTimeSlots(timesRange.visibleHours, timesRange.startHour),
    [timesRange],
  );

  // Filter appointments for the current week view
  const visibleAppointments = useMemo(
    () => filterAppointmentsForWeek(appointments, weekDays),
    [weekDays, appointments],
  );

  return (
    <div className="relative h-full w-full p-4">
      <div className="h-full min-h-[calc(100vh-2rem)]">
        {/* Calendar Header */}
        <div className="p-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            {/* Navigation Controls */}
            <div className="flex items-center gap-4">
              <Button onClick={navigateToToday} variant="default">
                Dzisiaj
              </Button>
              <div className="flex">
                <Button
                  onClick={navigateToPreviousWeek}
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={navigateToNextWeek}
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <h2 className="text-xl font-semibold">
                {format(currentDate, "MMM yyyy", {
                  locale: pl,
                })}
              </h2>
            </div>
            <div className="flex items-center gap-4">
              {Object.values($Enums.AppointmentStatus).map((status) => {
                const { color, label } = mapAppointmentStatus(status);

                return (
                  <div key={status} className="flex items-center gap-2">
                    <div
                      className={cn("aspect-square h-4 rounded-full", color)}
                    />
                    <p className="font-semibold">{label}</p>
                  </div>
                );
              })}
            </div>

            {/* Cell Size Controls */}
            <div className="flex items-center gap-4">
              <h3 className="font-semibold">Rozmiar komórki:</h3>
              <div className="space-x-2">
                {CALENDAR_CONFIG.CELL_SIZES.map(({ label, value }) => (
                  <Button
                    key={label}
                    size="icon"
                    variant={value === cellSize ? "default" : "secondary"}
                    onClick={() => setCellSize(value)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <div className="flex-1 p-4">
          <div className="h-full overflow-hidden rounded-xl border shadow-sm">
            {/* Week Header Row */}
            <WeekHeaderRow weekDays={weekDays} />

            {/* Calendar Grid */}
            <div className="grid grid-cols-[50px_repeat(7,1fr)]">
              {/* Time Labels Column */}
              <TimeLabelsColumn timeSlots={timeSlots} cellSize={cellSize} />

              {/* Day Columns with Appointments */}
              <DayColumns
                weekDays={weekDays}
                timeSlots={timeSlots}
                visibleAppointments={visibleAppointments}
                cellSize={cellSize}
                onAppointmentClick={setSelectedAppointment}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <AppointmentDialog
        selectedAppointment={selectedAppointment}
        setSelectedAppointment={setSelectedAppointment}
      />
    </div>
  );
}

// Component for the week header row
function WeekHeaderRow({ weekDays }: { weekDays: WeekDayInfo[] }) {
  return (
    <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b">
      <div className="text-muted-foreground p-2 text-center text-xs"></div>
      {weekDays.map((day, index) => (
        <div
          key={index}
          className={cn("border-l p-2 text-center", {
            "bg-muted": !day.startTime && !day.endTime,
          })}
        >
          <div className="text-muted-foreground text-xs font-medium">
            {day.name}
          </div>
          <div
            className={cn(
              "mx-auto mt-1 flex h-8 w-8 items-center justify-center text-lg font-medium",
              day.isToday && "bg-primary text-primary-foreground rounded-full",
            )}
          >
            {day.dayOfMonth}
          </div>
          <div>
            {day.startTime} - {day.endTime}
          </div>
        </div>
      ))}
    </div>
  );
}

// Component for the time labels column
function TimeLabelsColumn({
  timeSlots,
  cellSize,
}: {
  timeSlots: string[];
  cellSize: number;
}) {
  return (
    <div className="text-muted-foreground">
      {timeSlots.map((timeLabel, index) => (
        <div
          key={index}
          className="border-b pr-2 text-right text-xs"
          style={{ height: `${cellSize}px` }}
        >
          {timeLabel}
        </div>
      ))}
    </div>
  );
}

// Component for the day columns with appointments
function DayColumns({
  weekDays,
  timeSlots,
  visibleAppointments,
  cellSize,
  onAppointmentClick,
}: {
  weekDays: WeekDayInfo[];
  timeSlots: string[];
  visibleAppointments: AppointmentType[];
  cellSize: number;
  onAppointmentClick: React.Dispatch<
    React.SetStateAction<AppointmentType | null>
  >;
}) {
  return (
    <>
      {weekDays.map((day, dayIndex) => (
        <div
          key={dayIndex}
          className={cn("relative border-l", {
            "bg-muted": !day.startTime && !day.endTime,
          })}
        >
          {/* Time Grid Cells */}
          {timeSlots.map((_, timeIndex) => (
            <div
              key={timeIndex}
              className="border-b"
              style={{ height: `${cellSize}px` }}
            ></div>
          ))}

          {/* Appointment Blocks */}
          {visibleAppointments
            .filter((appointment) =>
              isSameDay(day.date, new Date(appointment.startTime)),
            )
            .map((appointment, index) => {
              const positionStyle = calculateAppointmentPosition(
                new Date(appointment.startTime),
                new Date(appointment.endTime),
                cellSize,
              );
              const { color } = mapAppointmentStatus(appointment.status);

              return (
                <div
                  key={index}
                  className={cn(
                    "border-foreground absolute cursor-pointer overflow-hidden rounded-sm border-[1px] pt-0.5 pl-2 text-xs font-bold shadow-md transition-all duration-200 ease-in-out hover:z-20 hover:scale-105 hover:shadow-lg",
                    color,
                  )}
                  style={{
                    ...positionStyle,
                    left: "4px",
                    right: "4px",
                  }}
                  onClick={() => onAppointmentClick(appointment)}
                >
                  <div>
                    {formatTimeRange(
                      new Date(appointment.startTime),
                      new Date(appointment.endTime),
                    )}
                  </div>
                  <div>{appointment.contactName}</div>
                </div>
              );
            })}
        </div>
      ))}
    </>
  );
}
