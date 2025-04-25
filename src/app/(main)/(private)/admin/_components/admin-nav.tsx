"use client";

import { SidebarNav } from "@/components/sidebar-nav";
import { Cat, Home, Package, Users } from "lucide-react";

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

export function AdminNav() {
  return <SidebarNav items={sidebarItems} />;
}
