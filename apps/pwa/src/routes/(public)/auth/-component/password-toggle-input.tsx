import { Eye } from "lucide-react";
import { Input } from "@workspace/ui/components/input";
import { EyeOff } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { cn } from "@workspace/ui/lib/utils";

interface PasswordInputToogleProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends React.HTMLAttributes<HTMLDivElement> {
  field?: ControllerRenderProps<TFieldValues, TName>;
}

export const PasswordToogleInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  field,
  className,
  ...props
}: PasswordInputToogleProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("relative", className)} {...props}>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="********"
        {...field}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 h-full px-3"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
  );
};
