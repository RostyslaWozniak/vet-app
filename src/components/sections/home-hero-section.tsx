import Image from "next/image";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { H1 } from "../typography/h1";
import { Text } from "../typography/text";
import { LinkButton } from "../link-button";
import { PawsBgCard } from "./components/paws-bg-card";
import { Edit } from "lucide-react";
export function HomeHeroSection() {
  return (
    <section className="isolate">
      <MaxWidthWrapper className="relative flex flex-col items-center gap-4 py-4 lg:flex-row lg:items-stretch lg:py-20">
        <PawsBgCard
          className="flex w-[min(800px,100%)] flex-col items-start justify-center gap-4 lg:py-12 2xl:aspect-[16/10] 2xl:translate-y-20"
          childrenClassName="space-y-6 lg:space-y-12"
        >
          <div className="space-y-4">
            <H1 className="text-background max-w-2xl">
              Kompleksowa opieka dla Twojego zwierzaka
            </H1>
            <Text className="text-background max-w-xl" size="subtitle">
              Specjalistyczne usługi weterynaryjne i rezerwacja online 24/7
            </Text>
          </div>
          <div className="flex gap-4">
            <LinkButton
              href="/"
              className="border-secondary w-full border-2 text-lg lg:w-auto"
              size="lg"
              variant="secondary"
            >
              <Edit /> Umów wizytę online
            </LinkButton>
            <LinkButton
              href="/"
              className="text-primary-foreground bg-primary hover:bg-primary/50 hidden border-2 border-white text-lg font-bold lg:flex"
              size="lg"
              variant="outline"
            >
              Poznaj nasz zespół
            </LinkButton>
          </div>
        </PawsBgCard>
        <div className="relative right-0 flex max-w-200 flex-col gap-4 overflow-hidden rounded-lg shadow-lg 2xl:absolute">
          <Image
            src="/images/home-hero.jpg"
            alt="Właścicielka z zadowolonem psem"
            width={800}
            height={500}
            className="h-full w-auto object-cover 2xl:aspect-[16/10]"
          />
          <div className="bg-primary/10 absolute inset-0"></div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
