import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function getNameInitials(value: string) {
  const x = value
    .split(' ')
    .map((name) => name[0])
    .join('')
  if (x.length === 0) return 'N/A'
  return x
}
