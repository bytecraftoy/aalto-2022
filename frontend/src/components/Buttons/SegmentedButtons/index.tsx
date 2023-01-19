import React from 'react';
import { SegmentedButton } from './SegmentedButton';

/**
 * Group of buttons with same border
 * Check out https://m3.material.io/components/segmented-buttons/overview
 * for more information about segmented buttons
 */

interface SegmentedButtonsProps {
    actions: {
        name: string;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
    }[];
}

export const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({
    actions,
}) => {
    const length = actions.length;

    return (
        <div className="inline-block">
            <div
                className={`grid  grid-cols-[repeat(${length},minmax(0px,1fr))]`}
            >
                {actions.map((action, index) => {
                    let position: 'left' | 'right' | undefined;
                    if (index == 0) position = 'left';
                    if (index == actions.length - 1) position = 'right';

                    return (
                        <SegmentedButton
                            key={index}
                            name={action.name}
                            onClick={action.onClick}
                            position={position}
                        />
                    );
                })}
            </div>
        </div>
    );
};
