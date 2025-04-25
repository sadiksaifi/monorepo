"use client";

import * as React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { MobileAppHeader } from "./mobile-app-header";
import { MobileAppBottomBar } from "./mobile-app-bottom-bar";
import { ThemeProvider } from "@workspace/ui/components/theme-provider/vite";
import { Outlet } from "@tanstack/react-router";

// Constants for mobile app layout
const MOBILE_APP_HEADER_HEIGHT = "4rem"; // 64px
const MOBILE_APP_BOTTOM_BAR_HEIGHT = "5rem"; // 80px (original height)
const MOBILE_APP_BOTTOM_BAR_HEIGHT_FLOATING = "3.5rem"; // 56px (adjusted for floating variant)

interface MobileAppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  bottomBarVariant?: "default" | "floating";
  useThemeProvider?: boolean;
  headerRightSlot?: React.ReactNode;
  hideBottomBar?: boolean;
}

export function MobileAppLayout({
  children,
  className,
  bottomBarVariant = "default",
  useThemeProvider = false,
  headerRightSlot,
  hideBottomBar = false,
  ...props
}: MobileAppLayoutProps) {
  const content = (
    <div
      className={cn("flex flex-col min-h-screen", className)}
      style={
        {
          "--mobile-app-header-height": MOBILE_APP_HEADER_HEIGHT,
          "--mobile-app-bottom-bar-height": hideBottomBar
            ? "0"
            : bottomBarVariant === "default"
              ? MOBILE_APP_BOTTOM_BAR_HEIGHT
              : MOBILE_APP_BOTTOM_BAR_HEIGHT_FLOATING,
        } as React.CSSProperties
      }
      data-mobile-app="layout"
      data-hide-bottom-bar={hideBottomBar}
      {...props}
    >
      <MobileAppHeader rightSlot={headerRightSlot} />

      <div
        data-mobile-app="content"
        className="flex-1 overflow-auto"
        style={{
          paddingTop: "var(--mobile-app-header-height)",
          paddingBottom: "var(--mobile-app-bottom-bar-height)",
        }}
      >
        <main className="p-4">{children || <Outlet />}</main>
      </div>

      {!hideBottomBar && <MobileAppBottomBar variant={bottomBarVariant} />}
    </div>
  );

  if (useThemeProvider) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="app-theme">
        {content}
      </ThemeProvider>
    );
  }

  return content;
}
