import React, { useState } from 'react';
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

/**
 * An about page explaining the usage of the application as well as
 * an input field for choosing a theme for the currently selected project
 *
 */
export const AboutPage = () => {
    const {
        currentAI,
        theme,
        setThemeName,
        setThemeParameters,
        panels,
        currentProject,
        saveState,
    } = useAbout();

    // Callback to export the current project, and all its inputs / outputs in json
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
    //Not implemented, instead just call jsonExport
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

    // Opens ParameterDrawer
    const [open, setOpen] = useState(false);

    return (
        //Take up full space, and center the content in it
        <div className="relative w-full h-full flex-1">
            <ParameterDrawer open={open} setOpen={setOpen} />
            <div
                className={classNames(
                    'w-full px-4 py-16 flex flex-row justify-around items-center'
                )}
            >
                <Surface
                    level={2}
                    className="w-full max-w-6xl min-h-fit rounded-2xl shadow-xl outline outline-1 outline-primary-90"
                >
                    <AboutHeader
                        theme={theme}
                        setThemeName={setThemeName}
                        setThemeParameters={setThemeParameters}
                        saveState={saveState}
                    />
                    <AboutInfoSection />
                </Surface>
            </div>
        </div>
    );
};
