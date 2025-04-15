import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { authClient } from "@/lib/auth-client";
import { Github } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  async function handleSignIn() {
    try {
      const data = await authClient.signIn.social({
        /**
         * The social provider id
         * @example "github", "google", "apple"
         */
        provider: "github",
        /**
         * A URL to redirect after the user authenticates with the provider
         * @default "/"
         */
        callbackURL: "/dashboard",
        /**
         * A URL to redirect if an error occurs during the sign in process
         */
        errorCallbackURL: "/error",
        /**
         * A URL to redirect if the user is newly registered
         */
        newUserCallbackURL: "/welcome",
        /**
         * disable the automatic redirect to the provider.
         * @default false
         */
        // disableRedirect: true,
      });
      window.sessionStorage.setItem("xxxx", JSON.stringify(data));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Button onClick={handleSignIn}>
        <Github className="w-4 h-4" />
        Sign in
      </Button>
    </div>
  );
}
