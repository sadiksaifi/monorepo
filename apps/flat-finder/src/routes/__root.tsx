import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider, useTheme } from '@workspace/ui/components/theme-provider/vite'
import * as TRPC from '@/lib/trpc-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { HeaderProvider } from '@/hooks/use-header'

export const Route = createRootRoute({
  component: RootRouteComponent,
})

function RootRouteComponent() {
  const { theme } = useTheme()

  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <QueryClientProvider client={TRPC.queryClient}>
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
          <HeaderProvider>
            <Toaster position="top-center" theme={theme} richColors />
            <Outlet />
          </HeaderProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </TRPC.TRPCProvider>
  )
}
