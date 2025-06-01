import { createAuthClient } from "better-auth/react";
import { usernameClient, passkeyClient } from "better-auth/client/plugins";
import { SERVER_ORIGIN } from "./utils/constants";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: SERVER_ORIGIN,
  plugins: [usernameClient(), passkeyClient()],
});

export async function getUserSession() {
  const userSession = (await authClient.getSession()).data;
  return userSession;
}

export type UserSession = typeof authClient.$Infer.Session;
