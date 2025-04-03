import { NextResponse } from "next/server";
import {
  ContactFormSchema,
  TContactForm,
} from "@/lib/validations/contact-form";
import { ZodError } from "zod";
import { Resend } from "resend";
import { EmailTemplate } from "@/lib/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const contactForm: TContactForm = await req.json();
    const contactFormData = ContactFormSchema.parse(contactForm);
    if (!contactFormData) {
      return NextResponse.json(
        {
          message: "Invalid payload",
        },
        { status: 400 },
      );
    }

    const res = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: `New message from ${contactFormData.name}`,
      text: contactFormData.message,
      react: EmailTemplate({
        name: contactFormData.name,
        email: contactFormData.email,
        message: contactFormData.message,
      }),
    });

    if (res.error) {
      throw new Error("Failed to send email");
    }

    return NextResponse.json(
      {
        message: `Hey ${contactFormData.name}, your message was sent successfully!`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (error instanceof Error && Resend) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Return a default response if none of the conditions are met
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
