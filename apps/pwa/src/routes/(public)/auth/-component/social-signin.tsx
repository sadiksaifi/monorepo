import { useMutation } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { CLIENT_ORIGIN } from "@/lib/utils/constants";
import { SocialProviderList } from "better-auth/social-providers";

type Provider = SocialProviderList[1];

import Icons from "@/lib/components/icons";
import { cn } from "@workspace/ui/lib/utils";
import { RouterLoaderMobile } from "@/lib/components/router-loader";
import { useState } from "react";
export const SocialSignin: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isFakePending, setIsFakePending] = useState(false);

  const { mutate: mutateGithub, isPending: isSocialPending } = useMutation({
    mutationFn: async (provider: Provider) => {
      setIsFakePending(true);
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: CLIENT_ORIGIN,
      });
      if (error) {
        toast.error(error.message);
        throw error;
      }
    },
    onError: (error) => {
      toast.error("Something wen wrong!", {
        description: error.message,
      });
      setIsFakePending(false);
    },
    onSuccess: () => {
      redirect({ to: "/" });
    },
  });
  function comingSoonLogin() {
    toast.warning("Coming soon!", {
      description: "We are working on it!",
    });
  }

  return (
    <>
      <RouterLoaderMobile isVisible={isFakePending} />
      <div className={cn("grid grid-cols-3 gap-4", className)} {...props}>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => mutateGithub("github")}
          disabled={isSocialPending}
        >
          <Icons.Github className="size-4" />
          <span className="sr-only">Login with Github</span>
        </Button>
        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={() => mutateGithub("google")}
          disabled={isSocialPending}
        >
          <Icons.Google className="size-4" />
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
    </>
  );
};
