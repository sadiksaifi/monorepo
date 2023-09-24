import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { Linkedin, Mail, Menu } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

interface SidebarNavLinksProps {
  uri: string;
  name: string;
}

const SidebarNavLinks = (links: SidebarNavLinksProps) => {
  return (
    <SheetClose asChild>
      <Link
        className={cn(buttonVariants({ variant: "link" }), "p-0")}
        href={links.uri}
      >
        {links.name}
      </Link>
    </SheetClose>
  );
};

const Sidebar: FC = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="px-2" variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-10 py-16 flex flex-col justify-between"
      >
        <div>
          <SheetHeader className="text-start mb-4">
            <SheetTitle>Sadik Saifi</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col justify-start items-start py-4 gap-4">
            {siteConfig.links.navitems.map((item) => (
              <SidebarNavLinks
                key={item.name}
                name={item.name}
                uri={item.uri}
              />
            ))}
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <div className="flex gap-6">
              <Link target="_blank" href={siteConfig.links.github}>
                <Icons.GitHub className="h-6 w-6" />
              </Link>
              <Link target="_blank" href={siteConfig.links.x}>
                <Icons.X className="h-6 w-6 fill-current" />
              </Link>
              <Link target="_blank" href={siteConfig.links.linkedin}>
                <Linkedin />
              </Link>
              <Link target="_blank" href={siteConfig.links.mail}>
                <Mail />
              </Link>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
