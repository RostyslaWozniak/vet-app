import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { api } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ vetId: string }>;
}) {
  const { vetId } = await params;
  const schedule = await api.admin.schedule.getByUserId({ userId: vetId });

  if (!schedule)
    return <ScheduleCalendar appointments={[]} availabilities={[]} />;

  return (
    <div>
      <LinkButton href="/admin/vets" variant="link">
        <ArrowLeft />
        Powrót
      </LinkButton>
      <ScheduleCalendar
        appointments={schedule.appointments}
        availabilities={schedule.availabilities}
      />
    </div>
  );
}
