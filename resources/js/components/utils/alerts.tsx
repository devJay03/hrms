import type { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
};

const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

export default function Alert() {
    const { flash } = usePage<PageProps>().props;
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(100);
    const [alertKey, setAlertKey] = useState(0); // 👈 unique key for rerender

    const duration = 3000;
    const type = flash?.status ?? 'info';
    const Icon = icons[type as keyof typeof icons];

    useEffect(() => {
        if (!flash?.message) return;

        // generate a new key to force re-run animations
        setAlertKey(Date.now());
        setIsVisible(true);
        setProgress(100);
    }, [flash]);

    useEffect(() => {
        if (!isVisible) return;

        // auto dismiss
        const autoRemoveTimer = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        // progress animation
        const startTime = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            setProgress((remaining / duration) * 100);
        }, 50);

        return () => {
            clearTimeout(autoRemoveTimer);
            clearInterval(progressInterval);
        };
    }, [alertKey, isVisible]);

    if (!flash?.message || !isVisible) return null;

    return (
        <div className="pointer-events-none fixed top-4 right-4 z-50 space-y-4">
            <div
                key={alertKey}
                className={`pointer-events-auto relative w-80 transform overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out ${toastStyles[type as keyof typeof toastStyles]} `}
            >
                <div className="absolute top-0 left-0 h-1 bg-white/30 transition-all duration-75 ease-linear" style={{ width: `${progress}%` }} />
                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                            <p className="text-sm font-medium">{flash.message}</p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <button
                                className="inline-flex rounded-md p-1.5 text-white hover:bg-white/20 focus:ring-2 focus:ring-white focus:outline-none"
                                onClick={() => setIsVisible(false)}
                            >
                                <span className="sr-only">Dismiss</span>
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
