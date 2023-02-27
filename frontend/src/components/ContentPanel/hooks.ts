import { useState } from 'react';
import { generateText } from '../../utils/generateContent';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { updatePanel } from '../../reducers/panelReducer';
import { generatePrompts } from './promptUtil';
import { EventBus } from '../../utils/eventBus';
import {
    PromptData,
    Parameters,
    ContentPanelData,
    createEmptyPrompt,
} from '../../utils/types';
import { getProject, saveProject } from './../../utils/projects';

/**
 * Custom hook which return prompts, category and loading information + all the action functions related to prompts and category
 * (generating, locking, setting output for prompts etc.)
 * @param id
 *
 */
export const usePanel = (id: string) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.value);
    const logged = useAppSelector((state) => state.user.logged);
    const panels = useAppSelector((state) => state.panels.value);
    const projects = useAppSelector((state) => state.projects.value);
    const presets = useAppSelector((state) => state.presets.value);

    // We can assume the panel exists, since the panels page handles missing id's
    const panel = panels.find((p) => p.id === id) as ContentPanelData;

    // Panel state
    const category = panel.category;
    const promptBoxes = panel.prompts;

    // Prioritize custom parameters
    const parameters = panel.parameters ?? theme.globalParameters;

    // Parameter drawer state
    const advancedMode = panel.advancedMode;
    const overrideTheme = panel.overrideTheme;

    // Local state outside of redux store
    const [loading, setLoading] = useState<boolean>(false);
    const [popupOpen, setPopup] = useState<boolean>(false);

    const setAdvancedMode = (b: boolean) => {
        const newPanel = { ...panel };
        newPanel.advancedMode = b;
        dispatch(updatePanel(newPanel));
    };

    const setOverrideTheme = (b: boolean) => {
        const newPanel = { ...panel };
        newPanel.overrideTheme = b;

        // Reset params to global ones
        if (!b) newPanel.parameters = undefined;
        dispatch(updatePanel(newPanel));
    };

    // Presets, (if they were fetched)
    const presetNames = presets.map((p) => p.presetName) || [
        'No presets found',
    ];

    // Select preset by name and update it
    const selectPreset = (name: string) => {
        const p = presets.find((p) => p.presetName === name);

        // Preset exists, we can update it
        if (p) {
            const newPanel = { ...panel };
            newPanel.parameters = p;
            dispatch(updatePanel(newPanel));
        }
    };

    // Set custom parameters. This creates a Preset called "Custom"
    const setCustomParameters = (params: Parameters) => {
        const newPanel = { ...panel };
        newPanel.parameters = { presetName: 'Custom', ...params };
        newPanel.parameters.presetName = 'Custom';
        dispatch(updatePanel(newPanel));
    };

    const setCategory = (s: string) => {
        const newPanel = { ...panel };
        newPanel.category = s;
        dispatch(updatePanel(newPanel));
    };

    const setPromptBoxes = (set: (prev: PromptData[]) => PromptData[]) => {
        const newPanel = { ...panel };
        newPanel.prompts = set(newPanel.prompts);
        dispatch(updatePanel(newPanel));
    };

    //Callback to create new boxes in the panel
    const addPromptBox = () => {
        setPromptBoxes((prev) => [...prev, createEmptyPrompt()]);
    };

    //Callback to create multiple boxes
    const addPromptBoxes = (n: number) => {
        const newBoxes = Array.from<PromptData>(Array(n)).map(
            createEmptyPrompt
        );
        setPromptBoxes((prev) => [...prev, ...newBoxes]);
    };

    // Generates all the IO boxes that are not locked
    const generateAll = async () => {
        // Start the loading spinner
        setLoading(true);

        // Map of <id, output> for content panels that are generated
        const generated: Map<string, string> = await generatePrompts({
            theme: theme.name,
            prompts: promptBoxes,
            category,
            parameters,
        });

        // Sets all the promptboxes in a 1 setState call.
        setPromptBoxes((prev) =>
            prev.map((p) => {
                if (generated.has(p.id)) {
                    const mapOutput = generated.get(p.id);
                    if (mapOutput) return { ...p, output: mapOutput };
                }

                return p;
            })
        );

        // Save progress and end the loading spinner
        await saveState();
        setLoading(false);
    };

    // Get the main project from database and updates it
    const updateDatabase = async (panel: ContentPanelData) => {
        if (logged) {
            // TODO: the current project id we are working should be clearly
            // dictated somewhere in the redux store
            // the project should not be chosen by name, etc.

            // Workaround, get first project since we only have one at this point
            const projectId = projects[0].id;

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

            // Current state of the panels
            const updatedPanels = panels.map((p: ContentPanelData) => {
                if (p.id === panel.id) return panel;
                return p;
            });

            mainProject.project.data.panels = updatedPanels;
            await saveProject(projectId, mainProject.project);
        }
    };

    /**
     * Saves the panel state
     */
    const saveState = async () => {
        // Update panel state to database
        await updateDatabase(panel);

        EventBus.dispatch('notification', {
            type: 'success',
            message: 'Your progress has been saved.',
        });
    };

    // Generates single output
    const generateOutput = async (p: PromptData) => {
        setLoading(true);

        setPromptOutput(
            p.id,
            await generateText({
                id: p.id,
                input: p.input,
                theme: theme.name,
                category,
                parameters,
            })
        );

        await saveState();
        setLoading(false);
    };

    //Callback to modify the input area of a PromptIOBox by id
    const setPromptOutput = (id: string, output: string) => {
        setPromptBoxes((prev) =>
            prev.map((o) => (o.id === id ? { ...o, output: output } : o))
        );
    };

    // Locks a prompt box, so that it is not generated with generate all
    const lockPrompt = (id: string) => {
        setPromptBoxes((prev) =>
            prev.map((box) =>
                box.id === id ? { ...box, locked: !box.locked } : box
            )
        );
    };

    return {
        theme,
        category,
        parameters,
        promptBoxes,
        presetNames,
        advancedMode,
        overrideTheme,
        loading,
        popupOpen,
        setCategory,
        setPromptBoxes,
        generateOutput,
        generateAll,
        setPromptOutput,
        addPromptBox,
        addPromptBoxes,
        lockPrompt,
        setPopup,
        saveState,
        setCustomParameters,
        selectPreset,
        setAdvancedMode,
        setOverrideTheme,
    };
};
