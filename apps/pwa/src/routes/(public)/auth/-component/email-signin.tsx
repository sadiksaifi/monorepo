import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { CLIENT_ORIGIN } from "@/lib/utils/constants";
import { PasswordToogleInput } from "./password-toggle-input.tsx";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
type FormSchema = z.infer<typeof formSchema>;

export const EmailSignin: React.FC<React.HTMLAttributes<HTMLFormElement>> = ({
  className,
  ...props
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: mutateEmail, isPending: isPendingEmail } = useMutation({
    mutationFn: async (val: FormSchema) => {
      const { error } = await authClient.signIn.email({
        email: val.email,
        password: val.password,
        callbackURL: CLIENT_ORIGIN,
      });
      if (error) {
        toast.error(error.message);
        throw error;
      }
    },
  });

  return (
    <Form {...form}>
      <form
        className={cn("", className)}
        onSubmit={form.handleSubmit((data) => {
          mutateEmail(data);
        })}
        {...props}
      >
        <div className="grid gap-6">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      {...field}
                      autoComplete="username webauthn"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/auth/forget-password"
                      className={cn("ml-auto text-sm underline-offset-2 hover:underline")}
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordToogleInput
                      field={field}
                      inputAutoComplete="current-password webauthn"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPendingEmail}>
              {isPendingEmail && <Loader className="size-4 animate-spin" />}
              Sign in
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
