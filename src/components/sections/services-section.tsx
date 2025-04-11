import { ArrowRight } from "lucide-react";
import { ServiceCard } from "../cards/service-card";
import { LinkButton } from "../link-button";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { SectionHeading } from "./components/section-heading";
import { api } from "@/trpc/server";
import Image from "next/image";

export async function ServicesSection() {
  const services = await api.public.services.getAll({
    take: 6,
  });
  return (
    <section className="my-8 lg:my-20">
      <SectionHeading>Nasze usługi </SectionHeading>
      <MaxWidthWrapper className="flex flex-col sm:items-center">
        <div className="mt-16 mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <LinkButton href="/appointments/new" size="lg" variant="secondary">
          Zobacz wszystkie <ArrowRight />
        </LinkButton>
      </MaxWidthWrapper>
      <div className="relative mt-12 h-60 w-full md:h-140">
        <Image
          src="/images/service.jpg"
          fill
          alt="banner image"
          className="object-cover"
        />
        <div className="bg-primary/20 absolute inset-0"></div>
      </div>
    </section>
  );
}
