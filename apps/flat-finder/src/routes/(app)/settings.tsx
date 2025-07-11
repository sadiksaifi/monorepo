import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { Settings2 } from 'lucide-react'
import ThemeSwitcher from '@/components/theme-switcher-02'
import { useHeader } from '@/hooks/use-header'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(app)/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const headerContent = useMemo(
    () => ({
      left: <div className="px-4 font-medium">Settings</div>,
      center: <></>,
      right: (
        <Button
          variant="ghost"
          className="h-full aspect-square"
          onClick={() => {
            toast.warning('Coming soon', {
              description: 'Please be patient, we are working on it.',
            })
          }}
        >
          <Settings2 className="size-5" />
          <span className="sr-only">Settings</span>
        </Button>
      ),
    }),
    [],
  )

  useHeader(headerContent)

  return (
    <div className="p-4 mt-18">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-muted-foreground">
            Change your settings here. You can change your theme, account, and more.
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-base font-bold">Theme</h2>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
