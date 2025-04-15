import { authClient } from "../auth-client";

export async function getUser() {
  const session = await authClient.getSession();
  return session.data?.user;
}
