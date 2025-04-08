import { db } from "@/server/db";
import { Schedule } from "../_components/schedule";

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
      appointments: true,
    },
  });

  return (
    <div>
      <Schedule appointments={schedule?.appointments ?? []} />
    </div>
  );
}
