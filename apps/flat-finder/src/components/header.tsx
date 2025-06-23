import { cn } from '@/lib/utils'
import { Link, useRouter } from '@tanstack/react-router'
import { AddProppertyFAB } from './add-property'
import { ChevronLeft, Search, Settings2 } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export const Header: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { rootRoute: boolean }
> = ({ className, rootRoute, ...props }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const router = useRouter()

  return (
    <header
      className={cn(
        'flex items-center justify-between h-14 top-0 left-0 fixed w-full z-10 bg-background border-b px-4',
        className,
      )}
      {...props}
    >
      {!rootRoute && (
        <Button
          onClick={() => {
            router.history.canGoBack()
              ? router.history.back()
              : router.navigate({ to: '/' })
          }}
          variant="link"
          className={cn(
            '-ml-3 h-14 px-1 flex items-center w-fit text-base gap-0.5 text-muted-foreground',
          )}
        >
          <ChevronLeft />
          back
        </Button>
      )}
      {rootRoute && (
        <Link to="/" className="flex items-center gap-4">
          <img src="/logo192.png" alt="logo" className="size-8 rounded" />
          <h1>Flat Finder</h1>
        </Link>
      )}
      {!rootRoute && (
        <Link to="/" className="flex items-center gap-4">
          <h1>Flat Finder</h1>
        </Link>
      )}
      <div className="flex items-center">
        {rootRoute && !isSearchVisible && (
          <Button variant="ghost" size="icon" onClick={() => setIsSearchVisible(true)}>
            <Search className="size-5" />
          </Button>
        )}
        {!rootRoute && !isSearchVisible && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              toast.warning('Coming soon', {
                description: 'Please be patient, we are working on it.',
              })
            }}
          >
            <Settings2 className="size-5" />
          </Button>
        )}
        {isSearchVisible && (
          <div className="absolute top-0 left-0 bg-background size-full flex items-center gap-2 z-20">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-full px-4 focus-visible:outline-none"
              name="search"
              autoFocus
            />
            <Button
              variant="ghost"
              onClick={() => setIsSearchVisible(false)}
              className="h-full px-4"
            >
              Cancel
            </Button>
          </div>
        )}
        <AddProppertyFAB />
      </div>
    </header>
  )
}
