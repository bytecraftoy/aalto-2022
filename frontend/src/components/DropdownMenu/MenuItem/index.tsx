import React from 'react';
import classNames from 'classnames';
import { Icon, solidIcon } from '../../../utils/icons';
import { Palette, text, bgLightHover } from '../../../utils/colors';

/** Item for a dropdown menu */

export type DropdownItem = {
    action?: () => void; // If action is undefined, the item is not interactable
    name: string;
    icon?: Icon;
    color?: Palette;
};

interface MenuItemProps {
    action?: () => void;
    setOpen: (b: boolean) => void;
    name: string;
    icon?: Icon;
    color?: Palette;
    compact: boolean;
    className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    action,
    setOpen,
    name,
    icon,
    color,
    compact,
    className,
}) => {
    // Empty element to get consistent spacing when some items contain icons and others do not
    // If the entire menu contains no icons (compact === true), this is empty
    const iconPadding = compact ? <></> : <div className="w-6 h-6 mr-5"></div>;

    const itemColor = color ? text(color) : '';
    const hoverColor = bgLightHover(color ?? 'primary');

    return (
        <div
            className={classNames(
                'transition-colors flex flex-row justify-start p-5 rounded-2xl',
                action !== undefined && hoverColor,
                { 'cursor-pointer': action },
                { 'min-w-[180px]': icon },
                className
            )}
            onClick={() => {
                if (action) {
                    action();
                    setOpen(false);
                }
            }}
        >
            {icon
                ? solidIcon(icon, 'mr-5 inline-block ' + itemColor)
                : iconPadding}
            <p
                className={classNames(
                    itemColor,
                    { 'cursor-pointer': action },
                    { 'cursor-default': !action }
                )}
            >
                {name}
            </p>
        </div>
    );
};
