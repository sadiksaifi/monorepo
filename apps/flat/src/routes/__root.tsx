import { Header } from '@/components/header'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider, useTheme } from '@workspace/ui/components/theme-provider/vite'
import * as TRPC from '@/lib/trpc-client'
import { QueryClientProvider } from '@tanstack/react-query'

export const Route = createRootRoute({
  component: RootRouteComponent,
})

function RootRouteComponent() {
  const { theme } = useTheme()

  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <QueryClientProvider client={TRPC.queryClient}>
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
          <Header />
          <Toaster position="top-center" theme={theme} richColors />
          <div className="mt-14">
            <Outlet />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </TRPC.TRPCProvider>
  )
}
