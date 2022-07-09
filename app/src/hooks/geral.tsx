import React from "react";
import { useRouter } from "next/router"

export function useQuery() {
  const router = useRouter()
    const { query: {search} } = router;

    return React.useMemo(() => new URLSearchParams(search as any), [search]);
}
