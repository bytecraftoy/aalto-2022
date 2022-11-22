import React from 'react';
import { SegemnetdButton } from './SegmentedButton.tsx';

/**
 * Group of buttons with same border
 * Check out https://m3.material.io/components/segmented-buttons/overview
 * for more information about segmented buttons
 */

interface SegmentedButtonsProps {
    names: Array<string>;
    onClicks: Array<React.MouseEventHandler<HTMLButtonElement> | undefined>;
}

export const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({
    names,
    onClicks,
}) => {
    if (names.length != onClicks.length) {
        return <div>Error declaring</div>;
    }

    return (
        <div className="inline-block">
            <div className="grid grid-cols-3">
                {names.map((name, index) => {
                    let position: 'left' | 'right' | undefined;
                    if (index == 0) position = 'left';
                    if (index == names.length - 1) position = 'right';

                    return (
                        <SegemnetdButton
                            key={index}
                            name={name}
                            onClick={onClicks[index]}
                            position={position}
                        />
                    );
                })}
            </div>
        </div>
    );
};
