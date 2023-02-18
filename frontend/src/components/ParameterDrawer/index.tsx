import React, { useEffect, useRef } from 'react';
import { Surface } from '../Surface';
import { Transition } from '@headlessui/react';

interface ParameterDrawerProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ParameterDrawer: React.FC<ParameterDrawerProps> = ({
    open,
    setOpen,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Closes the drawer if clicked outside of the drawer
        const close = (e: MouseEvent) => {
            if (!drawerRef.current?.contains(e.target as Node)) {
                setOpen(false);
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
            ref={drawerRef}
            className="z-30 fixed top-1 right-0 h-full"
            show={open}
            unmount={false}
            enter="transition-all duration-200"
            enterFrom="opacity-0 translate-x-20"
            enterTo="opacity-100 -translate-x-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 -translate-x-0"
            leaveTo="opacity-0 translate-x-20"
        >
            <Surface
                level={1}
                className="w-[360px] h-full rounded-2xl shadow-lg px-3 py-3"
            >
                <div className="pl-3 flex items-center h-14 text-xl">
                    Properties
                </div>
            </Surface>
        </Transition>
    );
};
