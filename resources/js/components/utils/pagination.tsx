import { Button } from '@/components/ui/button';

interface PaginationProps {
    pagination: {
        current_page: number;
        last_page: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    onPageChange: (url: string) => void;
}

export default function Pagination({ pagination, onPageChange }: PaginationProps) {
    const { current_page, last_page } = pagination;
    const buttons: React.ReactNode[] = [];

    // Previous
    buttons.push(
        <Button
            key="prev"
            variant="outline"
            size="sm"
            disabled={current_page === 1}
            onClick={() => onPageChange(pagination.links.find((link) => link.label === '&laquo; Previous')?.url || '')}
            className="mr-1"
        >
            Previous
        </Button>,
    );

    // Page numbers (current ± 2)
    const startPage = Math.max(1, current_page - 2);
    const endPage = Math.min(last_page, current_page + 2);

    if (startPage > 1) {
        buttons.push(
            <Button key={1} variant="outline" size="sm" onClick={() => onPageChange(`?page=1`)} className="mr-1">
                1
            </Button>,
        );
        if (startPage > 2) {
            buttons.push(
                <span key="dots1" className="mx-1">
                    ...
                </span>,
            );
        }
    }

    for (let page = startPage; page <= endPage; page++) {
        buttons.push(
            <Button
                key={page}
                variant={page === current_page ? 'default' : 'outline'}
                size="sm"
                onClick={() => onPageChange(`?page=${page}`)}
                className="mr-1"
            >
                {page}
            </Button>,
        );
    }

    if (endPage < last_page) {
        if (endPage < last_page - 1) {
            buttons.push(
                <span key="dots2" className="mx-1">
                    ...
                </span>,
            );
        }
        buttons.push(
            <Button key={last_page} variant="outline" size="sm" onClick={() => onPageChange(`?page=${last_page}`)} className="mr-1">
                {last_page}
            </Button>,
        );
    }

    // Next
    buttons.push(
        <Button
            key="next"
            variant="outline"
            size="sm"
            disabled={current_page === last_page}
            onClick={() => onPageChange(pagination.links.find((link) => link.label === 'Next &raquo;')?.url || '')}
            className="ml-1"
        >
            Next
        </Button>,
    );

    return <div className="flex flex-wrap items-center">{buttons}</div>;
}
