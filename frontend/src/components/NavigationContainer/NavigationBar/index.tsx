import React from 'react';
import { Surface } from '../../Surface';
import { solidIcon } from '../../../utils/icons';
import { UserButtons } from './UserButtons';

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
            className="sticky w-full top-0 left-0 h-20 z-20 flex justify-between items-center outline outline-1 outline-primary-80"
        >
            <button onClick={() => setOpen(true)}>
                {solidIcon('Bars3Icon', 'mx-8 w-8 h-8 text-primary-30')}
            </button>

            {/* Only show title on large screens */}
            <h1 className="text-2xl font-medium mx-4 text-center text-neutral-10 max-lg:hidden">
                AI-assisted game content creator
            </h1>

            {/* User actions */}
            <UserButtons />
        </Surface>
    );
};
