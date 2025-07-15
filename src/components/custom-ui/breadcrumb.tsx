"use client";

import Link from "next/link";
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { HomeIcon } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (pathname.includes("/appointments/")) return null;

  let currentLink = "";

  const crumbs = pathname.split("/").filter((crumb) => crumb !== "");

  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-x-2">
              <HomeIcon /> Start
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {crumbs.map((crumb, index) => {
          currentLink += `/${crumb}`;
          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              {index < crumbs.length - 1 ? (
                <>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink asChild>
                      <Link href={currentLink} className="capitalize">
                        {crumb}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {crumb}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
}
