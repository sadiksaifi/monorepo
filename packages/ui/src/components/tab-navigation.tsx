// Tremor TabNavigation [v0.1.0]

import * as NavigationMenuPrimitives from "@radix-ui/react-navigation-menu";
import React from "react";

import { cn } from "@workspace/ui/lib/utils";
import type { ScrollAreaProps } from "@workspace/ui/components/scroll-area";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

export function getSubtree(
  options: {
    asChild?: boolean;
    children: React.ReactNode;
  },
  content: React.ReactNode | ((children: React.ReactNode) => React.ReactNode),
) {
  const { asChild, children } = options;

  if (!asChild) {
    return typeof content === "function" ? content(children) : content;
  }

  const firstChild = React.Children.only(children) as React.ReactElement<{
    children?: React.ReactNode;
    className?: string;
  }>;
  return React.cloneElement(
    firstChild,
    undefined,
    typeof content === "function" ? content(firstChild.props.children) : content,
  );
}

type TabNavigationRootProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Root>;

type TabNavigationListProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.List>;

type TabNavigationItemProps = {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
} & React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitives.Link>;

const TabNavigationRoot = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Root>,
  TabNavigationRootProps
>(({ children, className, ...props }, ref) => (
  <NavigationMenuPrimitives.Root
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitives.Root>
));
TabNavigationRoot.displayName = "TabNavigationRoot";

const TabNavigationList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.List>,
  TabNavigationListProps
>(({ children, className, ...props }, ref) => (
  <NavigationMenuPrimitives.List
    ref={ref}
    className={cn(
      "flex px-4 items-center justify-start whitespace-nowrap border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-border",
      className,
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitives.List>
));
TabNavigationList.displayName = "TabNavigationList";

const TabNavigationItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitives.Link>,
  TabNavigationItemProps
>(({ children, className, disabled, active, ...props }, ref) => (
  <NavigationMenuPrimitives.Item className="flex" aria-disabled={disabled}>
    <NavigationMenuPrimitives.Link
      ref={ref}
      className={cn(
        "group relative flex shrink-0 select-none items-center justify-center",
        disabled ? "pointer-events-none" : "",
      )}
      onSelect={() => {}}
      {...props}
    >
      <span
        className={cn(
          "-mb-px flex items-center justify-center whitespace-nowrap border-b-2 px-3 pb-2 text-sm transition-all",
          active
            ? "border-primary text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
          disabled ? "pointer-events-none text-muted" : "",
          "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-primary",
          className,
        )}
      >
        {children}
      </span>
    </NavigationMenuPrimitives.Link>
  </NavigationMenuPrimitives.Item>
));
TabNavigationItem.displayName = "TabNavigationItem";

const TabNavigationContent = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & ScrollAreaProps) => (
  <ScrollArea
    className={cn(
      "overflow-y-auto",
      "max-h-[calc(100vh-var(--tab-navigation-content-height))]",
      "flex items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <ScrollBar orientation="vertical" />
  </ScrollArea>
);
TabNavigationContent.displayName = "TabNavigationContent";

const TabNavigation = {
  Root: TabNavigationRoot,
  List: TabNavigationList,
  Item: TabNavigationItem,
  Content: TabNavigationContent,
};

export { TabNavigation };
