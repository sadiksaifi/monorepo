import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { cn } from "@workspace/ui/lib/utils";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   emailVerified: boolean;
//   image: string;
//   username: string;
//   displayUsername: string;
// };

export const UserProfile: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        isMobile && "flex-col justify-center",
        className,
      )}
      {...props}
    >
      <Avatar className="h-20 w-20">
        <AvatarImage src={user?.image ?? ""} alt={user?.name} />
        <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className={cn("text-2xl font-bold", isMobile && "text-center")}>
          {user?.name}
        </h1>
        <p className={cn("text-muted-foreground", isMobile && "text-center")}>
          {user?.email}
        </p>
      </div>
    </div>
  );
};
