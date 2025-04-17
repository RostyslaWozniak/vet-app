import { FormContainer } from "@/auth/components/form-wrapper";
import { SignUpForm } from "@/auth/components/sign-up-form";

export default function SignUp() {
  return (
    <div className="my-24 flex justify-center md:my-0">
      <FormContainer
        title="Rejestracja"
        // description="Stwórz swoje konto"
        linkLabel="Już masz konto? Zaloguj się!"
        href="/sign-in"
        imageUrl="/sign-up.jpg"
      >
        <SignUpForm />
      </FormContainer>
    </div>
  );
}
