import React from 'react';
import { ButtonProps } from '..';
import { solidIcon } from '../../../utils/icons';
import classNames from 'classnames/dedupe';

/**
 * Text button with m3 style
 * https://m3.material.io/components/buttons/specs#899b9107-0127-4a01-8f4c-87f19323a1b4
 *
 */

export const TextButton: React.FC<ButtonProps> = ({
    name,
    icon,
    disabled,
    className,
    onClick,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            data-testid="text-button"
            className={classNames(
                'flex flex-row justify-start items-center',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'font-sans text-md font-medium text-primary py-2.5 m-4',
                'h-10 transition-colors rounded-full hover:bg-primary-state-layer hover:bg-opacity-8',
                { 'pl-4 pr-6 gap-2': icon },
                { 'px-6': !icon },
                className
            )}
        >
            {solidIcon(icon)}
            {name}
        </button>
    );
};
