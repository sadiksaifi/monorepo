import { authClient } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { useMutation } from "@tanstack/react-query";
import { Loader, Pencil, X } from "lucide-react";
import { TabNavigation } from "@/lib/components/tab-navigation";
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";

export const Route = createFileRoute("/_app/profile/")({
  component: RouteComponent,
});

type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  username: string;
  displayUsername: string;
};

// Individual field schemas
const nameSchema = z.string().min(1, { message: "Name is required" });
const emailSchema = z.string().email({ message: "Invalid email address" });
const usernameSchema = z.string().min(1, { message: "Username is required" });
const displayUsernameSchema = z
  .string()
  .min(1, { message: "Display username is required" });

// Combined schema for the form
export const profileSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  username: usernameSchema,
  displayUsername: displayUsernameSchema,
});

type ProfileFormValues = z.infer<typeof profileSchema>;

function RouteComponent() {
  const { data: session, isPending: isSessionPending } = authClient.useSession();
  const user = session?.user as User;

  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const form = useForm<ProfileFormValues>({
    // resolver: async (values, context, options) => {
    resolver: async (values) => {
      // Only validate fields that are being edited
      const fieldsToValidate = Object.keys(isEditing).reduce((acc, field) => {
        const key = field as keyof ProfileFormValues;
        if (isEditing[field]) {
          acc[key] = values[key];
        }
        return acc;
      }, {} as Partial<ProfileFormValues>);

      // Create a partial schema based on edited fields
      const partialSchema = z.object(
        Object.keys(fieldsToValidate).reduce(
          (acc, field) => {
            const key = field as keyof ProfileFormValues;
            switch (key) {
              case "name":
                acc[key] = nameSchema;
                break;
              case "email":
                acc[key] = emailSchema;
                break;
              case "username":
                acc[key] = usernameSchema;
                break;
              case "displayUsername":
                acc[key] = displayUsernameSchema;
                break;
            }
            return acc;
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {} as { [K in keyof ProfileFormValues]?: z.ZodType<any> },
        ),
      );

      try {
        await partialSchema.parseAsync(fieldsToValidate);
        return {
          values: values,
          errors: {},
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            values: {},
            errors: error.errors.reduce(
              (acc, err) => {
                const path = err.path[0];
                if (path) {
                  acc[path] = {
                    type: "validation",
                    message: err.message,
                  };
                }
                return acc;
              },
              {} as Record<string, { type: string; message: string }>,
            ),
          };
        }
        return {
          values: {},
          errors: {},
        };
      }
    },
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      username: user?.username || "",
      displayUsername: user?.displayUsername || "",
    },
    mode: "onChange",
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const updates: Record<string, string> = {};

      Object.keys(isEditing).forEach((field) => {
        const key = field as keyof ProfileFormValues;
        const value = values[key];
        if (value !== user[key]) {
          updates[key] = value;
        }
      });

      if (Object.keys(updates).length === 0) {
        throw new Error("No changes to update");
      }

      const res = await authClient.updateUser(updates);
      return res;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setIsEditing({});
    },
    onError: (error) => {
      toast.error("Failed to update profile", {
        description: error.message,
      });
    },
  });

  const handleEdit = (field: keyof ProfileFormValues) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
    form.setValue(field, user[field]);
  };

  const handleCancel = (field: keyof ProfileFormValues) => {
    setIsEditing((prev) => {
      const newEditing = { ...prev };
      delete newEditing[field];
      return newEditing;
    });
    form.setValue(field, user[field]);
    form.clearErrors(field);
  };

  const onSubmit = (values: ProfileFormValues) => {
    updateProfile(values);
  };

  if (isSessionPending) {
    return (
      <TabNavigation.Content className="flex items-center justify-center p-4">
        <Loader className="animate-spin" />
      </TabNavigation.Content>
    );
  }

  if (!user) {
    return (
      <TabNavigation.Content className="flex items-center justify-center p-4">
        <p>No user data available</p>
      </TabNavigation.Content>
    );
  }

  const renderEditableField = (field: keyof ProfileFormValues, label: string) => (
    <FormField
      control={form.control}
      name={field}
      render={({ field: formField }) => (
        <FormItem className="flex flex-col gap-2">
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <div className="flex items-center gap-2">
            {isEditing[field] ? (
              <>
                <FormControl>
                  <Input {...formField} className="flex-1" />
                </FormControl>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCancel(field)}
                  className="h-8 w-8"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Input value={user[field]} readOnly className="flex-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(field)}
                  className="h-8 w-8"
                  type="button"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {isEditing[field] && <FormMessage />}
        </FormItem>
      )}
    />
  );

  const hasChanges = Object.keys(isEditing).length > 0;

  return (
    <TabNavigation.Content className="flex items-center justify-center p-6">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            {renderEditableField("name", "Full Name")}
            {renderEditableField("email", "Email")}
            {renderEditableField("username", "Username")}
            {renderEditableField("displayUsername", "Display Username")}

            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit" disabled={isUpdating || !hasChanges}>
                {isUpdating && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </TabNavigation.Content>
  );
}
