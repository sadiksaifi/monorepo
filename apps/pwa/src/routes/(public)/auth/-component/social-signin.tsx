import { useMutation } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { CLIENT_ORIGIN } from "@/lib/utils/constants";
import { SocialProviderList } from "better-auth/social-providers";

type Provider = SocialProviderList[1];

import Icons from "@/lib/components/icons";
export const SocialSignin = () => {
  const { mutate: mutateGithub, isPending: isSocialPending } = useMutation({
    mutationFn: async (provider: Provider) => {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: CLIENT_ORIGIN,
      });
      if (error) {
        toast.error(error.message);
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      redirect({ to: "/" });
    },
  });
  function comingSoonLogin() {
    toast.warning("Coming soon!", {
      description: "We are working on it!",
    });
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={() => mutateGithub("github")}
        disabled={isSocialPending}
      >
        {isSocialPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Icons.Github className="size-4" />
        )}
        <span className="sr-only">Login with Github</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={() => mutateGithub("google")}
        disabled={isSocialPending}
      >
        {isSocialPending ? (
          <Loader className="size-4 animate-spin" />
        ) : (
          <Icons.Google className="size-4" />
        )}
        <span className="sr-only">Login with Google</span>
      </Button>
      <Button
        variant="outline"
        className="w-full"
        type="button"
        onClick={comingSoonLogin}
      >
        <Icons.Meta className="size-4" />
        <span className="sr-only">Login with Meta</span>
      </Button>
    </div>
  );
};
