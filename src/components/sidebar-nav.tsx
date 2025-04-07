"use client";
import IconMenu from "@/components/ui/icon-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarNav = ({
  items,
}: {
  items: {
    href: string;
    label: string;
    icon: LucideIcon;
  }[];
}) => {
  const pathname = usePathname();

  return (
    <aside className="relative min-w-min">
      <nav className="sticky top-20 space-y-8 pr-4">
        <div>
          <h2 className="mb-2 text-xs uppercase">menu</h2>
          <ul className="flex flex-col items-start gap-y-1">
            {items.map(({ href, label, icon: Icon }) => (
              <li
                key={href}
                className={cn("", {
                  "text-muted-foreground mt-2 border-t pt-2":
                    label === "Settings" || label === "Ustawienia",
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
