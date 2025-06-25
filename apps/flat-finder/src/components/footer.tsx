import { useTheme } from '@workspace/ui/components/theme-provider/vite'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const { setTheme, theme } = useTheme()

  return (
    <footer className={cn('my-4 border-t w-full', className)}>
      <div>
        <Button
          className="flex p-6 justify-center items-center rounded-md gap-0 w-full mx-auto"
          variant="ghost"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <p>Toggle Theme</p>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Flat Finder. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
