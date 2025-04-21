"use client";

import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Loader } from "lucide-react";

type SearchFormProps = {
  path: string;
  searchKey: string;
  inputPlaceholder: string;
  autoFocus?: boolean;
};

export function SearchForm({
  path,
  searchKey,
  inputPlaceholder,
  autoFocus = false,
}: SearchFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useQueryState(`${searchKey}`, {
    defaultValue: "",
  });
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    router.push(
      `${path}${debouncedSearch ? `?${searchKey}=${debouncedSearch}` : ""}`,
    );
    setIsLoading(false);
  }, [debouncedSearch, path, router, searchKey]);
  return (
    <form className="relative flex items-center gap-2">
      <Input
        autoFocus={autoFocus}
        placeholder={inputPlaceholder}
        value={search}
        onChange={async (e) => {
          await setSearch(e.target.value);
          if (!isLoading) setIsLoading(true);
        }}
      />
      {isLoading && <Loader className="absolute right-2 animate-spin" />}
    </form>
  );
}
