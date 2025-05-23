import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { GalleryVerticalEnd, KeyRound, Mail } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { siteConfig } from "@/lib/config/site-config";
import { SocialSignin } from "./-component/social-signin";
import { useEffect } from "react";
import { cn } from "@workspace/ui/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { EmailSignin } from "./-component/email-signin";

export const Route = createFileRoute("/(public)/auth/sign-in")({
  component: AuthPage,
});

function AuthPage() {
  const { mutate: mutatePasskey, isPending: isPendingPasskey } = useMutation({
    mutationFn: async () => {
      const res = await authClient.signIn.passkey();
      const error = res?.error;
      const data = res?.data;
      if (error) {
        console.log(error);
        toast.error(error.message);
        throw error;
      }
      console.log("passKey Singin data: ", data);
    },
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  useEffect(() => {
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void authClient.signIn.passkey({ autoFill: true });
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link
        to={siteConfig.website}
        target="_blank"
        className="flex items-center gap-2 self-center font-medium"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        {siteConfig.title}
      </Link>
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Choose your preffered sign in method</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              onClick={() => mutatePasskey()}
              disabled={isPendingPasskey}
              type="button"
            >
              <KeyRound /> Sign in with Passkey
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-4">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <SocialSignin />
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-4">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" type="button" variant="secondary">
                  <Mail />
                  Continue with Email
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Sign in with your Email and Password</DialogTitle>
                </DialogHeader>
                <EmailSignin />
              </DialogContent>
            </Dialog>
            <div className="text-center text-sm mt-6">
              Don&apos;t have an account?
              <Link
                to="/auth/sign-up"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "underline underline-offset-4 px-1",
                )}
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking sign in, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
