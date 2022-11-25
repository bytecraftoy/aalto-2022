import React from 'react';
import { ButtonProps } from '..';
import { activeColor, bgColor, hoverColor } from '../../../utils/colors';
import { solidIcon } from '../../../utils/icons';
import classNames from 'classnames/dedupe';

/**
 * Button with a material design filled style
 * https://m3.material.io/components/buttons/overview
 */
export const FilledButton: React.FC<ButtonProps> = ({
    name,
    icon,
    color,
    disabled,
    className,
    onClick,
}) => {
    return (
        <button
            className={classNames(
                'flex flex-row justify-start items-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'text-primary-99 font-sans text-md font-medium py-2.5 m-4',
                'h-10 transition-colors rounded-full shadow-lg',
                { 'pl-4 pr-6': icon },
                { 'px-6': !icon },
                bgColor(color),
                hoverColor(color),
                activeColor(color),
                className
            )}
            onClick={onClick}
            disabled={disabled}
            data-testid="custom-button"
        >
            {solidIcon(icon, 'text-primary-99 w-6 h-6 mr-2')}
            {name}
        </button>
    );
};

//<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default</button>
