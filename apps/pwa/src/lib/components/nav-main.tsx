"use client";

import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  SquareChartGantt,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Link, LinkProps, useRouterState } from "@tanstack/react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";

type NavMenuItems = {
  title: string;
  url: LinkProps["to"];
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

const items: NavMenuItems[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: SquareChartGantt,
    isActive: true,
    items: [
      {
        title: "Reminder",
        url: "/analytics/reminder",
      },
      {
        title: "Dispense",
        url: "/analytics/dispense",
      },
      {
        title: "Add Drug",
        url: "/analytics/add-drug",
      },
      {
        title: "Schedule",
        url: "/analytics/schedule",
      },
      {
        title: "Session",
        url: "/analytics/session",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isActive: true,
    items: [
      {
        title: "Account",
        url: "/account",
      },
      {
        title: "Notifications",
        url: "/notification",
      },
    ],
  },
];

export function NavMain() {
  const state = useRouterState();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  state.location.pathname.endsWith(item.url!) && "bg-secondary",
                )}
                asChild
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            className={cn(
                              state.location.pathname === subItem.url && "bg-secondary",
                            )}
                            asChild
                          >
                            <Link to={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
