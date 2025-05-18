"use client";

import { useQueryState } from "nuqs";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { LoaderIcon } from "lucide-react";

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
  const [isPending, startTransition] = useTransition();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [search, setSearch] = useQueryState(`${searchKey}`, {
    defaultValue: "",
  });
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (isFirstRender) return setIsFirstRender(false);
    startTransition(() => {
      router.push(
        `${path}${debouncedSearch ? `?${searchKey}=${debouncedSearch}` : ""}`,
      );
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, path, router, searchKey]);
  return (
    <>
      <form className="relative flex items-center gap-2">
        <Input
          autoFocus={autoFocus}
          placeholder={inputPlaceholder}
          value={search}
          onChange={async (e) => {
            await setSearch(e.target.value);
          }}
        />
      </form>
      {isPending && (
        <div className="bg-card/10 fixed inset-0 flex items-center justify-center backdrop-blur-[2px]">
          <LoaderIcon className="animate-spin" />
        </div>
      )}
    </>
  );
}
