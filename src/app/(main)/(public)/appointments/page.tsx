import { db } from "@/server/db";
import { ServiceCard } from "@/components/cards/service-card";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { BackButton } from "@/components/back-button";
import { SearchAppointmentForm } from "@/components/forms/search-appointment-form";

export const dynamic = "force-dynamic";

export default async function NewAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;

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

      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
      //  OR: [
      //   {
      //     name: {
      //       contains: search,
      //       mode: "insensitive",
      //     },
      //   },
      //   {
      //     description: {
      //       contains: search,
      //       mode: "insensitive",
      //     },
      //   },
      // ],
    },
  });
  return (
    <section>
      <MaxWidthWrapper className="space-y-6 lg:space-y-12">
        <SearchAppointmentForm />
        <div className="relative flex items-center gap-4">
          <BackButton className="absolute md:static" />
          <SectionHeadingSubtitle
            title="Naze usługi"
            titleClassName="text-nowrap text-center"
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              href={`/appointments/new/${service.id}`}
              key={service.id}
              className="grid"
            >
              <ServiceCard
                service={service}
                className="w-full"
                showDescription
              />
            </Link>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
