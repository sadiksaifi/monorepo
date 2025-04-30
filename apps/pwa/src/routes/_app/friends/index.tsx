import { useTRPC } from "@/lib/trpc-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { Loader } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import List from "@/lib/components/list-helpers";

export const Route = createFileRoute("/_app/friends/")({
  component: FriendsPage,
});

type Friend = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

interface FriendItemProps {
  friend: Friend;
  onRemove: () => void;
  isRemoving: boolean;
}

function FriendsPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const {
    data: friends = [],
    isLoading,
    error,
  } = useQuery(trpc.friend.getAll.queryOptions());

  const { mutate: removeFriend, isPending: isRemovingFriend } = useMutation(
    trpc.friend.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [trpc.friend.getAll.queryKey],
        });
      },
    }),
  );

  if (isLoading) {
    return <List.LoadingState />;
  }

  if (error) {
    return <List.ErrorState message="Error loading friends. Please try again later." />;
  }

  if (friends.length === 0) {
    return <List.EmptyState message="No friends yet. Start by adding some friends!" />;
  }

  return (
    <List.Container>
      {friends.map((friend) => (
        <div key={friend.id}>
          <FriendItem
            friend={friend}
            onRemove={() => removeFriend({ friendId: friend.id })}
            isRemoving={isRemovingFriend}
          />
          <Separator />
        </div>
      ))}
    </List.Container>
  );
}

function FriendItem({ friend, onRemove, isRemoving }: FriendItemProps) {
  return (
    <List.Item>
      <List.ItemContent>
        <List.ItemImage src={friend.image} alt={friend.name} />
        <List.ItemText title={friend.name} subtitle={friend.email} />
      </List.ItemContent>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={isRemoving}>
            Remove
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove {friend.name}{" "}
              from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onRemove}
              disabled={isRemoving}
              className={cn(
                buttonVariants({
                  variant: "destructive",
                }),
              )}
            >
              {isRemoving ? <Loader className="size-4 animate-spin" /> : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </List.Item>
  );
}
