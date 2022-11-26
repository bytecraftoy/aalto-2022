import React from 'react';
import { SegmentedButton } from './SegmentedButton.tsx';

/**
 * Group of buttons with same border
 * Check out https://m3.material.io/components/segmented-buttons/overview
 * for more information about segmented buttons
 */

interface SegmentedButtonsProps {
    buttonProps: Array<[string, React.MouseEventHandler<HTMLButtonElement>]>;
}

export const SegmentedButtons: React.FC<SegmentedButtonsProps> = ({
    buttonProps,
}) => {
    const names: Array<string> = [];
    const onClicks: Array<React.MouseEventHandler<HTMLButtonElement>> = [];

    // Unpack the button names and onClick functions
    for (let i = 0; i < buttonProps.length; i++) {
        const buttonProp = buttonProps[i];
        names.push(buttonProp[0]);
        onClicks.push(buttonProp[1]);
    }

    return (
        <div className="inline-block">
            <div className="grid grid-cols-3">
                {names.map((name, index) => {
                    let position: 'left' | 'right' | undefined;
                    if (index == 0) position = 'left';
                    if (index == names.length - 1) position = 'right';

                    return (
                        <SegmentedButton
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
