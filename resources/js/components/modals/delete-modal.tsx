import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type ConfirmDeleteModalProps<T = unknown> = {
    open: boolean;
    onClose: () => void;
    onConfirm: (payload?: T) => void;
    payload?: T;
    message?: string;
};

export default function ConfirmDeleteModal<T>({ open, onClose, onConfirm, payload, message }: ConfirmDeleteModalProps<T>) {
    const [text, setText] = useState('');

    const handleConfirm = () => {
        if (text === 'CONFIRM') {
            onConfirm(payload);
            setText('');
        }
    };
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-600">
                    {message ?? `This action cannot be undone. To confirm, please type `}
                    <b>CONFIRM</b> below.
                </p>
                <Input placeholder="Type CONFIRM" value={text} onChange={(e) => setText(e.target.value)} />
                <DialogFooter>
                    <Button variant="default" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" disabled={text !== 'CONFIRM'} onClick={handleConfirm}>
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
