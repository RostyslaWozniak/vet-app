import { getCurrentUser } from "@/auth/current-user";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ToggleRoleButton } from "./toggle-role-button";

export default async function PrivatePage() {
  const currentUser = await getCurrentUser({ redirectIfNotFound: true });

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-4xl">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
