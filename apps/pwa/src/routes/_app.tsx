import { authClient } from "@/lib/auth-client";
import {
  createFileRoute,
  Link,
  LinkProps,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

const links: { label: string; to: LinkProps["to"] }[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Sign In",
    to: "/auth/sign-in",
  },
  {
    label: "Sign Up",
    to: "/auth/sign-up",
  },
];

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth/sign-in" });
    }
  },
  loader: async ({ context }) => {
    return { user: context.user };
  },
});

function RouteComponent() {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center h-14 border-b px-6">
        <div className="flex gap-2 justify-center w-full items-center">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button
          onClick={() => {
            authClient.signOut();
            router.navigate({ to: "/auth/sign-in" });
          }}
        >
          Sign Out
        </Button>
      </div>
      <Outlet />;
    </>
  );
}
