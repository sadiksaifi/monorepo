import { Link, useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import { Fragment } from "react/jsx-runtime";
import { siteConfig } from "../config/site-config";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle/vite";

const buildBreadcrumbPath = (pathParts: string[], currentIndex: number) => {
  return `/${pathParts.slice(0, currentIndex + 1).join("/")}`;
};

export const AppHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const location = useLocation();
  const pathParts = location.pathname.slice(1).split("/").slice(0, 1);

  return (
    <header
      className={cn(
        "flex shrink-0 items-center gap-2 border-b",
        "h-app-header",
        className,
      )}
      {...props}
    >
      <div className="flex items-center px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-foreground md:text-muted-foreground"
                asChild
              >
                <Link to="/home">{siteConfig.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathParts.map((item, index) => {
              const isLastItem = index === pathParts.length - 1;
              return (
                <Fragment key={item}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink asChild>
                      <Link
                        to={buildBreadcrumbPath(pathParts, index)}
                        className={cn("capitalize", isLastItem && "text-foreground")}
                      >
                        {item}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="ml-auto px-3">
        <ThemeToggle />
      </div>
    </header>
  );
};
