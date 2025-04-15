import { FormContainer } from "@/auth/components/form-wrapper";
import { SignInForm } from "@/auth/components/sign-in-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const { oauthError } = await searchParams;

  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="my-4 flex-grow lg:my-20">
        <div className="my-24 flex justify-center md:my-0">
          <FormContainer
            title="Logowanie"
            description="Zaloguj się do swojego konta"
            error={oauthError}
            linkLabel="Nie masz jeszcze konta? Zarejestruj się!"
            href={`/sign-up`}
            imageUrl="/sign-in.jpg"
          >
            <SignInForm />
          </FormContainer>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
}
