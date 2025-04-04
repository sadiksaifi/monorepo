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
import { contactFormSchema, ContactForm } from "@/lib/validations/contact-form";
import { Loader2 } from "lucide-react";
import { sendEmail } from "../server/send-email";
import { useTransition } from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
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
        id="contact"
        className="space-y-8 p-8 w-[90%] rounded-lg border xl:w-[75%]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
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
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="animate-spin size-4" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
