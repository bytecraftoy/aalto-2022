import React from 'react';
import { FilledButton } from './Buttons';
import { CustomTextInput } from './TextInput';

/**
 * Minimum required data for representing PromptIOBox state.
 * Should also include the attributes we care about for import/export
 */
export interface PromptData {
    id: string;
    input: string;
    output: string;
}

/**
 * Visible PromptIOBox state, and callback functions for
 * performing necessary actions of the box.
 */
interface PromptIOBoxProps {
    input: string;
    output: string;
    setInput: (s: string) => void;
    setOutput: (s: string) => void;
    generate: () => void;
    deleteSelf: (() => void) | null; //null --> don't show button
}
/**
 * Component containing editable textareas for Input/Output with AI
 * generation.
 */
export const PromptIOBox: React.FC<PromptIOBoxProps> = ({
    input,
    output,
    setInput,
    setOutput,
    generate,
    deleteSelf,
}) => {
    return (
        <div className="mt-10 pt-4 px-8 w-1/2 min-w-fit flex flex-col items-center justify-around">
            <div className="w-full flex flex-col items-center justify-between">
                <CustomTextInput
                    placeholder="User input here"
                    value={input}
                    onInput={({ target }) => {
                        setInput((target as HTMLTextAreaElement).value);
                    }}
                />
                <CustomTextInput
                    placeholder="AI generated content"
                    value={output}
                    onInput={({ target }) => {
                        setOutput((target as HTMLTextAreaElement).value);
                    }}
                />

                <div className="flex flex-row">
                    <FilledButton
                        onClick={generate}
                        name="Generate"
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
            </div>
        </div>
    );
};
