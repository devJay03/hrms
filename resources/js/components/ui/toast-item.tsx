import React, { useEffect, useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { Toast } from '@/types/toast';

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
}

const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
};

const iconStyles = {
    success: 'text-white',
    error: 'text-white',
    warning: 'text-white',
    info: 'text-white',
};

const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
};

export function ToastItem({ toast, onRemove }: ToastItemProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const [progress, setProgress] = useState(100);

    const Icon = icons[toast.type];
    const duration = toast.duration || 3000; // Default to 3 seconds

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Auto remove timer
        const autoRemoveTimer = setTimeout(() => {
            handleRemove();
        }, duration);

        // Progress bar animation
        const startTime = Date.now();
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, duration - elapsed);
            const progressPercent = (remaining / duration) * 100;
            setProgress(progressPercent);

            if (remaining <= 0) {
                clearInterval(progressInterval);
            }
        }, 50); // Update every 50ms for smooth animation

        return () => {
            clearTimeout(autoRemoveTimer);
            clearInterval(progressInterval);
        };
    }, [duration]);

    const handleRemove = () => {
        setIsLeaving(true);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            className={`
                transform transition-all duration-300 ease-in-out mb-3
                ${isVisible && !isLeaving
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                }
            `}
        >
            <div className={`
                w-80 shadow-lg rounded-lg pointer-events-auto relative overflow-hidden
                ${toastStyles[toast.type]}
            `}>
                {/* Progress bar */}
                <div
                    className="absolute top-0 left-0 h-1 bg-white/30 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                />

                <div className="p-4">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Icon className={`h-5 w-5 ${iconStyles[toast.type]}`} />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                            <p className="text-sm font-medium">
                                {toast.title}
                            </p>
                            {toast.message && (
                                <p className="mt-1 text-sm opacity-90">
                                    {toast.message}
                                </p>
                            )}
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <button
                                className="inline-flex rounded-md p-1.5 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white text-white"
                                onClick={handleRemove}
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
