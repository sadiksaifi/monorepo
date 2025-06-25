import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { Button } from './ui/button'
import { ScreenLoader } from './screen-loader'

export const ErrorComponent = ({ error }: { error: Error }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 h-screen w-full -mt-24 px-6">
        <h1 className="font-bold text-xl">Something went wrong!</h1>
        <p className="text-red-500 text-center">{error.message}</p>
        <div className="flex gap-2 items-center my-4">
          <Button
            onClick={async () => {
              setIsLoading(true)
              await new Promise((resolve) => setTimeout(resolve, 300))
              router.invalidate()
              setIsLoading(false)
            }}
          >
            Try again
          </Button>
          <Button
            onClick={async () => {
              setIsLoading(true)
              await new Promise((resolve) => setTimeout(resolve, 300))
              setIsLoading(false)
              router.navigate({ to: '/' })
            }}
          >
            Go to home
          </Button>
        </div>
      </div>
      <ScreenLoader isVisible={isLoading} />
    </>
  )
}
