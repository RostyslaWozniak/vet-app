import { MaxWidthWrapper } from "../max-width-wrapper";

import { SectionHeading } from "./components/section-heading";
import { Accordion } from "../accordion";

const faqList = [
  {
    question:
      "Czy muszę umawiać wizytę z wyprzedzeniem, czy mogę przyjść z marszu?",
    answer:
      "Zalecamy wcześniejsze umówienie wizyty, aby skrócić czas oczekiwania i zapewnić komfort Tobie i Twojemu pupilowi. W nagłych przypadkach przyjmujemy także bez rejestracji – prosimy jednak o wcześniejszy telefon, jeśli to możliwe.",
  },
  {
    question:
      "Jak przygotować zwierzę do zabiegu chirurgicznego (np. kastracji, sterylizacji)?",
    answer:
      "Zwierzę powinno być na czczo przez co najmniej 8–12 godzin przed zabiegiem (brak jedzenia, woda dozwolona do 2h przed). W dniu zabiegu prosimy przyjść punktualnie.",
  },
  {
    question: "Od jakiego wieku mogę zaszczepić szczeniaka lub kociaka?",
    answer:
      "Pierwsze szczepienia wykonujemy zazwyczaj w 6–8 tygodniu życia. Szczepienia są podawane w seriach, zgodnie z kalendarzem szczepień.",
  },
  {
    question: "Czy moje zwierzę może mieć czipa? I po co?",
    answer:
      "Tak, każde zwierzę domowe może (i powinno!) zostać zaczipowane. Mikroczip pozwala zidentyfikować zwierzę i odnaleźć właściciela w razie zaginięcia.",
  },
  {
    question: "Jak często powinienem odrobaczać mojego psa lub kota?",
    answer:
      "Dorosłe zwierzęta zazwyczaj odrobacza się co 3 miesiące. Szczenięta i kocięta częściej – co 2 tygodnie przez pierwsze miesiące życia.",
  },
  {
    question: "Czy oferujecie wizyty domowe?",
    answer:
      "Tak, w wyjątkowych przypadkach możliwa jest wizyta domowa. Prosimy o wcześniejszy kontakt telefoniczny w celu umówienia takiej wizyty.",
  },
  {
    question:
      "Jakie objawy powinny skłonić mnie do natychmiastowej wizyty u weterynarza?",
    answer:
      "Nagła apatia, wymioty, biegunka, duszności, drgawki, krew w moczu/kału, urazy lub zmiana zachowania – to sygnały alarmowe. Skontaktuj się z nami od razu.",
  },
];

export function FAQSection() {
  return (
    <section className="space-y-8 lg:space-y-20">
      <SectionHeading>Czesto zadawane pytania (FAQ)</SectionHeading>
      <MaxWidthWrapper className="flex max-w-4xl flex-col items-center">
        <Accordion questions={faqList} />
      </MaxWidthWrapper>
    </section>
  );
}
