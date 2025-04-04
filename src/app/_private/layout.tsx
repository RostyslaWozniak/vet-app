import { getCurrentUser } from "@/auth/current-user";
import { NavLink } from "@/components/nav-link";
import { UserButton } from "@/components/user-button";
import { CalendarRange } from "lucide-react";
import { type ReactNode } from "react";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const fullUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });
  return (
    <>
      <header className="bg-card flex border-b py-2">
        <nav className="container mx-auto flex items-center gap-6 text-sm font-medium">
          <div className="mr-auto flex items-center gap-2 font-semibold">
            <CalendarRange className="size-6" />
            <span className="sr-only md:not-sr-only">Calendar</span>
          </div>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/schedule">Schedule</NavLink>
          <div className="ml-auto size-10">
            <UserButton fullUser={fullUser} />
          </div>
        </nav>
      </header>
      <main className="container mx-auto my-6">{children}</main>
    </>
  );
}
