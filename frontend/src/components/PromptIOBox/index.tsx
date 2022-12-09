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
            //IOBoxBar is absolute so use relative here
            className="mt-6 pt-10 px-8 w-1/2 min-w-fit flex flex-col items-center justify-around relative"
            onMouseEnter={() => {
                setShowButtons(true);
            }}
            onMouseLeave={() => {
                setShowButtons(false);
            }}
        >
            <IOBoxBar
                showButtons={showButtons}
                locked={locked}
                generate={generate}
                deleteSelf={deleteSelf}
                lock={() => lock(id)}
            />
            <div
                className="w-full flex flex-col items-center justify-between z-10"
                data-testid="prompt"
            >
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
    );
};
