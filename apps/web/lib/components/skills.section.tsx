import { cn } from "@workspace/ui/lib/utils";
import { Monitor, Server, Database, Wrench } from "lucide-react";

const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML/CSS"],
    icon: Monitor,
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "Hono", "tRPC", "REST APIs", "Go"],
    icon: Server,
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "Drizzle"],
    icon: Database,
  },
  {
    category: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Vercel", "Cloudflare", "Neovim"],
    icon: Wrench,
  },
];

const SkillCard: React.FC<{
  category: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
}> = ({ category, skills, icon: Icon }) => (
  <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br from-background via-background to-muted/20 p-6 hover:border-border/60 transition-all duration-300 hover-lift">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Subtle border glow on hover */}
    <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-all duration-300" />

    {/* Content */}
    <div className="relative z-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 group-hover:border-primary/30 group-hover:bg-gradient-to-br group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-200">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
          {category}
        </h3>
      </div>

      {/* Skills List */}
      <div className="space-y-2.5">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-foreground transition-all duration-200"
          >
            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full group-hover:bg-primary transition-all duration-200" />
            <span className="font-medium">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

type SkillsSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const SkillsSection: React.FC<SkillsSectionProps> = ({ className, ...props }) => {
  return (
    <section id="skills" className={cn("py-32", className)} {...props}>
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
              Skills & Technologies
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((skillGroup, index) => (
            <SkillCard
              key={index}
              category={skillGroup.category}
              skills={skillGroup.skills}
              icon={skillGroup.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
