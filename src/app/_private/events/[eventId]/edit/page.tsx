import { getCurrentUser } from "@/auth/current-user";
import { EventForm } from "@/components/forms/event-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";

import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  const { eventId } = await params;

  const event = await db.event.findFirst({
    where: {
      id: eventId,
      userId: currentUser.id,
    },
  });

  if (event == null) return notFound();

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>Edit Event</CardTitle>
      </CardHeader>
      <CardContent>
        <EventForm
          event={{ ...event, description: event.description ?? undefined }}
        />
      </CardContent>
    </Card>
  );
}
