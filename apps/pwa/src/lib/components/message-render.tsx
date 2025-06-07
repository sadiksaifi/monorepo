import { cn } from "@workspace/ui/lib/utils";

export const MessageRender = ({ children }: { children: React.ReactNode }) => {
  if (children?.toString().startsWith("http")) {
    return (
      <a
        href={children.toString()}
        target="_blank"
        className={cn("text-blue-500 hover:underline")}
      >
        {children}
      </a>
    );
  }

  if (children?.toString().startsWith("`") && children.toString().endsWith("`")) {
    return <p className="font-mono text-sm px-1.5 bg-background/20">{children.toString().replaceAll("`", "")}</p>;
  }

  return <>{children}</>;
};
