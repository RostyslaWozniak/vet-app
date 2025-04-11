import { H2 } from "@/components/typography";

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center">
      <div className="bg-paws-primary h-full min-h-10.5 w-full flex-grow"></div>
      <H2 className="px-2 text-3xl font-bold sm:text-nowrap md:px-8">
        {children}
      </H2>
      <div className="bg-paws-primary h-full min-h-10.5 w-full flex-grow"></div>
    </div>
  );
}
