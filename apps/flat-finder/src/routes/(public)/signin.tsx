import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { HeaderBackButton } from '@/hooks/use-header'
import { authClient } from '@/lib/auth-client'
import { CLIENT_ORIGIN } from '@/lib/constants'
import Logo from '/logo192.png'

export const Route = createFileRoute('/(public)/signin')({
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
    <div className="h-screen flex items-center justify-center bg-background -mt-6">
      <div className="fixed top-0 left-0 flex items-center p-4">
        <HeaderBackButton />
      </div>
      <div className="flex flex-col items-center justify-center gap-6 px-6 max-w-sm">
        {/* Logo/Icon */}
        <img src={Logo} alt="Flat Finder" className="size-16 rounded-md" />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-bold text-foreground">Welcome to Flat Finder</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Find your perfect home with ease. Browse properties, save favorites, and get
            instant updates.
          </p>
        </div>

        {/* Sign In Button */}
        <div className="w-full">
          <Button
            type="button"
            variant="outline"
            className="w-full py-8 !px-22 gap-3"
            disabled={isSocialPending}
            onClick={() => mutate()}
          >
            {isSocialPending ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Sign in With Google
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          Secure sign-in powered by Google
        </p>
      </div>
    </div>
  )
}
