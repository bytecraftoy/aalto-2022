import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { solidIcon } from '../../utils/icons';
import { bgContainer, bgHover, Palette } from '../../utils/colors';

/**
 * Content panel dropdown menu and its components
 *
 */

interface DropdownMenuProps {
    addPromptBoxes: (n: number) => void;
    colorPalette: Palette;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    addPromptBoxes,
    colorPalette,
}) => {
    const [open, setOpen] = useState(false);

    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Closes the menu if clicked outside of the menu
        const close = (e: MouseEvent) => {
            if (!drawerRef.current?.contains(e.target as Node)) {
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
                {solidIcon('cog-6-tooth', 'w-8 h-8 text-primary-30 ')}
            </button>
            <div
                ref={drawerRef}
                className={classNames(
                    'absolute rounded shadow w-44 dark:bg-white',
                    bgContainer(colorPalette),

                    { hidden: !open }
                )}
            >
                <a
                    href="#"
                    onClick={() => addBoxes(5)}
                    className={classNames(
                        'block px-4 py-2 dark:hover:text-white rounded',
                        bgHover(colorPalette)
                    )}
                >
                    Add 5
                </a>
                <a
                    href="#"
                    onClick={() => addBoxes(10)}
                    className={classNames(
                        'block px-4 py-2 dark:hover:text-white rounded',
                        bgHover(colorPalette)
                    )}
                >
                    Add 10
                </a>
            </div>
        </div>
    );
};
