import React from 'react';
import { NavigationSubHeader } from '../NavigationSubHeader';
import { TextButton } from '../../../Buttons';
import { NavigationLink } from '../NavigationLink';
import { solidIcon } from '../../../../utils/icons';

/**
 * Content panels part of the navigation drawer
 * Contains links to the user's content panels.
 */

export const PanelSection = () => {
    return (
        <React.Fragment>
            {/** Header */}
            <NavigationSubHeader>Content Panels</NavigationSubHeader>

            {/** The panels */}
            <NavigationLink label="Main" to="/" icon={solidIcon('CubeIcon')} />

            {/** Adding new panels */}
            <div className="py-2.5 h-14">
                <TextButton
                    name="Add Panel"
                    colorPalette="primary"
                    icon="PlusIcon"
                    className="w-full h-full justify-center m-0"
                    onClick={() => console.log('hello')}
                />
            </div>

            {/** Divider */}
            <div className="h-[1px] bg-neutral-70 mx-4" />
        </React.Fragment>
    );
};
