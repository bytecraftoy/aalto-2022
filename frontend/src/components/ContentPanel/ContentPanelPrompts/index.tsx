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
        const boxesSplit: PromptData[][] = [[], []];

        for (let i = 0; i < boxes.length; i++) {
            if (i % 2 == 0) {
                boxesSplit[0].push(boxes[i]);
            } else {
                boxesSplit[1].push(boxes[i]);
            }
        }
        return boxesSplit;
    };

    const makePromptBox = (p: PromptData) => {
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
                    promptBoxes.length > 1 ? () => deletePromptBox(p.id) : null
                }
            />
        );
    };

    const makeAddButton = () => {
        return (
            <div
                className={classNames(
                    'mt-10 ml-[120px] pt-12 pb-12 px-4 w-1/2 min-w-fit flex flex-col items-center justify-around'
                )}
            >
                <FAB
                    icon="PlusIcon"
                    size="large"
                    colorPalette="primary"
                    onClick={addPromptBox}
                />
            </div>
        );
    };

    const twoCols = true;
    const pb = twoCols
        ? splitPromptBoxes(promptBoxes)
        : [promptBoxes, promptBoxes];
    const addButtonOnRight = twoCols ? pb[0].length > pb[1].length : false;

    return (
        <div className="flex justify-center items-center p-8 mb-6">
            <div
                className={`grid grid-cols-${
                    twoCols ? '2' : '1'
                } justify-around`}
            >
                <div className="col-start-1">
                    <div>{pb[0].map((p) => makePromptBox(p))}</div>
                    <div>{!addButtonOnRight ? makeAddButton() : null}</div>
                </div>
                {twoCols ? (
                    <div className="col-start-2">
                        <div>{pb[1].map((p) => makePromptBox(p))}</div>
                        <div>{addButtonOnRight ? makeAddButton() : null}</div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};
