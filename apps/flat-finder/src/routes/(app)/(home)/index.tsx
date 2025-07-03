import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { ChevronRight, Heart, MapPin } from 'lucide-react'
import { Fzf } from 'fzf'
import { useSearchStore } from './-search'
import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { Listbox, ListboxItem } from '@/components/ui/listbox'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/Image'
import { PropertyCardSkeleton } from '@/components/property-card.skekleton'

export const Route = createFileRoute('/(app)/(home)/')({
  component: App,
  pendingComponent: PropertyCardSkeleton,
  errorComponent: () => <div>Oops! Something went wrong.</div>,
})

function App() {
  const trpc = useTRPC()
  const router = useRouter()
  const searchParams = Route.useSearch() as unknown as {
    tab?: string
    location?: string
  }
  const tab = searchParams.tab ?? 'all'
  const isLocation = searchParams.location ?? ''
  const { isSearchVal } = useSearchStore()
  const { data: dt } = useSuspenseQuery(trpc.flat.getAll.queryOptions())
  const temp = dt
    .filter((item) => (tab === 'all' ? true : item.starred))
    .filter((item) => (isLocation === '' ? true : item.location === isLocation))
  const flats = useMemo(() => {
    const fzf = new Fzf(temp.map((item) => item.propertyName!))
    const entries = fzf.find(isSearchVal)
    const x = entries.map((item) => item.item)
    return temp.filter((item) => x.includes(item.propertyName!))
  }, [temp, isSearchVal])

  return (
    <Listbox>
      {flats
        .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime())
        .map((flat) => (
          <ListboxItem
            key={flat.id}
            value={flat.id}
            onClick={() => {
              router.navigate({
                to: '/property/$id',
                params: { id: flat.id },
              })
            }}
            className="flex flex-col w-full gap-0 p-0 rounded-sm my-2 bg-card"
          >
            <div className="w-full flex-1 relative">
              <Image
                src={(flat.imageURL ?? [])[0] ?? ''}
                alt={flat.propertyName ?? ''}
                backdrop={false}
                className="w-full aspect-video [&>img]:aspect-video [&>img]:object-cover [&>img]:rounded-t-sm rounded-t-sm"
              />
              {flat.location && (
                <div
                  className={cn(
                    'absolute bottom-2 px-2 left-2 rounded-full py-0.5 z-20',
                    'bg-background/60 backdrop-blur-xl dark:backdrop-blur-sm',
                    'flex items-center gap-1.5',
                  )}
                >
                  <MapPin className="size-3.5" />
                  <p className="text-sm w-fit text-muted-foreground">{flat.location}</p>
                </div>
              )}
              {flat.starred && (
                <div
                  className={cn(
                    'absolute bottom-2 p-2 right-2 rounded-full py-0.5 z-20',
                    'bg-background/60 backdrop-blur-xl dark:backdrop-blur-sm',
                    'flex items-center gap-1.5 aspect-square',
                  )}
                >
                  <Heart className="size-3.5 fill-foreground" />
                  <p className="sr-only">Favorite</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 w-full p-4">
              <div className="flex flex-col">
                <div className="font-medium text-lg">
                  {flat.propertyName ?? 'Property Name: Unknown'}
                </div>
                <div className="text-muted-foreground text-sm">
                  {flat.address ?? 'Address: Unknown'}
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight />
              </Button>
            </div>
          </ListboxItem>
        ))}
    </Listbox>
  )
}
