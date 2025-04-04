import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatEventDescription } from "@/lib/formatters";
import { db } from "@/server/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function BookingPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const events = await db.event.findMany({
    where: {
      userId,
      isActive: true,
    },
    orderBy: {
      name: "desc",
    },
  });

  if (events.length === 0) return notFound();

  const user = await db.user.findUnique({ where: { id: userId } });

  if (!user) return notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 text-center text-4xl font-semibold md:text-5xl">
        {user.name}
      </div>
      <div className="text-muted-foreground mx-auto mb-6 max-w-sm text-center">
        Welcome to my scheduling page. Please follow the instructions to add an
        event to my calendar.
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}

type EventCardProps = {
  id: string;
  name: string;
  userId: string;
  description: string | null;
  durationInMinutes: number;
};

function EventCard({
  id,
  name,
  description,
  userId,
  durationInMinutes,
}: EventCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && <CardContent>{description}</CardContent>}
      <CardFooter className="mt-auto flex justify-end gap-2">
        <Button asChild>
          <Link href={`/book/${userId}/${id}`}>Select</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
