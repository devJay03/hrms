import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Amenity } from '@/types';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    amenity?: Amenity | null;
}

export default function AmenityModal({ isOpen, onClose, amenity }: Props) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        description: '',
        is_available: 1,
    });

    useEffect(() => {
        setData({
            name: amenity?.name ?? '',
            description: amenity?.description ?? '',
            is_available: amenity?.is_available ?? 1,
        });
    }, [amenity]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (amenity?.id) {
            put(`/amenities/${amenity.id}`, {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post('/amenities', {
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
                    <DialogTitle>{amenity?.id ? 'Edit Amenity' : 'Add Amenity'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Name</Label>
                        <Input value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Amenity" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-gray-700">Descripiton</Label>
                        <Textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Amenity Desciption"
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div>
                        <Label className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent/50 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                            <Checkbox
                                id="toggle-2"
                                checked={data.is_available === 1}
                                onCheckedChange={(checked) => setData('is_available', checked ? 1 : 0)}
                                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                            />
                            <div className="grid gap-1.5 font-normal">
                                <p className="text-sm leading-none font-medium">Availability</p>
                                <p className="text-sm text-muted-foreground">The Amenity is available for rooms</p>
                            </div>
                        </Label>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {amenity?.id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
