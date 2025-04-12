import { type H1, H2, type H3 } from "@/components/typography";

export function SectionHeading({
  children,
  heading: Heading = H2,
}: {
  children: React.ReactNode;
  heading?: typeof H1 | typeof H2 | typeof H3;
}) {
  return (
    <div className="flex w-full items-center">
      <div className="bg-paws-primary h-full min-h-10.5 w-full flex-grow"></div>
      <Heading className="px-2 text-3xl font-bold sm:text-nowrap md:px-8">
        {children}
      </Heading>
      <div className="bg-paws-primary h-full min-h-10.5 w-full flex-grow"></div>
    </div>
  );
}
