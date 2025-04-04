import { getCurrentUser } from "@/auth/current-user";
import { ScheduleForm } from "@/components/forms/schedule-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/server/db";

export default async function SchedulePage() {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  const schedule = await db.schedule.findFirst({
    where: { userId: fullUser.id },
    include: {
      availabilities: true,
    },
  });
  return (
    <Card className="mx-auto">
      <CardHeader>
        <CardTitle>Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScheduleForm schedule={schedule ?? undefined} />
      </CardContent>
    </Card>
  );
}
