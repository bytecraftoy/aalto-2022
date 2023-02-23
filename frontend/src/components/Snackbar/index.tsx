import React, { useEffect, useState } from 'react';
import { Icon, solidIcon } from '../../utils/icons';
import { EventBus } from '../../utils/eventBus';
import { useTimedOpen } from '../../utils/hooks';

/**
 * Snackbar for showing feedback to the user
 */

interface SnackbarProps {
    children: React.ReactNode;
}

export const Snackbar: React.FC<SnackbarProps> = ({ children }) => {
    const [message, setMessage] = useState('');
    const { open, setOpen } = useTimedOpen(3000);

    function onCustomEvent(e: CustomEvent<NotificationObj>) {
        setMessage(e.detail.message);
        setOpen(true);
    }

    useEffect(() => {
        EventBus.on('notification', onCustomEvent);

        return () => {
            EventBus.remove('notification', onCustomEvent);
        };
    }, []);

    return (
        <React.Fragment>
            {children}
            {open && (
                <div className="fixed flex flex-row items-center justify-between pl-4 pr-2 bottom-4 right-6 w-80 h-12 bg-surface-inverse z-50 shadow-md rounded">
                    <div className="text-white ">{message}</div>
                    <div
                        onClick={() => setOpen(false)}
                        className=" rounded-full bg-primary-99 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-8"
                    >
                        {solidIcon('XMarkIcon', 'text-white')}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
