import { Ban } from 'lucide-react'
import { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export const Image = ({
  src,
  alt,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt?: string
}) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return src ? (
    <div className={cn('size-full relative', className)} {...props}>
      <div
        style={{
          backgroundImage: `url(${src})`,
        }}
        className={cn('relative aspect-square overflow-hidden bg-center bg-cover')}
      >
        <div className="absolute inset-0 size-full bg-input/30 backdrop-blur-sm" />
      </div>
      {imageLoading && (
        <div className="size-full absolute rounded-none top-0 left-0 z-10 aspect-square">
          <Skeleton className="size-full rounded-none" />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[130%] text-muted-foreground">
            Loading image...
          </p>
        </div>
      )}
      {imageError && (
        <div className="size-full absolute rounded-none top-0 left-0 z-10 aspect-square">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground flex flex-col items-center justify-center gap-3">
            <Ban className="size-20 rounded-none" />
            <p className="">No image/video is available.</p>
          </div>
        </div>
      )}
      {!imageError && (
        <img
          className={cn(
            'size-full absolute top-0 left-0 z-10 aspect-square shadow object-contain ',
          )}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false)
            setImageError(true)
          }}
          src={src}
          alt={alt ?? 'An image'}
        />
      )}
    </div>
  ) : (
    <div
      className={cn(
        'bg-secondary aspect-square size-full flex flex-col items-center justify-center gap-2',
        className,
      )}
    >
      <Ban className="size-20 -mt-10 text-muted-foreground" />
      <p className="text-muted-foreground">No image/video is available.</p>
    </div>
  )
}
