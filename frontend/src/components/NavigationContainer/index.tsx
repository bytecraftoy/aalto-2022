import React from 'react';
import { NavigationBar } from './NavigationBar';

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
    return (
        <div className="flex w-full min-h-screen flex-row">
            {/*  Navigation bar always at top */}
            <NavigationBar />

            {/* Rest of the page goes below navigation bar */}
            <div className="w-full flex-1 mt-16">{children}</div>
        </div>
    );
};
