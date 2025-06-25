import { Skeleton } from '@/components/ui/skeleton'

export const PropertySkeletonPage = () => {
  return (
    <div id="property-skeleton-page" className="flex flex-col">
      <div className="relative w-full aspect-square">
        <Skeleton className="size-full rounded-none" />
        <div className="absolute bottom-18 left-3 h-5 w-24 bg-background/60 rounded-full flex items-center gap-1.5 light:border-[0.5px] border-muted-foreground" />
        <div className="flex items-center justify-around absolute bottom-0 left-0 w-full bg-background/60 backdrop-blur-lg dark:backdrop-blur-sm">
          {['Rent', 'Deposit', 'Brokerage'].map((item) => (
            <div
              key={Math.random().toString()}
              className="flex flex-col border-r-[1px] flex-1 h-14 items-center justify-center gap-2 *:truncate"
            >
              <p className="text-muted-foreground text-sm">{item}</p>
              <Skeleton className="h-2 w-20" />
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-[60%]" />
          <Skeleton className="h-3 w-[80%] rounded-full" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-3 w-[80%]" />
          </div>
        </div>
      </div>
    </div>
  )
}
