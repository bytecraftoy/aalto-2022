import { useState, useEffect } from 'react';

/**
 * Custom hook for opening and closing the notification.
 * Automatically closes the notification in 5 seconds from first time showing it.
 */
export const useOpen = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setOpen(false), 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [open]);

    return { open, setOpen };
};
