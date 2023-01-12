import React from 'react';
import { Surface } from '../../Surface';
import { solidIcon } from '../../../utils/icons';

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
            className="fixed w-full top-0 left-0 h-20 z-20 flex justify-between items-center outline outline-1 outline-primary-80"
        >
            <button onClick={() => setOpen(true)}>
                {solidIcon('Bars3Icon', 'mx-8 w-8 h-8 text-primary-30')}
            </button>

            <h1 className="text-2xl font-medium mx-4 text-center text-neutral-10">
                AI-assisted game content creator
            </h1>
            <button>
                {solidIcon('UserCircleIcon', 'mx-8 w-8 h-8 text-primary-30')}
            </button>
        </Surface>
    );
};
