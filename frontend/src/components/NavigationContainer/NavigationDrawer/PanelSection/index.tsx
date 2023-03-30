import React, { useState } from 'react';
import { NavigationSubHeader } from '../NavigationSubHeader';
import { TextButton, IconButton } from '../../../Buttons';
import { NavigationLink } from '../NavigationLink';
import { solidIcon } from '../../../../utils/icons';
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { addPanel, removePanel } from '../../../../reducers/panelReducer';
import { ContentPanelData } from '../../../../utils/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Popup } from '../../../Popup';

/**
 * Content panels part of the navigation drawer
 * Contains links to the user's content panels.
 */

export const PanelSection = () => {
    // Redux dispatch
    const dispatch = useAppDispatch();

    // Local state
    // Prefer object in the useState, because it's having the value as a function is more error prone
    // I was trying to set the value but setPopAction kept calling the method instead
    const [popOpen, setPopOpen] = useState(false);
    const [popAction, setPopAction] = useState<{ action: () => void }>();

    // Current location and navigation
    const location = useLocation();
    const navigate = useNavigate();

    // All the panels of the application
    const panels = useAppSelector((state) => state.panels.value);

    // Add new content panel to the application
    const newPanel = () => {
        dispatch(addPanel());
    };

    const confirmDelete = (panel: ContentPanelData) => {
        const hasContent =
            panel.prompts.find((p) => p.input || p.output) !== undefined;
        if (hasContent) {
            setPopAction({ action: () => deletePanel(panel) });
            setPopOpen(true);
        } else deletePanel(panel);
    };

    // Delete a content panel from the application
    const deletePanel = (panel: ContentPanelData) => {
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
                                onClick={() => confirmDelete(panel)}
                                className="opacity-0 group-hover:opacity-100"
                            />
                        )}
                    </div>
                );
            })}

            <Popup
                title="Delete category"
                icon="ExclamationTriangleIcon"
                open={popOpen}
                setOpen={setPopOpen}
                onConfirm={popAction?.action}
            >
                <div className="p-4">
                    <p className="text-lg">
                        This category contains prompts that are not empty.
                    </p>
                    <p className="text-lg">
                        Are you sure you wish to delete it?
                    </p>
                </div>
            </Popup>

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
