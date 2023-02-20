import React, { useEffect } from 'react';
import { PromptIOBox } from './PromptIOBox';
import { PromptData } from '../../../utils/types';
import { FAB } from '../../Buttons';
import { useDebounce } from './hooks';

/**
 * Component of Content panel.
 * Contains all the prompt boxes, i.e., contains PromoptIO boxes.
 */
interface ContentPanelPromptsProps {
    promptBoxes: PromptData[];
    setPromptBoxes: React.Dispatch<React.SetStateAction<PromptData[]>>;
    generateOutput: (p: PromptData) => Promise<void>;
    setPromptOutput: (id: string, output: string) => void;
    addPromptBox: () => void;
    lockPrompt: (id: string) => void;
    saveState: () => void;
}

export const ContentPanelPrompts: React.FC<ContentPanelPromptsProps> = ({
    promptBoxes,
    setPromptBoxes,
    generateOutput,
    setPromptOutput,
    addPromptBox,
    lockPrompt,
    saveState,
}) => {
    //Callback to modify the output area of a PromptIOBox by id
    const setPromptInput = (id: string, input: string) => {
        //Replace the box that matches id with a new object where input is changed.
        setPromptBoxes((prev) =>
            prev.map((o) => (o.id === id ? { ...o, input: input } : o))
        );
    };

    // Debounce the inputs to prevent too many requests
    const debouncedInputs = useDebounce(promptBoxes, 4000);

    // Saves state when debouncedInputs changes
    useEffect(() => {
        saveState();
    }, [debouncedInputs]);

    //Callbacks to add or remove PromptIOBoxes to the panels
    const deletePromptBox = (id: string) => {
        setPromptBoxes((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="flex flex-row flex-wrap justify-center items-center p-8 mb-6">
            {promptBoxes.map((p) => {
                return (
                    <PromptIOBox
                        key={p.id}
                        id={p.id}
                        locked={p.locked}
                        input={p.input}
                        output={p.output}
                        setInput={(s: string) => setPromptInput(p.id, s)}
                        setOutput={(s: string) => setPromptOutput(p.id, s)}
                        lock={() => lockPrompt(p.id)}
                        generate={() => generateOutput(p)}
                        deleteSelf={
                            promptBoxes.length > 1
                                ? () => deletePromptBox(p.id)
                                : null
                        }
                    />
                );
            })}
            <div className="mt-10 pt-4 px-4 w-1/2 min-w-fit flex flex-col items-center justify-around">
                <FAB
                    icon="PlusIcon"
                    size="large"
                    colorPalette="primary"
                    onClick={addPromptBox}
                />
            </div>
        </div>
    );
};
