import { Link, createFileRoute, useRouter } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChevronRight, Heart, MapPin, Plus, Search, Settings2 } from 'lucide-react'
import { Fzf } from 'fzf'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { Listbox, ListboxItem } from '@/components/ui/listbox'
import { ErrorComponent } from '@/components/error-component'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/Image'
import { useHeader } from '@/hooks/use-header'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PROPERTY_LOCATIONS } from '@/lib/locations'
import { PropertyCardSkeleton } from '@/components/property-card.skekleton'

export const Route = createFileRoute('/(app)/')({
  component: App,
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
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [isSearchVal, setIsSearchVal] = useState('')
  const { data, isPending, isError, error } = useQuery(trpc.flat.getAll.queryOptions())
  const dt = data ?? []
  const temp = dt
    .filter((item) => (tab === 'all' ? true : item.starred))
    .filter((item) => (isLocation === '' ? true : item.location === isLocation))
  const flats = useMemo(() => {
    const fzf = new Fzf(temp.map((item) => item.propertyName!))
    const entries = fzf.find(isSearchVal)
    const x = entries.map((item) => item.item)
    return temp.filter((item) => x.includes(item.propertyName!))
  }, [temp, isSearchVal])

  // Memoize header content to prevent infinite re-renders
  const headerContent = useMemo(
    () => ({
      left: (
        <Button variant="ghost" className="gap-4" asChild>
          <Link to="/">
            <img src="/logo192.png" alt="logo" className="size-8 rounded" />
            <h1>Flat Finder</h1>
          </Link>
        </Button>
      ),
      center: <></>,
      right: isSearchVisible ? (
        <div className="absolute top-0 left-0 bg-background size-full flex items-center gap-2 z-20">
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="flex-1 h-full px-4 focus-visible:outline-none"
            name="search"
            autoFocus
          />
          <Button
            variant="ghost"
            onClick={() => {
              setIsSearchVisible(false)
              setIsSearchVal('')
            }}
            className="h-full px-4"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="ghost"
            className="h-full !pl-8"
            onClick={() => setIsSearchVisible(true)}
          >
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" className="h-full !pr-4.5 -mr-2" asChild>
            <Link to="/property/add">
              <Plus className="size-6" />
            </Link>
          </Button>
        </>
      ),
    }),
    [isSearchVisible],
  )

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setIsSearchVal(e.target.value)
  }

  useHeader(headerContent)

  if (isError) {
    return <ErrorComponent error={new Error(error.message)} />
  }

  return (
    <div className={cn('p-4 space-y-2')}>
      <div className="flex items-center justify-between">
        <Tabs
          defaultValue={tab}
          className="w-[400px]"
          onValueChange={(value) => {
            console.log(value)
            router.navigate({
              to: '/',
              search: {
                tab: value,
                location: isLocation,
              },
            })
          }}
        >
          <TabsList className="h-10 *:px-6 text-base">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          {isLocation && (
            <Button
              variant="secondary"
              className={cn('gap-1')}
              onClick={() => {
                router.navigate({
                  to: '/',
                  search: {
                    location: '',
                    tab: 'all',
                  },
                })
              }}
            >
              <MapPin className="size-3.5" />
              {isLocation}
              <Plus className="size-4.5 ml-0.5 rotate-45" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="lg">
                <Settings2 className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit">
              <DropdownMenuRadioGroup
                value={isLocation}
                onValueChange={(val) => {
                  router.navigate({
                    to: '/',
                    search: {
                      location: val,
                      tab: tab,
                    },
                  })
                }}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                {
                  // @ts-ignore - ignore the error
                  Object.keys(PROPERTY_LOCATIONS).map((location) => {
                    return (
                      <DropdownMenuRadioItem
                        // @ts-ignore - ignore the error
                        value={PROPERTY_LOCATIONS[location]}
                        key={location}
                      >
                        {/* @ts-ignore - ignore the error */}
                        {PROPERTY_LOCATIONS[location]}
                      </DropdownMenuRadioItem>
                    )
                  })
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isPending ? (
        <>
          <PropertyCardSkeleton />
          <p className="text-muted-foreground text-center">Loading...</p>
        </>
      ) : flats.length === 0 ? (
        <div className="flex flex-col gap-2 items-center justify-center h-screen text-center -mt-24">
          <div className="text-xl font-bold">
            Oops! <br />
            {tab === 'all' ? 'No apartments found' : 'No favorites found'}
          </div>
          <div className="text-muted-foreground">
            {tab === 'all'
              ? 'Please add a new apartment using top right plus button.'
              : 'Please add a new favorite from apartment details page.'}
          </div>
        </div>
      ) : (
        <Listbox>
          {flats.map((flat) => (
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
      )}
    </div>
  )
}
