"use client";

import { siteConfig } from "@/lib/config/site";
import { cn } from "@workspace/ui/lib/utils";
import { useEffect, useState } from "react";

export function NavLinks({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const isClient = typeof window !== "undefined";

  const [hash, setHash] = useState<string>(isClient ? window.location.hash : "");

  useEffect(() => {
    if (!isClient) return;

    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isClient]);

  return (
    <nav className={cn("flex items-center space-x-1", className)} {...props}>
      {siteConfig.links.navitems.map((item) => (
        <a
          key={item.name}
          href={item.uri}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-muted/80",
            hash === item.uri || (hash === "" && item.name === "Home")
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.name}
          {(hash === item.uri || (hash === "" && item.name === "Home")) && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
          )}
        </a>
      ))}
    </nav>
  );
}
