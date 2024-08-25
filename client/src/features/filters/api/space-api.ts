import {QueryParams, Space, Location} from "../types.ts";
const BASE_URL = 'http://127.0.0.1:3000/v1/spaces';

export const fetchSpaces = async (
    queryParams: QueryParams
): Promise<Space[]> => {
    // Introduce a 5-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(BASE_URL + '?' + new URLSearchParams(
        {
            _page: queryParams.pagination.page,
            _per_page: queryParams.pagination.limit,
            ...queryParams.filters
        }
    ).toString());

    if (!response.ok) {
        throw new Error('Failed to fetch space data');
    }

    const body = await response.json();
    return body.data;
};

export const fetchLocations = async (
    queryParams: QueryParams
): Promise<Location[]> => {
    // Introduce a 5-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await fetch(BASE_URL +'/' + 'locations' + '?' + new URLSearchParams(
        {
            page: queryParams.pagination.page,
            limit: queryParams.pagination.limit,
            ...queryParams.filters
        }
    ).toString());

    if (!response.ok) {
        throw new Error('Failed to fetch space data');
    }
    return response.json()
};






