import React, { useEffect, useState } from 'react';
import { Surface } from '../Surface';
import classNames from 'classnames';
import { ParameterDrawer } from '../ParameterDrawer';

import {
    exportJson,
    downloadJson,
    exportXlsx,
    downloadXlsx,
} from '../../utils/exportContent';
import { Project } from '../../utils/types';
import { useAbout } from './hooks';
import { AboutHeader } from './AboutHeader';
import { AboutInfoSection } from './AboutInfoSection';
import { Divider } from '../Divider';
import { AboutUsingSection } from './AboutUsingSection';

/**
 * An about page explaining the usage of the application as well as
 * an input field for choosing a theme for the currently selected project
 *
 */
export const AboutPage = () => {
    const {
        theme,
        panels,
        presetNames,
        setThemeName,
        setThemeParameters,
        currentProject,
        selectPreset,
        saveState,
    } = useAbout();

    // Callback to export the current project, and all its inputs / outputs in json
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const jsonExport = async () => {
        // Current project
        const project: Project = {
            name: currentProject().name,
            data: {
                theme,
                panels,
            },
        };

        const link = await exportJson(project);
        if (link) downloadJson(link);
    };

    //Callback to export outputs in excel
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const excelExport = async () => {
        const project: Project = {
            name: currentProject().name,
            data: {
                theme,
                panels,
            },
        };

        const link = await exportXlsx(project);
        if (link) downloadXlsx(link);
    };

    // Empty function, implementation added in the future
    const emptyMethod = () => {
        return;
    };

    // Opens ParameterDrawer
    const [open, setOpen] = useState(false);
    const [advanced, setAdvanced] = useState(false);

    // Autosave when the drawer is closed
    useEffect(() => {
        if (!open) saveState();
    }, [open]);

    return (
        //Take up full space, and center the content in it
        <div className="relative w-full h-full flex-1">
            <ParameterDrawer
                themeDrawer
                overrideTheme={true}
                advancedMode={advanced}
                setOverrideTheme={emptyMethod}
                setAdvancedMode={setAdvanced}
                presets={presetNames}
                preset={theme.globalParameters}
                selectPreset={selectPreset}
                setCustomParameters={setThemeParameters}
                open={open}
                setOpen={setOpen}
            />
            <div
                className={classNames(
                    'w-full px-4 py-16 flex flex-row justify-around items-center'
                )}
            >
                <Surface level={2} className="w-full max-w-6xl min-h-fit mb-16">
                    <AboutHeader
                        theme={theme}
                        setDrawerOpen={setOpen}
                        setThemeName={setThemeName}
                        saveState={saveState}
                    />
                    <div className="w-[80%] mx-auto pt-6">
                        <Divider />
                    </div>
                    <AboutInfoSection />
                    <div className="w-[80%] mx-auto pt-6">
                        <Divider />
                    </div>
                    <AboutUsingSection />
                </Surface>
            </div>
        </div>
    );
};
