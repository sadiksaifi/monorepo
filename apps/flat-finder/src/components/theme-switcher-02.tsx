'use client'

import { useTheme } from '@workspace/ui/components/theme-provider/vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <RadioGroup
      defaultValue={theme === 'light' ? 'light' : 'dark'}
      className="flex max-w-md gap-6 pt-2"
      onValueChange={(val) => {
        val === 'light' ? setTheme('light') : setTheme('dark')
      }}
    >
      <label className="[&:has([data-state=checked])>div]:border-primary flex-col">
        <RadioGroupItem value="light" className="sr-only" />
        <div className="hover:border-accent items-center rounded-lg border-2 p-1">
          <div className="space-y-2 rounded-lg bg-[#ecedef] p-2">
            <div className="space-y-2 rounded-md bg-white p-2 shadow-xs">
              <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-xs">
              <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
              <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
            </div>
          </div>
        </div>
        <span className="block w-full p-2 text-center text-sm font-normal">Light</span>
      </label>

      <label className="[&:has([data-state=checked])>div]:border-primary flex-col">
        <RadioGroupItem value="dark" className="sr-only" />
        <div className="bg-popover hover:bg-accent hover:text-accent-foreground items-center rounded-lg border-2 p-1">
          <div className="space-y-2 rounded-lg bg-slate-950 p-2">
            <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-xs">
              <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
              <div className="h-4 w-4 rounded-full bg-slate-400" />
              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
            </div>
            <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-xs">
              <div className="h-4 w-4 rounded-full bg-slate-400" />
              <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
            </div>
          </div>
        </div>
        <span className="block w-full p-2 text-center text-sm font-normal">Dark</span>
      </label>
    </RadioGroup>
  )
}
