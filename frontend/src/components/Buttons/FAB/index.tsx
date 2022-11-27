import React from 'react';
import { Icon, solidIcon } from '../../../utils/icons';
import {
    Palette,
    containerColor,
    onContainerColor,
} from '../../../utils/colors';
import classNames from 'classnames';

/**
 * Floating action button, i.e., floating icon button
 * More info about the component here:
 * https://m3.material.io/components/floating-action-button/overview
 */

interface FABProps {
    icon: Icon;
    colorPalette: Palette;
    size?: 'large' | 'small';
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const FAB: React.FC<FABProps> = ({
    icon,
    colorPalette,
    size,
    onClick,
}) => {
    return (
        <div className="inline-block p-4 ">
            {/* Three different FABs: FAB, small FAB, large FAB */}
            <button onClick={onClick} data-testid="fab-button">
                {/* Color layer */}
                <div
                    className={classNames(
                        'outline outline-2 outline-primary-80/30',
                        containerColor(colorPalette),
                        'shadow-lg',
                        { 'w-24 h-24 rounded-[28px]': size === 'large' },
                        { 'w-10 h-10 rounded-xl': size === 'small' },
                        { 'w-14 h-14 rounded-2xl': !size }
                    )}
                >
                    {/* State layer */}
                    <div
                        className={classNames(
                            'w-full h-full flex justify-center items-center transition-colors',
                            'bg-onSecondaryContainer bg-opacity-0 hover:bg-opacity-8 active:bg-opacity-12',
                            { 'rounded-[28px]': size === 'large' },
                            { 'rounded-xl': size === 'small' },
                            { 'rounded-2xl': !size }
                        )}
                    >
                        {/* Large FAB */}
                        {size === 'large' &&
                            solidIcon(
                                icon,
                                'w-9 h-9 ' + onContainerColor(colorPalette)
                            )}

                        {/* Small FAB */}
                        {size === 'small' &&
                            solidIcon(icon, onContainerColor(colorPalette))}

                        {/* Default FAB */}
                        {!size &&
                            solidIcon(icon, onContainerColor(colorPalette))}
                    </div>
                </div>
            </button>
        </div>
    );
};
