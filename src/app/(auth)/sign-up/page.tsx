import { FormContainer } from "@/auth/components/form-wrapper";
import { SignUpForm } from "@/auth/components/sign-up-form";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";

export default function SignUp() {
  return (
    <div className="flex h-full flex-grow flex-col">
      <Header />
      <main className="my-4 flex-grow lg:my-20">
        <div className="my-24 flex justify-center md:my-0">
          <FormContainer
            title="Rejestracja"
            description="Stwórz swoje konto"
            linkLabel="Już masz konto? Zaloguj się!"
            href="/sign-in"
            imageUrl="/sign-up.jpg"
          >
            <SignUpForm />
          </FormContainer>
        </div>
      </main>
      <MobileNav />
      <Footer />
    </div>
  );
}
