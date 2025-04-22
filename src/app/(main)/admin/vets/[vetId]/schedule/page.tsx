import { LinkButton } from "@/components/link-button";
import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { H1 } from "@/components/typography";
import { getWeekDateRange } from "@/lib/get-month-date-range";
import { db } from "@/server/db";
import { api } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";

export default async function SchedulePage({
  params,
  searchParams,
}: {
  params: Promise<{ vetId: string }>;
  searchParams: Promise<{ year: string; week: string }>;
}) {
  const { vetId } = await params;

  const { year, week } = await searchParams;

  const { start: weekStartDate, end: weekEndDate } = getWeekDateRange(
    year,
    week,
  );

  const availabilities = await api.admin.availabilities.getAllByUserId({
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

  const timesRange = getCallendarRangeHours(availabilities);

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
        availabilities={availabilities}
        timesRange={timesRange}
        weekStartDate={weekStartDate}
        weekEndDate={weekEndDate}
        vetId={vetId}
      />
    </div>
  );
}
