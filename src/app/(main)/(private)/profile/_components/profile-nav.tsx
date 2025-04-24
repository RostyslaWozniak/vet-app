"use client";

import { LinkButton } from "@/components/link-button";
import { cn } from "@/lib/utils";
import {
  User,
  History,
  Plus,
  CalendarSearch,
  Calendar,
  Clock,
} from "lucide-react";
import { usePathname } from "next/navigation";

const PROFILE_NAV_ITEMS = [
  { id: 1, label: "Mój profil", icon: User, href: "/profile" },
  {
    id: 2,
    label: "Historia wizyt",
    icon: History,
    href: "/profile/appointments/history",
  },
  { id: 3, label: "Nowa wizyta", icon: Plus, href: "/appointments/new" },
  {
    id: 4,
    label: "Wszystkie wizyty",
    icon: CalendarSearch,
    href: "/profile/appointments",
  },
  {
    id: 5,
    label: "Zaplanowane wizyty",
    icon: Calendar,
    href: "/profile/appointments/active",
  },
  {
    id: 6,
    label: "Zakończone wizyty",
    icon: Clock,
    href: "/profile/appointments/finished",
  },
];

export function ProfileNav() {
  const pathname = usePathname();
  return (
    <nav className="scrollbar-hide -mx-2.5 mt-6 flex gap-2 overflow-scroll px-2.5 md:flex-wrap">
      {PROFILE_NAV_ITEMS.map(({ id, label, icon: Icon, href }) => (
        <LinkButton
          key={id}
          variant="outline"
          href={href}
          className={cn({
            "border-primary text-primary": pathname === href,
          })}
        >
          <Icon
            className={cn({
              "text-primary-foreground bg-primary min-h-5 min-w-5 rounded-full stroke-4 p-0.5":
                href === "/appointments/new",
            })}
          />{" "}
          {label}
        </LinkButton>
      ))}
    </nav>
  );
}
