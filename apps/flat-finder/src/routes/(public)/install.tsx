import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { IOSInstall } from '@/components/install-ios'
import { PLATFORM } from '@/hooks/use-pwa-detection'

export const Route = createFileRoute('/(public)/install')({
  component: RouteComponent,
  validateSearch: (search) => {
    return z
      .object({
        // platform: z.enum([PLATFORM.IOS, PLATFORM.IPADOS, PLATFORM.ANDROID]),
        platform: z.enum([PLATFORM.IOS]),
      })
      .parse(search)
  },
  errorComponent: () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-[70%] space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary">404</h1>
        <p className="text-center">
          Please be patient, your device support is coming soon.
        </p>
      </div>
    </div>
  ),
})

function RouteComponent() {
  const { platform } = Route.useSearch()

  return <div>{screen[platform]()}</div>
}

const screen = {
  [PLATFORM.IOS]: IOSInstall,
}
