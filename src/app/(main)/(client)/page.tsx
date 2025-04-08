import { HydrateClient } from "@/trpc/server";

import { getCurrentUser } from "@/auth/current-user";
import Link from "next/link";
import { Edit } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default async function Home() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <HydrateClient>
      <div className="container mx-auto md:p-4">
        <h1 className="mb-8 text-4xl">Public Home Page</h1>
        <Link href="/visits/new" className={buttonVariants()}>
          <Edit /> Umów wizytę
        </Link>
      </div>
    </HydrateClient>
  );
}
