import { Link, Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Plus, Search, Settings2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useSearchStore } from './-search'
import { queryClient } from '@/lib/trpc-client'
import { cn, getNameInitials } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { authClient } from '@/lib/auth-client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { SigninDrawer } from '@/components/signin-drawer'
import { useHeader } from '@/hooks/use-header'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PROPERTY_LOCATIONS } from '@/lib/locations'

export const Route = createFileRoute('/(app)/(home)')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const { setIsSearchVal } = useSearchStore()
  const session = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await authClient.getSession()
      if (res.error) {
        throw session.error
      }
      return res.data
    },
  })
  const router = useRouter()
  const searchParams = Route.useSearch() as unknown as {
    tab?: string
    location?: string
  }
  const isUserLoggedIn = session.data?.session.userId ? true : false
  const tab = searchParams.tab ?? 'all'
  const isLocation = searchParams.location ?? ''

  // Memoize header content to prevent infinite re-renders
  const headerContent = useMemo(
    () => ({
      left: (
        <Button variant="ghost" className="gap-4" asChild>
          <Link to="/">
            <img src="/logo192.png" alt="logo" className="size-8 rounded" />
            <h1>Flat Finder</h1>
          </Link>
        </Button>
      ),
      center: <></>,
      right: isSearchVisible ? (
        <div className="absolute top-0 left-0 bg-background size-full flex items-center gap-2 z-20">
          <input
            onChange={(val) => setIsSearchVal(val.target.value)}
            onBlur={() => setIsSearchVisible(false)}
            type="text"
            placeholder="Search"
            className="flex-1 h-full px-4 focus-visible:outline-none"
            name="search"
            autoFocus
          />
          <Button
            variant="ghost"
            onClick={() => {
              setIsSearchVisible(false)
              setIsSearchVal('')
            }}
            className="h-full px-4"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <Button
            variant="ghost"
            className="h-full"
            onClick={() => setIsSearchVisible(true)}
          >
            <Search className="size-5" />
          </Button>
          <AlertDialog>
            <Drawer>
              <DropdownMenu dir="ltr">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-full px-3">
                    <Avatar>
                      <AvatarImage src={session.data?.user.image ?? ''} />
                      <AvatarFallback className="text-sm">
                        {getNameInitials(session.data?.user.name ?? '')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-fit" align="end" alignOffset={8}>
                  <DropdownMenuLabel className="text-muted-foreground">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup className="*:p-2">
                    {!isUserLoggedIn && (
                      <DrawerTrigger asChild>
                        <DropdownMenuItem asChild>
                          <Button
                            variant="ghost"
                            className="justify-start w-full text-sm"
                          >
                            Sign in
                          </Button>
                        </DropdownMenuItem>
                      </DrawerTrigger>
                    )}
                    {isUserLoggedIn && (
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem asChild>
                          <Button
                            variant="ghost"
                            className="justify-start w-full text-sm"
                          >
                            Sign out
                          </Button>
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will be signed out of the app and
                    unable to add new properties or favorites.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      await authClient.signOut()
                      queryClient.invalidateQueries({ queryKey: ['session'] })
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
              <DrawerContent>
                <SigninDrawer />
              </DrawerContent>
            </Drawer>
          </AlertDialog>
        </>
      ),
    }),
    [isSearchVisible, session.data, isUserLoggedIn, session.isPending],
  )
  useHeader(headerContent)

  return (
    <div className={cn('p-4 space-y-2')}>
      <div className="flex items-center justify-between">
        <Tabs
          defaultValue={tab}
          className="w-[400px]"
          onValueChange={(value) => {
            console.log(value)
            router.navigate({
              to: '/',
              search: {
                tab: value,
                location: isLocation,
              },
            })
          }}
        >
          <TabsList className="h-10 *:px-6 text-base">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="lg">
                <Settings2 className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit" align="end">
              <DropdownMenuRadioGroup
                value={isLocation}
                onValueChange={(val) => {
                  router.navigate({
                    to: '/',
                    search: {
                      location: val,
                      tab: tab,
                    },
                  })
                }}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuSeparator />
                {
                  // @ts-ignore - ignore the error
                  Object.keys(PROPERTY_LOCATIONS).map((location) => {
                    return (
                      <DropdownMenuRadioItem
                        // @ts-ignore - ignore the error
                        value={PROPERTY_LOCATIONS[location]}
                        key={location}
                      >
                        {/* @ts-ignore - ignore the error */}
                        {PROPERTY_LOCATIONS[location]}
                      </DropdownMenuRadioItem>
                    )
                  })
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isLocation && (
        <Button
          variant="secondary"
          className={cn('gap-1 mt-2 text-sm')}
          onClick={() => {
            router.navigate({
              to: '/',
              search: {
                location: '',
                tab: 'all',
              },
            })
          }}
        >
          Showing results for {isLocation}
          <Plus className="size-4.5 ml-0.5 rotate-45" />
        </Button>
      )}
      <Outlet />
    </div>
  )
}
