import { ArrowRight } from "lucide-react";
import { ServiceCard } from "../cards/service-card";
import { LinkButton } from "../link-button";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { api } from "@/trpc/server";
import { SectionHeadingSubtitle } from "./components/section-heading-subtitle";
import { MotionWrapper } from "../motion-wrapper";
import { H2 } from "../typography";

export async function ServicesSection() {
  const services = await api.public.services.getAll({
    take: 6,
  });
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
        <div className="mb-8 grid grid-cols-9 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <MotionWrapper
              key={service.id}
              transition={{ duration: 0.3, delay: i * 0.2 }}
              className="grid first:col-span-5 md:!col-span-1 [&:nth-child(2n)]:col-span-4 [&:nth-child(3n)]:col-span-4 [&:nth-child(4n)]:col-span-5 [&:nth-child(5n)]:col-span-5 [&:nth-child(6n)]:col-span-4"
            >
              <ServiceCard key={service.id} service={service} />
            </MotionWrapper>
          ))}
        </div>
        <LinkButton
          href="/appointments/new"
          size="lg"
          variant="link"
          className="md:border-primary absolute -top-2 right-0 underline-offset-0 md:static md:border-2"
        >
          Zobacz wszystkie <ArrowRight />
        </LinkButton>
      </MaxWidthWrapper>
    </section>
  );
}
