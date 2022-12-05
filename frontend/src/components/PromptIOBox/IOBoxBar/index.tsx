import React from 'react';
import { IOBoxButton } from './IOBoxButton';
import { ButtonProps } from '../../Buttons';
import { v4 as uuid } from 'uuid';

interface IOBoxBarProps {
    buttons: ButtonProps[];
}

export const IOBoxBar: React.FC<IOBoxBarProps> = ({ buttons }) => {
    return (
        <div>
            {buttons.map((button) => {
                const {
                    name,
                    icon,
                    colorPalette,
                    disabled,
                    className,
                    onClick,
                } = button;
                return (
                    <IOBoxButton
                        key={uuid()}
                        name={name}
                        icon={icon}
                        colorPalette={colorPalette}
                        disabled={disabled}
                        className={className}
                        onClick={onClick}
                        visible={true}
                    />
                );
            })}
        </div>
    );
};
