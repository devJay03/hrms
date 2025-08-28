import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, UserPayload, UserResponse } from '@/types/user';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UserManagementProps {
    user?: User | null;
    open: boolean; // Add this missing prop
    onSaved: (response: UserResponse) => void;
    onClose: () => void;
}

const USER_ROLES = [
    { value: 0, label: 'Administrator' },
    { value: 1, label: 'End-User' },
];

export default function UserManagement({ user, open, onClose, onSaved }: UserManagementProps) {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [role, setRole] = useState(user?.role?.toString() || '1');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setRole(user?.role?.toString() || '1');
        setPassword('');
        setConfirmPassword('');
    }, [user]);

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const userData: UserPayload = {
            name,
            email,
            role: parseInt(role),
        };

        if (password) {
            userData.password = password;
            userData.confirm_password = confirmPassword; // Add confirm_password for Laravel
        }

        if (user?.id) {
            axios
                .put(`/users/${user.id}`, userData)
                .then((res) => {
                    onSaved(res); // Pass full response
                    onClose();
                })
                .catch((error) => {
                    console.error('Update error:', error);
                    alert('Failed to update user');
                });
        } else {
            axios
                .post('/users', userData)
                .then((res) => {
                    onSaved(res); // Pass full response
                    onClose();
                })
                .catch((error) => {
                    console.error('Create error:', error);
                    alert('Failed to create user');
                });
        }
    };

    const handleClose = () => {
        setName('');
        setEmail('');
        setRole('1');
        setPassword('');
        setConfirmPassword('');
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {/* Name */}
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <Input id="name" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    {/* Email */}
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <Input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* Role */}
                    <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                            Role
                        </label>
                        <Select value={role} onValueChange={setRole}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {USER_ROLES.map((option) => (
                                    <SelectItem key={option.value} value={option.value.toString()}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Password */}
                    <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium">
                            Password {user && <span className="text-gray-500">(leave blank to keep current)</span>}
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="grid gap-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirm Password
                        </label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={!name.trim() || !email.trim() || Boolean(password && password !== confirmPassword)}>
                        {user ? 'Update User' : 'Create User'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
