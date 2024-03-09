"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Menu } from "lucide-react";
import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Sidebar: FC = () => {
  const { navitems } = siteConfig.links;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <aside className="lg:hidden">
      <DropdownMenu defaultOpen={isMenuOpen}>
        <DropdownMenuTrigger
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="menu"
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "px-2",
          )}
          asChild
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-4 mt-1">
          {navitems.map(({ uri, name }) => (
            <DropdownMenuItem key={uri} asChild>
              <Link href={uri}>{name}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  );
};

export default Sidebar;
