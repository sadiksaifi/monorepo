"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  ContactFormSchema,
  TContactForm,
} from "@/lib/validations/contact-form";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosResponse } from "axios";

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
  const { toast } = useToast();

  async function onSubmit(values: TContactForm) {
    setIsSubmitting(true);
    const res: AxiosResponse<{
      message: string;
    }> = await axios.post("/api/contact", values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = res;
    if (res.status === 200) {
      toast({
        title: "Success",
        description: data.message,
      });
      setIsSubmitting(false);
      form.reset();
    } else {
      toast({
        title: "Failed",
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
        <Button isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
