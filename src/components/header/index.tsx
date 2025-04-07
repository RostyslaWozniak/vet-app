import { getCurrentUser } from "@/auth/current-user";
import { UserButton } from "../user-button";
import Link from "next/link";

export async function Header() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  return (
    <header className="bg-card text-card-foreground h-16">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/" className="text-3xl font-bold">
          <span className="text-primary">Vet</span>App
        </Link>
        <UserButton user={fullUser} />
      </div>
    </header>
  );
}
