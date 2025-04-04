import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateTime } from "@/lib/formatters";
import { db } from "@/server/db";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string; eventId: string }>;
  searchParams: Promise<{ startTime: string }>;
}) {
  //   const event = await db.query.EventTable.findFirst({
  //     where: ({ clerkUserId: userIdCol, isActive, id }, { eq, and }) =>
  //       and(eq(isActive, true), eq(userIdCol, clerkUserId), eq(id, eventId)),
  //   });

  const { userId, eventId } = await params;
  const { startTime } = await searchParams;

  const event = await db.event.findFirst({
    where: {
      id: eventId,
      userId,
      isActive: true,
    },
  });

  if (event == null) notFound();

  const calendarUser = await db.user.findUnique({
    where: { id: userId },
  });

  if (calendarUser == null) notFound();
  const startTimeDate = new Date(startTime);

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>
          Successfully Booked {event.name} with {calendarUser.name}
        </CardTitle>
        <CardDescription>{formatDateTime(startTimeDate)}</CardDescription>
      </CardHeader>
      <CardContent>
        You should receive an email confirmation shortly. You can safely close
        this page now.
      </CardContent>
    </Card>
  );
}
