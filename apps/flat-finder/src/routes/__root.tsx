import { Outlet, createRootRoute } from '@tanstack/react-router'
import { ThemeProvider, useTheme } from '@workspace/ui/components/theme-provider/vite'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import * as TRPC from '@/lib/trpc-client'
import { Toaster } from '@/components/ui/sonner'
import { HeaderProvider } from '@/hooks/use-header'
import OfflineOverlay from '@/components/OfflineOverlay'
import UpdatePrompt from '@/components/update-prompt'
import { BottomTabs } from '@/components/bottom-tabs'

const persister = createSyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
})

export const Route = createRootRoute({
  component: RootRouteComponent,
})

function RootRouteComponent() {
  const { theme } = useTheme()

  return (
    <TRPC.TRPCProvider queryClient={TRPC.queryClient} trpcClient={TRPC.trpcClient}>
      <PersistQueryClientProvider
        client={TRPC.queryClient}
        persistOptions={{ persister }}
      >
        <ThemeProvider storageKey="vite-ui-theme" defaultTheme="dark">
          <HeaderProvider>
            <OfflineOverlay />
            <UpdatePrompt />
            <Toaster position="top-center" theme={theme} richColors />
            <Outlet />
            <BottomTabs />
          </HeaderProvider>
        </ThemeProvider>
      </PersistQueryClientProvider>
    </TRPC.TRPCProvider>
  )
}
