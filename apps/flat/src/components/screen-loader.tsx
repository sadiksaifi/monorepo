import { Loader } from 'lucide-react'

export function ScreenLoader({
  isVisible,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean
}) {
  return (
    isVisible && (
      <div
        className="h-screen w-screen flex items-center justify-center fixed top-0 left-0 z-50 bg-background/50 backdrop-blur-sm"
        {...props}
      >
        <Loader className="size-8 animate-spin" />
      </div>
    )
  )
}
