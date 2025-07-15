import { Button } from "@/components/ui/button";
import { Stethoscope, Heart, Scissors, Activity, Sparkles } from "lucide-react";
import Link from "next/link";
import { db } from "@/server/db";
import { SectionHeadingSubtitle } from "@/components/sections/components/section-heading-subtitle";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ServiceCard } from "@/components/cards/service-card";

// Service data structure based on your database
interface Service {
  id: string;
  name: string;
  description: string | null;
  durationInMinutes: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Function to categorize services and assign appropriate icons
function categorizeService(serviceName: string) {
  const name = serviceName.toLowerCase();

  if (name.includes("konsultacja") || name.includes("badanie")) {
    return { category: "Konsultacje", icon: Stethoscope, color: "blue" };
  }
  if (
    name.includes("szczepienie") ||
    name.includes("odrobaczanie") ||
    name.includes("czipowanie")
  ) {
    return { category: "Profilaktyka", icon: Heart, color: "green" };
  }
  if (name.includes("usg") || name.includes("rtg")) {
    return { category: "Diagnostyka", icon: Activity, color: "purple" };
  }
  if (name.includes("kastracja") || name.includes("sterylizacja")) {
    return { category: "Chirurgia", icon: Scissors, color: "red" };
  }
  if (name.includes("czyszczenie") || name.includes("zębów")) {
    return { category: "Stomatologia", icon: Sparkles, color: "pink" };
  }
  if (name.includes("dietetyczna") || name.includes("dieta")) {
    return { category: "Dietetyka", icon: Heart, color: "orange" };
  }

  return { category: "Inne", icon: Stethoscope, color: "gray" };
}

// Function to get color classes based on category
function getCategoryColors(color: string) {
  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      badge: "bg-blue-100",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
      badge: "bg-green-100",
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      badge: "bg-purple-100",
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      badge: "bg-red-100",
    },
    pink: {
      bg: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-700",
      badge: "bg-pink-100",
    },
    orange: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-700",
      badge: "bg-orange-100",
    },
    gray: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-700",
      badge: "bg-gray-100",
    },
  };
  return colors[color as keyof typeof colors] || colors.gray;
}

export async function ServicesSection() {
  const rawServices = await db.service.findMany();
  const services: Service[] = rawServices.map((s) => ({
    ...s,
    description: s.description,
  }));

  if (!services || services.length === 0) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-gray-500">Brak dostępnych usług.</p>
        </div>
      </section>
    );
  }

  // Group services by category
  const groupedServices = services.reduce(
    (acc, service) => {
      const { category } = categorizeService(service.name);
      acc[category] ??= [];
      acc[category].push(service);
      return acc;
    },
    {} as Record<string, Service[]>,
  );

  return (
    <section className="bg-white">
      <MaxWidthWrapper>
        <div className="mb-12 text-center">
          <SectionHeadingSubtitle
            title=" Nasze usługi"
            subtitle="Oferujemy kompleksową opiekę weterynaryjną dostosowaną do potrzeb
            Twojego pupila"
            className="hidden md:flex"
            titleClassName="text-nowrap"
          />
        </div>

        {/* Services by Category */}
        <div className="space-y-12">
          {Object.entries(groupedServices).map(
            ([category, categoryServices]) => {
              const { icon: Icon, color } = categorizeService(
                categoryServices[0]?.name ?? "name",
              );
              const colors = getCategoryColors(color);

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="mb-6 flex items-center">
                    <div
                      className={`rounded-lg p-3 ${colors.bg} ${colors.border} mr-4 border`}
                    >
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {category}
                    </h3>
                  </div>

                  {/* Services Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categoryServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        href={`/appointments/new/${service.id}`}
                        bookButton
                        showDescription
                      />
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-blue-50 to-green-50 p-8">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              Nie widzisz usługi, której potrzebujesz?
            </h3>
            <p className="mx-auto mb-6 max-w-2xl text-gray-600">
              Oferujemy również inne specjalistyczne usługi weterynaryjne.
              Skontaktuj się z nami, aby omówić indywidualne potrzeby Twojego
              pupila.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/kontakt">Skontaktuj się z nami</Link>
              </Button>
              <Button size="lg" variant="outline">
                Zadzwoń: +48 501 123 456
              </Button>
            </div>
          </div>
        </div>

        {/* Service Statistics */}
        <div className="mt-16 grid gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-blue-50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-blue-600">
              {services.length}
            </div>
            <div className="text-sm text-gray-600">Dostępnych usług</div>
          </div>

          <div className="rounded-lg bg-green-50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-green-600">
              {Math.round(
                services.reduce(
                  (acc, s) => acc + (s.durationInMinutes ?? 0),
                  0,
                ) / services.length,
              )}
            </div>
            <div className="text-sm text-gray-600">
              Średni czas wizyty (min)
            </div>
          </div>

          <div className="rounded-lg bg-purple-50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-purple-600">
              {Object.keys(groupedServices).length}
            </div>
            <div className="text-sm text-gray-600">Kategorii usług</div>
          </div>

          <div className="rounded-lg bg-orange-50 p-6 text-center">
            <div className="mb-2 text-3xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-gray-600">Rejestracja online</div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
