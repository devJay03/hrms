import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user?: User | null;
}

export default function UserModal({ isOpen, onClose, user }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        number: '',
        role: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        setData({
            name: user?.name || '',
            email: user?.email || '',
            number: user?.number || '',
            role: user?.role || '',
            password: '',
            password_confirmation: '',
        });
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (user?.id) {
            put(`/users/${user.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/users', {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{user?.id ? 'Edit User' : 'Add User'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Name</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Username" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label className="block text-sm font-medium text-gray-700">Email Address</Label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Example@gmail.com"
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="flex-1">
                            <Label className="block text-sm font-medium text-gray-700">Phone Number</Label>
                            <Input type="number" value={data.number} onChange={(e) => setData('number', e.target.value)} placeholder="Phone Number" />
                            {errors.number && <p className="text-sm text-red-500">{errors.number}</p>}
                        </div>
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Role</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="manager">Manager</SelectItem>
                                <SelectItem value="receptionist">Receptionist</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="guest">Guest</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <Label className="block text-sm font-medium text-gray-700">Password</Label>
                            <Input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter password"
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>

                        <div className="flex-1">
                            <Label className="block text-sm font-medium text-gray-700">Confirm Password</Label>
                            <Input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm password"
                            />
                            {errors.password_confirmation && <p className="text-sm text-red-500">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {user?.id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
