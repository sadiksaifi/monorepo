import { createFileRoute } from "@tanstack/react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { ThemesAppearance } from "@workspace/ui/components/theme-appearance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTheme } from "@workspace/ui/components/theme-provider/vite";
import { Button } from "@workspace/ui/components/button";
import { TabNavigation } from "@/lib/components/tab-navigation";

export const Route = createFileRoute("/_app/profile/appearence")({
  component: RouteComponent,
});

const adminSettingsPersonalizeSchema = z.object({
  theme: z.enum(["light", "dark"], {
    required_error: "Please select a theme.",
  }),
});

function RouteComponent() {
  const t = useTheme();
  const form = useForm<z.infer<typeof adminSettingsPersonalizeSchema>>({
    resolver: zodResolver(adminSettingsPersonalizeSchema),
    defaultValues: {
      theme: t.theme === "dark" ? "dark" : "light",
    },
  });

  const onSubmit = (data: z.infer<typeof adminSettingsPersonalizeSchema>) => {
    t.setTheme(data.theme);
  };

  return (
    <TabNavigation.Content className="flex items-center justify-center p-6">
      {t?.theme?.length > 0 ? (
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Appearance</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Customize how the app looks on your device. Choose between light and dark
              themes.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => onSubmit(form.getValues()))}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="space-y-1">
                      <FormLabel className="text-base">Theme</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Select your preferred theme for the application.
                      </p>
                    </div>
                    <FormMessage />
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid max-w-md grid-cols-2 gap-8 pt-2"
                    >
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="light" className="sr-only" />
                          </FormControl>
                          <ThemesAppearance.Light />
                          <span className="block w-full p-2 text-center font-normal">
                            Light
                          </span>
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                          <FormControl>
                            <RadioGroupItem value="dark" className="sr-only" />
                          </FormControl>
                          <ThemesAppearance.Dark />
                          <span className="block w-full p-2 text-center font-normal">
                            Dark
                          </span>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormItem>
                )}
              />
              <div className="flex justify-start max-w-md py-4">
                <Button type="submit" className="">
                  Update appearance
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </TabNavigation.Content>
  );
}
