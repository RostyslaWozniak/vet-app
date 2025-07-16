"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

export function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = href === pathname;
  return (
    <Link
      href={href}
      className="relative block h-full border-b-2 border-transparent px-4 text-sm leading-12 font-medium"
    >
      {children}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="bg-primary absolute -bottom-0.5 left-0 h-1 w-full rounded-full"
        />
      )}
      {isActive && (
        <motion.div
          initial={{ opacity: 0, top: 56 }}
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 1 }}
          className="to-primary/30 absolute inset-0 bg-gradient-to-b from-transparent via-transparent"
        />
      )}
    </Link>
  );
}
