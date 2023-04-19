import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { setTheme } from '../../reducers/themeReducer';
import { EventBus } from '../../utils/eventBus';
import { Parameters, Theme } from '../../utils/types';
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
    const currentProjectId = useAppSelector((state) => state.project.value.id);
    const currentProject = () =>
        projects.find((p) => p.id === currentProjectId) ?? { name: '', id: '' };

    // Presets, (if they were fetched)
    const presetNames = presets.map((p) => p.presetName) || [
        'No presets found',
    ];

    const [lastTheme, setLastTheme] = useState<Theme>(theme);

    const selectPreset = (name: string) => {
        const p = presets.find((p) => p.presetName === name);

        // Preset exists, we can update it
        if (p) {
            const newTheme = { ...theme };
            newTheme.globalParameters = p;
            dispatch(setTheme(newTheme));
        }
    };

    // Get the main project from database and updates it
    const updateDatabase = async () => {
        if (logged) {
            const projectId = currentProject().id;

            const mainProject = await getProject(projectId);
            if (!mainProject.success) return;

            // Update theme
            mainProject.project.data.theme = theme;
            const result = await saveProject(projectId, mainProject.project);

            EventBus.dispatch('notification', {
                type: result.success ? 'success' : 'error',
                message: result.success
                    ? 'Your progress has been saved.'
                    : result.error.message,
            });

            // Saving was successful, take note
            if (result.success) {
                setLastTheme(theme);
            }
        }
    };

    /**
     * Saves progress and updates database
     */
    const saveState = async () => {
        // Theme has not changed
        if (JSON.stringify(theme) === JSON.stringify(lastTheme)) return;

        await updateDatabase();
    };

    const setThemeName = (name: string) => {
        // Destruct to make newTheme writable
        const newTheme = { ...theme };
        newTheme.name = name;
        dispatch(setTheme(newTheme));
    };

    const setThemeParameters = (globalParameters: Parameters) => {
        // Ignore setting parameters to undefined
        const params = globalParameters ?? theme.globalParameters;

        const newTheme = { ...theme };
        newTheme.globalParameters = { presetName: 'Custom', ...params };
        newTheme.globalParameters.presetName = 'Custom'; // TS bug, presetName doesn't get set without this
        dispatch(setTheme(newTheme));
    };

    return {
        theme,
        panels,
        presetNames,
        setThemeName,
        setThemeParameters,
        currentProject,
        selectPreset,
        saveState,
    };
};
