"use client";

"use client";

import { useState, useMemo } from "react";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  getHours,
  getMinutes,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  CalendarIcon,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import type { $Enums } from "@prisma/client";

type AppointmentType = {
  startTime: Date;
  endTime: Date;
  id: string;
  userId: string | null;
  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  vetScheduleId: string;
  serviceId: string;
  status: $Enums.AppointmentStatus;
  createdAt: Date;
  updatedAt: Date;
};

type ScheduleProps = {
  appointments: AppointmentType[];
};

export function Schedule({ appointments }: ScheduleProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("week");
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentType | null>(null);

  // Generate week days and dates
  const weekDays = useMemo(() => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }).map((_, index) => {
      const date = addDays(startDate, index);
      return {
        name: format(date, "EEE"),
        date: date,
        dayOfMonth: format(date, "d"),
        isToday: isSameDay(date, new Date()),
      };
    });
  }, [currentDate]);

  // Time slots
  const timeSlots = useMemo(() => {
    return Array.from({ length: 12 }).map((_, index) => {
      const hour = index + 8; // Start from 8 AM
      return `${hour % 12 === 0 ? 12 : hour % 12}${hour < 12 ? "am" : "pm"}`;
    });
  }, []);

  // Calculate appointment position in the grid
  const calculateAppointmentStyle = (startTime: Date, endTime: Date) => {
    const startHour = getHours(startTime);
    const startMinute = getMinutes(startTime);
    const endHour = getHours(endTime);
    const endMinute = getMinutes(endTime);

    const top = ((startHour - 8) * 60 + startMinute) * (80 / 60); // 80px per hour
    const height =
      ((endHour - startHour) * 60 + (endMinute - startMinute)) * (80 / 60);

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  // Navigate to today
  const goToToday = () => setCurrentDate(new Date());

  // Navigate to previous/next week
  const goToPrevious = () => {
    if (currentView === "day") {
      setCurrentDate(addDays(currentDate, -1));
    } else if (currentView === "week") {
      setCurrentDate(addDays(currentDate, -7));
    }
  };

  const goToNext = () => {
    if (currentView === "day") {
      setCurrentDate(addDays(currentDate, 1));
    } else if (currentView === "week") {
      setCurrentDate(addDays(currentDate, 7));
    }
  };

  // Filter appointments for the current week
  const weekAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.startTime);
      return weekDays.some((day) => isSameDay(day.date, appointmentDate));
    });
  }, [weekDays, appointments]);

  return (
    <div className="relative h-full min-h-screen w-full p-4">
      <Card className="h-full min-h-[calc(100vh-2rem)]">
        <CardHeader className="border-b p-4">
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="flex items-center gap-4">
              <Button onClick={goToToday} variant="default">
                Today
              </Button>
              <div className="flex">
                <Button
                  onClick={goToPrevious}
                  variant="outline"
                  size="icon"
                  className="rounded-r-none"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  onClick={goToNext}
                  variant="outline"
                  size="icon"
                  className="rounded-l-none"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <h2 className="text-xl font-semibold">
                {format(currentDate, "MMMM yyyy")}
              </h2>
            </div>

            <Tabs
              value={currentView}
              onValueChange={setCurrentView}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-4">
          <div className="h-full rounded-xl border shadow-sm">
            {/* Week Header */}
            <div className="grid grid-cols-[50px_repeat(7,1fr)] border-b">
              <div className="text-muted-foreground p-2 text-center text-xs"></div>
              {weekDays.map((day, i) => (
                <div key={i} className={cn("border-l p-2 text-center")}>
                  <div className="text-muted-foreground text-xs font-medium">
                    {day.name}
                  </div>
                  <div
                    className={cn(
                      "mx-auto mt-1 flex h-8 w-8 items-center justify-center text-lg font-medium",
                      day.isToday &&
                        "bg-primary text-primary-foreground rounded-full",
                    )}
                  >
                    {day.dayOfMonth}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-[50px_repeat(7,1fr)]">
              {/* Time Labels */}
              <div className="text-muted-foreground">
                {timeSlots.map((time, i) => (
                  <div
                    key={i}
                    className="h-20 border-b pr-2 text-right text-xs"
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Days Columns */}
              {weekDays.map((day, dayIndex) => (
                <div key={dayIndex} className="relative border-l">
                  {timeSlots.map((_, timeIndex) => (
                    <div key={timeIndex} className="h-20 border-b"></div>
                  ))}

                  {/* Appointments */}
                  {weekAppointments
                    .filter((appointment) =>
                      isSameDay(day.date, new Date(appointment.startTime)),
                    )
                    .map((appointment, i) => {
                      const appointmentStyle = calculateAppointmentStyle(
                        new Date(appointment.startTime),
                        new Date(appointment.endTime),
                      );
                      return (
                        <div
                          key={i}
                          className={cn(
                            "bg-primary absolute cursor-pointer rounded-md text-xs shadow-md transition-all duration-200 ease-in-out hover:translate-y-[-2px] hover:shadow-lg",
                          )}
                          style={{
                            ...appointmentStyle,
                            left: "4px",
                            right: "4px",
                          }}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <div className="font-medium">
                            {appointment.contactName}
                          </div>
                          <div className="mt-1 text-[10px] opacity-80">
                            {`${format(new Date(appointment.startTime), "h:mm a")} - ${format(new Date(appointment.endTime), "h:mm a")}`}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      <Dialog
        open={!!selectedAppointment}
        onOpenChange={(open) => !open && setSelectedAppointment(null)}
      >
        {selectedAppointment && (
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Appointment Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {selectedAppointment.contactName}
                </h3>
                <Badge
                  className={cn(
                    // statusColors[selectedAppointment.status],
                    "border-none",
                  )}
                >
                  {selectedAppointment.status}
                </Badge>
              </div>

              <div className="space-y-3">
                <p className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  {`${format(new Date(selectedAppointment.startTime), "h:mm a")} - ${format(new Date(selectedAppointment.endTime), "h:mm a")}`}
                </p>
                <p className="flex items-center text-sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(
                    new Date(selectedAppointment.startTime),
                    "EEEE, MMMM d, yyyy",
                  )}
                </p>
                {selectedAppointment.contactEmail && (
                  <p className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{selectedAppointment.contactEmail}</span>
                  </p>
                )}
                {selectedAppointment.contactPhone && (
                  <p className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{selectedAppointment.contactPhone}</span>
                  </p>
                )}
                <div className="text-sm">
                  <p>
                    <strong>Service ID:</strong> {selectedAppointment.serviceId}
                  </p>
                  <p>
                    <strong>Vet Schedule ID:</strong>{" "}
                    {selectedAppointment.vetScheduleId}
                  </p>
                  <p>
                    <strong>Created:</strong>{" "}
                    {format(
                      new Date(selectedAppointment.createdAt),
                      "MMM d, yyyy",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
