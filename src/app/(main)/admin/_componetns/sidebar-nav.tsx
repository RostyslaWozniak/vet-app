"use client";
import IconMenu from "@/components/ui/icon-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Cat, Home, Package, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

<div className="bg-gray-800">
  <h1 className="mb-8 text-4xl">Panel Adnima</h1>
  <ul className="flex gap-4">
    <li>
      <Link href="/admin">Panel Admina</Link>
    </li>
    <li>
      <Link href="/admin/clients">Klienci</Link>
    </li>
    <li>
      <Link href="/admin/vets">Weterynarze</Link>
    </li>
    <li>
      <Link href="/admin/services">Usługi</Link>
    </li>
  </ul>
</div>;

const sidebarItems = [
  {
    href: "/admin",
    label: "Panel Admina",
    icon: Home,
  },
  {
    href: "/admin/services",
    label: "Usługi",
    icon: Package,
  },
  {
    href: "/admin/clients",
    label: "Klienci",
    icon: Users,
  },
  {
    href: "/admin/vets",
    label: "Weterynarze",
    icon: Cat,
  },
];

export const SidebarNav = () => {
  const pathname = usePathname();
  return (
    <aside className="relative min-w-min">
      <nav className="sticky top-20 space-y-8 pr-4">
        <div>
          <h2 className="mb-2 text-xs uppercase">menu</h2>
          <ul className="flex flex-col items-start gap-y-1">
            {sidebarItems.map(({ href, label, icon: Icon }) => (
              <li
                key={href}
                className={cn("", {
                  "text-muted-foreground mt-2 border-t pt-2":
                    label === "Settings",
                })}
              >
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({
                      variant:
                        pathname.split("/")[2] === href.split("/")[2]
                          ? "secondary"
                          : "ghost",
                      size: "lg",
                    }),
                  )}
                >
                  <IconMenu
                    icon={Icon}
                    text={label}
                    className="text-base"
                    iconSize={24}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
};
