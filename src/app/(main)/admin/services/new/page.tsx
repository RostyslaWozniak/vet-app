import { H2 } from "@/components/typography";
import { CreateUpdateServiceForm } from "../_components/forms/create-update-service-form";

export default function AdminServicesNewPage() {
  return (
    <div className="space-y-8">
      <H2>Dodaj nową usługę</H2>
      <div className="mx-auto max-w-2xl">
        <CreateUpdateServiceForm />
      </div>
    </div>
  );
}
