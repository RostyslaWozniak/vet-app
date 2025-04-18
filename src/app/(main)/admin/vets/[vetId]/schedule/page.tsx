import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { H1 } from "@/components/typography";
import { db } from "@/server/db";
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

  const vetUser = await db.user.findUnique({
    where: {
      id: vetId,
    },
    select: {
      name: true,
      email: true,
    },
  });

  const hours = getCallendarRangeHours(availabilities);

  return (
    <div>
      <div className="flex items-center">
        <LinkButton href="/admin/vets" variant="link">
          <ArrowLeft />
          Powrót
        </LinkButton>
        <div className="flex flex-grow justify-center">
          <H1 className="pr-20 !text-2xl">{vetUser?.name}</H1>
        </div>
      </div>
      <ScheduleCalendar
        appointments={appointments}
        availabilities={availabilities}
        timesRange={hours}
      />
    </div>
  );
}
