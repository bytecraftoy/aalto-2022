import React from 'react';
import classNames from 'classnames';

/**
 * Individual button for segmented buttons.
 *
 */

interface SegmentedButtonProps {
    name: string;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    position?: 'left' | 'right';
}

export const SegmentedButton: React.FC<SegmentedButtonProps> = ({
    name,
    onClick,
    position,
}) => {
    return (
        <button
            className={classNames(
                'h-10 px-6 border text-lg font-medium bg-onSecondaryContainer bg-opacity-0  hover:bg-opacity-8 active:bg-opacity-12 ',
                { 'rounded-l-full': position === 'left' },
                { 'rounded-r-full': position === 'right' }
            )}
            onClick={onClick}
        >
            {name}
        </button>
    );
};
