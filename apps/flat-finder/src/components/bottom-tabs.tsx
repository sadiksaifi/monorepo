import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Bell, CirclePlus, House, Settings } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

const tabs = [
  {
    label: 'Home',
    value: '/',
    icon: House,
  },
  {
    label: 'Add',
    value: '/property/add',
    icon: CirclePlus,
  },
  {
    label: 'Alerts',
    value: '/alerts',
    icon: Bell,
  },
  {
    label: 'Settings',
    value: '/settings',
    icon: Settings,
  },
]

export const BottomTabs = () => {
  const router = useRouter()

  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('fixed -bottom-0.5 left-0 z-50 h-22')}
      defaultValue={router.state.location.pathname}
      onValueChange={(val) => {
        router.navigate({
          to: val,
        })
      }}
    >
      <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
          'flex items-center justify-around px-2 w-[100vw] h-full bg-background/80 backdrop-blur-3xl shadow-2xl border-t-1',
        )}
      >
        {tabs.map(({ icon: Icon, ...tab }) => (
          <TabsPrimitive.Trigger
            key={tab.value}
            value={tab.value}
            data-slot="tabs-trigger"
            className={cn('data-[state=active]:text-primary', 'text-muted-foreground')}
            asChild
          >
            <Button
              variant="ghost"
              className="flex-1 h-full flex flex-col gap-1 items-center justify-start p-0 pt-3 rounded-none"
              type="button"
            >
              <Icon className="size-6" />
              <span className="text-sm text-center">{tab.label}</span>
            </Button>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
    </TabsPrimitive.Root>
  )
}
