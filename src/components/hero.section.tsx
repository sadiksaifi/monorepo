import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  ...props
}) => {
  return (
    <section
      id="hero"
      className={cn(
        "flex justify-center items-center min-h-[calc(100vh-3.5rem)] mt-6",
        className,
      )}
      {...props}
    >
      <article className="flex justify-center items-center flex-col gap-10">
        <h1 className="font-extrabold tracking-tighter -mt-28 -mb-8 text-[max(48px,min(5vw,76px))] relative bg-gradient-to-r from-primary to-muted-foreground bg-clip-text text-transparent">
          Sadik Saifi
        </h1>
        <p className="text-[max(40px, min(4vw, 60px))] tracking-[-0.01] text-muted-foreground text-center">
          A skilled{" "}
          <strong className="font-medium text-primary">
            Full stack Web Developer{" "}
          </strong>
          creating stunning, user-friendly websites and web applications with
          expertise of web technologies, various programming languages and
          frameworks.
        </p>
        <Link
          href="#contact"
          className={cn(
            buttonVariants(),
            "bg-gradient-to-r from-primary to-muted-foreground",
          )}
        >
          Contact Me!
        </Link>
      </article>
    </section>
  );
};
