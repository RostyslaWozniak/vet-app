import { HydrateClient } from "@/trpc/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/auth/current-user";
import { LogOutButton } from "@/auth/components/log-out-button";

export default async function Home() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <HydrateClient>
      <div className="container mx-auto p-4">
        {fullUser == null ? (
          <div className="flex gap-4">
            <Button asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        ) : (
          <Card className="mt-4 max-w-[500px]">
            <CardHeader>
              <div className="space-y-3">
                <CardTitle>{fullUser.name}</CardTitle>
                <CardDescription>Role: {fullUser.role}</CardDescription>
              </div>
            </CardHeader>

            <CardFooter className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/private">Private Page</Link>
              </Button>
              {fullUser.role === "ADMIN" && (
                <Button asChild variant="outline">
                  <Link href="/admin">Admin Page</Link>
                </Button>
              )}
              <LogOutButton />
            </CardFooter>
          </Card>
        )}
      </div>
    </HydrateClient>
  );
}
