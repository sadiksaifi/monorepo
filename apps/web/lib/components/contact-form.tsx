"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@workspace/ui/components/textarea";
import { contactFormSchema } from "@/lib/validations/contact-form";
import type { ContactForm as TContactForm } from "@/lib/validations/contact-form";

import { Loader2, Send } from "lucide-react";
import { sendEmail } from "../server/send-email";
import { ComponentPropsWithRef, useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@workspace/ui/lib/utils";

const ContactForm: React.FC<ComponentPropsWithRef<"form">> = ({
  className,
  ...props
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: TContactForm) => {
    startTransition(async () => {
      const { error } = await sendEmail(data);
      if (error) {
        toast.error("Failed to send email", {
          description: "Please try after some time.",
        });
      }
      toast.success("Message sent successfully", {
        description: "We will get back to you soon.",
      });
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        className={cn("w-full space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
        {...props}
      >
        {/* Form Header */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
            Send a Message
          </h3>
          <p className="text-sm text-muted-foreground">I'd love to hear from you!</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="h-10 text-sm border-border/50 focus:border-primary/50 transition-colors duration-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mail@example.com"
                    className="h-10 text-sm border-border/50 focus:border-primary/50 transition-colors duration-200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your project or just say hello..."
                    className="min-h-[120px] text-sm border-border/50 focus:border-primary/50 transition-colors duration-200 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 hover-lift"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
