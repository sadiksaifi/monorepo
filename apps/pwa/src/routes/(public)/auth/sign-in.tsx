import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
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
import { GalleryVerticalEnd, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { siteConfig } from "@/lib/config/site-config";
import { CLIENT_ORIGIN } from "@/lib/utils/constants";
import { PasswordToogleInput } from "./-component/password-toggle-input";
import { SocialSignin } from "./-component/social-signin";

export const Route = createFileRoute("/(public)/auth/sign-in")({
  component: AuthPage,
});

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
type FormSchema = z.infer<typeof formSchema>;

function AuthPage() {
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
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link
        to={siteConfig.website}
        target="_blank"
        className="flex items-center gap-2 self-center font-medium"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        {siteConfig.title}
      </Link>
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in with your Email and Password</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => {
                  mutateEmail(data);
                })}
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
                            <Input placeholder="mail@example.com" {...field} />
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
                              className={cn(
                                "ml-auto text-sm underline-offset-2 hover:underline",
                              )}
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <PasswordToogleInput field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isPendingEmail}>
                      {isPendingEmail && <Loader className="size-4 animate-spin" />}
                      Sign in
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                      <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                    <SocialSignin />
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?
                    <Link
                      to="/auth/sign-up"
                      className={cn(
                        buttonVariants({ variant: "link" }),
                        "underline underline-offset-4 px-1",
                      )}
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking sign in, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
