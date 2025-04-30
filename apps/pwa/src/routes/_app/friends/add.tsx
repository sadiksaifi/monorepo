import { useTRPC } from "@/lib/trpc-client";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TabNavigation } from "@/lib/components/tab-navigation";

const addFriendSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type AddFriendFormValues = z.infer<typeof addFriendSchema>;

export const Route = createFileRoute("/_app/friends/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const form = useForm<AddFriendFormValues>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: addFriend, isPending } = useMutation(
    trpc.friend.add.mutationOptions({
      onSuccess: () => {
        toast.success("Friend request sent successfully!");
        form.reset();
        redirect({ to: "/friends/requests" });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: AddFriendFormValues) => {
    addFriend({ email: values.email });
  };

  return (
    <TabNavigation.Content>
      <div className="flex mt-40 justify-center min-h-[calc(100vh-var(--tab-navigation-content-height))]">
        <div className="flex flex-col gap-6 max-w-md w-full p-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Add Friend</h1>
            <p className="text-muted-foreground">
              Enter your friend's email address to send them a friend request.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="friend@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  "Send Friend Request"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </TabNavigation.Content>
  );
}
