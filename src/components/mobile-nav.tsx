"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, Plus, Search, User, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItemsList = [
  { id: 1, href: "/", label: "Start", icon: HomeIcon },
  { id: 2, href: "/appointments", label: "Szukaj", icon: Search },
  { id: 3, href: "/profile", label: "Profil", icon: User },
  { id: 4, href: "/appointments/new", label: "Umów", icon: Plus },
];

export function MobileNav() {
  const pathname = usePathname();

  if (pathname.includes("/appointments/new/")) return null;

  if (pathname.startsWith("/vet") || pathname.startsWith("/admin")) return null;
  return (
    <nav className="bg-primary/20 text-foreground fixed right-2 bottom-2 left-2 z-50 mx-auto max-w-[400px] rounded-full shadow-[0px_0px_20px_6px_#22D3EE20] backdrop-blur-lg md:hidden">
      <div className="grid translate-y-2 grid-cols-4">
        {navItemsList.map(({ id, href, label, icon }) => (
          <Link href={href} key={id}>
            <MobileNavItem
              label={label}
              icon={icon}
              isActive={pathname === href}
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}

function MobileNavItem({
  icon: Icon,
  label,
  isActive,
  className,
}: {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center gap-y-0.5 pb-3", className)}>
      <div
        className={cn("bg-card dark:bg-popover rounded-full p-1.5", {
          "bg-primary text-primary-foreground": isActive,
        })}
      >
        <Icon />
      </div>
      <span className="sr-only">{`link to ${label}`}</span>
      <div className="text-xs">{label}</div>
    </div>
  );
}
