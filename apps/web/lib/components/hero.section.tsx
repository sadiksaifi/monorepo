import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

type HeroSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const HeroSection: React.FC<HeroSectionProps> = ({ className, ...props }) => {
  return (
    <section
      id="hero"
      className={cn("relative min-h-screen flex items-center justify-center overflow-hidden py-20", className)}
      {...props}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-muted-foreground/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
              <span className="gradient-text">Sadik Saifi</span>
            </h1>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-muted-foreground mx-auto rounded-full" />
          </div>

          {/* Subtitle */}
          <div className="space-y-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A skilled{" "}
              <span className="font-semibold text-primary">Full Stack Web Developer</span>{" "}
              creating stunning, user-friendly websites and web applications with
              expertise in modern web technologies.
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-xl mx-auto">
              Passionate about clean code, exceptional user experiences, and innovative
              solutions that make a difference.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-primary border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 hover-lift"
            >
              Let's Connect
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-8">
            <div className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center mx-auto">
              <div className="w-0.5 h-2 bg-primary rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
