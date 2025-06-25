import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from '@tanstack/react-router'
import { Button } from './ui/button'

export default function OfflineOverlay() {
  const [offline, setOffline] = useState(!navigator.onLine)
  const router = useRouter()

  useEffect(() => {
    const goOnline = () => setOffline(false)
    const goOffline = () => setOffline(true)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  if (offline)
    toast.error('You are offline!', {
      description: 'Please check your internet connection.',
      id: 'offline-error',
      duration: Infinity,
      cancel: (
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => {
            router.invalidate()
            toast.dismiss('offline-error')
          }}
        >
          Dismiss
        </Button>
      ),
    })
  return <></>
}
