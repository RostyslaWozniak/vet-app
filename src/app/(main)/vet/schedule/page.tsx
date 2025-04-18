import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { api } from "@/trpc/server";
import { ArrowRight } from "lucide-react";

export default async function SchedulePage() {
  const availabilities = await api.vet.availabilities.getAllOwn();
  const appointments = await api.vet.appointments.getAllOwn();

  const hours = getCallendarRangeHours(availabilities);

  return (
    <div>
      <LinkButton href="/vet/schedule/availability" variant="link">
        Edytuj dostępność
        <ArrowRight />
      </LinkButton>
      <ScheduleCalendar
        appointments={appointments}
        availabilities={availabilities}
        timesRange={hours}
      />
    </div>
  );
}
