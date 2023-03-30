import React, { useRef, useEffect } from 'react';
import { Surface } from '../Surface';
import { Icon, solidIcon } from '../../utils/icons';
import { TextButton } from '../Buttons';
import { Transition } from '@headlessui/react';

export interface PopupProps {
    title?: string;
    icon?: Icon;
    open: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    setOpen: (b: boolean) => void;
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
    onCancel,
    children,
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Closes the popup if clicked outside
        const close = (e: MouseEvent) => {
            if (!divRef.current?.contains(e.target as Node)) {
                setOpen(false);
                onCancel?.();
            }
        };

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        };
    }, []);

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
                <Surface level={3} className="flex flex-col h-80 min-h-fit p-4">
                    <div className="p-4">
                        <h2 className="text-primary font-bold text-base flex flex-row items-center">
                            {solidIcon(icon, 'inline-block w-5 h-5 mr-3')}{' '}
                            {title}
                        </h2>
                    </div>
                    <div className="flex flex-row justify-center items-center w-full h-full">
                        {children}
                    </div>
                    <div className="p-4 w-full flex flex-row justify-between">
                        <div className="w-full" />
                        <div className="flex flex-row justify-between">
                            <TextButton
                                onClick={() => {
                                    onConfirm?.();
                                    setOpen(false);
                                }}
                                name="Confirm"
                                colorPalette="primary"
                            />
                            <TextButton
                                onClick={() => {
                                    onCancel?.();
                                    setOpen(false);
                                }}
                                name="Cancel"
                                colorPalette="primary"
                            />
                        </div>
                    </div>
                </Surface>
            </div>
        </Transition>
    );
};
