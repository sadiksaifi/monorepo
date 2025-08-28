import { Copyright, Heart, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links - Enhanced */}
          <div className="text-center space-y-3">
            <h3 className="text-base font-medium text-muted-foreground">
              Connect with me
            </h3>
            <div className="flex items-center justify-center space-x-3">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200 hover-lift hover:bg-primary/10 hover:border-primary/20 border border-transparent"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.links.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200 hover-lift hover:bg-primary/10 hover:border-primary/20 border border-transparent"
                aria-label="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200 hover-lift hover:bg-primary/10 hover:border-primary/20 border border-transparent"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href={siteConfig.links.mail}
                className="p-2.5 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200 hover-lift hover:bg-primary/10 hover:border-primary/20 border border-transparent"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          {/* Copyright */}
          <div className="text-center space-y-1.5">
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Copyright className="w-3 h-3" />
              <span>{currentYear} Sadik Saifi. All rights reserved.</span>
            </p>
            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              Made with
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              by
              <span className="font-medium text-primary">Sadik Saifi</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
