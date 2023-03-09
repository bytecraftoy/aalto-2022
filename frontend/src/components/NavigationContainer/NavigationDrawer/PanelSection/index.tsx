import React from 'react';
import { NavigationSubHeader } from '../NavigationSubHeader';
import { TextButton, IconButton } from '../../../Buttons';
import { NavigationLink } from '../NavigationLink';
import { solidIcon } from '../../../../utils/icons';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { addPanel, removePanel } from '../../../../reducers/panelReducer';
import { ContentPanelData } from '../../../../utils/types';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Content panels part of the navigation drawer
 * Contains links to the user's content panels.
 */

export const PanelSection = () => {
    // Redux dispatch
    const dispatch = useAppDispatch();

    // Current location and navigation
    const location = useLocation();
    const navigate = useNavigate();

    // All the panels of the application
    const panels = useAppSelector((state) => state.panels.value);

    // Add new content panel to the application
    const newPanel = () => {
        dispatch(addPanel());
    };

    // Delete a content panel from the application
    const deletePanel = (panel: ContentPanelData) => {
        //TODO: ask for confirmation if the panel isn't empty

        dispatch(removePanel(panel));

        // Redirect to another panel if we deleted the panel we were currently on
        if (location.pathname === `/panels/${panel.id}`) {
            navigate('/');
        }
    };

    return (
        <React.Fragment>
            {/** Header */}
            <NavigationSubHeader>Content Panels</NavigationSubHeader>

            {/** The panels */}
            {panels.map((panel, index) => {
                const url = `/panels/${panel.id}`;
                const name = panel.category || `Panel-${index + 1}`;

                return (
                    <div
                        key={panel.id}
                        className="w-full h-14 flex flex-row justify-between items-center group"
                    >
                        <NavigationLink
                            key={panel.id}
                            label={name}
                            to={url}
                            icon={solidIcon('CubeIcon')}
                        />

                        {/* Button to delete panels. Do not include if there is only one panel */}
                        {panels.length > 1 && (
                            <IconButton
                                icon="XMarkIcon"
                                colorPalette="tertiary"
                                onClick={() => deletePanel(panel)}
                                className="opacity-0 group-hover:opacity-100"
                            />
                        )}
                    </div>
                );
            })}

            {/** Adding new panels */}
            <div className="py-2.5 h-14">
                <TextButton
                    name="Add Panel"
                    colorPalette="primary"
                    icon="PlusIcon"
                    className="w-full justify-center m-0 h-14"
                    onClick={newPanel}
                />
            </div>
        </React.Fragment>
    );
};
