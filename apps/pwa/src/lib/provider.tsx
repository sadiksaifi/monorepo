import * as TRPC from "@/lib/trpc-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider } from "@workspace/ui/components/theme-provider/vite";
import { SocketProvider } from "./socket-provider";
import { RouterLoader } from "./components/router-loader";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <QueryClientProvider client={TRPC.queryClient}>
        <SocketProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {children}
            <Toaster />
            <RouterLoader />
          </ThemeProvider>
        </SocketProvider>
      </QueryClientProvider>
    </TRPC.TRPCProvider>
  );
}
