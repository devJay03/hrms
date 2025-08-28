import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Amenity } from '@/types';
import { MoreVertical } from 'lucide-react';

export default function AmenitiesTable({ amenities }: { amenities: Amenity[] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg border border-gray-200">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-end"></th>
                    </tr>
                </thead>
                <tbody>
                    {amenities.length > 0 ? (
                        amenities.map((amenity, idx) => (
                            <tr key={idx} className="border-t">
                                <td className="px-4 py-2">{amenity.name}</td>
                                <td className="px-4 py-2">{amenity.description}</td>
                                <td className="px-4 py-2 text-end">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 data-[state=open]:bg-gray-200">
                                                <MoreVertical className="h-5 w-5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => console.log('View', amenity.id)}>View</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => console.log('Edit', amenity.id)}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => console.log('Delete', amenity.id)} className="text-red-500">
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                                No amenities found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
