import { cn } from "@workspace/ui/lib/utils";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  thumbnailURL: string;
  link: string;
  sourceCodeLink: string;
}

const projectsData: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, product management, and payment integration.",
    thumbnailURL: "/static/project-1.jpg",
    link: "https://example.com",
    sourceCodeLink: "https://github.com/example/ecommerce",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, built using React, Node.js, and WebSocket technology.",
    thumbnailURL: "/static/project-2.jpg",
    link: "https://example.com",
    sourceCodeLink: "https://github.com/example/taskapp",
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing my work and skills, built with Next.js and Tailwind CSS.",
    thumbnailURL: "/static/project-3.jpg",
    link: "https://example.com",
    sourceCodeLink: "https://github.com/example/portfolio",
  },
  {
    title: "API Gateway Service",
    description:
      "A microservices API gateway built with Go, featuring rate limiting, authentication, and load balancing capabilities.",
    thumbnailURL: "/static/project-4.jpg",
    link: "https://example.com",
    sourceCodeLink: "https://github.com/example/apigateway",
  },
  {
    title: "Real-time Chat App",
    description:
      "A real-time chat application with WebSocket support, built using React, Node.js, and Socket.io for instant messaging.",
    thumbnailURL: "/static/project-5.jpg",
    link: "https://example.com",
    sourceCodeLink: "https://github.com/example/chatapp",
  },
  {
    title: "Data Analytics Dashboard",
    description:
      "An interactive dashboard for data visualization and analytics, built with React, D3.js, and Node.js backend.",
    thumbnailURL: "/static/project-6.jpg",
    link: "https://example.com",
    sourceCodeLink: "https://github.com/example/dashboard",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group relative overflow-hidden rounded-xl border border-border dark:border-border/40 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden hover:border-border/60 transition-all duration-300 hover-lift">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-muted-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Subtle border glow on hover */}
    <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-all duration-300" />

    {/* Thumbnail */}
    <div className="aspect-video bg-muted/50 flex items-center justify-center relative z-10">
      <div className="text-muted-foreground text-sm">Project Thumbnail</div>
    </div>

    {/* Content */}
    <div className="p-6 space-y-4 relative z-10">
      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
        {project.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      {/* Links */}
      <div className="flex items-center gap-3 pt-2">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4" />
          Live Demo
        </a>
        <a
          href={project.sourceCodeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Github className="w-4 h-4" />
          Source Code
        </a>
      </div>
    </div>
  </div>
);

type ProjectsSectionProps = React.HTMLAttributes<HTMLDivElement>;

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  className,
  ...props
}) => {
  // Show only first 3 projects by default
  const visibleProjects = projectsData.slice(0, 3);

  return (
    <section
      id="projects"
      className={cn("py-32 bg-muted dark:bg-muted/20", className)}
      {...props}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight gradient-text">
              Projects
            </h2>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Some of the projects I've worked on
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary border border-primary/20 rounded-lg bg-primary/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 hover-lift"
          >
            See More Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
