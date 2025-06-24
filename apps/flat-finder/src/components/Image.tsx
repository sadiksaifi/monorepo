import { cn } from '@/lib/utils'
import { Ban } from 'lucide-react'

export const Image = ({
  src,
  alt,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  src?: string
  alt?: string
}) => {
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
      <img
        className={cn(
          'size-full absolute top-0 left-0 z-10 aspect-square shadow object-contain ',
        )}
        src={src}
        alt={alt ?? 'An image'}
      />
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
