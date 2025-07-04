import { useEffect, useState } from 'react'

const PLATFORM = {
  IOS: 'ios',
  IPADOS: 'ipados',
  ANDROID: 'android',
  WINDOWS: 'windows',
  MACOS: 'macos',
  LINUX: 'linux',
  UNKNOWN: 'unknown',
}

type Platform = (typeof PLATFORM)[keyof typeof PLATFORM]

interface PWAInfo {
  isPWA: boolean
  platform: Platform
}

// Hook to detect PWA status and platform
const usePWADetection = (): PWAInfo => {
  const [pwaInfo, setPwaInfo] = useState<PWAInfo>({
    isPWA: false,
    platform: 'unknown',
  })

  useEffect(() => {
    const detectPlatform = (): Platform => {
      const userAgent = navigator.userAgent.toLowerCase()

      // Check for iPad first (before other iOS checks)
      const isIPad =
        /ipad/.test(userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

      const isIPhone = /iphone/.test(userAgent)
      const isIPod = /ipod/.test(userAgent)

      const isAndroid = /android/.test(userAgent)
      const isMacOS = /macintosh|mac os x/.test(userAgent) && !isIPad
      const isWindows = /windows/.test(userAgent)
      const isLinux = /linux/.test(userAgent) && !isAndroid

      if (isIPad) return 'ipados'
      if (isIPhone || isIPod) return 'ios'
      if (isAndroid) return 'android'
      if (isMacOS) return 'macos'
      if (isWindows) return 'windows'
      if (isLinux) return 'linux'
      return 'unknown'
    }

    const detectPWA = () => {
      // Check if running in standalone mode (PWA)
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://')

      return { isStandalone }
    }

    const platform = detectPlatform()
    const pwaStatus = detectPWA()

    setPwaInfo({
      isPWA: pwaStatus.isStandalone,
      platform,
    })

    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)')
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setPwaInfo((prev) => ({
        ...prev,
        isPWA: e.matches,
      }))
    }

    mediaQuery.addEventListener('change', handleDisplayModeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleDisplayModeChange)
    }
  }, [])

  return pwaInfo
}

export default usePWADetection
export { PLATFORM }
export type { PWAInfo, Platform }
