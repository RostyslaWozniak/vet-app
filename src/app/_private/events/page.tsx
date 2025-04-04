import { getCurrentUser } from "@/auth/current-user";
import { EventCard } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";
import { CalendarPlus, CalendarRange } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });
  const events = await db.event.findMany({
    where: {
      userId: currentUser.id,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="flex items-baseline gap-4">
        <h1 className="mb-6 text-3xl font-semibold lg:text-4xl xl:text-5xl">
          Events
        </h1>
        <Button asChild>
          <Link href="/events/new">
            <CalendarPlus className="mr-4 size-6" /> New Event
          </Link>
        </Button>
      </div>
      {events.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
          {events.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <CalendarRange className="mx-auto size-16" />
          You do not have any events yet. Create your first event to get
          started!
          <Button size="lg" className="text-lg" asChild>
            <Link href="/events/new">
              <CalendarPlus className="mr-4 size-6" /> New Event
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}
