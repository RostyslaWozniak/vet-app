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

  const availabilities = await api.admin.availabilities.getAllByUserId({
    userId: vetId,
  });
  const appointments = await api.admin.appointments.getAllByUserId({
    userId: vetId,
  });

  const hours = getCallendarRangeHours(availabilities);

  return (
    <div>
      <LinkButton href="/admin/vets" variant="link">
        <ArrowLeft />
        Powrót
      </LinkButton>
      <ScheduleCalendar
        appointments={appointments}
        availabilities={availabilities}
        timesRange={hours}
      />
    </div>
  );
}
