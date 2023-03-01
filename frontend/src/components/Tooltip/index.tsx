import React from 'react';
import { bg, bgActive, bgHover, textOnBg } from '../../utils/colors';
import { solidIcon } from '../../utils/icons';
import classNames from 'classnames/dedupe';

interface TooltipProps {
    text: string;
    visible: boolean
}

export const Tooltip: React.FC<TooltipProps> = ({
    text,
    visible,
}) => {
    if (!visible) return <></> ;

    return (
        <div className={classNames(' position: absolute w-fit h-fit px-2', 
            'bg-neutral-70 rounded-lg border-2 border-neutral-60 opacity-50'
            )}
            >
            <div className='text-justify text-center text-neutral-30 max-w-sm'>{text}</div>
        </div>
    );
};
