import { cn } from "@workspace/ui/lib/utils";

type AboutSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const AboutSection: React.FC<AboutSectionProps> = ({ className, ...props }) => {
  return (
    <section
      id="about"
      className={cn(
        "py-32 relative bg-muted dark:bg-muted/20 overflow-hidden",
        className,
      )}
      {...props}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-muted-foreground/20" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
              About Me
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </div>

        {/* Content with Mascot */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              I'm a{" "}
              <span className="font-semibold text-primary">full-stack developer</span> who
              builds impactful digital products using modern technologies. I love creating
              end-to-end solutions—from robust backend architectures and APIs to polished,
              user-centric frontend experiences.
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
              Based in India, I'm passionate about clean code, exceptional user
              experiences, and innovative solutions that make a real difference. I'm
              always open to new opportunities and love collaborating with strong teams to
              drive product growth.
            </p>
          </div>

          {/* Mascot/Illustration */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80">
              {/* Main Developer Mascot */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Head */}
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full border-2 border-primary/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-primary/40 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="w-32 h-40 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 rounded-2xl border-2 border-muted-foreground/30 mt-2 relative">
                    {/* Arms */}
                    <div className="absolute -left-4 top-8 w-6 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full border border-primary/30 transform -rotate-12"></div>
                    <div className="absolute -right-4 top-8 w-6 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full border border-primary/30 transform rotate-12"></div>

                    {/* Code Lines */}
                    <div className="absolute top-4 left-4 right-4 space-y-1">
                      <div className="h-1.5 bg-primary/30 rounded-full w-3/4"></div>
                      <div className="h-1.5 bg-primary/20 rounded-full w-1/2"></div>
                      <div className="h-1.5 bg-primary/40 rounded-full w-5/6"></div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full border border-primary/30 animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 rounded-full border border-muted-foreground/30 animate-pulse delay-1000"></div>
                  <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full border border-primary/40 animate-pulse delay-500"></div>
                </div>
              </div>

              {/* Decorative Code Blocks */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-background to-muted/50 rounded-lg border border-border/40 p-2 opacity-60">
                <div className="space-y-1">
                  <div className="h-1 bg-primary/40 rounded w-3/4"></div>
                  <div className="h-1 bg-primary/30 rounded w-1/2"></div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-20 h-12 bg-gradient-to-br from-background to-muted/50 rounded-lg border border-border/40 p-2 opacity-60">
                <div className="space-y-1">
                  <div className="h-1 bg-muted-foreground/40 rounded w-full"></div>
                  <div className="h-1 bg-muted-foreground/30 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Bottom Content for Height */}
        <div className="text-center space-y-6">
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          <p className="text-sm text-muted-foreground/60 max-w-md mx-auto">
            Always learning, always building, always improving
          </p>
        </div>
      </div>
    </section>
  );
};
