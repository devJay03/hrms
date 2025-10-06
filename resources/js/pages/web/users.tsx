import ConfirmDeleteModal from '@/components/modals/delete-modal';
import UserModal from '@/components/modals/user-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
// import { dashboard } from '@/routes';
import { ROLE_OPTIONS } from '@/components/constants';
import ActionDropdown, { DropdownAction } from '@/components/utils/action-dropdown';
import Alert from '@/components/utils/alerts';
import Pagination from '@/components/utils/pagination';
import type { User } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { UserFilter } from '@/types/filters';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function User({ users, pagination, filters }: UserFilter) {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [selectedVenue, setSelectedVenue] = useState<User | undefined>(undefined);

    // Local filter states - Fixed initialization
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(filters.per_page || 10);
    const [selectedRole, setSelectedRole] = useState(filters.role || '');

    const userActions: DropdownAction<User>[] = [
        {
            label: 'Edit',
            onClick: (user) => handleEdit(user),
        },
        {
            label: 'Delete',
            onClick: (user) => handleDelete(user.id),
            className: 'text-red-500',
        },
    ];

    // Debounce search
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Apply filters when debounced search term, role, or per_page changes
    useEffect(() => {
        applyFilters();
    }, [debouncedSearchTerm, selectedRole, perPage]);

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
        if (selectedRole) params.set('role', selectedRole);
        if (perPage !== 10) params.set('per_page', perPage.toString());

        router.get('/users', Object.fromEntries(params), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handlePageChange = (url: string) => {
        if (!url) return;

        router.get(
            url,
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleAdd = () => {
        setSelectedVenue(undefined);
        setIsOpen(true);
    };

    const handleEdit = (user: User) => {
        setSelectedVenue(user);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = (id?: number | null) => {
        if (!id) return;
        router.delete(`/users/${id}`, {
            onSuccess: () => {
                setConfirmOpen(false);
                setDeleteId(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <Alert />

            <UserModal isOpen={isOpen} onClose={() => setIsOpen(false)} user={selectedVenue} />
            <ConfirmDeleteModal
                open={confirmOpen}
                onClose={() => {
                    setConfirmOpen(false);
                    setDeleteId(null);
                }}
                onConfirm={confirmDelete}
                payload={deleteId}
                message="Are you sure you want to delete this user? This action cannot be undone."
            />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="p-6">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold">Users</h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Showing {pagination.from || 0}-{pagination.to || 0} of {pagination.total} users
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Set per page on table */}
                            <Select value={String(perPage)} onValueChange={(value) => setPerPage(Number(value))}>
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Rows per page" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10 per page</SelectItem>
                                    <SelectItem value="25">25 per page</SelectItem>
                                    <SelectItem value="50">50 per page</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Fixed Role Filter */}
                            <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value === 'all' ? '' : value)}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="All Roles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    {ROLE_OPTIONS.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            {role.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Search bar should grow */}
                            <div className="relative flex-1">
                                <Input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search users..."
                                    className="w-full"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm('')}
                                        className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>

                            <Button variant="default" onClick={handleAdd}>
                                Add User
                            </Button>
                        </div>
                    </div>

                    {/* Users Table */}
                    <div className="rounded-md border bg-card text-card-foreground shadow">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Number</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">{user.name}</td>
                                            <td className="p-4 align-middle">{user.role}</td>
                                            <td className="p-4 align-middle">{user.email}</td>
                                            <td className="p-4 align-middle">{user.number}</td>
                                            <td className="p-4 text-right align-middle">
                                                <ActionDropdown actions={userActions} item={user} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-12 text-center">
                                            <p className="text-lg font-medium text-muted-foreground">No User Found!</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            Showing {pagination.from} to {pagination.to} of {pagination.total} results
                        </div>
                        <Pagination pagination={pagination} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
