// hooks/useSpaces.ts
import {useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {fetchLocations} from '../api/space-api.ts';
import { QueryParams, Space } from '../types.ts';

export function useLocations() {
    const [queryParams, setQueryParams] = useState<QueryParams>({
        pagination: {
            page: "1",
            limit: "5"
        }
    });
    return [useQuery({
        queryKey: ['locations', queryParams.filters],
        queryFn: () => fetchLocations(queryParams),
        enabled: !!queryParams.filters
    }), setQueryParams];
}

