import { getCurrentUser } from "@/auth/current-user";
import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { db } from "@/server/db";
import { ArrowRight } from "lucide-react";

export default async function SchedulePage() {
  const vet = await getCurrentUser({ redirectIfNotFound: true });
  const schedule = await db.vetSchedule.findUnique({
    where: {
      userId: vet.id,
    },
    select: {
      appointments: {
        include: {
          service: true,
        },
      },
      availabilities: {
        select: {
          startTime: true,
          endTime: true,
          dayOfWeek: true,
        },
      },
    },
  });

  const hours = getCallendarRangeHours(schedule?.availabilities);

  const appointments = schedule?.appointments.filter(
    (appointment, _index, self) =>
      self.findIndex((t) => t.startTime === appointment.startTime),
  );

  return (
    <div>
      <LinkButton href="/vet/schedule/availability" variant="link">
        Edytuj dostępność
        <ArrowRight />
      </LinkButton>
      <ScheduleCalendar
        appointments={appointments ?? []}
        availabilities={schedule?.availabilities ?? []}
        timesRange={hours}
      />
    </div>
  );
}
