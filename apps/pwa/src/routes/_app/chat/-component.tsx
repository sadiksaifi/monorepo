import { getNameInitials } from "@/lib/utils/getNameInitials";
import { ErrorComponentProps } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";
import { Loader, MessageSquareWarning } from "lucide-react";
import { toast } from "sonner";

export function PendingComponent() {
  return (
    <div className="relative flex-1 h-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[60%] flex flex-col gap-4 justify-center items-center">
        <Loader className="animate-spin size-10" />
        <p>Wait loading the chats...</p>
      </div>
    </div>
  );
}

export function ErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div className="relative flex-1 h-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[60%] flex flex-col gap-4 justify-center items-center">
        <MessageSquareWarning className="size-10 text-destructive" />
        <p>{error.message ?? "Sorry an unknown error occured."}</p>
      </div>
    </div>
  );
}

export function ComingSoon() {
  toast.error("Coming soon!", {
    description: "Please be patient, we are working on it.",
  });
}

interface CallHandleDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar: string;
  name: string;
  action1: () => void;
  action2: () => void;
  action1label: string;
  action2label: string;
  action1labelstyles?: string;
  action2labelstyles?: string;
  isvisible: boolean;
}

export function CallHandleDialog({
  className,
  action1,
  action2,
  action1label,
  action2label,
  action1labelstyles,
  action2labelstyles,
  isvisible = false,
  ...props
}: CallHandleDialogProps) {
  const nameInitials = getNameInitials(props.name);

  return (
    <div
      className={cn("absolute w-96 top-24 right-2 overflow-x-hidden z-50", className)}
      {...props}
    >
      <div
        className={cn(
          "flex items-center bg-transparent rounded-lg backdrop-filter backdrop-blur-md",
          "border ease-in-out overflow-x-hidden",
          isvisible ? "translate-x-0 duration-400" : " translate-x-[100%] duration-200",
        )}
      >
        <div className="flex flex-1 items-center gap-4 pl-3.5">
          <Avatar className="size-10">
            <AvatarImage src={props.avatar ?? ""} alt={props.name} />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <div>
            <p>{props?.name}</p>
            <p className="text-muted-foreground text-xs">Incoming Call</p>
          </div>
        </div>
        <div className="*:w-24 *:flex-1 *:cursor-pointer flex *:py-1.5 *:!mx-0 flex-col divide-y items-center justify-center border-l *:hover:bg-secondary/30">
          <button
            className={cn("text-green-300", action1labelstyles)}
            onClick={action1 ?? ""}
          >
            {action1label}
          </button>
          <button className={cn("text-red-400", action2labelstyles)} onClick={action2}>
            {action2label}
          </button>
        </div>
      </div>
    </div>
  );
}
