import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { GalleryVerticalEnd, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config/site-config";
import { EmailSignup } from "./-component/email-signup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { SocialSignin } from "./-component/social-signin";
import { cn } from "@workspace/ui/lib/utils";

export const Route = createFileRoute("/(public)/auth/sign-up")({
  component: SignUpPage,
});

function SignUpPage() {
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
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription>Create you account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <SocialSignin />
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border my-6">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" type="button" variant="secondary">
                  <Mail />
                  Sign up with email instead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Sign up with your Email and Password</DialogTitle>
                </DialogHeader>
                <EmailSignup />
              </DialogContent>
            </Dialog>
            <div className="text-center text-sm mt-4">
              Already have an account?
              <Link
                to="/auth/sign-in"
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "underline underline-offset-4 px-1",
                )}
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking sign up, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
