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
    <aside className="relative w-screen xl:w-min xl:min-w-min">
      <nav className="sticky top-20 space-y-8 pr-4">
        <div>
          <h2 className="mb-2 text-xs uppercase">menu</h2>
          <ul className="scrollbar-hide -mx-2.5 flex items-start gap-2 overflow-x-scroll xl:flex-col">
            {items.map(({ href, label, icon: Icon }) => (
              <li
                key={href}
                className={cn("", {
                  "xl:text-muted-foreground xl:mt-2 xl:border-t xl:pt-2":
                    label === "Settings" || label === "Ustawienia",
                })}
              >
                <Link
                  href={href}
                  className={cn(
                    buttonVariants({
                      variant: pathname === href ? "secondary" : "ghost",
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
