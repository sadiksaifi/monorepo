import { useEffect, useState } from "react";

type SearchParams = {
  q: string;
};

export function useSearchParams(q: string) {
  const [searchParams, setSearchParamsState] = useState<SearchParams>({ q });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParamsState({
      q: params.get("q") || "",
    });
  }, []);

  function setSearchParams(newSearchParams: SearchParams) {
    setSearchParamsState(newSearchParams);
    const params = new URLSearchParams(window.location.search);
    params.set("q", newSearchParams.q);
    window.history.pushState({}, "", window.location.pathname + "?" + params.toString());
  }

  return { searchParams: searchParams.q, setSearchParams };
}
