interface FetchResponse<T = unknown> extends Response {
  data: T;
}

export async function fetcho<T>(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<FetchResponse<T>> {
  const res = (await fetch(input, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...init,
  })) as unknown as FetchResponse<T>;

  if (!res.ok) throw new Error(await res.text());

  if (!res.headers.get("content-type")?.includes("application/json")) {
    res.data = (await res.text()) as T;
    return res;
  }
  res.data = (await res.json()) as T;
  return res;
}
