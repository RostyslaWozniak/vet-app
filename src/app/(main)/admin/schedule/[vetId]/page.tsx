import { db } from "@/server/db";
import { ScheduleCalendar } from "@/components/schelule-calendar";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ vetId: string }>;
}) {
  const { vetId } = await params;
  const schedule = await db.vetSchedule.findUnique({
    where: {
      userId: vetId,
    },
    select: {
      appointments: {
        include: {
          service: true,
        },
      },
    },
  });

  return (
    <div>
      <ScheduleCalendar appointments={schedule?.appointments ?? []} />
    </div>
  );
}
