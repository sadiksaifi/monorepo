import { NavLinks } from "./nav-links";
import Link from "next/link";
import {ThemeToggle} from "@/lib/components/theme-toggle";
import { Icons } from "@/lib/components/icons";
import { siteConfig } from "@/lib/config/site";
import Sidebar from "./sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { buttonVariants } from "@workspace/ui/components/button";

export default function Navbar() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur">
      <nav className="container flex xl:justify-between h-14 items-center">
        <Sidebar />
        <Link
          href="/"
          className="px-2 xl:px-0 font-medium transition-colors hover:text-primary"
        >
          Sadik Saifi
        </Link>
        <NavLinks className="hidden lg:flex mx-6" />
        <div
          className="ml-auto xl:ml-0
          flex items-center space-x-4"
        >
          <div className="flex items-center">
            <Link href={siteConfig.links.x} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.X className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <Icons.GitHub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
