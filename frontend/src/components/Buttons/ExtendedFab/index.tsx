import React from 'react';
import { Icon, solidIcon } from '../../../utils/icons';
import { Palette, bgContainer, textOnContainer } from '../../../utils/colors';
import classNames from 'classnames';

/**
 * Floating action button, i.e., floating icon button
 * More info about the component here:
 * https://m3.material.io/components/extended-fab/overview
 */

interface ExtendedFABProps {
    name: string;
    icon: Icon;
    colorPalette: Palette;
    size?: 'large' | 'small';
    disabled: boolean;
    className: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ExtendedFAB: React.FC<ExtendedFABProps> = ({
    name,
    icon,
    colorPalette,
    size,
    disabled,
    className,
    onClick,
}) => {
    return (
        <div className={classNames("inline-block p-4 ", className)}>
            {/* Three different FABs: FAB, small FAB, large FAB */}
            <button onClick={onClick} disabled={disabled} data-testid="extended-fab-button">
                {/* Color layer */}
                <div
                    className={classNames(
                        'outline outline-2 outline-primary-80/30',
                        bgContainer(colorPalette),
                        'shadow-lg',
                        { 'h-24 rounded-[28px]': size === 'large' },
                        { 'h-10 rounded-xl': size === 'small' },
                        { 'h-14 rounded-2xl': !size }
                    )}
                >
                    {/* State layer */}
                    <div
                        className={classNames(
                            'w-full h-full flex justify-center items-center transition-colors',
                            'flex flex-row justify-start items-center',
                            'font-sans text-md font-medium p-4',
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
                                'h-9 ' + textOnContainer(colorPalette)
                            )}

                        {/* Small FAB */}
                        {size === 'small' &&
                            solidIcon(icon, textOnContainer(colorPalette))}

                        {/* Default FAB */}
                        {!size &&
                            solidIcon(icon, textOnContainer(colorPalette))}
                        {name}
                    </div>
                </div>
            </button>
        </div>
    );
};
