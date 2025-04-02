import { SignUpForm } from "@/auth/components/sign-up-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUp() {
  return (
    <div className="container mx-auto max-w-[750px] p-4">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
