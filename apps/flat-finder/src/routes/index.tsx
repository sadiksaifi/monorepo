import { createFileRoute } from '@tanstack/react-router'
import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ScreenLoader } from '@/components/screen-loader'
import { Listbox, ListboxItem } from '@/components/ui/listbox'
import { useRouter } from '@tanstack/react-router'
import { ErrorComponent } from '@/components/error-component'
import { ChevronRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/Image'

export const Route = createFileRoute('/')({
  component: App,
  pendingComponent: () => <ScreenLoader isVisible={true} />,
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
})

function App() {
  const trpc = useTRPC()
  const router = useRouter()
  const { data: flats } = useSuspenseQuery(trpc.flat.getAll.queryOptions())

  if (flats.length === 0) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center h-screen -mt-20 px-6 text-center">
        <div className="text-xl font-bold">
          Oops! <br /> No apartments found
        </div>
        <div className="text-muted-foreground">
          Please add a new apartment to the database using top right plus button.
        </div>
      </div>
    )
  }

  return (
    <div className={cn('p-4')}>
      <Listbox>
        {flats.map((flat) => (
          <ListboxItem
            key={flat.id}
            value={flat.id}
            onClick={() => {
              router.navigate({
                to: '/flat/$',
                params: { _splat: flat.id },
              })
            }}
            className="flex flex-col w-full gap-0 p-0 rounded-sm my-2"
          >
            <div className="w-full flex-1 relative">
              <Image
                src={(flat.imageURL as unknown as string) ?? ''}
                alt={flat.propertyName ?? ''}
                className="w-full aspect-video object-cover rounded-t-sm"
              />
              {flat.location && (
                <div
                  className={cn(
                    'absolute bottom-2 px-2 left-2 rounded-full py-0.5',
                    'bg-background/60 backdrop-blur-xl dark:backdrop-blur-sm',
                    'flex items-center gap-1.5',
                  )}
                >
                  <MapPin className="size-3.5" />
                  <p className="text-sm w-fit text-muted-foreground">{flat.location}</p>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 w-full p-4">
              <div className="flex flex-col">
                <div className="font-medium text-lg">
                  {flat.propertyName ?? 'Property Name: Unknown'}
                </div>
                <div className="text-muted-foreground text-sm">
                  {flat.address ?? 'Address: Unknown'},{' '}
                  {flat.location ?? 'Location: Unknown'}
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ChevronRight />
              </Button>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}
