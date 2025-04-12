import { H2, Text } from "@/components/typography";
import { cn } from "@/lib/utils";

export function SectionHeadingSubtitle({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
}: {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 md:flex-row">
      <H2 className={cn(titleClassName)}>{title}</H2>
      <div className="bg-paws-primary h-full min-h-10.5 w-full flex-grow"></div>
      {subtitle && (
        <Text className={cn(subtitleClassName)} size="subtitle">
          {subtitle}
        </Text>
      )}
    </div>
  );
}
