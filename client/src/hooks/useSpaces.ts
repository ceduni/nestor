// hooks/useSpaces.ts
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSpaces } from '../features/filters/api/space-api.ts';
import { QueryParams, Space } from '../features/filters/types.ts';

export function useSpaces() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pagination: {
            page: "1",
            limit: "5"
        }
    });

    const { data: spaces, isLoading } = useQuery({
        queryKey: ['spaces'],
        queryFn: () => fetchSpaces(queryParams),
    });

    return { spaces, isLoading, setQueryParams };
}