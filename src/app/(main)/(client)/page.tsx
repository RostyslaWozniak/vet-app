import { HydrateClient } from "@/trpc/server";

import { getCurrentUser } from "@/auth/current-user";

export default async function Home() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <HydrateClient>
      <div className="container mx-auto md:p-4">
        <h1 className="mb-8 text-4xl">Public Home Page</h1>
      </div>
    </HydrateClient>
  );
}
