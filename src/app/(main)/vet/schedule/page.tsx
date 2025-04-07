import { getCurrentUser } from "@/auth/current-user";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { VetScheduleForm } from "./_components/vet-schedule-form";
import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";

export default async function SchedulePage() {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  const vet = await db.user.findUnique({ where: { id: fullUser.id } });
  if (!vet) return notFound();

  const schedule = await api.vet.schedule.getSchedule();

  return (
    <div>
      <div className="space-y-8">
        <H2>Twoja dostępność</H2>
        <VetScheduleForm schedule={schedule ?? undefined} />
      </div>
    </div>
  );
}
