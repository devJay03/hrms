import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';

// Add 'export' here
export interface DropdownAction<T = unknown> {
    label: string;
    onClick: (item: T) => void;
    className?: string;
}

interface BaseDropdownProps<T = unknown> {
    actions: DropdownAction<T>[];
    item: T;
}

export default function ActionDropdown<T>({ actions, item }: BaseDropdownProps<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="!cursor-pointer rounded-full p-2 text-gray-600 hover:bg-gray-100 data-[state=open]:bg-gray-200">
                    <MoreVertical className="h-5 w-5" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {actions.map((action, index) => (
                    <DropdownMenuItem key={index} onClick={() => action.onClick(item)} className={action.className}>
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
