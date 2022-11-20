import React from 'react';
import { Surface } from '../Surface';

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
        <React.Fragment>
            {/*  The actual navigation container */}
            <Surface level={2} className=" h-16">
                Navigation here
            </Surface>

            {/* Rest of the page goes below navigation bar */}
            {children}
        </React.Fragment>
    );
};
