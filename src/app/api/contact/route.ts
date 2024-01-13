import { NextResponse } from "next/server";
import {
  ContactFormSchema,
  TContactForm,
} from "@/lib/validations/contact-form";
import { ZodError } from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const contactForm: TContactForm = await req.json();
    const validatedContactForm = ContactFormSchema.parse(contactForm);
    const { name, email, message } = validatedContactForm;
    if (!validatedContactForm) {
      return NextResponse.json(
        {
          message: "Invalid payload",
        },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Sadik <info@sadiksaifi.dev>",
      to: process.env.TO_EMAIL!,
      subject: `New message from ${name}`,
      text: message,
      react: EmailTemplate({ name: name, email: email, message: message }),
    });

    return NextResponse.json(
      {
        message: `Hey ${name}, your message was sent successfully!`,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response("Invalid payload", { status: 400 });
    }
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    // Return a default response if none of the conditions are met
    return new Response("Internal Server Error", { status: 500 });
  }
}
