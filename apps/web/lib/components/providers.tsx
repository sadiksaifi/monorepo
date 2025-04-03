"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { Toaster } from "./ui/sonner"
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      {children}
      <Toaster />
      <Analytics />
      <SpeedInsights />
    </NextThemesProvider>
  )
}
