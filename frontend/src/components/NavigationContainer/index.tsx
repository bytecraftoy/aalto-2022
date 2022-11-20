import React from 'react';
import { Surface } from '../Surface';
import { MdMenu } from 'react-icons/md';

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
            <Surface level={2} className="h-16 top-0 sticky w-full">
                {
                    <div className="px-4 h-16 w-full flex justify-between top-0 sticky">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 self-center"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>

                        <div className="self-center text-2xl">
                            AI-assisted game content creator
                        </div>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 self-center"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    </div>
                }
            </Surface>

            {/* Rest of the page goes below navigation bar */}
            {children}
        </React.Fragment>
    );
};
