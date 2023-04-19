import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { IconButton } from '../Buttons';
import { MenuItem, DropdownItem } from './MenuItem';
import { Surface } from '../Surface';
import { Icon } from '../../utils/icons';

interface DropdownMenuProps {
    icon: Icon;
    items: DropdownItem[];
    className?: string;
    iconClassName?: string;
}

/**
 * Dropdown with a list of actions
 *
 */
export const DropdownMenu: React.FC<DropdownMenuProps> = ({
    icon,
    items,
    className,
    iconClassName,
}) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Use compact item spacing if the menu has no icons
    const compact = !items.some((i) => i.icon);

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
                className={className}
                iconClassName={iconClassName}
            />
            <Surface
                level={2}
                className={classNames('absolute -right-2 top-16 w-fit', {
                    hidden: !open,
                })}
            >
                {items.map((item, index) => {
                    return (
                        <MenuItem
                            key={index}
                            compact={compact}
                            action={item.action}
                            setOpen={setOpen}
                            icon={item.icon}
                            color={item.color}
                            name={item.name}
                        />
                    );
                })}
            </Surface>
        </div>
    );
};
