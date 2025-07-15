import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Stethoscope, GraduationCapIcon } from "lucide-react";
import { PawsBgCard } from "@/components/sections/components/paws-bg-card";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeading } from "@/components/sections/components/section-heading";
import { Avatar } from "@/components/custom-ui/avatar";
import { Badge } from "@/components/ui/badge";
import { H2 } from "@/components/typography";

export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="-mb-12 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="">
        <MaxWidthWrapper>
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl">
              Twoje zwierzę, nasza troska
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              W naszej przychodni weterynaryjnej łączymy nowoczesną medycynę z
              troską, która wynika z miłości do zwierząt. Powstaliśmy z potrzeby
              stworzenia miejsca, gdzie opiekunowie zwierząt mogą liczyć nie
              tylko na fachową pomoc, ale też na zrozumienie, empatię i
              indywidualne podejście.
            </p>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-16">
        <MaxWidthWrapper>
          <SectionHeadingSubtitle
            title="Nasz zespół"
            subtitle="Poznaj naszych doświadczonych weterynarzy, którzy z pasją dbają o
            zdrowie Twoich pupili"
            className="hidden md:flex"
            titleClassName="text-nowrap"
          />
          <H2 className="text-start text-2xl md:hidden">Nasz zespół</H2>

          <VetsSection />
        </MaxWidthWrapper>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white py-16">
        <div className="mb-12 text-center">
          <SectionHeading>Co nas wyróżnia?</SectionHeading>
        </div>
        <MaxWidthWrapper>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <span className="font-bold text-green-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Stałe podnoszenie kwalifikacji
                  </h3>
                  <p className="text-gray-600">
                    Kursy, certyfikaty, kongresy - zawsze na bieżąco z
                    najnowszymi osiągnięciami medycyny weterynaryjnej
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <span className="font-bold text-green-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Specjalizacje
                  </h3>
                  <p className="text-gray-600">
                    Interna, diagnostyka obrazowa, dermatologia, chirurgia -
                    każda dziedzina w rękach eksperta
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <span className="font-bold text-green-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Współpraca ze specjalistami
                  </h3>
                  <p className="text-gray-600">
                    Sieć kontaktów z najlepszymi specjalistami z całej Polski
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <span className="font-bold text-green-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Nowoczesny sprzęt i technologie
                  </h3>
                  <p className="text-gray-600">
                    Najnowocześniejsze urządzenia diagnostyczne i terapeutyczne
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <span className="font-bold text-green-600">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Komfortowe wnętrza
                  </h3>
                  <p className="text-gray-600">
                    Nowoczesne, przyjazne zwierzętom wnętrza zapewniające
                    komfort podczas wizyty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Values */}
      {/* <section className="bg-blue-50 py-16">
        <div className="mb-12 text-center lg:mb-20">
          <SectionHeading>Nasze wartości</SectionHeading>
        </div>
        <MaxWidthWrapper>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white p-6 text-center transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl">💙</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Szacunek</h3>
                <p className="text-gray-600">Dla zwierząt i ich właścicieli</p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 text-center transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl">💙</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Cierpliwość</h3>
                <p className="text-gray-600">
                  Każde zwierzę zasługuje na spokój i wyrozumiałość
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 text-center transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl">💙</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Rzetelność</h3>
                <p className="text-gray-600">
                  Jasno informujemy o stanie zdrowia, kosztach i leczeniu
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white p-6 text-center transition-shadow hover:shadow-lg">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl">💙</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Empatia</h3>
                <p className="text-gray-600">
                  Rozumiemy Twoje emocje, słuchamy i doradzamy
                </p>
              </CardContent>
            </Card>
          </div>
        </MaxWidthWrapper>
      </section> */}

      {/* CTA */}
      <section>
        <PawsBgCard className="!rounded-none py-16 lg:py-20" filter>
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Gotowy na wizytę?
            </h2>
            <p className="mb-8 text-xl text-gray-50">
              Umów się już dziś i przekonaj się o naszej trosce
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="z-10">
                Umów wizytę online
              </Button>
              <Button size="lg" variant="outline" className="">
                <Link href="/kontakt">Skontaktuj się z nami</Link>
              </Button>
            </div>
          </div>
        </PawsBgCard>
      </section>
    </div>
  );
}

async function VetsSection() {
  const vets = [
    {
      id: "1",
      user: {
        name: "Rostyslav Vozniak",
        photo:
          "https://lh3.googleusercontent.com/a/ACg8ocKlOVgKrs7Ez0SaICT-s8UpzY3wRV5rBf6R2yKkWzee071-HFJP=s96-c",
      },
      specialization: "Interna, Kardiologia",
      experience: 8,
      education: "SGGW Warszawa",
      description:
        "Specjalizuje się w chorobach wewnętrznych i kardiologii. Pasjonatka medycyny małych zwierząt.",
      languages: ["Polski", "Angielski"],
    },
    {
      id: "2",
      user: {
        name: "Marek Markowski",
        photo:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww",
      },
      specialization: "Chirurgia, Ortopedia",
      experience: 12,
      education: "UP Wrocław",
      description:
        "Doświadczony chirurg z wieloletnim stażem. Specjalizuje się w zabiegach ortopedycznych.",
      languages: ["Polski", "Niemiecki"],
    },
    {
      id: "3",
      user: {
        name: "Anna Wojciechowska",
        photo:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww",
      },
      specialization: "Dermatologia, Alergologia",
      experience: 6,
      education: "UWM Olsztyn",
      description:
        "Ekspertka w dziedzinie dermatologii weterynaryjnej i leczenia alergii u zwierząt.",
      languages: ["Polski", "Angielski", "Francuski"],
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}

        {/* Vets Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vets.map((vet) => (
            <Card
              key={vet.id}
              className="group border-none shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-8 text-center">
                {/* Avatar */}
                <div className="relative mb-6">
                  <Avatar
                    name={vet.user.name}
                    photo={vet.user.photo}
                    className="mx-auto h-32 w-32 ring-4 ring-blue-100 transition-all group-hover:ring-blue-200"
                  />

                  {/* Professional Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform">
                    <div className="bg-primary rounded-full p-2 text-white shadow-lg">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Name and Title */}
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {vet.user.name}
                </h3>

                {/* Specialization */}
                {vet.specialization && (
                  <Badge
                    variant="secondary"
                    className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {vet.specialization}
                  </Badge>
                )}

                {/* Description */}
                {vet.description && (
                  <p className="mb-4 text-sm leading-relaxed text-gray-600">
                    {vet.description}
                  </p>
                )}

                {/* Professional Details */}
                <div className="space-y-3 text-sm">
                  {/* Experience */}
                  {vet.experience && (
                    <div className="flex items-center justify-center text-gray-500">
                      <Award className="mr-2 h-4 w-4 text-green-600" />
                      <span>{vet.experience} lat doświadczenia</span>
                    </div>
                  )}

                  {/* Education */}
                  {vet.education && (
                    <div className="flex items-center justify-center text-gray-500">
                      <GraduationCapIcon className="mr-2 h-4 w-4 text-purple-600" />
                      <span>{vet.education}</span>
                    </div>
                  )}

                  {/* Languages */}
                  {vet.languages && vet.languages.length > 0 && (
                    <div className="mt-4 flex flex-wrap justify-center gap-1">
                      {vet.languages.map((language, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-50 text-xs hover:bg-gray-100"
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
