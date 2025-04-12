import { ArrowRight } from "lucide-react";
import { ServiceCard } from "../cards/service-card";
import { LinkButton } from "../link-button";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { api } from "@/trpc/server";
import { SectionHeadingSubtitle } from "./components/section-heading-subtitle";
import { MotionWrapper } from "../motion-wrapper";

export async function ServicesSection() {
  const services = await api.public.services.getAll({
    take: 6,
  });
  return (
    <section className="my-8 lg:my-28">
      <MaxWidthWrapper className="flex flex-col gap-y-16 sm:items-center">
        <SectionHeadingSubtitle
          title="Nasze usługi"
          subtitle="Pełny serwis weterynaryjny z wyjątkową opieką dla fizycznego i mentalnego zdrowia twojeka pupila."
          titleClassName="text-nowrap"
        />
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <MotionWrapper
              key={service.id}
              transition={{ duration: 0.3, delay: i * 0.2 }}
              className="grid"
            >
              <ServiceCard key={service.id} service={service} />
            </MotionWrapper>
          ))}
        </div>
        <LinkButton href="/appointments/new" size="lg" variant="secondary">
          Zobacz wszystkie <ArrowRight />
        </LinkButton>
      </MaxWidthWrapper>
    </section>
  );
}
