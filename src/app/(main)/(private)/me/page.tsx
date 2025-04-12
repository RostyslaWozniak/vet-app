import { getCurrentUser } from "@/auth/current-user";
import { LinkButton } from "@/components/link-button";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionHeading } from "@/components/sections/components/section-heading";
import { H1 } from "@/components/typography";
import { Calendar, Edit } from "lucide-react";
import { notFound } from "next/navigation";

export default async function MePage() {
  const user = await getCurrentUser({
    redirectIfNotFound: true,
    withFullUser: true,
  });

  if (!user.roles.includes("CLIENT") && !user.roles.includes("ADMIN"))
    return notFound();
  return (
    <>
      <SectionHeading heading={H1}>Mój profile</SectionHeading>
      <MaxWidthWrapper className="my-12 w-full space-y-4">
        <p className="text-2xl">
          {" "}
          Cześć <span className="text-primary font-bold">{user.name}</span>
        </p>
        <div className="flex gap-4">
          <LinkButton href="/appointments/new">
            <Edit /> Umów wizytę
          </LinkButton>
          <LinkButton href="/appointments">
            <Calendar /> Zobacz moje wizyty
          </LinkButton>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
