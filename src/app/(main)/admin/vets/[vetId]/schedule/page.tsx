import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { api } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ vetId: string }>;
}) {
  const { vetId } = await params;
  const schedule = await api.admin.schedule.getByUserId({ userId: vetId });

  const hours = getCallendarRangeHours(schedule?.availabilities);

  const appointments = schedule?.appointments.filter(
    (appointment, _index, self) =>
      self.findIndex((t) => t.startTime === appointment.startTime),
  );

  return (
    <div>
      <LinkButton href="/admin/vets" variant="link">
        <ArrowLeft />
        Powrót
      </LinkButton>
      <ScheduleCalendar
        appointments={appointments ?? []}
        availabilities={schedule?.availabilities ?? []}
        timesRange={hours}
      />
    </div>
  );
}
