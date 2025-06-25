import { useEffect, useState } from 'react'

export default function OfflineOverlay() {
  const [offline, setOffline] = useState(!navigator.onLine)

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

  if (!offline) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: '#222',
        color: '#fff',
        padding: '1em',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <strong>No internet connection.</strong> Please check your connection and try again.
    </div>
  )
}
