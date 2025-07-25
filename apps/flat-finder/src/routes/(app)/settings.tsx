import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import ThemeSwitcher from '@/components/theme-switcher-02'
import { useHeader } from '@/hooks/use-header'

export const Route = createFileRoute('/(app)/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const headerContent = useMemo(
    () => ({
      left: <div className="px-4 font-medium">Settings</div>,
      center: <></>,
      right: <></>,
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
