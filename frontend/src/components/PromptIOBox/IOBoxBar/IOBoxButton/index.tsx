import React from 'react';
import classNames from 'classnames';
import { FilledButton, ButtonProps } from '../../../Buttons';

export interface IOBoxButtonProps extends ButtonProps {
    //Other properties
    visible: boolean;
}

export const IOBoxButton: React.FC<IOBoxButtonProps> = ({
    name,
    icon,
    colorPalette,
    disabled,
    className,
    onClick,
    visible,
}) => {
    return (
        <FilledButton
            name={name}
            icon={icon}
            colorPalette={colorPalette}
            disabled={disabled}
            onClick={onClick}
            className={classNames(
                'transition-all',
                { '-translate-y-16': visible },
                { '': !visible }
            )}
        />
    );
};
