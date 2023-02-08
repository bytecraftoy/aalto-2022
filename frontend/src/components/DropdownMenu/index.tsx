import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { solidIcon } from '../../utils/icons';
import { MenuItem } from './MenuItem';

/**
 * Content panel dropdown menu and its functionality
 *
 */

interface DropdownMenuProps {
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
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

    const popup = (number: number) => {
        setPopup(true);
        setOpen(false);
    }

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

            </div>
        </div>
    );
};
