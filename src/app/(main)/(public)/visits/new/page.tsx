import { H2 } from "@/components/typography";
import { db } from "@/server/db";
import { ServiceCard } from "../../../../../components/cards/service-card";
import Link from "next/link";

export default async function NewVisitPage() {
  const services = await db.service.findMany({
    where: {
      isActive: true,
      vetServices: {
        some: {
          vetId: {
            not: undefined,
          },
        },
      },
    },
  });
  return (
    <div className="space-y-3">
      <H2 className="sm:!text-start">Wybierz usługe</H2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Link
            href={`/visits/new/date?serviceId=${service.id}`}
            key={service.id}
          >
            <ServiceCard service={service} />
          </Link>
        ))}
      </div>
    </div>
  );
}
