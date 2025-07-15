import {
  ArrowRight,
  FrownIcon,
  LoaderIcon,
  MailIcon,
  PhoneIcon,
} from "lucide-react";
import { ServiceCard } from "../cards/service-card";
import { LinkButton } from "../link-button";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { api } from "@/trpc/server";
import { SectionHeadingSubtitle } from "./components/section-heading-subtitle";
import { MotionWrapper } from "../motion-wrapper";
import { H2 } from "../typography";
import { cn } from "@/lib/utils";
import { COLORS } from "@/lib/constants";
import Link from "next/link";
import { EmptyResult } from "../empty-result";
import { Suspense } from "react";

export function ServicesSection() {
  return (
    <section className="mt-8 mb-4 lg:mt-40 lg:mb-12">
      <MaxWidthWrapper className="relative flex flex-col gap-y-4 sm:items-center md:gap-y-12">
        <SectionHeadingSubtitle
          title="Nasze usługi"
          subtitle="Pełny serwis weterynaryjny z wyjątkową opieką dla fizycznego i mentalnego zdrowia twojeka pupila."
          className="hidden md:flex"
          titleClassName="text-nowrap"
        />
        <H2 className="text-start text-2xl md:hidden">Usługi</H2>
        <Suspense
          fallback={
            <div className="flex min-h-140 items-center justify-center">
              <LoaderIcon className="animate-spin" />
            </div>
          }
        >
          <ServicesView />
        </Suspense>
      </MaxWidthWrapper>
    </section>
  );
}

async function ServicesView() {
  const services = await api.public.services.getAll({
    take: 6,
  });
  return (
    <>
      {services.length > 0 ? (
        <>
          <div className="mb-8 grid w-full grid-cols-9 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <MotionWrapper
                key={service.id}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="grid first:col-span-5 md:!col-span-1 [&:nth-child(2n)]:col-span-4 [&:nth-child(3n)]:col-span-4 [&:nth-child(4n)]:col-span-5 [&:nth-child(5n)]:col-span-5 [&:nth-child(6n)]:col-span-4"
              >
                <Link href={`/appointments/new/${service.id}`} className="grid">
                  <ServiceCard
                    key={service.id}
                    service={service}
                    className={cn(COLORS[i % COLORS.length])}
                    descriptionClassName="hidden md:block"
                    showDescription
                  />
                </Link>
              </MotionWrapper>
            ))}
          </div>

          <LinkButton
            href="/uslugi"
            size="lg"
            variant="link"
            className="md:border-primary absolute -top-2 right-0 underline-offset-0 md:static md:border-2"
          >
            Zobacz wszystkie <ArrowRight />
          </LinkButton>
        </>
      ) : (
        <EmptyResult
          className="w-full"
          icon={FrownIcon}
          title="Brak dostępnych usług"
          description="W danym momencie nie ma dostępnych usług. Skontaktuj się z nami i zaplanuj wizyte"
          actionButton={
            <div className="mt-4 flex w-full flex-col gap-2 sm:flex-row">
              <LinkButton href="tel:+48798582849">
                <PhoneIcon /> Skontaktuj się z nami
              </LinkButton>
              <LinkButton href="mailto:contact@webjoin.pl" variant="outline">
                <MailIcon /> Napisz do nas
              </LinkButton>
            </div>
          }
        />
      )}
    </>
  );
}
