"use client";

import * as React from "react";
import { Icons } from "@/lib/components/icons";
import { siteConfig } from "@/lib/config/site";
import { FC, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@workspace/ui/components/button";
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

const socialLinks = [
  {
    label: "Twitter",
    icon: Icons.X,
    to: siteConfig.links.x,
  },
  {
    label: "Github",
    icon: Icons.GitHub,
    to: siteConfig.links.github,
  },
  {
    label: "LinkedIn",
    icon: Icons.LinkedIn,
    to: siteConfig.links.linkedin,
  },
];

const Sidebar: FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  return isMobile ? (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="relative size-8 flex flex-col items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={cn(
              "absolute w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
              isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5",
            )}
          />
          <span
            className={cn(
              "absolute w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
              isOpen ? "opacity-0" : "opacity-100",
            )}
          />
          <span
            className={cn(
              "absolute w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
              isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5",
            )}
          />
        </button>
      </SheetTrigger>
      <SheetContent
        className="h-[calc(100vh-3.5rem)] top-14 border-0 backdrop-blur-md bg-background/30"
        close={false}
      >
        <SheetTitle className="flex flex-col p-8 font-normal text-xl tracking-wide">
          {siteConfig.links.navitems.map((item) => (
            <SheetClose asChild key={item.uri} className="p-4">
              <Link href={item.uri} rel="noreferrer">
                {item.name}
              </Link>
            </SheetClose>
          ))}
        </SheetTitle>
        <SheetFooter className="flex flex-row items-center justify-around py-10">
          {socialLinks.map((item) => (
            <Link href={item.to} target="_blank" rel="noreferrer" key={item.label}>
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "w-9 px-0",
                )}
              >
                <item.icon className="size-6 fill-current" />
                <span className="sr-only">{item.label}</span>
              </div>
            </Link>
          ))}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <>
      {socialLinks.map((item) => (
        <Link
          href={item.to}
          target="_blank"
          rel="noreferrer"
          key={item.label}
          className={cn(
            buttonVariants({
              size: "icon",
              variant: "ghost",
            }),
          )}
        >
          <item.icon className="size-5 fill-current" />
          <span className="sr-only">{item.label}</span>
        </Link>
      ))}
    </>
  );
};

export default Sidebar;
