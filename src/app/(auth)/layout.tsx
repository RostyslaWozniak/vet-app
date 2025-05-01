import { getCurrentUser } from "@/auth/current-user";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { redirect } from "next/navigation";
import { SessionProvider } from "../session-provider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (user) redirect("/");
  return (
    <SessionProvider user={user}>
      <Header />
      <main className="my-4 min-h-[40rem] flex-grow lg:my-12">{children}</main>
      <MobileNav />
      <Footer />
    </SessionProvider>
  );
}
