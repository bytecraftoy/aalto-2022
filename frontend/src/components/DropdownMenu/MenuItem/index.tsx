import React from 'react';

interface MenuItemProps {
    onClick: () => void;
    message: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ onClick, message }) => {
    return (
        <div
            className='className="block px-4 py-2 rounded bg-neutral-10 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-8 z-[999999]'
            onClick={onClick}
        >
            {message}
        </div>
    );
};
