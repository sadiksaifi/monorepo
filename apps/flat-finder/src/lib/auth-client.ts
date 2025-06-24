import { createAuthClient } from 'better-auth/react'
import { SERVER_ORIGIN } from './constants'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: SERVER_ORIGIN,
})

export async function getUserSession() {
  const userSession = (await authClient.getSession()).data
  return userSession
}

export type UserSession = typeof authClient.$Infer.Session
