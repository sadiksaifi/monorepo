import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { HOME } from "@/lib/utils/constants";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle/vite";
import { Info } from "lucide-react";
import { buttonVariants } from "@workspace/ui/components/button";
import { siteConfig } from "@/lib/config/site-config";
import { cn } from "@workspace/ui/lib/utils";

export const Route = createFileRoute("/(public)/auth")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: HOME,
      });
    }
  },
});

function HelpButton() {
  const href = `mailto:${siteConfig.email}?subject=Help Request&body=I need assistance with:`;

  return (
    <a
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "icon",
        }),
      )}
      href={href}
    >
      <Info className="h-[1.2rem] w-[1.2rem]" />
    </a>
  );
}

function RouteComponent() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 relative">
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <HelpButton />
        <ThemeToggle />
      </div>
      <Outlet />
    </main>
  );
}
