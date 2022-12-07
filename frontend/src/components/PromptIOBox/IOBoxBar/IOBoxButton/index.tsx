import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from '../../../Buttons';
import { ExtendedFAB } from '../../../Buttons/ExtendedFab';

export interface IOBoxButtonProps extends ButtonProps {
    //Other properties
    name: string;
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
        <ExtendedFAB
            name={name}
            icon={icon ?? 'PlusIcon'}
            colorPalette={colorPalette}
            disabled={disabled ?? false}
            onClick={onClick}
            className={classNames(
                'transition-all',
                { '-translate-y-16': visible },
                { '': !visible }
            )}
        />
    );
};
