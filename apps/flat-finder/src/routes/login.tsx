import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { HeaderBackButton } from '@/hooks/use-header'
import { authClient } from '@/lib/auth-client'
import { CLIENT_ORIGIN } from '@/lib/constants'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter()

  const { mutate, isPending: isSocialPending } = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: CLIENT_ORIGIN,
      })
      if (error) {
        toast.error(error.message)
        throw error
      }
    },
    onError: (error) => {
      console.log(error)
      toast.error('Something went wrong!', {
        description: error.message,
      })
    },
    onSuccess: () => {
      router.navigate({ to: '/' })
    },
  })

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="fixed top-0 left-0 flex items-center p-4">
        <HeaderBackButton />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold text-center">Sign in</h1>
          <p className="text-center text-sm text-muted-foreground">
            Please sign in to continue.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="py-8 !px-22 gap-3"
          disabled={isSocialPending}
          onClick={() => mutate()}
        >
          {isSocialPending ? <Loader className="size-4 animate-spin" /> : <GoogleIcon />}
          Sign in With Google
        </Button>
      </div>
    </div>
  )
}
