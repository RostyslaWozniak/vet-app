import { getCurrentUser } from "@/auth/current-user";
import { H1 } from "@/components/typography";
import { buttonVariants } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MePage() {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  });

  if (!user.roles.includes("CLIENT")) return notFound();
  return (
    <div className="relative container mx-auto my-6 flex min-h-[calc(100vh-200px)] w-full flex-grow flex-col items-center">
      <H1>Mój profile</H1>
      <div className="w-full space-y-4">
        <p className="text-2xl">
          {" "}
          Cześć <span className="text-primary font-bold">{user.name}</span>
        </p>
        <Link href="/visits/new" className={buttonVariants()}>
          <Edit /> Umów wizytę
        </Link>
      </div>
    </div>
  );
}
