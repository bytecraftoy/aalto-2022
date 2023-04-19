import React from 'react';
import { Surface } from '../../Surface';
import { UserButtons } from './UserButtons';
import { IconButton } from '../../Buttons';

/**
 * Component for elements inside the actual navigation bar
 */

interface NavigationBarProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ setOpen }) => {
    return (
        <Surface
            level={5}
            className="sticky w-full top-0 left-0 h-20 z-20 flex justify-between items-center rounded-none shadow-secondary-20/5 outline-primary-80"
        >
            <div data-testid="navdrawer-button">
                <IconButton
                    icon="Bars3Icon"
                    colorPalette="primary"
                    onClick={() => setOpen(true)}
                    className="mx-3 p-3 hover:bg-primary-80"
                    iconClassName="w-8 h-8"
                />
            </div>

            {/* Only show title on large screens */}
            <h1 className="text-2xl font-medium mx-4 text-center text-neutral-30 max-lg:hidden">
                AI-assisted game content creator
            </h1>

            {/* User actions */}
            <UserButtons />
        </Surface>
    );
};
