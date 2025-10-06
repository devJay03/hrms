export const HOTEL_ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    RECEPTIONIST: 'receptionist',
    MAINTENANCE: 'maintenance',
    GUEST: 'guest',
} as const;

export const ROLE_OPTIONS = [
    { value: HOTEL_ROLES.ADMIN, label: 'Admin' },
    { value: HOTEL_ROLES.MANAGER, label: 'Manager' },
    { value: HOTEL_ROLES.RECEPTIONIST, label: 'Receptionist' },
    { value: HOTEL_ROLES.MAINTENANCE, label: 'Maintenance' },
    { value: HOTEL_ROLES.GUEST, label: 'Guest' },
];
