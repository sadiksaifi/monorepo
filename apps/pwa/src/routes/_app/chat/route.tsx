import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/lib/trpc-client";
import { roomIdConstructor } from "@/lib/utils/rtc";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";

export const Route = createFileRoute("/_app/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  const trpc = useTRPC();
  const { data: allFriends } = useQuery(trpc.friend.getAll.queryOptions());
  const { data: session } = authClient.useSession();
  const params = Route.useParams();
  const { _splat } = params as { _splat: string };
  const friendSelected = _splat?.split("--")[0];
  console.log("friendSelected: ", friendSelected);
  const lastMessage = "Start a chat by sending a message!";

  return (
    <div className="grid grid-cols-4 h-full">
      <aside className="col-span-1 border-r">
        <div className="flex flex-col">
          {allFriends?.map((friend) => {
            const nameInitials = friend.name
              .split(" ")
              .map((name) => name[0])
              .join("");
            const roomId = roomIdConstructor({
              friendId: friend.id,
              userId: session?.user.id ?? "",
            });
            return (
              <Link
                key={friend.id}
                to="/chat/$"
                params={{
                  _splat: roomId,
                }}
                className={cn(
                  "grid grid-cols-12 items-center p-2 border-b py-3",
                  friendSelected === friend.id && "bg-secondary",
                )}
              >
                <Avatar className="col-span-2 size-10">
                  <AvatarImage src={friend.image ?? ""} alt={friend.name} />
                  <AvatarFallback>{nameInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col col-span-9">
                  <p className="font-medium truncate">{friend.name}</p>
                  <p className="text-sm text-muted-foreground truncate">{lastMessage}</p>
                </div>
                <div className=" ml-auto size-2 bg-primary rounded-full col-span-1"></div>
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="col-span-3">
        <Outlet />
      </div>
    </div>
  );
}
