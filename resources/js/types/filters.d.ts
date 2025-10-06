export interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface Filters {
    search: string;
    per_page: number;
    role: string;
    availability: number;
}

export interface filterProps {
    pagination: PaginationData;
    filters: Filters;
}

interface UserFilter extends filterProps {
    users: User[];
    amenities: Amenity[];
    departments: Department[];
    role: string;
}

interface AmenityFilter extends filterProps {
    amenities: Amenity[];
    is_available: number;
}

interface DepartmentFilter extends filterProps {
    is_active: number;
    departments: Departments[];
}

interface CategoryFilter extends filterProps {
    is_active: number;
    categories: Categories[];
}
