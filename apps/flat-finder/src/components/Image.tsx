import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

export const Image = ({
  src,
  alt,
  className,
  backdrop = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt?: string
  backdrop?: boolean
}) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return src ? (
    <div
      id="image-container"
      className={cn('size-full relative border', className)}
      {...props}
    >
      {backdrop && (
        <div
          id="image-container-bg"
          style={{
            backgroundImage: `url(${src})`,
          }}
          className={cn('relative aspect-square overflow-hidden bg-center bg-cover')}
        >
          <div className="absolute inset-0 size-full bg-input/30 backdrop-blur-sm" />
        </div>
      )}
      {imageLoading && (
        <div
          id="image-loading"
          className="size-full absolute rounded-none top-0 left-0 z-10 aspect-square gap-2"
        >
          <Skeleton className="size-full rounded-none" />
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground">
            Loading image...
          </p>
        </div>
      )}
      {imageError && (
        <div
          id="image-error"
          className="size-full absolute rounded-none top-0 left-0 z-10 aspect-square"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground flex flex-col items-center justify-center gap-3">
            <ImageOff className="size-16 text-muted-foreground" />
            <p className="text-center">No image/video is available.</p>
          </div>
        </div>
      )}
      {(!imageError || !imageLoading) && (
        <img
          className={cn(
            'size-full absolute top-0 left-0 z-10 aspect-square shadow object-contain',
            imageError && 'hidden',
            imageLoading && 'hidden',
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
      className={cn('bg-card aspect-square size-full gap-2 border relative', className)}
    >
      <div className="flex flex-col gap-3 justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ImageOff className="size-16 text-muted-foreground" />
        <p className="text-muted-foreground text-center">No image/video is available.</p>
      </div>
    </div>
  )
}
