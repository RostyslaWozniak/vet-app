"use client";

import { SidebarNav } from "@/components/sidebar-nav";
import { Calendar, Cat, Home, Package, Users } from "lucide-react";

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
  {
    href: "/admin/schedule",
    label: "Grafiki",
    icon: Calendar,
  },
];

export function AdminNav() {
  return <SidebarNav items={sidebarItems} />;
}
