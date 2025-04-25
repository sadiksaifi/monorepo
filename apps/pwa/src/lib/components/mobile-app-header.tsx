"use client";

import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { useRouter, useRouterState } from "@tanstack/react-router";
import { navItems } from "./nav-items";

// Define root-level routes that should use the default header
const ROOT_ROUTES = ["/home", "/friends", "/discover", "/chat", "/profile"];

interface MobileAppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  rightSlot?: React.ReactNode;
}

export const MobileAppHeader = React.forwardRef<HTMLElement, MobileAppHeaderProps>(
  ({ className, rightSlot, ...props }, ref) => {
    const router = useRouter();
    const { location } = useRouterState();
    const currentPath = location.pathname;

    // Check if we're on a root route
    const isRootRoute = ROOT_ROUTES.some(
      (route) => currentPath === route || currentPath === route + "/",
    );

    // Find current route title
    const currentNavItem = navItems.find(
      (item) =>
        currentPath === String(item.url) || currentPath.startsWith(String(item.url)),
    );

    // Get current page title
    const getPageTitle = () => {
      if (currentNavItem) {
        return currentNavItem.title;
      }

      // Extract title from path for nested routes
      const pathSegments = currentPath.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        return pathSegments[pathSegments.length - 1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      return "";
    };

    const handleGoBack = () => {
      router.history.back();
    };

    return (
      <header
        ref={ref}
        data-mobile-app="header"
        data-root-route={isRootRoute ? "true" : "false"}
        className={cn(
          "bg-background fixed top-0 left-0 right-0 w-full z-50 h-16 border-b",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between h-full px-4 max-w-lg mx-auto">
          {/* Left side: Title for root routes, Back button for nested routes */}
          <div className="flex-1 flex items-center justify-start">
            {isRootRoute ? (
              // Root level route: show route name only
              <div className="font-medium">{getPageTitle()}</div>
            ) : (
              // Nested route: show back button with text
              <Button
                variant="ghost"
                onClick={handleGoBack}
                className="px-2 -ml-4 flex gap-0 items-center text-primary"
              >
                <ChevronLeft className="h-5 w-5 -ml-1" />
                <span className="text-base font-medium">back</span>
              </Button>
            )}
          </div>

          {/* Center: Title for nested routes */}
          {!isRootRoute && (
            <div className="flex-1 text-center font-medium">{getPageTitle()}</div>
          )}

          {/* Right: Customizable area */}
          <div className="flex-1 flex items-center justify-end">{rightSlot}</div>
        </div>
      </header>
    );
  },
);

MobileAppHeader.displayName = "MobileAppHeader";
