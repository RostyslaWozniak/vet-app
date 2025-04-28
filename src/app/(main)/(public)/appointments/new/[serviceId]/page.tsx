import { db } from "@/server/db";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getCurrentUser } from "@/auth/current-user";
import { BackButton } from "@/components/back-button";
import { ArrowLeft } from "lucide-react";
import { NewAppointmentForm } from "@/components/forms/new-appointment-form";

export default async function ServiceIdPage({
  params,
  searchParams,
}: {
  params: Promise<{ serviceId: string }>;
  searchParams: Promise<{ petId: string }>;
}) {
  const { serviceId } = await params;
  const { petId } = await searchParams;

  const user = await getCurrentUser({ withFullUser: true });

  const service = await db.service.findUnique({
    where: {
      id: serviceId,
      isActive: true,
    },
    select: {
      id: true,
      name: true,
      durationInMinutes: true,
      description: true,
    },
  });

  if (service == null) return notFound();

  return (
    <section>
      <MaxWidthWrapper className="space-y-4 lg:space-y-12">
        <BackButton size="sm" variant="link">
          <ArrowLeft /> Powrót
        </BackButton>

        <div>
          <Card className="mx-auto max-w-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-normal">
                Rezerwacja usługi <br />
                <span className="font-bold">{service.name}</span>
              </CardTitle>
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
              <NewAppointmentForm service={service} user={user} petId={petId} />
            </CardContent>
          </Card>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
