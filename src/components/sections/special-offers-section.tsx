import { CheckCircle, Edit } from "lucide-react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { H3, H4, Text } from "../typography";
import { SectionHeading } from "./components/section-heading";
import { PawsBgCard } from "./components/paws-bg-card";
import { LinkButton } from "../link-button";
import Image from "next/image";
import { MotionWrapper } from "../motion-wrapper";

const data = [
  {
    id: 1,
    title: "Pierwsza Wizyta – 20% Zniżki!",
    description:
      "Przyjdź do nas po raz pierwszy i skorzystaj z 20% zniżki na wszystkie usługi.",
  },
  {
    id: 2,
    title: "Pakiet Premium",
    description:
      "Zadbaj kompleksowo o swojego pupila – strzyżenie, kąpiel, pielęgnacja pazurków i uszu w atrakcyjnej cenie.",
  },
  {
    id: 3,
    title: "Program Lojalnościowy",
    description:
      "Zbieraj punkty za każdą wizytę i wymieniaj je na zniżki oraz darmowe usługi.",
  },
  {
    id: 4,
    title: "Program Lojalnościowy",
    description:
      "Zbieraj punkty za każdą wizytę i wymieniaj je na zniżki oraz darmowe usługi.",
  },
];

export function SpecialOffersSection() {
  return (
    <section className="space-y-6 md:space-y-20">
      <SectionHeading>Oferty specjalne</SectionHeading>
      <MaxWidthWrapper>
        <div className="text-card-foreground space-y-4 rounded-xl">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
            {data.map((item, i) => (
              <MotionWrapper
                key={item.id}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-start gap-2"
              >
                <div>
                  <CheckCircle className="stroke-primary h-9 w-8" />
                </div>
                <div>
                  <H3 className="text-card-foreground/80 text-xl font-bold">
                    {item.title}
                  </H3>
                  <Text className="mt-2">{item.description}</Text>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="max-w-6xl">
        <MotionWrapper
          viewport={{ once: true, margin: "0px 0px -200px 0px" }}
          transition={{ duration: 0.5 }}
          className="pt-4"
        >
          <PawsBgCard className="bg-secondary relative overflow-visible !p-0">
            <div className="flex flex-col-reverse py-8 md:grid md:grid-cols-9">
              <div className="min-h-96 sm:min-h-auto md:col-span-4">
                <Image
                  priority
                  className="absolute bottom-0"
                  src="/images/special-offers.png"
                  alt="Piesek"
                  width={400}
                  height={400}
                />
              </div>
              <div className="flex flex-col items-start gap-4 p-6 md:col-span-5">
                <H4 className="text-secondary-foreground !text-4xl [text-shadow:_0_3px_3px_rgba(0,0,0,0.2)] sm:!text-5xl">
                  Zadbaj o zdrowie swojego pupila
                </H4>
                <Text
                  size="lg"
                  className="text-secondary-foreground [text-shadow:_0_3px_3px_rgba(0,0,0,0.1)]"
                >
                  Czy wiesz, że zaleca się badanie swojego zwierzaka co pół
                  roku?
                  <br />
                  Umów się na wizytę już teraz!
                </Text>
                <LinkButton
                  href="/appointments/new"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Edit /> Umów wizytę online
                </LinkButton>
              </div>
            </div>
          </PawsBgCard>
        </MotionWrapper>
      </MaxWidthWrapper>
    </section>
  );
}
