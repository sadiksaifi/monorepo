import { Header } from '@/components/header'
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider, useTheme } from '@workspace/ui/components/theme-provider/vite'
import * as TRPC from '@/lib/trpc-client'
import { QueryClientProvider } from '@tanstack/react-query'
import { Footer } from '@/components/footer'

export const Route = createRootRoute({
  component: RootRouteComponent,
})

function RootRouteComponent() {
  const { theme } = useTheme()
  const routerState = useRouterState()

  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <QueryClientProvider client={TRPC.queryClient}>
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
          <Header rootRoute={routerState.location.pathname === '/'} />
          <Toaster position="top-center" theme={theme} richColors />
          <div className="mt-14 min-h-[calc(100vh-8rem)] max-w-2xl mx-auto">
            <Outlet />
          </div>
          <Footer className="max-w-2xl mx-auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </TRPC.TRPCProvider>
  )
}
