// hooks/useSpaces.ts
import {useEffect, useState} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSpaces } from "../api/space-api.ts";
import { QueryParams, Space } from "../types.ts";

export function useSpaces() {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    pagination: {
      page: "1",
      limit: "12",
    },
  });

  return [
    useQuery({
      queryKey: ["spaces", queryParams],
      queryFn: () => fetchSpaces(queryParams),
      enabled: !!queryParams,
    }),
    queryParams,
    setQueryParams,
  ];
}
