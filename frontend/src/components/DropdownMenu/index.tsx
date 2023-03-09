import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { IconButton } from '../Buttons';
import { MenuItem } from './MenuItem';
import { Surface } from '../Surface';
import { Icon } from '../../utils/icons';

interface DropdownMenuProps {
    icon: Icon;
    choices: { action: () => void; name: string }[];
}

/**
 * Dropdown with a list of actions
 *
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    icon,
    choices,
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

    return (
        // Dropdown menu and its styling
        <div className="relative" ref={menuRef}>
            <IconButton
                icon={icon}
                colorPalette="primary"
                onClick={() => setOpen(!open)}
            />
            <Surface
                level={2}
                className={classNames('absolute -right-2 top-16 w-32', {
                    hidden: !open,
                })}
            >
                {choices.map((choice, index) => {
                    return (
                        <MenuItem
                            key={index}
                            onClick={() => {
                                setOpen(false);
                                choice.action();
                            }}
                            message={choice.name}
                        />
                    );
                })}
            </Surface>
        </div>
    );
};
