// hooks/useSpaces.ts
import {useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {fetchSpaces, fetchSpacesWithFilters} from '../features/filters/api/space-api.ts';
import { QueryParams, Space } from '../features/filters/types.ts';

export function useSpaces() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pagination: {
            page: "1",
            limit: "5"
        }
    });
    return [useQuery({
        queryKey: ['spaces', queryParams],
        queryFn: () => fetchSpaces(queryParams),
        enabled: !!queryParams.filters
}), setQueryParams];
}