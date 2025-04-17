import { getCurrentUser } from "@/auth/current-user";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/");
  return <>{children} </>;
}
