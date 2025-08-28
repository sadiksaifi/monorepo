import { NavLinks } from "./nav-links";
import Link from "next/link";
import Sidebar from "./sidebar";
import { ThemeToggle2 } from "./theme-toggle2";
import { cn } from "@workspace/ui/lib/utils";
import { Logo } from "../logo";
import { useTheme } from "next-themes";

export default function Navbar() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/60 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div
        className={cn(
          "max-w-6xl mx-auto px-6 sm:px-8 flex h-14 items-center justify-between",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-all duration-300 hover:scale-105"
        >
          <Logo className="rounded size-6 dark:hidden" variant="dark" />
          <Logo className="rounded size-6 hidden dark:block" variant="light" />
          <span className="font-semibold text-base tracking-tight">Sadik Saifi</span>
        </Link>

        {/* Desktop Navigation */}
        <NavLinks className="hidden lg:flex mx-4" />

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Desktop Theme Toggle */}
          <ThemeToggle2 className="hidden lg:flex" />

          <Sidebar />
        </div>
      </div>
    </header>
  );
}
