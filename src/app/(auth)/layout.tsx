import { Footer } from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="my-4 min-h-[40rem] flex-grow lg:my-12">{children}</main>
      <MobileNav />
      <Footer />
    </>
  );
}
