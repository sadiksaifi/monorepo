import { useTRPC } from '@/lib/trpc-client'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { ScreenLoader } from './screen-loader'
import { Listbox, ListboxItem, ListboxItemIndicator } from '@/components/ui/listbox'
import { useRouter } from '@tanstack/react-router'

export const ListProperties: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const trpc = useTRPC()
  const router = useRouter()
  const {
    data: flats,
    isPending,
    isError,
    error,
  } = useQuery(trpc.flat.getAll.queryOptions())

  if (isError) {
    console.error(isError)
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-red-500 h-screen w-full -mt-24">
        <h1 className="font-bold text-xl">Something went wrong</h1>
        <p>{error.message}</p>
      </div>
    )
  }
  if (isPending) {
    return <ScreenLoader isVisible={isPending} />
  }

  return (
    <div className={cn('', className)} {...props}>
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
          >
            <div className="flex flex-col">
              <div className="font-medium">{flat.propertyName}</div>
              <div className="text-muted-foreground text-sm">{flat.description}</div>
            </div>
          </ListboxItem>
        ))}
      </Listbox>
    </div>
  )
}
