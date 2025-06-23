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
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {siteConfig.links.navitems.map((item) => (
        <a
          key={item.name}
          href={item.uri}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            hash === item.uri || (hash === "" && item.name === "Home")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
}
