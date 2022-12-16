import React, { useState } from 'react';
import { NavigationBar } from './NavigationBar';
import { NavigationDrawer } from './NavigationDrawer';

/**
 * Component for top app bar of the website
 * This component should be visible in all of the pages of the website
 * and also be accessible when user scrolls below in the screen
 *
 */

interface NavigationProps {
    children: React.ReactNode;
}

export const NavigationContainer: React.FC<NavigationProps> = ({
    children,
}) => {
    // State of the navigation drawer
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full min-h-screen">
            {/*  Navigation bar always at top */}
            <NavigationBar setOpen={setOpen} />
            {/* Rest of the page goes below navigation bar */}
            <div className="w-full flex-1 ">{children}</div>
            {/* Navigation drawer at the left side of the screen */}
            <NavigationDrawer open={open} setOpen={setOpen} />
        </div>
    );
};
