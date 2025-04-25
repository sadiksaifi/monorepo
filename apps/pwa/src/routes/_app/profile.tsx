import { authClient } from "@/lib/auth-client";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      router.navigate({ to: "/auth/sign-in" });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h1>Hello "/_app/profile"!</h1>
      <Button
        variant="destructive"
        onClick={() => {
          signOut();
        }}
      >
        {isPending && <Loader className="animate-spin" />}
        Sign Out
      </Button>
    </div>
  );
}
