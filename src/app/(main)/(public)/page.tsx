import { HydrateClient } from "@/trpc/server";

import { getCurrentUser } from "@/auth/current-user";
import Link from "next/link";
import { Edit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HomeHeroSection } from "@/components/sections/home-hero-section";

export default async function Home() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <HydrateClient>
      <div className="container mx-auto md:p-4">
        <Link href="/visits/new" className={buttonVariants()}>
          <Edit /> Umów wizytę
        </Link>
        <HomeHeroSection />
      </div>
    </HydrateClient>
  );
}
