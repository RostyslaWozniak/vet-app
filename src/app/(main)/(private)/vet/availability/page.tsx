import { getCurrentUser } from "@/auth/current-user";
import { db } from "@/server/db";
import { notFound, redirect } from "next/navigation";
import { VetScheduleForm } from "../_components/vet-schedule-form";
import { H2 } from "@/components/typography";
import { api } from "@/trpc/server";

export default async function AvailabilityPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-up");
  const vet = await db.user.findUnique({ where: { id: user.id } });
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
