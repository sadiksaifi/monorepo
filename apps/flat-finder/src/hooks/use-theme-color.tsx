/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { useEffect, useRef } from 'react'

interface ThemeColorOptions {
  light?: string | null
  dark?: string | null
}

const useThemeColor = (options: ThemeColorOptions | string | null | undefined): void => {
  const originalLightColorRef = useRef<string | null>(null)
  const originalDarkColorRef = useRef<string | null>(null)
  const originalDefaultColorRef = useRef<string | null>(null)

  useEffect(() => {
    // Normalize options - handle both old API (string) and new API (object)
    const normalizedOptions: ThemeColorOptions =
      typeof options === 'string' || options === null || options === undefined
        ? { light: options, dark: options }
        : options

    // Find or create the default theme-color meta tag (for PWA compatibility)
    let defaultMetaTag: HTMLMetaElement | null = document.querySelector(
      'meta[name="theme-color"]:not([media])',
    )

    if (!defaultMetaTag) {
      defaultMetaTag = document.createElement('meta')
      defaultMetaTag.name = 'theme-color'
      document.head.appendChild(defaultMetaTag)
    }

    // Find or create the light theme-color meta tag
    let lightMetaTag: HTMLMetaElement | null = document.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
    )

    if (!lightMetaTag) {
      lightMetaTag = document.createElement('meta')
      lightMetaTag.name = 'theme-color'
      lightMetaTag.media = '(prefers-color-scheme: light)'
      document.head.appendChild(lightMetaTag)
    }

    // Find or create the dark theme-color meta tag
    let darkMetaTag: HTMLMetaElement | null = document.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
    )

    if (!darkMetaTag) {
      darkMetaTag = document.createElement('meta')
      darkMetaTag.name = 'theme-color'
      darkMetaTag.media = '(prefers-color-scheme: dark)'
      document.head.appendChild(darkMetaTag)
    }

    // Store the original colors only on first mount
    if (originalDefaultColorRef.current === null) {
      originalDefaultColorRef.current = defaultMetaTag.content || ''
    }
    if (originalLightColorRef.current === null) {
      originalLightColorRef.current = lightMetaTag.content || ''
    }
    if (originalDarkColorRef.current === null) {
      originalDarkColorRef.current = darkMetaTag.content || ''
    }

    // Set the new colors
    // For PWA compatibility, set the default tag to light mode color (or fallback to dark)
    const defaultColor = normalizedOptions.light || normalizedOptions.dark || ''
    if (defaultColor) {
      defaultMetaTag.content = defaultColor
    }

    if (normalizedOptions.light) {
      lightMetaTag.content = normalizedOptions.light
    }
    if (normalizedOptions.dark) {
      darkMetaTag.content = normalizedOptions.dark
    }

    // Cleanup function to restore original colors
    return () => {
      if (defaultMetaTag && originalDefaultColorRef.current !== null) {
        defaultMetaTag.content = originalDefaultColorRef.current
      }
      if (lightMetaTag && originalLightColorRef.current !== null) {
        lightMetaTag.content = originalLightColorRef.current
      }
      if (darkMetaTag && originalDarkColorRef.current !== null) {
        darkMetaTag.content = originalDarkColorRef.current
      }
    }
  }, [options])
}

export default useThemeColor
