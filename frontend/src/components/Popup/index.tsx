import React, { useRef, useEffect } from 'react';
import { Surface } from '../Surface';
import { Icon, solidIcon } from '../../utils/icons';
import { Transition } from '@headlessui/react';
import { PopupButtons } from './PopupButtons';

// Action for a popup button
export type PopupAction = (() => boolean) | (() => void);

export interface PopupButton {
    text: string;
    icon?: Icon;
    action?: PopupAction; // No action defaults to closing the popup
    type?: 'submit';
}

export interface PopupProps {
    title?: string;
    icon?: Icon;
    open: boolean;
    setOpen: (b: boolean) => void;
    onConfirm?: PopupAction; // Default confirm action if no buttons are specified
    onOpen?: () => void; // Called before popup opens
    onClose?: () => void; // Called before popup closes
    buttons?: PopupButton[]; // Custom buttons
    children: JSX.Element;
}

/**
 *  Popup window presenting content to the user
 *  with buttons confirming or canceling actions
 */
export const Popup: React.FC<PopupProps> = ({
    title,
    icon,
    open,
    setOpen,
    onConfirm,
    onOpen,
    onClose,
    buttons,
    children,
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    const closePopup = () => {
        onClose?.();
        setOpen(false);
    };

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // Closes the popup if clicked outside
        const close = (e: MouseEvent) => {
            if (!divRef.current?.contains(e.target as Node)) {
                closePopup();
            }
        };

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        };
    }, []);

    useEffect(() => {
        //Popup opened
        if (open) onOpen?.();
    }, [open]);

    const popupButtons = buttons ?? [
        {
            text: 'Confirm',
            action: onConfirm,
            type: 'submit',
        },
        { text: 'Cancel' },
    ];

    return (
        <Transition
            show={open}
            unmount={false}
            enterFrom="opacity-0 duration-200 transition-opacity"
            enterTo="opacity-100 duration-200 transition-opacity"
            leaveFrom="opacity-100 transition-all duration-100"
            leaveTo="opacity-0 transition-all duration-100"
            className="fixed top-0 left-0 w-screen h-screen z-[100] flex flex-row justify-center items-center bg-neutral-10/50"
        >
            <div className="max-sm:w-[80%] sm:min-w-[24em]" ref={divRef}>
                <Surface level={3} className="flex flex-col min-h-80 p-4">
                    {/* Form to allow confirming with enter */}
                    <form onSubmit={(e) => e.preventDefault()} ref={formRef}>
                        <div className="p-4">
                            <h2 className="text-primary font-bold text-base flex flex-row items-center">
                                {solidIcon(icon, 'inline-block w-5 h-5 mr-3')}{' '}
                                {title}
                            </h2>
                        </div>
                        <div className="flex flex-row justify-center items-center w-full h-full">
                            {children}
                        </div>
                        <PopupButtons
                            close={closePopup}
                            buttons={popupButtons}
                        />
                    </form>
                </Surface>
            </div>
        </Transition>
    );
};
