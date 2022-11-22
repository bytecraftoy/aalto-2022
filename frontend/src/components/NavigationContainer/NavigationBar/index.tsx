import React from 'react';
import { Surface } from '../../Surface';
import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/solid';

/**
 *
 * Component for elements inside the actual navigation bar
 *
 */

export const NavigationBar = () => {
    return (
        <Surface level={5} className="fixed w-full top-0 left-0 h-16 z-20 px-4">
            <div className="flex flex-wrap justify-between mx-auto h-full">
                <Bars3Icon className="w-8 h-8 m-4 self-center text-neutral-30" />
                <div className="self-center text-2xl">
                    AI-assisted game content creator
                </div>
                <UserCircleIcon className="w-8 h-8 m-2 self-center text-neutral-30" />
            </div>
        </Surface>
    );
};
