import React, { useState } from 'react';
import { IOBoxBar } from './IOBoxBar';
import { TextArea } from '../TextArea';

/**
 * Minimum required data for representing PromptIOBox state.
 * Should also include the attributes we care about for import/export
 */
export interface PromptData {
    id: string;
    input: string;
    output: string;
    locked: boolean;
}

/**
 * Visible PromptIOBox state, and callback functions for
 * performing necessary actions of the box.
 */
interface PromptIOBoxProps {
    id: string;
    input: string;
    output: string;
    locked: boolean;
    setInput: (s: string) => void;
    setOutput: (s: string) => void;
    generate: () => void;
    deleteSelf: (() => void) | null; //null --> don't show button
    lock: (id: string) => void;
}
/**
 * Component containing editable textareas for Input/Output with AI
 * generation.
 */
export const PromptIOBox: React.FC<PromptIOBoxProps> = ({
    id,
    input,
    output,
    locked,
    setInput,
    setOutput,
    generate,
    deleteSelf,
    lock,
}) => {
    const [showButtons, setShowButtons] = useState(false);

    return (
        <div
            className="mt-10 pt-4 px-8 w-1/2 min-w-fit flex flex-col items-center justify-around"
            onMouseEnter={() => {
                setShowButtons(true);
            }}
            onMouseLeave={() => {
                setShowButtons(false);
            }}
        >
            <div
                className="w-full flex flex-col items-center justify-between relative"
                data-testid="prompt"
            >
                <IOBoxBar
                    showButtons={showButtons}
                    locked={locked}
                    generate={generate}
                    deleteSelf={deleteSelf}
                    lock={() => lock(id)}
                />
                <div className="w-full h-full z-10">
                    <TextArea
                        placeholder="User input here"
                        label="Input"
                        value={input}
                        onInput={({ target }) => {
                            setInput((target as HTMLTextAreaElement).value);
                        }}
                    />
                    <TextArea
                        placeholder="AI generated content"
                        label="Output"
                        value={output}
                        onInput={({ target }) => {
                            setOutput((target as HTMLTextAreaElement).value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

/*

                <div className="flex flex-row">
                    <FilledButton
                        onClick={generate}
                        name="Generate"
                        colorPalette="primary"
                    />
                    <FilledButton
                        onClick={() => lock(id)}
                        name="lock"
                        colorPalette="primary"
                    />
                    {deleteSelf ? (
                        <FilledButton
                            onClick={() => deleteSelf?.()}
                            name="Delete"
                            colorPalette="red"
                        />
                    ) : (
                        <></>
                    )}
                </div>



 */
