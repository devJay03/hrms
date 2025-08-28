import ConfirmDeleteModal from '@/components/modals/ConfirmDeleteModal';
import UserManagement from '@/components/modals/UserManagement';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ToastContainer } from '@/components/ui/toast-container';
import { useToast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { User } from '@/types/user';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users/Manage Users',
        href: '/users',
    },
];

export default function Users() {
    const [users, setUsers] = useState<User[]>([]); // Type the state
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { toast, toasts, removeToast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get<User[]>('/users').then((res) => setUsers(res.data));
    };

    const handleUserSaved = (response: { data: User; message: string }) => {
        const savedUser = response.data;

        if (editingUser) {
            setUsers(users.map((u) => (u.id === savedUser.id ? savedUser : u)));
            toast.success('Success', response.message || 'User saved successfully', 3000);
        } else {
            setUsers([...users, savedUser]);
            toast.success('Success', response.message || 'User created successfully', 3000);
        }
    };

    const handleDelete = (id: number) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (deleteId !== null) {
            axios.delete(`/users/${deleteId}`).then(() => {
                setUsers(users.filter((u) => u.id !== deleteId));
                setDeleteId(null);
                toast.success('Success', 'User deleted successfully', 3000);
                setConfirmOpen(false);
            });
        }
    };

    const openModalForEdit = (user: User) => {
        setEditingUser(user);
        setModalOpen(true);
    };

    const openModalForCreate = () => {
        setEditingUser(null);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingUser(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <Button onClick={openModalForCreate}>Add User</Button>
                </div>
                <Table>
                    {/* <TableCaption>A list of all users in the system.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            user.role === 0
                                                ? 'bg-red-100 text-red-800'
                                                : user.role === 1
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {user.role === 0 ? 'Admin' : user.role === 1 ? 'User' : 'Unknown'}
                                    </span>
                                </TableCell>
                                <TableCell className="space-x-2 text-right">
                                    <Button variant="outline" size="sm" onClick={() => openModalForEdit(user)}>
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    No users found. Click "Add User" to create one.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <UserManagement user={editingUser} open={modalOpen} onClose={closeModal} onSaved={handleUserSaved} />
                <ToastContainer toasts={toasts} onRemove={removeToast} />

                <ConfirmDeleteModal
                    open={confirmOpen}
                    onClose={() => {
                        setConfirmOpen(false);
                        setDeleteId(null);
                    }}
                    onConfirm={confirmDelete}
                />
            </div>
        </AppLayout>
    );
}
