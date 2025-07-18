import { UserButton } from "../user-button";
import Link from "next/link";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { LinkButton } from "../link-button";
import { Edit } from "lucide-react";
import { Separator } from "../ui/separator";
import { Nav } from "./nav";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export async function Header() {
  return (
    <header className="bg-card/60 text-card-foreground top-0 z-30 h-12 w-full backdrop-blur md:sticky">
      <MaxWidthWrapper className="flex h-full max-w-[1600px] items-center justify-between">
        <Link href="/" className="font-montserrat text-3xl font-bold">
          <span className="text-primary">Book</span>App
        </Link>
        <div className="hidden md:block">
          <Nav />
        </div>
        <div className="flex items-center">
          <div className="mr-4 hidden items-center gap-4 md:flex">
            <LinkButton href="/appointments/new">
              <Edit /> Umów wizytę
            </LinkButton>
            <Separator
              orientation="vertical"
              className="bg-foreground/50 hidden min-h-8 lg:flex"
            />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <UserButton />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
