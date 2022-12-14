import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Surface } from '../../Surface';

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

            </Surface>
        </div>

    )
}