import { ErrorComponentProps } from "@tanstack/react-router";
import { Loader, MessageSquareWarning } from "lucide-react";

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
