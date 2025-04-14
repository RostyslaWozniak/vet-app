// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "./ui/button";
// import { cn } from "@/lib/utils";
// import { formatEventDescription } from "@/lib/formatters";
// import Link from "next/link";
// import { CopyEventButton } from "./copy-event-button";

// type EventCardProps = {
//   id: string;
//   isActive: boolean;
//   name: string;
//   description: string | null;
//   durationInMinutes: number;
//   userId: string;
// };

// export function EventCard({
//   id,
//   isActive,
//   name,
//   description,
//   durationInMinutes,
//   userId,
// }: EventCardProps) {
//   return (
//     <Card className={cn("flex flex-col", !isActive && "border-secondary/50")}>
//       <CardHeader className={cn(!isActive && "opacity-50")}>
//         <CardTitle>{name}</CardTitle>
//         <CardDescription>
//           {formatEventDescription(durationInMinutes)}
//         </CardDescription>
//       </CardHeader>
//       {description != null && (
//         <CardContent className={cn(!isActive && "opacity-50")}>
//           {description}
//         </CardContent>
//       )}
//       <CardFooter className="mt-auto flex justify-end gap-2">
//         {isActive && (
//           <CopyEventButton variant="outline" eventId={id} userId={userId} />
//         )}
//         <Button asChild>
//           <Link href={`/events/${id}/edit`}>Edit</Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
