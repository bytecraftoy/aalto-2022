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
        <div className="flex w-full min-h-screen flex-row">
            {/*  Navigation bar always at top */}
            <NavigationBar setOpen={setOpen} />
            {/* Rest of the page goes below navigation bar */}
            <div className="w-full flex-1 mt-16">{children}</div>
            {/* Navigation drawer at the left side of the screen */}
            <NavigationDrawer open={open} setOpen={setOpen} />
        </div>
    );
};
