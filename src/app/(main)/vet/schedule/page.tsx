import { ScheduleCalendar } from "@/components/schelule-calendar";
import { getCallendarRangeHours } from "@/components/schelule-calendar/utils/helpers";
import { getWeekDateRange } from "@/lib/get-month-date-range";
import { api } from "@/trpc/server";

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ year: string; week: string }>;
}) {
  const { year, week } = await searchParams;

  const { start: weekStartDate, end: weekEndDate } = getWeekDateRange(
    year,
    week,
  );

  const availabilities = await api.vet.availabilities.getAllOwn();

  const timesRange = getCallendarRangeHours(availabilities);

  return (
    <ScheduleCalendar
      weekStartDate={weekStartDate}
      weekEndDate={weekEndDate}
      availabilities={availabilities}
      timesRange={timesRange}
      vetId={undefined}
    />
  );
}
