import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { Heart, MapPin, MapPinned, Phone, Plus, Settings2, Share } from 'lucide-react'
import { toast } from 'sonner'
import { useMemo, useState } from 'react'
import { GoogleMap, Whatsapp } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { ErrorComponent } from '@/components/error-component'
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

  const propertyLink = `${window.location.origin}/flat/${flat.id}`
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
          <Button
            variant="ghost"
            className="h-full"
            onClick={() => {
              toast.warning('Coming soon', {
                description: 'Please be patient, we are working on it.',
              })
            }}
          >
            <Settings2 className="size-5" />
          </Button>
          <Button variant="ghost" className="h-full" asChild>
            <Link to="/property/add">
              <Plus className="size-6" />
            </Link>
          </Button>
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
          toast.error('You need to sign in to add a flat', {
            action: (
              <Button
                className="ml-auto"
                onClick={() => router.navigate({ to: '/login' })}
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
    return <ErrorComponent error={new Error(query.error.message)} />
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
            disabled={isFavoritePending}
            className={cn(
              'absolute top-0 right-0 py-0.5',
              'flex items-center gap-1.5',
              'size-16 aspect-square m-0',
            )}
          >
            <Heart className={cn('size-6', isFavorite && 'fill-foreground')} />
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
              {flat.address ?? 'Address not available'}
            </div>
          </div>
          <div className="space-y-2">
            <div>
              Name:{' '}
              <p className="text-muted-foreground">
                {flat.ownerName ?? 'Owner name not available'} ({flat.ownerPhone})
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
