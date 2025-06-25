import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderContextType {
  left: ReactNode
  center: ReactNode
  right: ReactNode
  setLeft: (component: ReactNode) => void
  setCenter: (component: ReactNode) => void
  setRight: (component: ReactNode) => void
}

const HeaderContext = createContext<HeaderContextType | null>(null)

export const HeaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [left, setLeftState] = useState<ReactNode>(undefined)
  const [center, setCenterState] = useState<ReactNode>(undefined)
  const [right, setRightState] = useState<ReactNode>(undefined)

  // Memoize the setter functions to prevent infinite re-renders
  const setLeft = useCallback((component: ReactNode) => {
    setLeftState(component)
  }, [])

  const setCenter = useCallback((component: ReactNode) => {
    setCenterState(component)
  }, [])

  const setRight = useCallback((component: ReactNode) => {
    setRightState(component)
  }, [])

  const value: HeaderContextType = {
    left,
    center,
    right,
    setLeft,
    setCenter,
    setRight,
  }

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
}

interface UseHeaderParams {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

export const useHeader = (params?: UseHeaderParams) => {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider')
  }

  const { setLeft, setCenter, setRight } = context

  // Memoize the params to prevent unnecessary re-renders
  const memoizedParams = useMemo(
    () => params,
    [params?.left, params?.center, params?.right],
  )

  // Single useEffect to handle all parameter changes
  useEffect(() => {
    if (memoizedParams?.left !== undefined) {
      setLeft(memoizedParams.left)
    }
    if (memoizedParams?.center !== undefined) {
      setCenter(memoizedParams.center)
    }
    if (memoizedParams?.right !== undefined) {
      setRight(memoizedParams.right)
    }
  }, [memoizedParams, setLeft, setCenter, setRight])

  // Return the current values for internal use only
  return {
    left: context.left,
    center: context.center,
    right: context.right,
  }
}

export const Header = () => {
  const { left, center, right } = useHeader()
  return (
    <header
      className={cn(
        'flex items-center justify-between h-16 top-0 left-0',
        'fixed w-full z-30 border-b px-2',
        'bg-background/40 backdrop-blur-md',
      )}
    >
      <div className="flex items-center justify-between *:flex *:items-center *:flex-1 w-full *:h-full h-full">
        <div className="justify-start">{left}</div>
        <div className="justify-center">{center}</div>
        <div className="justify-end">{right}</div>
      </div>
    </header>
  )
}

export const HeaderBackButton = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => {
        router.history.canGoBack() ? router.history.back() : router.navigate({ to: '/' })
      }}
      variant="link"
      className={cn(
        '-ml-1 h-14 px-1 flex items-center w-fit gap-0.5 text-muted-foreground',
      )}
    >
      <ChevronLeft />
      back
    </Button>
  )
}
