"use server";

import { Resend } from "resend";
import { contactFormSchema } from "../validations/contact-form";
import ContactFormEmail from "@workspace/transactional/emails/contact-form";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: unknown) {
  const { error: formDataError, data: values } = contactFormSchema.safeParse(formData);
  if (formDataError) {
    console.log(formDataError);
    return { error: formDataError, data: null };
  }
  const { name, message } = values;

  const { data, error } = await resend.emails.send({
    from: `${process.env.FROM_EMAIL!}`,
    to: process.env.TO_EMAIL!,
    subject: `New message from ${name}`,
    text: message,
    react: ContactFormEmail(values),
  });

  if (error) {
    console.log(error);
    return { error, data: null };
  }

  return { error: null, data };
}
