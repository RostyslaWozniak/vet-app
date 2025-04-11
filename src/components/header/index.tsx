import { getCurrentUser } from "@/auth/current-user";
import { UserButton } from "../user-button";
import Link from "next/link";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { LinkButton } from "../link-button";
import { Edit } from "lucide-react";
import { Separator } from "../ui/separator";

export async function Header() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  return (
    <header className="bg-card text-card-foreground sticky top-0 z-30 h-16 w-full">
      <MaxWidthWrapper className="flex h-full items-center justify-between">
        <Link href="/" className="font-montserrat text-3xl font-bold">
          <span className="text-primary">Vet</span>App
        </Link>
        <div className="flex items-center gap-4">
          <LinkButton href="/appointments/new">
            <Edit /> Umów wizytę
          </LinkButton>
          <Separator
            orientation="vertical"
            className="bg-foreground/50 hidden min-h-8 lg:flex"
          />
          <div className="hidden lg:flex">
            <UserButton user={fullUser} />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
