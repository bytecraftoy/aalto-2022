import React, { useState } from 'react';
import classNames from 'classnames';
import { ButtonProps, FilledButton } from '../../../../../Buttons';

/**
 * Individual IOBox action button component
 * e.g. "Generate" or "Lock"
 */

export interface IOBoxButtonProps extends ButtonProps {
    //Other properties
    visible: boolean;
    errors?: string;
}

export const IOBoxButton: React.FC<IOBoxButtonProps> = ({
    name,
    icon,
    colorPalette,
    onClick,
    visible,
    errors,
}) => {
    const [nameVisible, setNameVisible] = useState(false);

    return (
        <div
            data-testid={`iobox-${name}`}
            onMouseEnter={() => setNameVisible(true)}
            onMouseLeave={() => setNameVisible(false)}
            className={classNames(
                'transition-all mb-0 mr-0',
                { '-translate-y-[11.5em]': visible },
                { '': !visible },
                { 'mr-0 scale-105': nameVisible }
            )}
        >
            <FilledButton
                name={nameVisible ? name : ''}
                icon={icon}
                colorPalette={colorPalette}
                disabled={errors ? true : false}
                onClick={onClick}
                className={classNames(
                    'h-12 rounded-md outline outline-1 outline-white/20',
                    { 'pr-3': !nameVisible }
                )}
            />
        </div>
    );
};
