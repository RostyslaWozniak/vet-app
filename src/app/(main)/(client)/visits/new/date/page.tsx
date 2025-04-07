import { getValidTimesFromSchedule } from "@/lib/get-valid-times-from-schedule";
import { db } from "@/server/db";
import {
  addMonths,
  eachMinuteOfInterval,
  endOfDay,
  roundToNearestMinutes,
} from "date-fns";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeetingForm } from "@/components/forms/meeting-form";

export default async function DatePage({
  searchParams,
}: {
  searchParams: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await searchParams;

  const service = await db.service.findUnique({
    where: {
      id: serviceId,
      isActive: true,
    },
  });

  if (service == null) return notFound();

  const startDate = roundToNearestMinutes(new Date(), {
    nearestTo: 15,
    roundingMethod: "ceil",
  });

  const endDate = endOfDay(addMonths(startDate, 1));

  const validTimes = await getValidTimesFromSchedule(
    eachMinuteOfInterval({ start: startDate, end: endDate }, { step: 15 }),
    service,
  );

  if (validTimes.length === 0) {
    return <NoTimeSlots service={service} />;
  }

  return (
    <div>
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
          {service.description && (
            <CardDescription>{service.description}</CardDescription>
          )}
          <CardDescription>
            Czas trwania:{" "}
            <span className="text-foreground font-bold">
              {service.durationInMinutes} min.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MeetingForm validTimes={validTimes} serviceId={service.id} />
        </CardContent>
      </Card>
    </div>
  );
}

function NoTimeSlots({
  service,
  //   calendarUser,
}: {
  service: { id: string; name: string; description: string | null };
}) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Book {service.name}</CardTitle>
        {service.description && (
          <CardDescription>{service.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {service.name} is currently booked up. Please check back later or choose
        a shorter event.
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/book/${service.id}`}>Choose Another Event</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
