import AmenitiesForm from '@/components/amenities/amenities-form';
import AmenitiesTable from '@/components/amenities/amenities-table';
import CustomAlert from '@/components/ui/custom-alert';
import AppLayout from '@/layouts/app-layout';
import { Amenity, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Amanities',
        href: '/amenities',
    },
];

export default function Amanities({ amenities }: { amenities: Amenity[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Amenities" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CustomAlert />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <div className="rounded-lg bg-white p-4 shadow">
                            <h2 className="mb-4 text-lg font-semibold">Amenities List</h2>
                            <AmenitiesTable amenities={amenities} />
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="rounded-lg bg-white p-4 shadow">
                            <h2 className="mb-4 text-lg font-semibold">Add Amenity</h2>
                            <AmenitiesForm />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
