import { createContext, Suspense, useContext } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { PendingComponent } from "./-component";

type User = {
  user: {
    id: string;
  };
};
const UserContext = createContext<User | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["user-session"],
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        console.error(error);
        throw error;
      }
      return data as unknown as User;
    },
  });

  return (
    <UserContext.Provider value={data}>
      <Suspense fallback={<PendingComponent />}>{children}</Suspense>
    </UserContext.Provider>
  );
};

export function useUser() {
  const data = useContext(UserContext);
  if (!data) {
    throw new Error("Wrap userUser in UserProvider Context");
  }

  return data;
}
