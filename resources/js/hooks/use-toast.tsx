import { Toast } from '@/types/toast';
import { useCallback, useState } from 'react';

let toastCount = 0;

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        (toast: Omit<Toast, 'id'>) => {
            const id = `toast-${++toastCount}`;
            const newToast: Toast = {
                id,
                duration: 5000,
                ...toast,
            };

            setToasts((prev) => [...prev, newToast]);

            // Auto remove after duration
            if (newToast.duration && newToast.duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, newToast.duration);
            }

            return id;
        },
        [removeToast],
    );
    const toast = {
        success: (title: string, message?: string, duration?: number) => addToast({ type: 'success', title, message, duration }),
        error: (title: string, message?: string, duration?: number) => addToast({ type: 'error', title, message, duration }),
        warning: (title: string, message?: string, duration?: number) => addToast({ type: 'warning', title, message, duration }),
        info: (title: string, message?: string, duration?: number) => addToast({ type: 'info', title, message, duration }),
    };

    return {
        toasts,
        toast,
        removeToast,
    };
}
