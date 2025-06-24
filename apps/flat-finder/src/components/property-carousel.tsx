import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { Image } from './Image'

export function PropertyCarousel({ images: imagesURL }: { images: string[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {imagesURL.map((imageURL) => (
          <CarouselItem key={imageURL}>
            <div>
              <Card className="rounded-none border-none relative p-0">
                <CardContent className="flex max-h-[100vw] items-center p-0 justify-center">
                  <Image src={imageURL} alt="property image" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={cn('left-0 -translate-y-full border-none size-16', '[&_svg]:!size-10')}
      />
      <CarouselNext
        className={cn('right-0 -translate-y-full size-16', '[&_svg]:!size-10')}
      />
    </Carousel>
  )
}
