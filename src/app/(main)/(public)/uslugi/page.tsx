import { ServicesSection } from "./_components/sections/services-section";

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Dynamic Services Section */}
      <ServicesSection />
    </div>
  );
}
