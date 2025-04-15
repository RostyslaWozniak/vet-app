"use client";

import { Calendar, HomeIcon, Plus, User, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/join")) return null;
  return (
    <nav className="bg-primary/20 text-foreground fixed right-2 bottom-2 left-2 z-50 mx-auto max-w-[400px] rounded-full shadow-[0px_0px_20px_6px_#22D3EE20] backdrop-blur-lg md:hidden">
      <div className="grid translate-y-2 grid-cols-4">
        <Link href="/">
          <MobileNavItem label="Start" icon={HomeIcon} />
        </Link>
        <Link href="/profile/appointments">
          <MobileNavItem label="Wizyty" icon={Calendar} />
        </Link>
        <Link href="/profile">
          <MobileNavItem label="Profil" icon={User} />
        </Link>

        <Link href="/appointments/new">
          <MobileNavItem label="Umów" icon={Plus} />
        </Link>
      </div>
    </nav>
  );
}

function MobileNavItem({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-y-0.5 pb-3">
      <div className="bg-card dark:bg-popover rounded-full p-1.5">
        <Icon className="" />
      </div>
      <span className="sr-only">{`link to ${label}`}</span>
      <div className="text-xs">{label}</div>
    </div>
  );
}
