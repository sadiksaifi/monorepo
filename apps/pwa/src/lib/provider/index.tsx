import * as TRPC from "@/lib/trpc-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider } from "@workspace/ui/components/theme-provider/vite";
import { SocketProvider } from "./socket.provider";
import { PeerProvider } from "./peer.provider";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <QueryClientProvider client={TRPC.queryClient}>
        <SocketProvider>
          <PeerProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              {children}
              <Toaster />
            </ThemeProvider>
          </PeerProvider>
        </SocketProvider>
      </QueryClientProvider>
    </TRPC.TRPCProvider>
  );
}
