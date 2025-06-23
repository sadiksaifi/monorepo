import { NavLinks } from "./nav-links";
import Link from "next/link";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle/next";
import Sidebar from "./sidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur">
      <div className="container flex xl:justify-between h-14 items-center">
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
          <div className="flex md:gap-0 gap-1.5 items-center">
            <ThemeToggle className="*:!size-5" />
            <Sidebar />
          </div>
        </div>
      </div>
    </header>
  );
}
