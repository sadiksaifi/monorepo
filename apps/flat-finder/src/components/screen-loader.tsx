import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ScreenLoader({
  isVisible,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean
}) {
  return (
    isVisible && (
      <div
        className={cn(
          'h-[calc(100vh-4rem)] w-screen',
          'bg-background/50 backdrop-blur-sm fixed top-14 left-0 z-50',
          'flex flex-col justify-center items-center gap-2',
        )}
        {...props}
      >
        <Loader className="size-8 animate-spin text-foreground" />
        <p className="text-lg translate-x-1 text-muted-foreground">
          Please wait while loading!
        </p>
      </div>
    )
  )
}
