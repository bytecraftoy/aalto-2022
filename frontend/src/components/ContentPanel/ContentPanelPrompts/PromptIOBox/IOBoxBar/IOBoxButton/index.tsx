import React, { useState } from 'react';
import classNames from 'classnames';
import { ButtonProps } from '../../../../../Buttons';
import { bg, textOnBg } from '../../../../../../utils/colors';
import { solidIcon } from '../../../../../../utils/icons';

/**
 * Individual IOBox action button component
 * e.g. "Generate" or "Lock"
 */

export interface IOBoxButtonProps extends ButtonProps {
    //Other properties
    visible: boolean;
}

export const IOBoxButton: React.FC<IOBoxButtonProps> = ({
    name,
    icon,
    colorPalette,
    onClick,
    visible,
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
            <button
                onClick={onClick}
                className={classNames(
                    'flex flex-row justify-start items-center',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'font-sans text-md font-medium py-2.5 ',
                    'h-10 transition-colors shadow-lg',
                    { 'pl-4 pr-6': icon },
                    { 'px-6': !icon },
                    bg(colorPalette),
                    textOnBg(colorPalette),
                    'h-12 rounded-md outline outline-1 outline-white/20',
                    { 'pr-3': !nameVisible }
                )}
                data-testid="custom-button"
            >
                {solidIcon(icon, 'mr-2 ' + textOnBg(colorPalette))}
                {nameVisible ? name : ''}
            </button>
        </div>
    );
};
