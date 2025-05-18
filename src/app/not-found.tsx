import { LinkButton } from "@/components/link-button";
import { ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <h1 className="text-foreground text-6xl font-extrabold tracking-tight sm:text-8xl">
          404
        </h1>

        <h2 className="text-foreground text-2xl font-semibold tracking-tight">
          Nie znaleziono strony
        </h2>

        <p className="text-muted-foreground">
          Przepraszamy, nie znaleźliśmy strony, której szukasz. Mogła zostać
          przeniesiona, usunięta lub nigdy nie istniała.
        </p>

        <LinkButton
          href="/"
          size="lg"
          className="group w-full gap-2 sm:w-auto sm:min-w-100"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Na główną
        </LinkButton>
      </div>
    </div>
  );
}
