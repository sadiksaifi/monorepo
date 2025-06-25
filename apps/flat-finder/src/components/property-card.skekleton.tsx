import { ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export const PropertyCardSkeleton = ({ count = 5 }: { count?: number }) => {
  return Array.from({ length: count }, () => (
    <div
      key={Math.random().toString()}
      id="property-card-skeleton"
      className={cn(
        'flex flex-col gap-2 h-[300px] w-full bg-card rounded-md my-5 border',
      )}
    >
      <Skeleton
        id="property-card-skeleton-image"
        className="w-full aspect-video rounded-b-none"
      />
      <div
        id="property-card-skeleton-content"
        className="flex-1 flex justify-between items-center px-4"
      >
        <div className="w-[70%] flex flex-col gap-3 items-start justify-center">
          <Skeleton className="h-4 w-[80%]" />
          <Skeleton className="h-2 w-full" />
        </div>
        <ChevronRight className="h-4 text-muted-foreground" />
      </div>
    </div>
  ))
}
