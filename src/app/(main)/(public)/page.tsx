import { HydrateClient } from "@/trpc/server";
import { HomeHeroSection } from "@/components/sections/home-hero-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SpecialOffersSection } from "@/components/sections/special-offers-section";
import { TestemonialsSection } from "@/components/sections/testemonials-section";
import { FAQSection } from "@/components/sections/faq-section";
import { ContactSection } from "@/components/sections/contact-section";

export default async function Home() {
  return (
    <HydrateClient>
      <HomeHeroSection />
      <ServicesSection />
      <SpecialOffersSection />
      <TestemonialsSection />
      <FAQSection />
      <ContactSection />
    </HydrateClient>
  );
}
