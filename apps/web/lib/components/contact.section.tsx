import { cn } from "@workspace/ui/lib/utils";
import ContactForm from "./contact-form";

type ContactSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const ContactSection: React.FC<ContactSectionProps> = ({
  className,
  ...props
}) => {
  return (
    <section
      id="contact"
      className={cn("py-32 relative overflow-hidden", className)}
      {...props}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 via-transparent to-muted-foreground/20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
              Let's Connect
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Feel free to reach out by submitting the form below. I'll get back to you as
            soon as possible and I'm always excited to discuss new opportunities and
            collaborations.
          </p>
        </div>

        {/* Contact Card with Side-by-Side Layout */}
        <div className="flex justify-center">
          <div className="group relative overflow-hidden w-full max-w-5xl rounded-2xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm shadow-lg hover:border-border/60 transition-all duration-300">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Subtle border glow on hover */}
            <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-all duration-300" />

            {/* Card Content */}
            <div className="relative">
              <div className="grid lg:grid-cols-3 items-center">
                {/* Left Side - Mascot with Context */}
                <div className="flex flex-col items-center lg:items-center justify-center space-y-8 order-2 lg:order-1 lg:border-r h-full p-8 lg:p-12">
                  {/* Mascot Container */}
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                    <div className="w-28 h-28 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full border-2 border-primary/30 flex items-center justify-center relative">
                      {/* Eyes */}
                      <div className="absolute top-7 left-6 w-3 h-3 bg-primary rounded-full"></div>
                      <div className="absolute top-7 right-6 w-3 h-3 bg-primary rounded-full"></div>
                      {/* Smile */}
                      <div className="absolute bottom-7 w-7 h-0.5 bg-primary rounded-full"></div>
                    </div>

                    {/* Speech bubble */}
                    <div className="absolute -top-2 -right-2 w-12 h-10 bg-primary/20 rounded-lg border border-primary/30 flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  </div>

                  {/* Supporting Text */}
                  <div className="text-center lg:text-center space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      Ready to Chat?
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                      I'm here to help with your next project or just to say hello! Let's
                      discuss how we can work together.
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="flex space-x-3">
                    <div className="w-2.5 h-2.5 bg-primary/50 rounded-full animate-pulse"></div>
                    <div className="w-2.5 h-2.5 bg-primary/30 rounded-full animate-pulse delay-300"></div>
                    <div className="w-2.5 h-2.5 bg-primary/50 rounded-full animate-pulse delay-600"></div>
                  </div>
                </div>

                {/* Right Side - Contact Form */}
                <div className="order-1 lg:order-2 p-8 lg:p-12 lg:col-span-2">
                  <ContactForm />
                </div>
              </div>

              {/* Horizontal Separator Line */}
              <div className="mt-12 lg:hidden">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Bottom Content for Height */}
        <div className="text-center space-y-6 mt-20">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="text-sm text-muted-foreground/60 max-w-md mx-auto">
            Let's build something amazing together
          </p>
        </div>
      </div>
    </section>
  );
};
