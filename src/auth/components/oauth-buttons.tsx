import { Button } from "@/components/ui/button";
import { oAuthSignIn } from "../actions/oauth-sign-in";
import { GoogleLogo } from "@/components/icons/google";

export function OAuthButtons() {
  return (
    <div>
      <Button
        type="button"
        onClick={async () => await oAuthSignIn("google")}
        className="w-full"
        variant="outline"
      >
        <GoogleLogo /> Google
      </Button>
      <div className="mt-4 flex items-center">
        <span className="bg-muted-foreground h-px flex-1" />
        <span className="text-muted-foreground px-2">lub</span>
        <span className="bg-muted-foreground h-px flex-1" />
      </div>
    </div>
  );
}
