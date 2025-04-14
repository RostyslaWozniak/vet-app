import { getCurrentUser } from "@/auth/current-user";
import { AppointmentStats } from "@/components/statistics/appointments/appointment-status";
import { AppointmentStatusChart } from "@/components/statistics/appointments/appointment-status-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMonthDateRange } from "@/lib/get-month-date-range";
import { db } from "@/server/db";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export default async function VetDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ month: string; year: string }>;
}) {
  const { month, year } = await searchParams;
  const { start, end } = getMonthDateRange(year, month);

  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  if (!currentUser.roles.includes("VET")) return notFound();
  const appointments = await db.appointment.findMany({
    where: {
      vetSchedule: {
        userId: currentUser.id,
      },
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
  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />

            <div>{format(new Date(), "MMM yyyy", { locale: pl })}</div>
          </div>
        </div>

        <AppointmentStats appointments={appointments} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
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
        </div>
      </div>
    </div>
  );
}
