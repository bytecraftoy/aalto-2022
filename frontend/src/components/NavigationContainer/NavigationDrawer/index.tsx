import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Surface } from '../../Surface';
import { NavigationSubHeader } from './NavigationSubHeader';
import { NavigationLink } from './NavigationLink';
import { solidIcon } from '../../../utils/icons';

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

export const NavigationDrawer: React.FC<DrawerProps> = ({
    open,
    setOpen,
}) => {

    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Closes the drawer if clicked outside of the drawer
        const close = (e: MouseEvent) => {
            if (!drawerRef.current?.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        // Add new event listener
        document.addEventListener('mousedown', close);

        return () => {
            document.removeEventListener('mousedown', close);
        }
    }, []);

    return (
        <div
            ref={drawerRef}
        >
            <Surface
                level={1}
                className={classNames(
                    'fixed top-1 left-0 w-[360px] h-full z-30 rounded-2xl shadow-lg',
                    { 'hidden': !open }
                )}>
                {/* The data area */}
                <div
                    className='h-full w-full p-3'
                >

                    {/* Drawer header */}
                    <div
                        className='py-2 pl-4 pr-2 h-14'
                    >
                        <h2
                            className='text-xl'
                        >
                            Navigation
                        </h2>
                    </div>

                    {/** The pages */}
                    <NavigationSubHeader>
                        Pages
                    </NavigationSubHeader>

                    <NavigationLink
                        label="About"
                        icon={solidIcon('InformationCircleIcon')}
                        onClick={() => console.log('ping')}
                    />
                    <NavigationLink
                        label="Settings"
                        icon={solidIcon('SettingsIcon')}
                        onClick={() => console.log('pong')}
                    />
                    <div className='h-[1px] bg-neutral-70 mx-4' />

                    {/** Content panels (currently no functionality)*/}
                    <NavigationSubHeader>
                        Content Panels
                    </NavigationSubHeader>
                    <NavigationLink
                        label="Main"
                        icon={solidIcon('CubeIcon')}
                        onClick={() => console.log('main')}
                    />
                    <NavigationLink
                        label="Panel-2"
                        icon={solidIcon('CubeIcon')}
                        onClick={() => console.log('panel-2')}
                    />
                    <NavigationLink
                        label="Panel-3"
                        icon={solidIcon('CubeIcon')}
                        onClick={() => console.log('panel-3')}
                    />

                    <div className='h-[1px] bg-neutral-70 mx-4' />


                    {/** Others */}
                    <NavigationLink
                        label="Overall view"
                        icon={solidIcon('WindowIcon')}
                        onClick={() => undefined}
                    />



                </div>

            </Surface>
        </div>

    )
}