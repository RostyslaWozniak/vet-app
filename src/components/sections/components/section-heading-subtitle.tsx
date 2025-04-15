import { H2, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

export function SectionHeadingSubtitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 md:flex-row md:items-center",
        className,
      )}
    >
      <H2 className={cn("text-start text-2xl", titleClassName)}>{title}</H2>
      <div className="bg-paws-primary hidden h-full min-h-10.5 w-full flex-grow md:block"></div>
      {subtitle && (
        <Text className={cn(subtitleClassName)} size="subtitle">
          {subtitle}
        </Text>
      )}
    </div>
  );
}
