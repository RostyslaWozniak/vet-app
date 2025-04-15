import { type H1, H2, type H3 } from "@/components/typography";
import { cn } from "@/lib/utils";

export function SectionHeading({
  children,
  heading: Heading = H2,
  titleClassName,
}: {
  children: React.ReactNode;
  titleClassName?: string;
  heading?: typeof H1 | typeof H2 | typeof H3;
}) {
  return (
    <div className="flex w-full items-center">
      <div className="bg-paws-primary hidden h-full min-h-10.5 w-full flex-grow md:block"></div>
      <Heading
        className={cn(
          "px-2 text-start text-2xl font-bold sm:text-nowrap md:px-8 md:text-center",
          titleClassName,
        )}
      >
        {children}
      </Heading>
      <div className="bg-paws-primary hidden h-full min-h-10.5 w-full flex-grow md:block"></div>
    </div>
  );
}
