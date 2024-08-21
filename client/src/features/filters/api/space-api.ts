import {QueryParams, Space} from "../types.ts";
const BASE_URL = 'http://localhost:3000/spaces';
import {spaces} from './space-mock-data.json'

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

export const fetchSpacesWithFilters = async (
    queryParams: QueryParams
): Promise<Space[]> => {
    // Introduce a 5-second delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    return spaces.filter(space => space.streetNumber.toLowerCase().includes(<string>queryParams.filters?.address?.trim().toLowerCase())
        || space.streetName.toLowerCase().includes(<string>queryParams.filters?.address?.trim().toLowerCase())
        || space.city.toLowerCase().includes(<string>queryParams.filters?.address?.trim().toLowerCase())
        || space.state.toLowerCase().includes(<string>queryParams.filters?.address?.trim().toLowerCase())
        || space.country.toLowerCase().includes(<string>queryParams.filters?.address?.trim().toLowerCase()));
};


