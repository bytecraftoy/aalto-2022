import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { solidIcon } from '../../utils/icons';
import { MenuItem } from './MenuItem';

/**
 * Content panel dropdown menu and its functionality
 *
 */

interface DropdownMenuProps {
    addPromptBoxes: (n: number) => void;
    saveState: () => void;
    openDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    addPromptBoxes,
    saveState,
    openDrawer,
}) => {
    const [open, setOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Closes the menu if clicked outside of the menu
        const close = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        };
    }, []);

    // Adds multiple I/O boxes
    const addBoxes = (number: number) => {
        addPromptBoxes(number);
        setOpen(false);
    };

    return (
        // Dropdown menu and its styling
        <div className="relative">
            <button onClick={() => setOpen(!open)} className={classNames('')}>
                {solidIcon('Cog6Tooth', 'w-8 h-8 text-primary-30 ')}
            </button>
            <div
                ref={menuRef}
                className={classNames(
                    'absolute -right-6 top-12 rounded shadow w-44 bg-surface-2',
                    { hidden: !open }
                )}
            >
                <MenuItem onClick={() => addBoxes(5)} message="Add 5" />
                <MenuItem onClick={() => addBoxes(10)} message="Add 10" />
                <MenuItem onClick={saveState} message="Save" />
                <MenuItem onClick={() => openDrawer(true)} message="Settings" />
            </div>
        </div>
    );
};
