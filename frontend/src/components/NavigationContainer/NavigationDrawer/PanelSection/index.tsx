import React from 'react';
import { NavigationSubHeader } from '../NavigationSubHeader';
import { TextButton } from '../../../Buttons';
import { NavigationLink } from '../NavigationLink';
import { solidIcon } from '../../../../utils/icons';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { addPanel } from '../../../../reducers/panelReducer';

/**
 * Content panels part of the navigation drawer
 * Contains links to the user's content panels.
 */

export const PanelSection = () => {

    // Redux dispatch
    const dispatch = useAppDispatch();

    // All the panel ids of the application
    const panelIds = useAppSelector(state => state.panels.value.map(panel => panel.id));
    

    // Add new content panel to the application
    const newPanel = () => {
        dispatch(addPanel())
    }

    return (
        <React.Fragment>
            {/** Header */}
            <NavigationSubHeader>Content Panels</NavigationSubHeader>

            {/** The panels */}
            {panelIds.map((panelId, index) => {

                if (!index) {
                    return (
                        <NavigationLink
                            key={panelId}
                            label="Main"
                            to="/"
                            icon={solidIcon('CubeIcon')}
                        />
                    );
                } else {
                    return (
                        <NavigationLink
                            key={panelId}
                            label={`Panel-${index + 1}`}
                            to={`/panels/${panelId}`}
                            icon={solidIcon('CubeIcon')}
                        />
                    );
                }
            })
            }


            {/** Adding new panels */}
            <div className="py-2.5 h-14">
                <TextButton
                    name="Add Panel"
                    colorPalette="primary"
                    icon="PlusIcon"
                    className="w-full h-full justify-center m-0"
                    onClick={newPanel}
                />
            </div>

            {/** Divider */}
            <div className="h-[1px] bg-neutral-70 mx-4" />
        </React.Fragment>
    );
};
