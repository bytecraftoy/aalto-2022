import React from 'react';
import classNames from 'classnames';
import { Icon, solidIcon } from '../../../utils/icons';
import { Palette, text, bgLightHover } from '../../../utils/colors';
import { Tooltip } from '../../Tooltip';

/** Item for a dropdown menu */

export type DropdownItem = {
    action?: () => void; // If action is undefined, the item is not interactable
    name: string;
    icon?: Icon;
    color?: Palette;
    tooltip?: string;
};

interface MenuItemProps {
    action?: () => void;
    setOpen: (b: boolean) => void;
    name: string;
    icon?: Icon;
    color?: Palette;
    tooltip?: string;
    compact: boolean;
    className?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    action,
    setOpen,
    name,
    icon,
    color,
    tooltip,
    compact,
    className,
}) => {
    // Empty element to get consistent spacing when some items contain icons and others do not
    // If the entire menu contains no icons (compact === true), this is empty
    const iconPadding = compact ? <></> : <div className="w-6 h-6 mr-5"></div>;

    const itemColor = color ? text(color) : '';
    const hoverColor = bgLightHover(color ?? 'primary');

    const item = (
        <button
            className={classNames(
                'w-full transition-colors flex flex-row justify-start items-center p-6 rounded-2xl',
                action !== undefined && hoverColor,
                { 'cursor-pointer': action },
                { 'cursor-default': !action },
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
            <p className={classNames(itemColor, 'whitespace-nowrap')}>{name}</p>
        </button>
    );

    return tooltip ? (
        <Tooltip text={tooltip} icon="InformationCircleIcon">
            {item}
        </Tooltip>
    ) : (
        item
    );
};
