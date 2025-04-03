import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const App: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-svh",
        className,
      )}
      {...props}
    >
      <Button>Click me</Button>
    </div>
  );
};

export default App;
