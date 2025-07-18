import { ServiceCard } from "@/components/cards/service-card";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { BackButton } from "@/components/back-button";
import { SearchForm } from "@/components/forms/search-form";
import { ArrowLeft, FrownIcon, MailIcon, PhoneIcon } from "lucide-react";
import { EmptyResult } from "@/components/empty-result";
import { api } from "@/trpc/server";
import { LinkButton } from "@/components/link-button";

// export const dynamic = "force-dynamic";

export default async function AppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  const services = await api.public.services.getAll({
    search,
  });

  return (
    <section>
      <MaxWidthWrapper className="isolate space-y-6 lg:space-y-8">
        <BackButton size="sm" variant="link" className="z-50">
          <ArrowLeft /> Powrót
        </BackButton>
        <div className="relative flex flex-col items-center gap-4 sm:flex-row">
          <SectionHeadingSubtitle
            title="Naze usługi"
            titleClassName="text-nowrap text-center"
            className="z-50"
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
                service={service}
                showDescription
                className="border-foreground grid rounded-none border-0 border-b bg-transparent shadow-none hover:shadow-none"
                bookButton
              />
            ))}
          </div>
        ) : (
          <EmptyResult
            className="w-full"
            icon={FrownIcon}
            title="Brak dostępnych usług"
            description={
              search
                ? "Usługi nie zostały znalezione. Spróbuj wyszukać za pomocą innych kryteriów."
                : "W danym momencie nie ma dostępnych usług online. Skontaktuj się z nami i zaplanuj wizyte"
            }
            actionButton={
              !search && (
                <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
                  <LinkButton href="tel:+48798582849">
                    <PhoneIcon /> Skontaktuj się z nami
                  </LinkButton>
                  <LinkButton
                    href="mailto:contact@webjoin.pl"
                    variant="outline"
                  >
                    <MailIcon /> Napisz do nas
                  </LinkButton>
                </div>
              )
            }
          />
        )}
      </MaxWidthWrapper>
    </section>
  );
}
