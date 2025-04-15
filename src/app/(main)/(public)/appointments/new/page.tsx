import { db } from "@/server/db";
import { ServiceCard } from "../../../../../components/cards/service-card";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { BackButton } from "@/components/back-button";

export default async function NewAppointmentPage() {
  const services = await db.service.findMany({
    where: {
      isActive: true,
      vetServices: {
        some: {
          vetId: {
            not: undefined,
          },
        },
      },
    },
  });
  return (
    <section>
      <MaxWidthWrapper className="space-y-12 lg:space-y-16">
        <SectionHeadingSubtitle
          title="Nowa wizyta"
          titleClassName="text-nowrap"
        />
        <BackButton />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              href={`/appointments/new/${service.id}`}
              key={service.id}
              className="flex"
            >
              <ServiceCard service={service} />
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
