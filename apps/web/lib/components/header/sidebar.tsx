"use client";

import * as React from "react";
import { siteConfig } from "@/lib/config/site";
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { ThemeToggle2 } from "./theme-toggle2";

const Sidebar: FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scrolling when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "relative size-14 flex flex-col items-center justify-center rounded-lg hover:bg-muted/80 transition-colors duration-200",
            "-mr-5",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={cn(
              "absolute w-5 h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full",
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5",
            )}
          />
          <span
            className={cn(
              "absolute w-5 h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full",
              isOpen ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute w-5 h-0.5 bg-foreground transition-all duration-300 ease-in-out rounded-full",
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5",
            )}
          />
        </button>
      </SheetTrigger>
      <SheetContent
        className={cn(
          "fixed h-screen top-0 border-0 backdrop-blur-xl bg-background/80 z-40 shadow-none",
          "transition-all duration-300",
          isOpen ? "opacity-100 animate-fade-in" : "opacity-0 animate-fade-out",
        )}
        close={true}
        overlay={false}
        side="top"
      >
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 p-8">
            <SheetTitle className="text-2xl font-bold mb-8 text-center gradient-text sr-only">
              Menu
            </SheetTitle>
            <nav className="space-y-2 mt-16">
              {siteConfig.links.navitems.map((item) => (
                <SheetClose asChild key={item.uri}>
                  <Link
                    href={item.uri}
                    className="block p-4 text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </div>
        <SheetFooter>
          <div className="flex items-center justify-center">
            <ThemeToggle2 />
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ) : null;
};

export default Sidebar;
