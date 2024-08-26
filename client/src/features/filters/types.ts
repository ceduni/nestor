export type Space = {
    id: string;
    name: string;
    library?: string;
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    capacity: number;
    isAvailable: boolean;
    images: Image[];
    availabilities: Availability[];
    description: string;
    organisation: string;
    features: string[];
    type: string[];
    createdAt: Date;
    updatedAt: Date;
}

export type Image = {
    id: string;
    url: string;
    isMain: boolean;
}

export type Availability = {
    id: string;
    startAt: Date;
    endAt: Date;
}

export type FilterParams = {
    address?: string;
    date?: string;
    capacity?: string;
}

export type PaginationParams = {
    page: string;
    limit: string;
}

export type QueryParams = {
    filters?: FilterParams;
    pagination?: PaginationParams
}

export type Location = {
    id: string;
    streetNumber: string;
    streetName: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
}