import { GoogleMap, Whatsapp } from '@/components/icons'
import { ScreenLoader } from '@/components/screen-loader'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { Ban, ChevronLeft, MapPinned, Phone, Share } from 'lucide-react'
import { toast } from 'sonner'

export const Route = createFileRoute('/flat/$')({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-red-500 h-screen w-full -mt-24">
        <h1 className="font-bold text-xl">Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    )
  },
  pendingComponent: () => <ScreenLoader isVisible={true} />,
})

function RouteComponent() {
  const trpc = useTRPC()
  const router = useRouter()
  const { _splat: flatId } = Route.useParams()
  const query = useSuspenseQuery(trpc.flat.getById.queryOptions(flatId!))
  const flat = query.data!
  const propertyLink = `${window.location.origin}/flat/${flat.id}`

  return (
    <div>
      <Button
        onClick={() => {
          router.history.back()
        }}
        variant="link"
        className={cn(
          'h-14 px-1 flex items-center w-fit text-base gap-0.5 text-muted-foreground',
        )}
      >
        <ChevronLeft />
        back
      </Button>
      <div>
        <div className="relative">
          <div className="w-full aspect-square border-[0.5px] light:border-foreground">
            {flat?.imageURL?.[0] ? (
              <img
                className="size-full object-cover"
                src={(flat?.imageURL as unknown as string) ?? ''}
                alt={flat?.propertyName ?? ''}
              />
            ) : (
              <div className="size-full bg-secondary flex flex-col items-center justify-center gap-2">
                <Ban className="size-20 -mt-10 text-muted-foreground" />
                <p className="text-muted-foreground">No image/video is available.</p>
              </div>
            )}
          </div>
          <div
            className={cn(
              'absolute bottom-0 left-0 w-full bg-background/60 backdrop-blur-lg dark:backdrop-blur-sm',
              'flex items-center justify-around',
              '*:text-sm',
              'divide-x-[0.5px] divide-muted-foreground *:flex-1 py-1',
              'border-foreground light:border-[0.5px]',
            )}
          >
            <div className="flex flex-col items-center justify-center gap-1 *:truncate">
              <p>Rent</p>
              <p>₹ {flat?.rentAmount!}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p>Deposit</p>
              <p>₹ {flat?.depositAmount!}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p>Brokerage</p>
              <p>₹ {flat?.brokerageFee! ?? 'N/A'}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 my-2 px-6">
          <div className="spacey-y-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-3xl font-bold">{flat?.propertyName}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <a href={`tel:${flat.ownerPhone}`} target="_blank">
                    <Phone />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href={`https://wa.me/${flat.ownerPhone}?text=Hi%20there%0AI'm%20looking%20for%20a%20flat%20in%20${flat.propertyName}%20in%20${flat.address}%0A${propertyLink}`}
                    target="_blank"
                  >
                    <Whatsapp />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    console.log('location: ', flat.mapsLocationLink)
                    if (!flat.mapsLocationLink) {
                      toast.error('Maps location is not available')
                      return
                    }
                    flat.mapsLocationLink && window.open(flat.mapsLocationLink)
                  }}
                >
                  <GoogleMap />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    navigator
                      .share({
                        title: 'Flat Finder',
                        text: 'Check out this flat!',
                        url: propertyLink,
                      })
                      .then(() => console.log('Content shared successfully'))
                      .catch((error) => {
                        console.error('Error sharing:', error)
                        if (error.name === 'AbortError') return
                        window.navigator.clipboard.writeText(propertyLink)
                        toast.success('Copied to clipboard')
                      })
                  }}
                >
                  <Share />
                </Button>
              </div>
            </div>
            <div className="text-muted-foreground gap-1">
              <MapPinned className="size-4 inline-block mr-1.5 -translate-y-0.5" />
              {flat?.address ?? 'Address not available'}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              Name:{' '}
              <p className="text-muted-foreground">
                {flat.ownerName ?? 'Owner name not available'} (+{flat.ownerPhone})
              </p>
            </div>
            <div>
              Description:{' '}
              <p className="text-muted-foreground">
                {flat.description ?? 'Description not available'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
