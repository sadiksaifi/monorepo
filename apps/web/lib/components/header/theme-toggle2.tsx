"use client";

import { useTheme } from "next-themes";
import { Monitor, Sun, Moon } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";

export const ThemeToggle2: React.FC<React.ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme || "system";

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <div className="relative bg-muted rounded-lg p-1 flex items-center">
        {/* Automatic/System Theme */}
        <button
          onClick={() => setTheme("system")}
          className={cn(
            "relative p-2 rounded-md transition-all duration-200",
            currentTheme === "system"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label="Use system theme"
        >
          <Monitor className="w-4 h-4" />
          {currentTheme === "system" && (
            <div className="absolute inset-0 border border-border rounded-md" />
          )}
        </button>

        {/* Light Theme */}
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "relative p-2 rounded-md transition-all duration-200",
            currentTheme === "light"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label="Use light theme"
        >
          <Sun className="w-4 h-4" />
          {currentTheme === "light" && (
            <div className="absolute inset-0 border border-border rounded-md" />
          )}
        </button>

        {/* Dark Theme */}
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "relative p-2 rounded-md transition-all duration-200",
            currentTheme === "dark"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label="Use dark theme"
        >
          <Moon className="w-4 h-4" />
          {currentTheme === "dark" && (
            <div className="absolute inset-0 border border-border rounded-md" />
          )}
        </button>
      </div>
    </div>
  );
};
