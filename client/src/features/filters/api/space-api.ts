import {QueryParams, Space} from "../types.ts";
const BASE_URL = 'http://localhost:3000/spaces';

export const fetchSpaces = async (
    queryParams: QueryParams
): Promise<Space[]> => {
    const response = await fetch(BASE_URL + '?' + new URLSearchParams(
        {
            _page: queryParams.pagination.page,
            _per_page: queryParams.pagination.limit,
            ...queryParams.filters
        }
    ).toString());
    if (!response.ok) {
        throw new Error('failed to fetch space data');
    }
    const body = await response.json();
    return body.data;
}