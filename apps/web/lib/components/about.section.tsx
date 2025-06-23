import { buttonVariants } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { cn } from "@workspace/ui/lib/utils";

const techStackList = [
  "Next.Js",
  "React",
  "Typescript",
  "Javascript",
  "Astro",
  "SolidJS",
  "Redux",
  "TailwindCSS",
  "Radix UI",
  "HTML/CSS",
  "GoLang",
  "NodeJS",
  "MySql",
  "PostgreSQL",
];

const TechStackLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      buttonVariants({ variant: "outline" }),
      "cursor-pointer",
      className,
    )}
  >
    {children}
  </div>
);

type AboutSectionProps = React.HTMLAttributes<HTMLDivElement>
export const AboutSection: React.FC<AboutSectionProps> = ({
  className,
  ...props
}) => {
  return (
    <section
      id="about"
      className={cn(
        "flex flex-col gap-16 xl:gap-32 justify-center items-center h-[calc(100vh-3.5rem)]",
        className,
      )}
      {...props}
    >
      <article className="flex justify-center items-center flex-col gap-4 max-w-4xl">
        <div className="flex flex-col gap-3 items-center justify-center">
          <h2 className="font-bold tracking-tighter text-4xl relative bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
            About Me
          </h2>
          <Separator className="h-1.5 rounded-full w-14" />
        </div>
        <p className="text-[max(40px, min(4vw, 60px))] tracking-[-0.01] text-muted-foreground text-center">
          Here you will find more information about me, what I do, and my
          current skills mostly in terms of programming and technology.
        </p>
      </article>
      <article className="flex flex-col xl:flex-row justify-between gap-y-8 gap-x-10 max-w-5xl">
        <div className="xl:w-[50%] flex flex-col items-center xl:items-start xl:text-start text-center gap-4">
          <div className="flex flex-col items-center xl:items-start gap-3">
            <h3 className="font-bold tracking-tighter text-2xl relative bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
              Get to know me!
            </h3>
            <Separator className="h-1.5 rounded-full w-14" />
          </div>
          <p className="text-[max(40px, min(4vw, 60px))] tracking-[-0.01] text-muted-foreground">
            I&apos;m a web developer based in India, I have a serious passion
            for web development and I love to create websites and web
            applications that are user-friendly and easy to use using the latest
            technologies and best practices.
          </p>
          <p className="text-[max(40px, min(4vw, 60px))] tracking-[-0.01] text-muted-foreground">
            I&apos;m open to any kind of web development opportunity, or if you
            have any questions, feel free to contact me.
          </p>
        </div>
        <div className="xl:w-[50%] flex flex-col items-center xl:items-start xl:text-start text-center gap-4">
          <div className="flex flex-col items-center xl:items-start gap-3">
            <h3 className="font-bold tracking-tighter text-2xl relative bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
              Tech Stack
            </h3>
            <Separator className="h-1.5 rounded-full w-14" />
          </div>
          <div className="text-[max(40px, min(4vw, 60px))] justify-center xl:justify-start mt-1.5 tracking-[-0.01] text-muted-foreground flex gap-3 flex-wrap">
            {techStackList.map((tech, index) => (
              <TechStackLabel key={index}>{tech}</TechStackLabel>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};
