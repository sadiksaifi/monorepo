import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { Heart, MapPin, MapPinned, Phone, Share } from 'lucide-react'
import { toast } from 'sonner'
import { useMemo, useState } from 'react'
import { GoogleMap, Whatsapp } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { HeaderBackButton, useHeader } from '@/hooks/use-header'
import { PropertyCarousel } from '@/components/property-carousel'
import { PropertySkeletonPage } from '@/components/property-skeleton.skekleton'

export const Route = createFileRoute('/(app)/property/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const trpc = useTRPC()
  const { id: flatId } = Route.useParams()
  const query = useQuery(trpc.flat.getById.queryOptions(flatId))

  const mockData: typeof query.data = {
    id: '',
    propertyName: '',
    address: '',
    ownerName: '',
    ownerPhone: '',
    description: '',
    imageURL: [''],
    starred: false,
    location: '',
    rentAmount: 0,
    depositAmount: 0,
    brokerageFee: 0,
    mapsLocationLink: '',
  }
  const flat = query.data ?? mockData
  console.log('number:', flat.ownerPhone)

  const propertyLink = `${window.location.origin}/property/${flat.id}`
  const [isFavorite, setIsFavorite] = useState(flat.starred)

  // Memoize header content to prevent infinite re-renders
  const headerContent = useMemo(
    () => ({
      left: <HeaderBackButton />,
      center: (
        <Button variant="ghost" asChild>
          <Link to="/">Flat Finder</Link>
        </Button>
      ),
      right: (
        <>
          {/* <Button */}
          {/*   variant="ghost" */}
          {/*   className="h-full" */}
          {/*   onClick={() => { */}
          {/*     toast.warning('Coming soon', { */}
          {/*       description: 'Please be patient, we are working on it.', */}
          {/*     }) */}
          {/*   }} */}
          {/* > */}
          {/*   <Settings2 className="size-5" /> */}
          {/*   <span className="sr-only">Settings</span> */}
          {/* </Button> */}
          {/* <Button variant="ghost" className="h-full" asChild> */}
          {/*   <Link to="/property/add"> */}
          {/*     <Plus className="size-6" /> */}
          {/*     <span className="sr-only">Add Property</span> */}
          {/*   </Link> */}
          {/* </Button> */}
        </>
      ),
    }),
    [flat.propertyName],
  )

  useHeader(headerContent)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: handleFavorite, isPending: isFavoritePending } = useMutation(
    trpc.flat.toggleFavorite.mutationOptions({
      onError: (err) => {
        console.log(err)
        setIsFavorite(flat.starred)
        if (err.message.includes('Authentication required!')) {
          toast.error('You need to sign in to add a favorite!', {
            action: (
              <Button
                className="ml-auto"
                onClick={() => router.navigate({ to: '/signin' })}
              >
                Sign in
              </Button>
            ),
          })
          return
        }
        toast.error('Sorry, an error occured!')
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [trpc.flat.getAll.queryKey()],
        })
        queryClient.invalidateQueries({
          queryKey: [trpc.flat.getById.queryKey(flatId)],
        })
      },
    }),
  )
  if (query.isError) {
    const isOfflineError = query.error.message === 'Failed to fetch'
    const errorMsg = isOfflineError ? 'You are offline!' : 'Oops!'
    const description = isOfflineError
      ? 'Please check your internet connection.'
      : query.error.message
    toast.error(errorMsg, {
      description,
      id: isOfflineError ? 'offline-error' : query.error.message,
      duration: isOfflineError ? Infinity : 4000,
      cancel: (
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => {
            toast.dismiss('offline-error')
          }}
        >
          Dismiss
        </Button>
      ),
    })
  }

  if (query.isPending) {
    return <PropertySkeletonPage />
  }

  return (
    <div>
      <div>
        <div className="relative">
          <div className="w-full aspect-square">
            <PropertyCarousel images={flat.imageURL ?? []} />
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
              <p>₹ {flat.rentAmount!}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p>Deposit</p>
              <p>₹ {flat.depositAmount!}</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <p>Brokerage</p>
              <p>₹ {flat.brokerageFee ?? 'N/A'}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              setIsFavorite(!isFavorite)
              handleFavorite(flatId)
            }}
            variant="ghost"
            size="icon"
            disabled={isFavoritePending || query.isError}
            className={cn(
              'absolute top-0 right-0 py-0.5',
              'flex items-center gap-1.5',
              'size-16 aspect-square m-0',
            )}
          >
            <Heart className={cn('size-6', isFavorite && 'fill-foreground')} />
            <span className="sr-only">Favorite</span>
          </Button>

          {flat.location && (
            <div
              className={cn(
                'absolute bottom-16 px-2 left-2 rounded-full py-0.5',
                'bg-background/60 backdrop-blur-xl dark:backdrop-blur-sm',
                'flex items-center gap-1.5 light:border-[0.5px] border-muted-foreground',
              )}
            >
              <MapPin className="size-3.5" />
              <p className="text-sm w-fit text-muted-foreground">{flat.location}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 my-2 px-6">
          <div className="spacey-y-4">
            <div className="flex items-start gap-1 justify-between py-4">
              <h1 className="text-2xl font-bold">{flat.propertyName}</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!flat.ownerPhone || query.isError}
                  asChild
                >
                  <a href={`tel:${flat.ownerPhone}`} target="_blank">
                    <Phone />
                    <span className="sr-only">Call</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!flat.ownerPhone || query.isError}
                  onClick={() => {
                    const phone = flat.ownerPhone.replace('+', '')
                    const message = `Hi, I'm interested in your flat.\nLink: ${propertyLink}`
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
                    window.open(url, '_blank') // or '_self' if you want to stay in the PWA
                  }}
                >
                  <Whatsapp />
                  <span className="sr-only">Whatsapp</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={!flat.mapsLocationLink || query.isError}
                  onClick={() => {
                    if (!flat.mapsLocationLink) {
                      toast.error('Maps location is not available')
                      return
                    }
                    flat.mapsLocationLink && window.open(flat.mapsLocationLink)
                  }}
                >
                  <GoogleMap />
                  <span className="sr-only">Google Maps</span>
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
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
            <div className="text-muted-foreground gap-1">
              <MapPinned className="size-4 inline-block mr-1.5 -translate-y-0.5" />
              {flat.address ?? 'Address not available'}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              Name:{' '}
              <p className="text-muted-foreground">
                {flat.ownerName ?? 'Owner name not available'} {flat.ownerPhone}
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
