"use client";

import { SidebarNav } from "@/components/sidebar-nav";
import { Calendar, Home, PawPrint, Settings } from "lucide-react";

const sidebarItems = [
  {
    href: "/vet",
    label: "Panel Weterynarza",
    icon: Home,
  },
  {
    href: "/vet/schedule",
    label: "Grafik",
    icon: Calendar,
  },
  {
    href: "/vet/services",
    label: "Usługi",
    icon: PawPrint,
  },
  {
    href: "/vet/settings",
    label: "Ustawienia",
    icon: Settings,
  },
];

export function VetNav() {
  return <SidebarNav items={sidebarItems} />;
}
