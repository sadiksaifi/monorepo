import { useMutation } from '@tanstack/react-query'
import { useRouter } from '@tanstack/react-router'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { GoogleIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { CLIENT_ORIGIN } from '@/lib/constants'
import Logo from '/logo192.png'
import { cn } from '@/lib/utils'

export function SigninDrawer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
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
    <div
      className={cn('flex flex-col items-center w-full p-8 gap-10', className)}
      {...props}
    >
      {/* Branding */}
      <div className="flex flex-col items-center gap-2">
        <img src={Logo} alt="Flat Finder" className="size-12 rounded shadow" />
        <h3 className="text-2xl font-bold text-foreground">Flat Finder</h3>
        <p className="text-sm text-muted-foreground">
          Find your next apartment effortlessly.
        </p>
      </div>

      {/* Sign in button */}
      <div className="w-full flex flex-col items-center gap-4">
        <Button
          type="button"
          variant="outline"
          className="w-full gap-3 rounded-full py-5 text-base font-semibold"
          disabled={isSocialPending}
          onClick={() => mutate()}
        >
          {isSocialPending ? <Loader className="size-4 animate-spin" /> : <GoogleIcon />}
          Sign in with Google
        </Button>
      </div>

      <div className="w-full flex flex-col items-center gap-1">
        <span className="text-xs text-muted-foreground">
          Secure sign-in powered by{' '}
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google
          </a>
        </span>
        <span className="text-xs text-muted-foreground">We respect your privacy.</span>
      </div>
    </div>
  )
}
