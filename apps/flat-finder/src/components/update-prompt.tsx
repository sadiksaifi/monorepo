import { useRegisterSW } from 'virtual:pwa-register/react'
import { useEffect } from 'react'

import { Button } from './ui/button'

function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log(`SW Registered: ${r}`)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  useEffect(() => {
    if (needRefresh) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [needRefresh])

  if (!needRefresh) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background border border-border rounded-lg p-6 shadow-lg max-w-sm mx-auto">
        <div className="text-center">
          <h3 className="text-lg font-medium">Update Available</h3>
          <p className="text-sm text-muted-foreground mt-2 mb-4">
            A new version of the application is available and needs to be installed.
          </p>
          <Button onClick={() => updateServiceWorker(true)} className="w-full">
            Update Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UpdatePrompt
