import { useEffect, useState } from 'react';
import { generateText } from '../../utils/generateContent';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { updatePanel } from '../../reducers/panelReducer';
import { generatePrompts } from './promptUtil';
import { EventBus } from '../../utils/eventBus';
import {
    PromptData,
    Parameters,
    Preset,
    ContentPanelData,
    createEmptyPrompt,
} from '../../utils/types';
import { getProject, saveProject } from './../../utils/projects';

/**
 * Custom hook which return prompts, category and loading information + all the action functions related to prompts and category
 * (generating, locking, setting output for prompts etc.)
 * @param initialPrompts
 * @param initialCategory
 * @param id
 *
 */
export const usePanel = (
    initialPrompts: PromptData[],
    initialCategory: string,
    id: string
) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.theme.value);
    const logged = useAppSelector((state) => state.user.logged);
    const panels = useAppSelector((state) => state.panels.value);
    const projects = useAppSelector((state) => state.projects.value);
    const presets = useAppSelector((state) => state.presets.value);

    const [promptBoxes, setPromptBoxes] =
        useState<PromptData[]>(initialPrompts);
    const [category, setCategory] = useState<string>(initialCategory);
    const [parameters, setParameters] = useState<Parameters | undefined>(
        undefined
    );
    // undefined parameters means that we use globalParameters

    // Presets
    const presetNames = presets.map((p) => p.presetName);
    const [currentPreset, setCurrentPreset] = useState(
        presetNames[0] ?? 'No presets found'
    );
    const selectPreset = (name: string) => {
        const preset = presets.find((p) => p.presetName === name);
        if (preset) {
            const value = preset as Preset;
            setCurrentPreset(value.presetName);
            setParameters(value);
        }
    };

    const [loading, setLoading] = useState<boolean>(false);
    const [popupOpen, setPopup] = useState<boolean>(false);

    //Callback to create new boxes in the panel
    const addPromptBox = () => {
        setPromptBoxes((prev) => [...prev, createEmptyPrompt()]);
    };

    //Callback to create multiple boxes
    const addPromptBoxes = (n: number) => {
        for (let i = 0; i < n; i++) {
            addPromptBox();
        }
    };

    // Generates all the IO boxes that are not locked
    const generateAll = async () => {
        // Start the loading spinner
        setLoading(() => true);

        // Map of <id, output> for content panels that are generated
        const generated: Map<string, string> = await generatePrompts({
            theme: theme.name,
            prompts: promptBoxes,
            category,
            parameters: parameters ?? theme.globalParameters,
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
        // Create the new panel object
        const panel: ContentPanelData = {
            id,
            category,
            prompts: promptBoxes,
            parameters,
        };

        // Update the redux store
        dispatch(updatePanel(panel));

        await updateDatabase(panel);

        EventBus.dispatch('notification', {
            type: 'success',
            message: 'Your progress has been saved.',
        });
    };

    /**
     * A callback function for the setPromptBoxes which updates
     * the redux store after the content generation
     */
    useEffect(() => {
        if (loading) {
            saveState();
            // Take out the loading spinner
            setLoading(() => false);
        }
    }, [promptBoxes]);

    // Generates single output
    const generateOutput = async (p: PromptData) => {
        setLoading(() => true);
        setPromptOutput(
            p.id,
            await generateText({
                id: p.id,
                input: p.input,
                theme: theme.name,
                category,
                parameters: parameters ?? theme.globalParameters,
            })
        );
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
        promptBoxes,
        presetNames,
        currentPreset,
        loading,
        popupOpen,
        parameters,
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
        setParameters,
        selectPreset,
    };
};
