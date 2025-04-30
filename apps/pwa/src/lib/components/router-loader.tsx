import { useRouterState } from "@tanstack/react-router";
import { Progress } from "@workspace/ui/components/progress";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { useProgressBar } from "@workspace/ui/hooks/useProgressBar";
import { cn } from "@workspace/ui/lib/utils";
import { Loader } from "lucide-react";

export function RouterLoader() {
  const { isLoading } = useRouterState();
  const isMobile = useIsMobile();
  const { progress, isVisible } = useProgressBar(isLoading);

  return isMobile ? (
    <RouterLoaderMobile isVisible={isLoading} />
  ) : (
    <RouterLoaderProgressBar isVisible={isVisible} progress={progress} />
  );
}

export function RouterLoaderProgressBar({
  isVisible,
  progress,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
  progress: number;
}) {
  return (
    isVisible && (
      <div className={cn("fixed top-0 z-50 w-full")} {...props}>
        <Progress value={progress} className="h-0.5 *:bg-destructive-foreground" />
      </div>
    )
  );
}

export function RouterLoaderMobile({
  isVisible,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
}) {
  return (
    isVisible && (
      <div
        className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-background/50 backdrop-blur-sm"
        {...props}
      >
        <Loader className="w-6 h-6 animate-spin" />
      </div>
    )
  );
}
