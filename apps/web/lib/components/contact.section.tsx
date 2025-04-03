import { cn } from "@workspace/ui/lib/utils";
import ContactForm from "./contact-form";
import { Separator } from "@workspace/ui/components/separator";

type ContactSectionProps = React.HTMLAttributes<HTMLDivElement>

export const ContactSection: React.FC<ContactSectionProps> = ({
  className,
  ...props
}) => {
  return (
    <section
      id="contact-form"
      className={cn(
        "flex flex-col lg:gap-24 gap-14 justify-center items-center my-20 xl:mt-0",
        className,
      )}
      {...props}
    >
      <div className="flex justify-center items-center flex-col gap-4">
        <div className="flex flex-col gap-3 items-center justify-center">
          <h2 className="font-bold tracking-tighter text-4xl relative bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            Contact Me!
          </h2>
          <Separator className="h-1.5 rounded-full w-14" />
        </div>
        <p className="text-[max(40px, min(4vw, 60px))] tracking-[-0.01] text-muted-foreground text-center">
          Feel free to Contact me by submitting the form below and I will get
          back to you as soon as possible.
        </p>
      </div>
      <ContactForm />
    </section>
  );
};
