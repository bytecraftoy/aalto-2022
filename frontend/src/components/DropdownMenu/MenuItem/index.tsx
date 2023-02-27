import React from 'react';
import classNames from 'classnames';

interface MenuItemProps {
    onClick: () => void;
    message: string;
    className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    message,
    className,
}) => {
    return (
        <div
            className={classNames(
                'transition-colors w-full cursor-pointer inline-block p-4 hover:bg-primary-90',
                className
            )}
            onClick={onClick}
        >
            {message}
        </div>
    );
};
