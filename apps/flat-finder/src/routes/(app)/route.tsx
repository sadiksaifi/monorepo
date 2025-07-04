import {
  Outlet,
  createFileRoute,
  useLayoutEffect,
  useRouter,
} from '@tanstack/react-router'
import { Header } from '@/hooks/use-header'
import usePWADetection, { PLATFORM } from '@/hooks/use-pwa-detection'
import { BottomTabs } from '@/components/bottom-tabs'

export const Route = createFileRoute('/(app)')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()
  const pwaInfo = usePWADetection()

  useLayoutEffect(() => {
    if (
      [PLATFORM.IOS, PLATFORM.IPADOS, PLATFORM.ANDROID].includes(pwaInfo.platform) &&
      !pwaInfo.isPWA
    ) {
      router.navigate({
        to: '/install',
        replace: true,
        search: {
          platform: pwaInfo.platform,
        },
      })
    }
  }, [pwaInfo.isPWA, pwaInfo.platform, router])

  return (
    <>
      <Header />
      <div className="my-16 min-h-[calc(100vh-8rem)] max-w-2xl mx-auto">
        <Outlet />
      </div>
      <BottomTabs />
    </>
  )
}
