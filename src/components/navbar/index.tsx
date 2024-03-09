import { NavLinks } from "./nav-links";
import ThemeSwitcher from "../theme-switcher";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { siteConfig } from "@/config/site";
import { Icons } from "../icons";
import Sidebar from "./sidebar";

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
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}
