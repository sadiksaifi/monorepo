import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { ArrowLeft, Construction, Github, Linkedin, Mail, Twitter } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-muted-foreground/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
            <Construction className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="gradient-text">Projects</span>
          </h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-muted-foreground mx-auto rounded-full" />

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            I'm currently working on some exciting projects. Check back soon to see what
            I've been building!
          </p>

          <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed max-w-xl mx-auto">
            In the meantime, feel free to explore my GitHub for open source contributions
            or connect with me to discuss potential collaborations.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button variant="outline" className="gap-2 hover-lift">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <Link
            href="https://github.com/sadiksaifi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gap-2 hover-lift">
              <Github className="w-4 h-4" />
              View GitHub
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
