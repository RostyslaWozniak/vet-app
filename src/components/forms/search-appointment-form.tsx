"use client";

import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export function SearchAppointmentForm() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  const router = useRouter();

  //   useEffect(() => {
  //     redirect(`/appointments?search=${search}`);
  //   }, [search]);
  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        redirect(`/appointments?search=${search}`);
      }}
    >
      <Input
        placeholder="Wyszukaj wizytę..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
