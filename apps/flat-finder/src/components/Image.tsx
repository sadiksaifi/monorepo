import { cn } from '@/lib/utils'
import { Ban } from 'lucide-react'

export const Image = ({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  console.log('res: ', src ?? 'no src')
  return src ? (
    <img
      className={cn('size-full aspect-auto object-cover', className)}
      src={src}
      alt={alt ?? 'An image'}
      {...props}
    />
  ) : (
    <div
      className={cn(
        'size-full aspect-auto object-cover bg-secondary flex flex-col items-center justify-center gap-2',
        className,
      )}
    >
      <Ban className="size-20 -mt-10 text-muted-foreground" />
      <p className="text-muted-foreground">No image/video is available.</p>
    </div>
  )
}
