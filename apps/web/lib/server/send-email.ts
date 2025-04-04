"use server";

import { Resend } from "resend";
import { EmailTemplate } from "../components/email-template";
import { z } from "zod";
import { contactFormSchema } from "../validations/contact-form";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: unknown) {
  const { error: formDataError, data: values } = contactFormSchema.safeParse(formData);
  if (formDataError) {
    console.log(formDataError);
    return { error: formDataError, data: null };
  }
  const { name, email, message } = values;

  const { data, error } = await resend.emails.send({
    from: `${process.env.FROM_EMAIL!}`,
    to: process.env.TO_EMAIL!,
    subject: `New message from ${name}`,
    text: message,
    react: EmailTemplate({
      name: name,
      email: `${name} <${email}>`,
      message: message,
    }),
  });

  if (error) {
    console.log(error);
    return { error, data: null };
  }

  return { error: null, data };
}
