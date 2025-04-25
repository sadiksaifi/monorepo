"use client";

import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { navItems } from "./nav-items";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

// Constants for mobile app layout
const MOBILE_APP_HEADER_HEIGHT = "4rem"; // 64px
const MOBILE_APP_BOTTOM_BAR_HEIGHT = "5rem"; // 80px (original height)
const MOBILE_APP_BOTTOM_BAR_HEIGHT_FLOATING = "3.5rem"; // 56px (adjusted for floating variant)

// Context for managing mobile navigation state
type MobileNavContextProps = {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
};

const MobileNavContext = React.createContext<MobileNavContextProps | null>(null);

function useMobileNav() {
  const context = React.useContext(MobileNavContext);
  if (!context) {
    throw new Error("useMobileNav must be used within a MobileNavProvider");
  }
  return context;
}

interface MobileNavProviderProps {
  children: React.ReactNode;
}

function MobileNavProvider({ children }: MobileNavProviderProps) {
  const { location } = useRouterState();
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  // Update active item based on current route
  React.useEffect(() => {
    const currentPath = location.pathname;
    const matchedItem = navItems.find(
      (item) =>
        currentPath === String(item.url) ||
        currentPath.startsWith(String(item.url)) ||
        (String(item.url) === "/profile" && currentPath.startsWith("/settings")),
    );

    setActiveItem(matchedItem?.title || null);
  }, [location.pathname]);

  return (
    <MobileNavContext.Provider value={{ activeItem, setActiveItem }}>
      {children}
    </MobileNavContext.Provider>
  );
}

// Tab component with variants
const tabVariants = cva(
  "flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ease-in-out",
  {
    variants: {
      state: {
        active: "text-primary font-medium",
        inactive: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "",
        sm: "scale-90",
        lg: "scale-110",
      },
    },
    defaultVariants: {
      state: "inactive",
      size: "default",
    },
  },
);

interface TabProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof tabVariants> {
  icon: React.ReactNode;
  label: string;
  to: string;
  asChild?: boolean;
}

const Tab = React.forwardRef<HTMLAnchorElement, TabProps>(
  ({ icon, label, to, asChild = false, state, size, className, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;
    const { activeItem } = useMobileNav();
    const isActive = state === "active" || activeItem === label;

    return (
      <Comp
        ref={ref}
        to={to}
        data-state={isActive ? "active" : "inactive"}
        className={cn(
          tabVariants({ state: isActive ? "active" : "inactive", size }),
          className,
        )}
        {...props}
      >
        <div className="h-6 w-6">{icon}</div>
        <span className="text-xs mt-1">{label}</span>
      </Comp>
    );
  },
);
Tab.displayName = "Tab";

interface MobileAppBottomBarProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "floating";
}

export const MobileAppBottomBar = React.forwardRef<
  HTMLDivElement,
  MobileAppBottomBarProps
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <MobileNavProvider>
      <div
        ref={ref}
        data-mobile-app="bottom-bar"
        data-variant={variant}
        style={
          {
            "--mobile-app-bottom-bar-height":
              variant === "default"
                ? MOBILE_APP_BOTTOM_BAR_HEIGHT
                : MOBILE_APP_BOTTOM_BAR_HEIGHT_FLOATING,
          } as React.CSSProperties
        }
        className={cn(
          "bg-background fixed bottom-0 left-0 right-0 w-full z-50",
          "border-t shadow-lg pb-4",
          variant === "default"
            ? "h-[var(--mobile-app-bottom-bar-height)]"
            : "mx-auto max-w-lg px-4",
          variant === "floating" &&
            "bottom-4 max-w-md mx-auto rounded-full border h-[var(--mobile-app-bottom-bar-height)]",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-between h-full",
            variant === "default" ? "px-2 max-w-lg mx-auto" : "px-2",
          )}
        >
          {navItems.map((item) => {
            const url = String(item.url);
            return (
              <Tab
                key={item.title}
                icon={<item.icon className="w-6 h-6" />}
                label={item.title}
                to={url}
              />
            );
          })}
        </div>
      </div>
    </MobileNavProvider>
  );
});
MobileAppBottomBar.displayName = "MobileAppBottomBar";
