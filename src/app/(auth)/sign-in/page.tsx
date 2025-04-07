import { FormContainer } from "@/auth/components/form-wrapper";
import { SignInForm } from "@/auth/components/sign-in-form";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const { oauthError } = await searchParams;

  return (
    <div className="mt-16 flex justify-center">
      <FormContainer
        title="Logowanie"
        description="Zaloguj się do swojego konta"
        linkLabel="Nie masz jeszcze konta? Zarejestruj się!"
        href={`/sign-up`}
        imageUrl="/sign-in.jpg"
      >
        <SignInForm />
      </FormContainer>
    </div>
  );
}
