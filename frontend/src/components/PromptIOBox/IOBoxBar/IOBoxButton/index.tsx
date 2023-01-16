import React from 'react';
import classNames from 'classnames';
import { ButtonProps } from '../../../Buttons';
import { ExtendedFAB } from '../../../Buttons/ExtendedFab';

/**
 * Individual IOBux action button component
 * e.g. individual iobox generation
 */

export interface IOBoxButtonProps extends ButtonProps {
    //Other properties
    name: string;
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
    return (
        <ExtendedFAB
            name={name}
            icon={icon ?? 'PlusIcon'}
            colorPalette={colorPalette}
            disabled={errors ? true : false}
            onClick={onClick}
            className={classNames(
                'transition-all',
                { '-translate-y-16': visible },
                { '': !visible }
            )}
        />
    );
};
