import clsx from 'clsx';

interface BadgeProps {
    text: string;
    color?: 'green' | 'orange' | 'yellow' | 'blue';
}

export default function Badge({ text, color = 'blue' }: BadgeProps) {
    const colorClasses = {
        green: 'bg-green-100 text-green-800 border-green-300',
        orange: 'bg-orange-100 text-orange-800 border-orange-300',
        yellow: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        blue: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    return <span className={clsx('inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium', colorClasses[color])}>{text}</span>;
}
