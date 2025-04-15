import { Mail, MapPin, Phone } from "lucide-react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { H3 } from "../typography";
import { PawsBgCard } from "./components/paws-bg-card";
import { SectionHeadingSubtitle } from "./components/section-heading-subtitle";
import Link from "next/link";
import { websiteConfig } from "@/lib/configs/website-config";

const contactLinks = [
  {
    icon: Phone,
    label: websiteConfig.contact.phone.label,
    value: websiteConfig.contact.phone.value,
  },
  {
    icon: Mail,
    label: websiteConfig.contact.email.label,
    value: websiteConfig.contact.email.value,
  },

  {
    icon: MapPin,
    label: websiteConfig.contact.address.label,
    value: websiteConfig.contact.address.value,
  },
];

export function ContactSection() {
  return (
    <section className="my-6 md:my-20">
      <MaxWidthWrapper className="space-y-4 md:space-y-12">
        <SectionHeadingSubtitle
          title="Skontaktuj się z nami"
          titleClassName="sm:text-nowrap"
        />
        <div className="!text-secondary-foreground flex flex-col gap-8 lg:grid-cols-2 lg:flex-row">
          <PawsBgCard className="bg-secondary isolate min-h-110 w-full lg:w-1/2">
            <H3 className="dark-text-shadow max-w-md">
              Jestećmy do Twojej dyspozycji
            </H3>
            <div className="mt-12 flex-grow space-y-4">
              {contactLinks.map((item) => (
                <div
                  key={item.value}
                  className="relative z-20 flex items-center gap-2"
                >
                  <div>
                    <item.icon className="stroke-secondary-foreground h-10 w-10" />
                  </div>
                  <Link
                    href={item.value}
                    target="_blank"
                    className="dark-text-shadow text-xl"
                  >
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className="absolute right-0 bottom-0 h-60">
              <div className="bg-secondary-foreground absolute right-60 -bottom-12 aspect-square h-30 rounded-full bg-radial" />
              <div className="bg-card absolute right-44 -bottom-14 aspect-square h-44 translate-x-1/3 rounded-full" />
              <div className="bg-primary absolute -right-20 -bottom-18 aspect-square h-64 rounded-full" />
            </div>
          </PawsBgCard>
          <PawsBgCard className="bg-primary flex min-h-100 w-full items-center justify-center lg:w-1/2">
            TODO CONTACT FORM
          </PawsBgCard>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
