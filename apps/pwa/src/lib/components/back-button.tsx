import { LinkOptions, useRouter } from "@tanstack/react-router";
import { cn } from "@workspace/ui/lib/utils";
import { HTMLAttributes } from "react";

interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: LinkOptions["to"];
}

export const BackButton: React.FC<BackButtonProps> = ({
  className,
  children,
  to,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      onClick={to ? () => router.navigate({ to: to }) : () => router.history.back()}
      className={cn(
        "flex items-center w-fit gap-0.5 text-muted-foreground -ml-1 relative hover:after:absolute after:h-[0.5px] after:bg-white hover:after:w-[calc(100%-4px)] after:bottom-0 after:left-[6px] cursor-pointer",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          back
        </>
      )}
    </button>
  );
};
