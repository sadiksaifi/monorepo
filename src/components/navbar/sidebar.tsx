import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { Menu } from "lucide-react";
import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Sidebar: FC = () => {
  const { navitems } = siteConfig.links;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="menu" className="px-2" variant="ghost">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-4 mt-1">
        {navitems.map(({ uri, name }) => (
          <DropdownMenuItem key={uri} asChild>
            <a href={uri}>{name}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Sidebar;
