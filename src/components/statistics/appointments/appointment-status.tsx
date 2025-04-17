import { CalendarCheck, CheckCircle, Clock, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { $Enums } from "@prisma/client";
type Appointment = {
  vetSchedule: {
    user: {
      name: string;
    };
  };
  status: $Enums.AppointmentStatus;
  id: string;
  service: {
    name: string;
    description: string | null;
    durationInMinutes: number;
  };
  startTime: Date;
};

type AppointmentStatsProps = {
  appointments: Appointment[];
};

export function AppointmentStats({ appointments }: AppointmentStatsProps) {
  // Count appointments by status
  const completed = appointments.filter(
    (app) => app.status === "COMPLETED",
  ).length;
  const pending = appointments.filter((app) => app.status === "PENDING").length;
  const confirmed = appointments.filter(
    (app) => app.status === "CONFIRMED",
  ).length;
  const cancelled = appointments.filter(
    (app) => app.status === "CANCELLED",
  ).length;
  const todays = appointments.filter((app) => {
    const today = new Date().setHours(0, 0, 0, 0); // Set time to 00:00:00
    return (
      new Date(app.startTime).setHours(0, 0, 0, 0) === today &&
      app.status === "CANCELLED"
    );
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Wizyty dzisiaj</CardTitle>
          <CalendarCheck className="h-6 w-6 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todays}</div>
          <p className="text-muted-foreground text-xs">
            {Math.round((todays / appointments.length) * 100)}% wszystkich wizyt
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Zakończone wizyty
          </CardTitle>
          <CheckCircle className="h-6 w-6 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completed}</div>
          <p className="text-muted-foreground text-xs">
            {Math.round((completed / appointments.length) * 100)}% wszystkich
            wizyt
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Oczekujące i potwierdzone
          </CardTitle>
          <Clock className="h-6 w-6 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pending + confirmed}</div>
          <p className="text-muted-foreground text-xs">
            {pending} oczekujące, {confirmed} potwierdzone
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Odwołane wizyty</CardTitle>
          <XCircle className="h-6 w-6 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelled}</div>
          <p className="text-muted-foreground text-xs">
            {Math.round((cancelled / appointments.length) * 100)}% wszystkich
            wizyt
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
