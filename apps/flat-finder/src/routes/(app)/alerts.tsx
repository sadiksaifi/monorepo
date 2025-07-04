import { createFileRoute } from '@tanstack/react-router'
import { useMemo } from 'react'
import { Building2, Settings2 } from 'lucide-react'
import { toast } from 'sonner'
import { useHeader } from '@/hooks/use-header'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/(app)/alerts')({
  component: RouteComponent,
})

function RouteComponent() {
  const headerContent = useMemo(
    () => ({
      left: <div className="px-4 font-medium">Alerts</div>,
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
    <div className="h-screen gap-4 flex -mt-20 justify-center items-center flex-col">
      <Building2 className="size-20 text-muted-foreground" />
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="text-2xl font-bold">Alerts</h1>
        <p className="text-muted-foreground">This page is under construction.</p>
      </div>
    </div>
  )
}
