import React from 'react';
import { Icon, solidIcon } from '../../../utils/icons';
import {
    Palette,
    textOnContainer,
    bgLightHover,
    bgLightActive,
} from '../../../utils/colors';
import classNames from 'classnames';

/**
 * Simple button consisting of an icon and no text
 */

interface IconButtonProps {
    icon: Icon;
    colorPalette: Palette;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    colorPalette,
    onClick,
    className,
}) => {
    return (
        // Circular hover with icon centered
        <button
            onClick={onClick}
            data-testid="icon-button"
            className={classNames(
                'p-4 rounded-full flex flex-row justify-center items-center transition-all',
                bgLightHover(colorPalette),
                bgLightActive(colorPalette),
                className
            )}
        >
            {solidIcon(icon, textOnContainer(colorPalette))}
        </button>
    );
};
