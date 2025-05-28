import { useTRPC } from "@/lib/trpc-client";
import { Loader } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import List from "@/lib/components/list-helpers";

type FriendRequest = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  requestType: "incoming" | "outgoing";
};

export const Route = createFileRoute("/_app/friends/requests")({
  component: FriendRequestsPage,
});

function FriendRequestsPage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: incomingRequests = [], isLoading: isLoadingIncoming } = useQuery(
    trpc.friend.getIncomingRequests.queryOptions(),
  );

  const { data: outgoingRequests = [], isLoading: isLoadingOutgoing } = useQuery(
    trpc.friend.getOutgoingRequests.queryOptions(),
  );

  const { mutate: acceptRequest, isPending: isAccepting } = useMutation(
    trpc.friend.acceptRequest.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [trpc.friend.getAll.queryKey],
        });
        queryClient.invalidateQueries({
          queryKey: [trpc.friend.getIncomingRequests.queryKey],
        });
        queryClient.invalidateQueries({
          queryKey: [trpc.friend.getOutgoingRequests.queryKey],
        });
        router.navigate({ to: "/friends" });
      },
    }),
  );

  const isLoading = isLoadingIncoming || isLoadingOutgoing;
  const requests: FriendRequest[] = [...incomingRequests, ...outgoingRequests];

  if (isLoading) {
    return <List.LoadingState />;
  }

  if (requests.length === 0) {
    return <List.EmptyState message="No friend requests found" />;
  }

  return (
    <List.Container>
      {requests.map((request) => (
        <div key={request.id}>
          <FriendRequestItem
            request={request}
            onAccept={() => acceptRequest({ friendId: request.id })}
            isAccepting={isAccepting}
          />
          <Separator />
        </div>
      ))}
    </List.Container>
  );
}

function FriendRequestItem({
  request,
  onAccept,
  isAccepting,
}: {
  request: FriendRequest;
  onAccept: () => void;
  isAccepting: boolean;
}) {
  return (
    <List.Item>
      <List.ItemContent>
        <List.ItemImage src={request.image} alt={request.name} />
        <List.ItemText title={request.name} subtitle={request.email} />
      </List.ItemContent>
      <Button
        onClick={onAccept}
        size="sm"
        variant={request.requestType === "incoming" ? "default" : "outline"}
        disabled={isAccepting || request.requestType === "outgoing"}
      >
        {isAccepting && <Loader className="size-4 animate-spin" />}
        {request.requestType === "incoming" ? "Accept" : "Requested"}
      </Button>
    </List.Item>
  );
}
