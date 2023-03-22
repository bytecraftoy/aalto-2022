import React, { useEffect } from 'react';
import classNames from 'classnames';
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
    setPromptBoxes: (set: (prev: PromptData[]) => PromptData[]) => void;
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

    const splitPromptBoxes = (boxes: PromptData[]) => {

        return [boxes.slice(0, boxes.length / 2), boxes.slice(boxes.length / 2, boxes.length - 1)]
    }

    const makePromptBox = (p: PromptData) => {
        console.log(p.id)
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
    }

    const twoCols = true;
    const leftHigher = false;
    const pb = twoCols ? splitPromptBoxes(promptBoxes) : [promptBoxes, promptBoxes]

    return (
        <div className="flex justify-center items-center p-8 mb-6">
            <div className={`grid grid-cols-${twoCols ? '2' : '1'} justify-around`}>
                <div>
                    {pb[0].map((p) => { return makePromptBox(p) })}
                </div>
                <div>
                    {twoCols ? pb[1].map((p) => { return makePromptBox(p) }) : null}
                </div>
                <div className={classNames(
                    'mt-10 ml-[120px] pt-4 px-4 w-1/2 min-w-fit flex flex-col items-center justify-around',
                    `${leftHigher && twoCols ? 'col-start-2' : 'col-start-1'}`
                    )}>
                    <FAB
                        icon="PlusIcon"
                        size="large"
                        colorPalette="primary"
                        onClick={addPromptBox}
                    />
                </div>
            </div>
        </div>
    );
};
