import { ThemeProvider } from "@/lib/components/theme-provider";
import * as TRPC from "@/lib/trpc-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <QueryClientProvider client={TRPC.queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </TRPC.TRPCProvider>
  );
}
