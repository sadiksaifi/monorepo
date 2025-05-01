import { LinkProps } from "@tanstack/react-router";
import { Home, MessageCircle, Search, User, Users, type LucideIcon } from "lucide-react";
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

export const navItems: NavMenuItems[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Friends",
    url: "/friends",
    icon: Users,
  },
  {
    title: "Discover",
    url: "/discover",
    icon: Search,
  },
  {
    title: "Chat",
    url: "/chat",
    icon: MessageCircle,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];
