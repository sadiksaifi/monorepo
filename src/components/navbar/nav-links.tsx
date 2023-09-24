import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function NavLinks({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {siteConfig.links.navitems.map((item) => (
        <Link
          key={item.name}
          href={item.uri}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
