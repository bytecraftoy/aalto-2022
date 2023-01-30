import React from 'react';
import { ButtonProps } from '..';
import { bg, bgActive, bgHover, textOnBg } from '../../../utils/colors';
import { solidIcon } from '../../../utils/icons';
import classNames from 'classnames/dedupe';

/**
 * Button with a material design filled style
 * https://m3.material.io/components/buttons/overview
 */
export const FilledButton: React.FC<ButtonProps> = ({
    name,
    icon,
    colorPalette,
    disabled,
    className,
    onClick,
    type,
}) => {
    return (
        <button
            className={classNames(
                'flex flex-row justify-start items-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'font-sans text-md font-medium py-2.5 ',
                'h-10 transition-colors rounded-full shadow-lg',
                { 'pl-4 pr-6': icon },
                { 'px-6': !icon },
                bg(colorPalette),
                textOnBg(colorPalette),
                bgActive(colorPalette),
                className
            )}
            type={type && type}
            onClick={onClick}
            disabled={disabled}
            data-testid="custom-button"
        >
            {solidIcon(icon, 'mr-2 ' + textOnBg(colorPalette))}
            {name}
        </button>
    );
};
