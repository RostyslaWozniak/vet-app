import { db } from "@/server/db";
import { ServiceCard } from "@/components/cards/service-card";
import Link from "next/link";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { BackButton } from "@/components/back-button";
import { ArrowLeft, Frown } from "lucide-react";
import { SearchForm } from "@/components/forms/search-form";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import { EmptyResult } from "@/components/empty-result";

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
    },
  });
  return (
    <section>
      <MaxWidthWrapper className="space-y-4 lg:space-y-12">
        <BackButton size="sm" variant="link">
          <ArrowLeft /> Powrót
        </BackButton>

        <div className="relative flex flex-col items-center gap-4 sm:flex-row">
          <SectionHeadingSubtitle
            title="Nowa wizyta"
            titleClassName="text-nowrap text-center"
          />
          <div className="w-full sm:min-w-100">
            <SearchForm
              searchKey="search"
              path="/appointments/new"
              inputPlaceholder="Wyszukaj usługę..."
            />
          </div>
        </div>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Link
                href={`/appointments/new/${service.id}`}
                key={service.id}
                className="grid"
              >
                <ServiceCard
                  service={service}
                  showDescription
                  className={cn("grid", COLORS[i % COLORS.length])}
                />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyResult
            title="Brak usług"
            icon={Frown}
            description="Usługi nie zostały znalezione. Spróbuj wyszukać za pomocą innych kryteriów."
          />
        )}
      </MaxWidthWrapper>
    </section>
  );
}
