import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { setTheme } from '../../reducers/themeReducer';
import { EventBus } from '../../utils/eventBus';
import { Parameters, Theme, Preset } from '../../utils/types';
import { getProject, saveProject } from './../../utils/projects';
import { useState } from 'react';

/**
 * Custom hook containing functionality used by the about page
 *
 */
export const useAbout = () => {
    const theme = useAppSelector((state) => state.theme.value);
    const dispatch = useAppDispatch();
    const logged = useAppSelector((state) => state.user.logged);
    const panels = useAppSelector((state) => state.panels.value);
    const projects = useAppSelector((state) => state.projects.value);
    const presets = useAppSelector((state) => state.presets.value);
    const currentProject = () => projects[0];


    
    // Presets
    const presetNames = presets.map(p => p.presetName);
    const [currentPreset, setCurrentPreset] = useState(presetNames[0] ?? 'No presets found');
    const selectPreset = (name: string) => {
        const preset = presets.find(p => p.presetName === name);
        if (preset) {
            const value = preset as Preset;
            setCurrentPreset(value.presetName);

            // TODO:
            // change parameters on preset change
        }
    }





    // Keep track of the last saved theme so we don't cause unnecessary saves
    const [lastTheme, setLastTheme] = useState<Theme>(theme);

    // Current AI being used. For now, just check dev mode
    const currentAI =
        process.env.NODE_ENV === 'development'
            ? 'Using Dummy Proxy'
            : 'Using davinci-002';

    // Get the main project from database and updates it
    const updateDatabase = async () => {
        if (logged) {
            // TODO: the current project id we are working should be clearly
            // dictated somewhere in the redux store
            // the project should not be chosen by name, etc.

            // Workaround, get first project since we only have one at this point
            const projectId = currentProject().id;

            /* Old code commented out before a solution is discussed:
             *
             * It's bad to rely on some named project, because the user
             * should be able to rename any projects
             *
             * const mainProject = await getProjectIdByName('main');
             * if (!mainProject.success) return;
             */

            const mainProject = await getProject(projectId);
            if (!mainProject.success) return;

            // Update theme
            mainProject.project.data.theme = theme;
            const result = await saveProject(projectId, mainProject.project);

            // Successfully updated theme, take note
            if (result.success) {
                setLastTheme(theme);
            }
        }
    };

    /**
     * Saves progress and updates database
     */
    const saveState = async () => {
        // TODO: Add deeper equality check once parameters become changeable
        // on the about page. For now, they are not updated anyway
        // Theme has not changed, do not save
        if (theme.name === lastTheme.name) {
            return;
        }

        await updateDatabase();

        EventBus.dispatch('notification', {
            type: 'success',
            message: 'Your progress has been saved.',
        });
    };

    const setThemeName = (name: string) => {
        // Destruct to make newTheme writable
        const newTheme = { ...theme };
        newTheme.name = name;
        dispatch(setTheme(newTheme));
    };

    const setThemeParameters = (globalParameters: Parameters | undefined) => {
        // Ignore setting parameters to undefined
        const params = globalParameters ?? theme.globalParameters;

        const newTheme = { ...theme };
        newTheme.globalParameters = params;
        dispatch(setTheme(newTheme));
    };

    return {
        theme,
        panels,
        presets,
        currentAI,
        currentPreset,
        setThemeName,
        setThemeParameters,
        currentProject,
        selectPreset,
        saveState,
    };
};
