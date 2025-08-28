import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type ConfirmDeleteModalProps = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function ConfirmDeleteModal({ open, onClose, onConfirm }: ConfirmDeleteModalProps) {
    const [text, setText] = useState('');

    const handleConfirm = () => {
        if (text === 'CONFIRM') {
            onConfirm();
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
                    This action cannot be undone. To confirm, please type <b>CONFIRM</b> below.
                </p>
                <Input placeholder="Type CONFIRM" value={text} onChange={(e) => setText(e.target.value)} />
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
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
