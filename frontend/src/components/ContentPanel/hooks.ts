import { useEffect, useState } from 'react';
import { PromptData } from './ContentPanelPrompts/PromptIOBox';
import { v4 as uuidv4 } from 'uuid';
import { generateText } from '../../utils/generateContent';
import { useAppDispatch } from '../../utils/hooks';
import { updatePanel } from '../../reducers/panelReducer';
import { generatePrompts } from './promptUtil';

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

    const [promptBoxes, setPromptBoxes] =
        useState<PromptData[]>(initialPrompts);
    const [category, setCategory] = useState<string>(initialCategory);

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
        const generated: Map<string, string> = await generatePrompts(
            promptBoxes,
            category
        );

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

    /**
     * A callback function for the setPromptBoxes which updates
     * the redux store after the content generation
     */
    useEffect(() => {
        if (loading) {
            // Create the new panel object
            const panel = {
                id,
                category,
                prompts: promptBoxes,
            };

            // Update the redux store
            dispatch(updatePanel(panel));
            // Take out the loading spinner
            setLoading(() => false);
        }
    }, [promptBoxes]);

    // Generates single output
    const generateOutput = async (p: PromptData) => {
        setLoading(() => true);
        setPromptOutput(p.id, await generateText(p.id, p.input, category));
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
    };
};
