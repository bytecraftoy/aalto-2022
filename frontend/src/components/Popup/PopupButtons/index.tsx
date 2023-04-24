import React from 'react';
import { PopupButton } from '..';
import { TextButton } from '../../Buttons';

export interface PopupButtonsProps {
    close: () => void;
    buttons: PopupButton[];
}

export const PopupButtons: React.FC<PopupButtonsProps> = ({
    close,
    buttons,
}) => {
    return (
        <div className="p-4 w-full flex flex-row justify-between">
            <div className="w-full" />
            <div className="flex flex-row justify-between">
                {buttons.map((button, idx) => {
                    return (
                        <TextButton
                            key={idx}
                            onClick={() => {
                                // If action is defined, and returns true, do not close
                                // Otherwise, close popup when clicked
                                if (button.action) {
                                    if (!button.action()) close();
                                } else close();
                            }}
                            icon={button.icon}
                            name={button.text}
                            type={button.type}
                            colorPalette="primary"
                        />
                    );
                })}
            </div>
        </div>
    );
};
