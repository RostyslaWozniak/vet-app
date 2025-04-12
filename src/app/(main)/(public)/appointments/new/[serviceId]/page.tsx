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
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { getCurrentUser } from "@/auth/current-user";

export default async function ServiceIdPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;

  const user = await getCurrentUser({ withFullUser: true });

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
    <section className="my-16 lg:my-28">
      <MaxWidthWrapper className="space-y-12 lg:space-y-16">
        <SectionHeadingSubtitle
          title="Data i godzina wizyty"
          titleClassName="sm:text-nowrap"
        />
        <div>
          <Card className="mx-auto max-w-4xl">
            <CardHeader>
              <CardTitle className="text-2xl">{service.name}</CardTitle>
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
              <MeetingForm
                validTimes={validTimes}
                serviceId={service.id}
                user={user}
              />
            </CardContent>
          </Card>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

function NoTimeSlots({
  service,
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
