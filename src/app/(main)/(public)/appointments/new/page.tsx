import { ServiceCard } from "@/components/cards/service-card";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { BackButton } from "@/components/back-button";
import { ArrowLeft, Frown } from "lucide-react";
import { SearchForm } from "@/components/forms/search-form";
import { EmptyResult } from "@/components/empty-result";
import { api } from "@/trpc/server";

export const dynamic = "force-dynamic";

export default async function NewAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string; petId: string }>;
}) {
  const { search, petId } = await searchParams;

  const services = await api.public.services.getAll({
    search,
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
          {(!search && services.length > 0) || search ? (
            <div className="w-full sm:min-w-100">
              <SearchForm
                autoFocus
                searchKey="search"
                path="/appointments"
                inputPlaceholder="Wyszukaj usługę..."
              />
            </div>
          ) : null}
        </div>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-9 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                href={`/appointments/new/${service.id}${petId ? `?petId=${petId}` : ""}`}
                service={service}
                showDescription
                className="border-foreground grid rounded-none border-0 border-b bg-transparent shadow-none hover:shadow-none"
                bookButton
              />
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
