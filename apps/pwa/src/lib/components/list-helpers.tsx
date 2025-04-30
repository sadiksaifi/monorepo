import { cn } from "@workspace/ui/lib/utils";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { Loader } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarProps,
} from "@workspace/ui/components/avatar";

type ListContainerProps = {
  children: React.ReactNode;
  className?: string;
};

type ListItemProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type ListItemContentProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type ListItemImageProps = {
  src: string | null;
  alt: string;
} & Omit<AvatarProps, "src">;

type ListItemTextProps = {
  title: string;
  subtitle: string;
} & React.HTMLAttributes<HTMLDivElement>;

type ListEmptyStateProps = {
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

type ListLoadingStateProps = {
  message?: string;
} & React.HTMLAttributes<HTMLDivElement>;

type ListErrorStateProps = {
  message: string;
} & React.HTMLAttributes<HTMLDivElement>;

function ListContainer({ children, className, ...props }: ListContainerProps) {
  return (
    <ScrollArea
      className={cn(
        "overflow-y-auto",
        "max-h-[calc(100vh-var(--tab-navigation-content-height))]",
        className,
      )}
      {...props}
    >
      {children}
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

function ListItem({ children, ...itemProps }: ListItemProps) {
  return (
    <div className="flex items-center justify-between p-4" {...itemProps}>
      {children}
    </div>
  );
}

function ListItemContent({ children, ...contentProps }: ListItemContentProps) {
  return (
    <div className="flex items-center gap-3" {...contentProps}>
      {children}
    </div>
  );
}

function ListItemImage({ src, alt }: ListItemImageProps) {
  const nameInitials = alt
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Avatar className="size-10">
      <AvatarImage src={src!} alt={alt} />
      <AvatarFallback>{nameInitials}</AvatarFallback>
    </Avatar>
  );
}

function ListItemText({ title, subtitle, ...textProps }: ListItemTextProps) {
  return (
    <div {...textProps}>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function ListEmptyState({ message, ...emptyStateProps }: ListEmptyStateProps) {
  return (
    <div
      className="flex items-center justify-center p-8 text-muted-foreground"
      {...emptyStateProps}
    >
      {message}
    </div>
  );
}

function ListLoadingState({
  message = "Loading...",
  ...loadingStateProps
}: ListLoadingStateProps) {
  return (
    <div className="flex items-center justify-center p-8" {...loadingStateProps}>
      <Loader className="size-6 animate-spin" />
      {message !== "Loading..." && <span className="ml-2">{message}</span>}
    </div>
  );
}

function ListErrorState({ message, ...errorStateProps }: ListErrorStateProps) {
  return (
    <div
      className="flex items-center justify-center p-8 text-destructive"
      {...errorStateProps}
    >
      {message}
    </div>
  );
}

const List = {
  Container: ListContainer,
  Item: ListItem,
  ItemContent: ListItemContent,
  ItemImage: ListItemImage,
  ItemText: ListItemText,
  EmptyState: ListEmptyState,
  LoadingState: ListLoadingState,
  ErrorState: ListErrorState,
};

export default List;
