import React from 'react';
import { solidIcon } from '../../../../../../utils/icons';
import { Icon } from '../../../../../../utils/icons';
/**
 * Item for the user drop down menu
 */

interface UserDropDownItemProps {
    onClick: () => void;
    icon: Icon;
    name: string;
    red?: boolean;
}

export const UserDropDownItem: React.FC<UserDropDownItemProps> = ({
    onClick,
    icon,
    name,
    red,
}) => {
    return (
        <div className="h-10 w-full">
            <div
                className={`w-full h-full px-3 flex flex-row gap-2 justify-start items-center bg-neutral-10 bg-opacity-0 hover:bg-opacity-5 active:bg-opacity-8 text-lg ${
                    red && 'text-red'
                }`}
                onClick={onClick}
            >
                {solidIcon(icon)}
                {name}
            </div>
        </div>
    );
};
