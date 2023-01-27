import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { solidIcon } from '../../utils/icons';

/**
 * Content panel dropdown menu and its functionality
 *
 */

interface DropdownMenuProps {
    addPromptBoxes: (n: number) => void;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    addPromptBoxes,
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
                    'absolute -right-6 top-12 rounded shadow w-44 bg-surface-1',
                    { hidden: !open }
                )}
            >
                <a
                    href="#"
                    onClick={() => addBoxes(5)}
                    className="block px-4 py-2 rounded hover:bg-neutral-10 hover:bg-opacity-8"
                >
                    Add 5
                </a>
                <a
                    href="#"
                    onClick={() => addBoxes(10)}
                    className="block px-4 py-2 rounded hover:bg-neutral-10 hover:bg-opacity-8"
                >
                    Add 10
                </a>
            </div>
        </div>
    );
};
