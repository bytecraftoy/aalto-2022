import { Transition } from '@headlessui/react';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Surface } from '../../Surface';
import { NavigationSubHeader } from './NavigationSubHeader';
import { NavigationLink } from './NavigationLink';
import { solidIcon } from '../../../utils/icons';
import { PanelSection } from './PanelSection';
import { Divider } from '../../Divider';
import { useAppSelector } from '../../../utils/hooks';
import { IconButton } from '../../Buttons';

/**
 *
 * Navigation drawer with material design.
 * At the left side of the screen, opened with the burger icon from the top app bar.
 * Shows other navigation links of the page
 *
 */

interface DrawerProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavigationDrawer: React.FC<DrawerProps> = ({ open, setOpen }) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const user = useAppSelector((state) => state.user);

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
            show={open}
            unmount={false}
            enter="transition-all duration-200"
            enterFrom="opacity-0 -translate-x-20"
            enterTo="opacity-100 translate-x-0"
            leave="transition-all duration-200"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-20"
            className="z-30 fixed top-1 left-0 max-w-[360px] w-[80%] h-full" // try to take as much as 80% of screen (mobile), but a maximum of 360px
        >
            <Surface level={1} className={classNames('w-full h-full z-30')}>
                {/* The data area */}
                <div className="h-full w-full p-3 overflow-y-auto scrollbar-hide">
                    {/* Drawer header */}
                    <div className="flex flex-row items-center justify-between py-2 pl-4 pr-2 h-14">
                        <h2 className="text-xl inline-block">Navigation</h2>
                        <IconButton
                            icon="ArrowLeftIcon"
                            colorPalette="secondary"
                            onClick={() => setOpen(false)}
                            className="inline-block"
                        />
                    </div>

                    {/* Don't show content unless the user is logged in */}
                    {user.logged ? (
                        <>
                            {/** The pages */}
                            <NavigationSubHeader>Pages</NavigationSubHeader>
                            <NavigationLink
                                label="About"
                                icon={solidIcon('InformationCircleIcon')}
                                to="/about"
                            />
                            <NavigationLink
                                label="Projects"
                                icon={solidIcon('WindowIcon')}
                                to="/projects"
                            />

                            <Divider />

                            {/** Panels */}
                            <PanelSection />

                            {/** Others */}
                            {/* Hidden because this is currently not implemented
                    
                    <NavigationLink
                        label="Overall view"
                        icon={solidIcon('WindowIcon')}
                        to="#"
                    />
                    
                    */}
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </Surface>
        </Transition>
    );
};
