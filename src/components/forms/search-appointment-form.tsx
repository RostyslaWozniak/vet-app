"use client";

import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { redirect } from "next/navigation";

type SearchAppointmentFormProps = {
  path: string;
  searchKey: string;
  inputPlaceholder: string;
};

export function SearchAppointmentForm({
  path,
  searchKey,
  inputPlaceholder,
}: SearchAppointmentFormProps) {
  const [search, setSearch] = useQueryState(`${searchKey}`, {
    defaultValue: "",
  });

  async function hendleSearch(value: string) {
    console.log({ searchKey, path, inputPlaceholder });
    await setSearch(value);
    setTimeout(() => {
      redirect(`${path}${value ? `?${searchKey}=${value}` : ""}`);
    }, 300);
  }
  return (
    <form className="flex items-center gap-2">
      <Input
        placeholder={inputPlaceholder}
        value={search}
        onChange={(e) => hendleSearch(e.target.value)}
      />
    </form>
  );
}
