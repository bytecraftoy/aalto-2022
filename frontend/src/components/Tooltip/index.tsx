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
        <div className="position: absolute justify-between h-8 px-3 bg-neutral-70 rounded-lg border-2 border-neutral-60 opacity-40">
            <div className="flex flex-row gap-1">
                <div className="text-sm">{text}</div>
            </div>
        </div>
    );
};
