import { getNameInitials } from "@/lib/utils/getNameInitials";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { cn } from "@workspace/ui/lib/utils";

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
