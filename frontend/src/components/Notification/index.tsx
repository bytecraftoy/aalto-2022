import React from 'react';
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
    isOpen: boolean;
    close: () => void;
    message: string;
}

export const Notification: React.FC<NotificationProps> = ({
    isOpen,
    close,
    message,
}) => {
    if (!isOpen) return <></>;

    return (
        <div className="flex justify-between items-center h-14 px-3 w-full bg-red-90 rounded-xl border-2 border-red-50">
            <div className="flex flex-row gap-1">
                <ExclamationCircleIcon className="h-5 w-5 text-red-50" />
                <div className="text-sm">{message}</div>
            </div>
            <div
                className="rounded-full hover:bg-red-80 transition-colors"
                onClick={close}
            >
                <XMarkIcon className="h-5 w-5" />
            </div>
        </div>
    );
};
