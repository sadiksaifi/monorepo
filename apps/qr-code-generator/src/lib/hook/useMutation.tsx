import { useState } from "react";

export const useMutation = <T, R>(cb: (data?: T) => Promise<R>) => {
  const [isPending, setIsPending] = useState(false);
  const [isError, setError] = useState<string | null>(null);
  const [data, setData] = useState<R | null>(null);

  const mutate = async (data: T) => {
    setIsPending(true);
    try {
      const result = await cb(data);
      setData(result);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, isError, data, mutate };
};
