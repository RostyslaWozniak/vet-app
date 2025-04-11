import { CheckCircle, Edit } from "lucide-react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { H3, H4, Text } from "../typography";
import { SectionHeading } from "./components/section-heading";
import { PawsBgCard } from "./components/paws-bg-card";
import { LinkButton } from "../link-button";
import Image from "next/image";

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
    <section className="space-y-12 md:space-y-28">
      <SectionHeading>Specjalne oferty</SectionHeading>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-2.5 md:grid-cols-2">
        {data.map((item) => (
          <div key={item.id} className="flex items-start gap-2">
            <div>
              <CheckCircle className="stroke-primary h-8 w-8" />
            </div>
            <div>
              <H3 className="text-2xl font-bold">{item.title}</H3>
              <Text className="mt-2">{item.description}</Text>
            </div>
          </div>
        ))}
      </div>
      <MaxWidthWrapper className="max-w-6xl">
        <PawsBgCard className="bg-secondary relative overflow-visible !p-0">
          <div className="flex flex-col-reverse py-8 md:grid md:grid-cols-9">
            <div className="min-h-96 sm:min-h-auto md:col-span-4">
              <Image
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
                Czy wiesz, że zaleca się badanie swojego zwierzaka co pół roku?
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
      </MaxWidthWrapper>
    </section>
  );
}
