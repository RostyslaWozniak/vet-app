import { getCurrentUser } from "@/auth/current-user";
import MonthPicker from "@/components/custom-ui/month-picker";
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
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4">
        <MonthPicker />

        <AppointmentStats appointments={appointments} />

        <div className="scrollbar-hide -mx-2.5 max-w-screen gap-4 overflow-x-auto sm:mx-0">
          <div className="flex px-2.5">
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
    </div>
  );
}
