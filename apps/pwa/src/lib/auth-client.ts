import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { SERVER_ORIGIN } from "./utils/constants";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: SERVER_ORIGIN,
  plugins: [usernameClient()],
});
