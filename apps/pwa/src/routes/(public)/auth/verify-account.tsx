import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { buttonVariants } from "@workspace/ui/components/button";
import { GalleryVerticalEnd, Inbox, MailCheck } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { siteConfig } from "@/lib/config/site-config";
import { toast } from "sonner";

export const Route = createFileRoute("/(public)/auth/verify-account")({
  component: RouteComponent,
});

function RouteComponent() {
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
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Account Created Successfully</CardTitle>
            <CardDescription>Please verify your email address</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MailCheck className="size-6 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <p>We've sent a verification link to your email address.</p>
              <p>
                Please check your inbox and click on the verification link to activate
                your account.
              </p>
              <p className="text-sm text-muted-foreground">
                After clicking the link, you'll be automatically signed in and verified.
              </p>
            </div>
            <div className="flex flex-col w-full gap-2 mt-2">
              <a
                href="mailto:"
                className={cn(buttonVariants({ variant: "outline" }), "w-full")}
              >
                Open Email Inbox
              </a>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          If you didn't receive the email, please check your spam folder or{" "}
          <button
            onClick={() =>
              toast.warning("Not working?", {
                description: "Please contact support if you need help",
                action: {
                  label: <Inbox className="size-4" />,
                  onClick: () => {
                    window.open("mailto:support@example.com", "_blank");
                  },
                },
              })
            }
            className="underline cursor-pointer"
          >
            request a new verification link
          </button>
          .
        </div>
      </div>
    </div>
  );
}
