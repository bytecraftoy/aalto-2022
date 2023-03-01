import React from 'react';
import { Icon, solidIcon } from '../../../../utils/icons';

export interface IconTipProps {
    icon: Icon;
    text: string;
}

export const IconTip: React.FC<IconTipProps> = ({ icon, text }) => {
    return (
        <div className="flex flex-row justify-start items-center pt-4">
            <div className="pr-4 flex flex-col justify-center items-center">
                {solidIcon(icon, 'text-neutral-30')}
            </div>
            <p className="font-light text-xl">{text}</p>
        </div>
    );
};
