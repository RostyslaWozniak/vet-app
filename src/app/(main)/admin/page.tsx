import { db } from "@/server/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppointmentStats } from "@/components/statistics/appointments/appointment-status";
import { AppointmentStatusChart } from "@/components/statistics/appointments/appointment-status-chart";
import { AppointmentsByUserChart } from "@/components/statistics/appointments/appointments-by-user-chart";
import { getMonthDateRange } from "@/lib/get-month-date-range";
import { groupBy } from "@/lib/utils";
import MonthPicker from "@/components/custom-ui/month-picker";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month: string; year: string }>;
}) {
  const { month, year } = await searchParams;
  const { start, end } = getMonthDateRange(year, month);
  const appointments = await db.appointment.findMany({
    where: {
      startTime: { gte: start, lte: end },
    },
    select: {
      id: true,
      status: true,
      startTime: true,
      service: {
        select: {
          name: true,
          description: true,
          durationInMinutes: true,
        },
      },
      vetSchedule: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  // Group appointments by vet user
  const groupedAppointments = groupBy(
    appointments,
    (a) => a.vetSchedule.user.name,
  );

  return (
    <div className="flex w-full flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <MonthPicker />
        <AppointmentStats appointments={appointments} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Statusy wizyty</CardTitle>
              <CardDescription>
                Podział wizyt według ich aktualnego statusu
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AppointmentStatusChart appointments={appointments} />
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>
                Weterynarze ({Object.keys(groupedAppointments).length})
              </CardTitle>
              <CardDescription>
                Procent wizyt obsłużonych przez każdego weterynarza
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentsByUserChart
                groupedAppointments={groupedAppointments}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
