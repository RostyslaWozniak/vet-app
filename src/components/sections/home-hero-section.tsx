import Image from "next/image";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { H1 } from "../typography/h1";
import { Text } from "../typography/text";
import { Button } from "@/components/ui/button";
export function HomeHeroSection() {
  return (
    <section>
      <MaxWidthWrapper className="relative flex gap-4 border">
        <div className="bg-primary relative flex aspect-[16/10] w-200 translate-y-12 flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border p-6 shadow">
          <div className="bg-paws-white absolute inset-0 opacity-20" />
          <div className="z-10 w-full space-y-12">
            <div className="space-y-4">
              <H1 className="text-background relative z-10 max-w-2xl">
                Kompleksowa opieka dla Twojego zwierzaka
              </H1>
              <Text className="text-background max-w-xl" size="subtitle">
                Specjalistyczne usługi weterynaryjne i rezerwacja online 24/7
              </Text>
            </div>
            <div className="flex gap-4">
              <Button
                className="border-secondary border-2 text-xl"
                size="lg"
                variant="secondary"
              >
                Umów wizytę online
              </Button>
              <Button
                className="text-primary-foreground hover:bg-primary/90 border-2 bg-transparent text-xl font-bold backdrop-blur-[1px]"
                size="lg"
                variant="outline"
              >
                Nasz zespół
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute right-0 flex flex-col gap-4 overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/home-hero.jpg"
            alt="Właścicielka z zadowolonem psem"
            width={800}
            height={500}
            className="aspect-[16/10] object-cover"
          />
          <div className="bg-primary/10 absolute inset-0"></div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
