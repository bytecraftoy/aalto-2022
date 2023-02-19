import { useEffect, useState } from 'react';
import { PromptData } from './ContentPanelPrompts/PromptIOBox';
import { v4 as uuidv4 } from 'uuid';
import { generateText } from '../../utils/generateContent';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { updatePanel } from '../../reducers/panelReducer';
import { generatePrompts } from './promptUtil';
import { EventBus } from '../../utils/eventBus';
import { backendURL } from '../../utils/backendURL';
import {
    ContentPanelType,
    Parameters,
    DEFAULT_PARAMETERS,
} from '../../utils/types';

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
    const logged = useAppSelector((state) => state.user.logged);
    const panels = useAppSelector((state) => state.panels.value);

    const [promptBoxes, setPromptBoxes] =
        useState<PromptData[]>(initialPrompts);
    const [category, setCategory] = useState<string>(initialCategory);
    const [parameters, setParameters] =
        useState<Parameters>(DEFAULT_PARAMETERS);

    const [loading, setLoading] = useState<boolean>(false);

    const [popupOpen, setPopup] = useState<boolean>(false);

    //Callback to create new boxes in the panel
    const addPromptBox = () => {
        const newBox = { id: uuidv4(), input: '', output: '', locked: false };
        setPromptBoxes((prev) => [...prev, newBox]);
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
            prompts: promptBoxes,
            category,
            parameters,
        } as Omit<ContentPanelType, 'id'>);

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
    const updateDatabase = async (panel: ContentPanelType) => {
        if (logged) {
            // Get the projects
            const response = await fetch(`${backendURL}/api/user/projects`, {
                method: 'GET',
                credentials: 'include',
            });

            if (response.status !== 200) return;

            const data = await response.json();

            // If the user has no projects, return
            if (!data.length) return;

            // Get the main project
            const projectID = data.find(
                (p: { id: string; name: string }) => p.name === 'main'
            )?.id;

            if (!projectID) return;

            // Current state of the panels
            const updatedPanels = panels.map((p: ContentPanelType) => {
                if (p.id === panel.id) return panel;
                return p;
            });

            const project = {
                name: 'main',
                json: JSON.stringify({ panels: updatedPanels }),
            };

            // Update the main project
            await fetch(`${backendURL}/api/user/projects/${projectID}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(project),
            });
        }
    };

    /**
     * Saves the panel state
     */
    const saveState = async () => {
        // Create the new panel object
        const panel: ContentPanelType = {
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
                category,
                parameters,
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
        category,
        promptBoxes,
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
        setParameters,
    };
};
