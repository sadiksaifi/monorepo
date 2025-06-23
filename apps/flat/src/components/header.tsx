import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { AddProppertyFAB } from './add-property'
import { ThemeToggle } from '@workspace/ui/components/theme-toggle/vite'

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={cn(
        'flex items-center justify-between h-14 top-0 left-0 fixed w-full z-10 bg-background border-b px-4',
        className,
      )}
      {...props}
    >
      <Link to="/" className="flex items-center gap-4">
        <img src="/logo192.png" alt="logo" className="size-8 rounded" />
        <h1>Flat Finder</h1>
      </Link>
      <div className="flex items-center gap-2">
        <AddProppertyFAB />
        {/* <ThemeToggle /> */}
      </div>
    </header>
  )
}
