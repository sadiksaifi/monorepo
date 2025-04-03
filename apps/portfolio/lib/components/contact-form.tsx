"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  ContactFormSchema,
  TContactForm,
} from "@/lib/validations/contact-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { fetcho } from "../utils/fetcho";
import { toast } from "sonner";
// import { fetcho } from "@repo/lib";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<TContactForm>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: TContactForm) {
    try {
      setIsSubmitting(true);

      const res = await fetcho<{
        message: string;
      }>("/api/contact", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data } = res;
      toast.success("Success", {
        description: data.message,
        position: "top-right",
      });
      setIsSubmitting(false);
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Error", {
        description: "Something went wrong, please try again later",
      });
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        id="contact"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-8 w-[90%] rounded-lg border xl:w-[75%]"
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
        <Button type="submit">
          {isSubmitting && <Loader2 className="animate-spin size-4" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
