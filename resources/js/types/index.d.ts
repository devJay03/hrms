import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    number: string;
    avatar?: string;
    email_verified_at: string | null;
    department_id: string;
    created_at: string;
    updated_at: string;
    role: string;
    password: string;
    users: Users[];
    [key: string]: unknown;
}

export interface Flash {
    status?: 'success' | 'error' | 'info' | 'warning';
    message?: string;
}

export interface PageProps extends InertiaPageProps {
    flash?: {
        message?: string;
        status?: 'success' | 'error' | 'warning' | 'info';
    };
}

export interface Amenity {
    id: number;
    name: string;
    is_available: number;
    description?: string | null;
    created_at?: string;
    updated_at?: string;
}
