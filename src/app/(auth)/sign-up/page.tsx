import { FormContainer } from "@/auth/components/form-wrapper";
import { SignUpForm } from "@/auth/components/sign-up-form";

export default function SignUp() {
  return (
    <div className="mt-16 flex justify-center">
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
  );
}
